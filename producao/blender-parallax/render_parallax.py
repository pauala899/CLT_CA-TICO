"""
Anima uma imagem gerada (PNG) com movimento de câmera no Blender e renderiza MP4.

Uso (linha de comando, sem abrir a interface):
  blender -b --factory-startup -P render_parallax.py -- ENTRADA.png SAIDA.mp4 [segundos] [largura] [altura] [fps]

Exemplo:
  blender -b --factory-startup -P render_parallax.py -- ../../dia-06/imagens-png/2026-11-12_reel_q1_v1.png saida.mp4 8 720 1280 30

Como funciona:
- A imagem vira um plano com material de emissão (não depende de luz, cor fica fiel ao PNG).
- A câmera faz um push-in lento com deriva suave e easing (sem tremor).
- Render em CPU (Cycles) com poucas amostras: o PC não precisa de GPU.
"""
import math
import os
import sys

import bpy

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
if len(argv) < 2:
    raise SystemExit("Uso: ... -- ENTRADA.png SAIDA.mp4 [segundos] [largura] [altura] [fps]")

src = os.path.abspath(argv[0])
out = os.path.abspath(argv[1])
seconds = float(argv[2]) if len(argv) > 2 else 8.0
width = int(argv[3]) if len(argv) > 3 else 720
height = int(argv[4]) if len(argv) > 4 else 1280
fps = int(argv[5]) if len(argv) > 5 else 30

# Limpa a cena de partida
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# Imagem e proporção
img = bpy.data.images.load(src, check_existing=False)
img_w, img_h = img.size
aspect = img_w / img_h

# Câmera em perspectiva, sensor vertical de 24 mm, lente de 50 mm
D0, D1 = 10.0, 9.0  # distância inicial e final (push-in)
cam_data = bpy.data.cameras.new("Cam")
cam_data.lens = 50
cam_data.sensor_fit = "VERTICAL"
cam_data.sensor_height = 24
cam = bpy.data.objects.new("Cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam

# Plano dimensionado para cobrir o quadro com margem (10%) para o movimento não mostrar borda
half_visible_h_at_D0 = (cam_data.sensor_height / 2) / cam_data.lens * D0
plane_h = 2 * half_visible_h_at_D0 * 1.1
plane_w = plane_h * aspect
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))  # plano em XY, de frente para a câmera
plane = bpy.context.active_object
plane.scale = (plane_w, plane_h, 1)  # primitiva tem 1 unidade de lado
bpy.ops.object.transform_apply(scale=True)

# Material de emissão com a imagem
mat = bpy.data.materials.new("Still")
mat.use_nodes = True
nt = mat.node_tree
nt.nodes.clear()
tex = nt.nodes.new("ShaderNodeTexImage")
tex.image = img
tex.extension = "CLIP"
emit = nt.nodes.new("ShaderNodeEmission")
emit.inputs["Strength"].default_value = 1.0
outn = nt.nodes.new("ShaderNodeOutputMaterial")
nt.links.new(tex.outputs["Color"], emit.inputs["Color"])
nt.links.new(emit.outputs["Emission"], outn.inputs["Surface"])
plane.data.materials.append(mat)

# Posição da câmera e keyframes (push-in com easing + deriva lenta em X e Y)
cam.location = (0, 0, D0)
cam.rotation_euler = (0, 0, 0)
total = max(2, int(round(seconds * fps)))
end_frame = total
scene.frame_start = 1
scene.frame_end = end_frame
drift_x = 0.12
drift_y = 0.08
for frame, t in ((1, 0.0), (end_frame, 1.0)):
    scene.frame_set(frame)
    # ease in-out (cosseno) para o movimento começar e terminar suave
    e = 0.5 - 0.5 * math.cos(math.pi * t)
    cam.location = (drift_x * (2 * e - 1), drift_y * (e - 0.5) * 2, D0 + (D1 - D0) * e)
    cam.keyframe_insert(data_path="location", frame=frame)

# Render: CPU, poucas amostras (emissão é leve)
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 8
scene.cycles.use_denoising = False
scene.view_settings.view_transform = "Standard"  # não altera as cores da imagem

scene.render.resolution_x = width
scene.render.resolution_y = height
scene.render.resolution_percentage = 100
scene.render.fps = fps
scene.render.use_motion_blur = False

# Blender 5.3 deste build não grava vídeo direto: renderiza PNGs e o FFmpeg monta o MP4
frames_dir = os.path.splitext(out)[0] + "_frames"
os.makedirs(frames_dir, exist_ok=True)
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.filepath = os.path.join(frames_dir, "f_")

bpy.ops.render.render(animation=True)

import shutil
import subprocess

ffmpeg = shutil.which("ffmpeg") or "ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-loglevel", "error", "-framerate", str(fps),
     "-i", os.path.join(frames_dir, "f_%04d.png"),
     "-c:v", "libx264", "-preset", "medium", "-crf", "18",
     "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
    check=True,
)
shutil.rmtree(frames_dir, ignore_errors=True)
print("RENDER_OK", out, f"{total} frames @ {fps}fps")
