# Blender: animar imagens geradas (movimento de câmera)

Transforma um PNG gerado (ex.: `2026-11-12_reel_q1_v1.png`) em um clipe MP4 1:1 com o quadro, com push-in lento e deriva suave. Não desenha nada do zero: usa a imagem pronta.

## Requisitos

- Blender 5.3 (instalado por `winget install BlenderFoundation.Blender`), CPU (Cycles). Não precisa de GPU.
- FFmpeg no PATH (para montar o MP4 a partir dos quadros).

## Uso

```bash
blender -b --factory-startup -P render_parallax.py -- ENTRADA.png SAIDA.mp4 [segundos] [largura] [altura] [fps]
```

Exemplo (reel de 8 s, 720x1280, 30 fps):

```bash
blender -b --factory-startup -P render_parallax.py -- ../../dia-06/imagens-png/2026-11-12_reel_q1_v1.png saida-reel-q1.mp4 8 720 1280 30
```

## Tempo e limites

- Teste medido aqui (Xeon E5-2690 v4, CPU): 60 quadros em ~19 s, ou ~0,3 s por quadro. Um reel de 60 s (1800 quadros) leva cerca de 10 minutos.
- O plano é um só: o movimento é de câmera (zoom e deriva), sem paralaxe real entre planos. Paralaxe de verdade precisa de um mapa de profundidade ou de separar personagem e fundo em camadas. Isso fica para a próxima etapa.
- Sem texto e sem balão: o script só anima a imagem. Letras continuam sendo motion graphics na montagem.
