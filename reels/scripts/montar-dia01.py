"""Monta o dia 01: copia as imagens escolhidas, calcula os tempos a partir das vozes
geradas e grava os roteiros do reel, dos stories 3 a 6 e dos slides do carrossel.

Uso (a partir de reels/): python3 -I scripts/montar-dia01.py [pasta com as imagens baixadas]
Precisa de Pillow e das vozes em public/sons/vozes/2026-11-07/manifest.json.
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dia01 import CARROSSEL, MAPA_IMAGENS, REEL, STORIES  # noqa: E402

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = Path(sys.argv[1]) if len(sys.argv) > 1 else None
ARTES = RAIZ / "public" / "artes" / "2026-11-07"
ROTEIROS = RAIZ / "roteiros"
MANIFESTO = json.loads((RAIZ / "public" / "sons" / "vozes" / "2026-11-07" / "manifest.json").read_text())
FPS = 30
DESCE_PADRAO = 200


def preparar_imagem(id_):
    """Copia a imagem para public/artes e devolve (caminho relativo, cor do topo)."""
    if ORIGEM is None:
        raise SystemExit("Informe a pasta com as imagens baixadas.")
    nome = f"2026-11-07_{id_}_v4.jpg"
    ARTES.mkdir(parents=True, exist_ok=True)
    destino = ARTES / nome
    shutil.copy(ORIGEM / MAPA_IMAGENS[id_], destino)
    im = Image.open(destino).convert("RGB")
    topo = im.crop((0, 0, im.width, min(120, im.height))).resize((1, 1), Image.BOX).getpixel((0, 0))
    return f"artes/2026-11-07/{nome}", "#%02X%02X%02X" % topo


def efeitos_do_papel(papel, primeiro):
    if papel == "interrupcao" and not primeiro:
        return [{"arquivo": "sons/efeitos/whoosh.wav", "emSeg": 0, "volume": 0.6}]
    if papel == "escalada":
        return [{"arquivo": "sons/efeitos/impacto.wav", "emSeg": 0, "volume": 0.7}]
    if papel == "narracao":
        return [{"arquivo": "sons/efeitos/trombone-triste.wav", "emSeg": 0.2, "volume": 0.5}]
    return []


def montar_quadro(id_imagem, papel, desce, falas_com_id, minimo, primeiro):
    """falas_com_id: lista de (id da voz, tipo, quem, texto). Devolve o quadro e a duração em segundos."""
    imagem, fundo = preparar_imagem(id_imagem)
    t = 0.5 if papel == "punchline" else 0.35
    falas, sons = [], []
    for id_voz, tipo, quem, texto in falas_com_id:
        dados = MANIFESTO[id_voz]
        falas.append({"tipo": tipo, "quem": quem, "texto": texto, "inicioSeg": round(t, 2)})
        sons.append({"arquivo": dados["arquivo"], "emSeg": round(t, 2), "volume": 1})
        sons.append({"arquivo": "sons/efeitos/pop.wav", "emSeg": round(max(t - 0.05, 0), 2), "volume": 0.4})
        t += dados["duracaoSeg"] + 0.55
    duracao = round(max(minimo, t - 0.55 + 0.7), 2)
    sons += efeitos_do_papel(papel, primeiro)
    quadro = {
        "papel": papel,
        "fala": "",
        "quemFala": "protagonista",
        "duracaoSeg": duracao,
        "expressao": "calma",
        "balao": {"estilo": "normal", "topo": 6},
        "entrada": {"tipo": "deslize", "quadros": 8} if papel == "interrupcao" and not primeiro else {"tipo": "corte", "quadros": 0},
        "imagem": imagem,
        "imagemFundo": fundo,
        "imagemDesce": desce,
        "falas": falas,
        "sons": sons,
    }
    return quadro, duracao


def tempos_do_reel(quadros, fechamento_seg, sobreposicao_fech):
    """Início de cada quadro na linha do tempo, com a sobreposição das transições."""
    inicios, atual = [], 0.0
    for i, q in enumerate(quadros):
        if i > 0 and q["entrada"]["tipo"] != "corte":
            atual -= q["entrada"]["quadros"] / FPS
        inicios.append(round(atual, 3))
        atual += q["duracaoSeg"]
    return inicios, round(atual - sobreposicao_fech, 3), fechamento_seg


def main():
    # Reel
    quadros, ids_voz_por_id = [], {}
    for i, q in enumerate(REEL["quadros"]):
        falas = [(f"{q['id']}_{k}", tipo, quem, texto) for k, (tipo, quem, texto) in enumerate(q["falas"])]
        minimo = 3.6
        quadro, _ = montar_quadro(q["id"], q["papel"], q["desce"], falas, minimo, primeiro=(i == 0))
        quadros.append(quadro)
    fechamento = {
        "texto": REEL["fechamento"], "duracaoSeg": 1.8,
        "entrada": {"tipo": "wipe", "quadros": 10},
        "sons": [{"arquivo": "sons/efeitos/plim.wav", "emSeg": 0.35, "volume": 0.5}],
    }
    reel = {"titulo": REEL["titulo"], "quadros": quadros, "fechamento": fechamento}
    (ROTEIROS / "dia01-reel.json").write_text(json.dumps({"reel": reel}, ensure_ascii=False, indent=2))
    inicios, fim_reel, _ = tempos_do_reel(quadros, 1.8, 10 / FPS)
    total = round(fim_reel + 1.8, 2)
    tempos = {"reel_inicios": inicios, "reel_fim_quadros": fim_reel, "reel_total_seg": total}

    # Stories 3 a 6: dois quadros cada, com cartão final da marca
    for n, story in STORIES.items():
        qs = []
        for k, (img, (tipo, quem, texto)) in enumerate(story["quadros"]):
            falas = [(f"story{n}_q{k + 1}", tipo, quem, texto)]
            quadro, _ = montar_quadro(img, "expectativa", 220, falas, 11.0, primeiro=(k == 0))
            qs.append(quadro)
        dados = {"titulo": story["titulo"], "quadros": qs,
                 "fechamento": {"texto": REEL["fechamento"], "duracaoSeg": 1.8,
                                "entrada": {"tipo": "wipe", "quadros": 10},
                                "sons": [{"arquivo": "sons/efeitos/plim.wav", "emSeg": 0.35, "volume": 0.5}]}}
        (ROTEIROS / f"dia01-story-{n}.json").write_text(json.dumps({"reel": dados}, ensure_ascii=False, indent=2))
        tempos[f"story_{n}_total_seg"] = round(sum(q["duracaoSeg"] for q in qs) + 1.8 - 10 / FPS, 2)

    # Carrossel: um arquivo por slide, para renderizar como imagem
    for n, slide in enumerate(CARROSSEL, start=1):
        imagem, _ = preparar_imagem(slide["imagem"])
        dados = {k: v for k, v in slide.items() if k not in ("imagem", "obs")}
        dados["imagem"] = imagem
        (ROTEIROS / f"dia01-slide-{n}.json").write_text(json.dumps({"slide": dados}, ensure_ascii=False, indent=2))

    # Stories 1 e 2: recortes do reel (Q1 a Q6 e Q7 a Q13)
    tempos["story_1_recorte"] = [0.0, round(inicios[5] + quadros[5]["duracaoSeg"], 3)]
    tempos["story_2_recorte"] = [round(inicios[6], 3), round(fim_reel, 3)]
    (ROTEIROS / "dia01-tempos.json").write_text(json.dumps(tempos, indent=2))
    print(json.dumps(tempos, indent=2))
    print("imagens em", ARTES)


if __name__ == "__main__":
    main()
