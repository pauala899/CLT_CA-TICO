"""Gera as vozes do dia 01 com a API do Gemini (plano gratuito, chave GOOGLE_API_KEY).

Uso (a partir de reels/): python3 -I scripts/gerar-vozes-dia01.py
Cada fala vira um WAV em public/sons/vozes/2026-11-07/, com um manifesto em manifest.json.
Áudio que já existe não é gerado de novo. Pensamento ganha eco e volume mais baixo.
Precisa do ffmpeg no PATH.
"""
import base64
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dia01 import REEL, STORIES, VOZES, DIRECAO_PENSA  # noqa: E402

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / "public" / "sons" / "vozes" / "2026-11-07"
MANIFESTO = PASTA / "manifest.json"
PAUSA_SEG = 4.0
CHAMADAS = {"tentativas": 0, "sucesso": 0, "erro_cota": 0}


def falas_do_dia():
    """Lista (id, tipo, quem, texto) de todas as falas do reel e dos stories 3 a 6."""
    lista = []
    for q in REEL["quadros"]:
        for i, (tipo, quem, texto) in enumerate(q["falas"]):
            lista.append((f"{q['id']}_{i}", tipo, quem, texto))
    for n, story in STORIES.items():
        for qi, (_img, (tipo, quem, texto)) in enumerate(story["quadros"]):
            lista.append((f"story{n}_q{qi + 1}", tipo, quem, texto))
    return lista


def chamar_api(modelo, voz, texto_direcao):
    """Uma chamada à API. Devolve (bytes PCM, taxa) ou levanta erro."""
    chave = os.environ.get("GOOGLE_API_KEY")
    if not chave:
        raise SystemExit("GOOGLE_API_KEY não está definida no ambiente.")
    corpo = {
        "contents": [{"parts": [{"text": texto_direcao}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voz}}},
        },
    }
    pedido = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent",
        data=json.dumps(corpo).encode(), method="POST",
        headers={"Content-Type": "application/json", "x-goog-api-key": chave})
    CHAMADAS["tentativas"] += 1
    with urllib.request.urlopen(pedido, timeout=180) as r:
        dados = json.load(r)
    parte = dados["candidates"][0]["content"]["parts"][0]["inlineData"]
    taxa = 24000
    for pedaco in parte["mimeType"].replace(" ", "").split(";"):
        if pedaco.startswith("rate="):
            taxa = int(pedaco.split("=")[1])
    return base64.b64decode(parte["data"]), taxa


def gerar_fala(id_, tipo, quem, texto):
    destino = PASTA / f"{id_}.wav"
    if destino.exists():
        return destino
    if tipo == "pensa":
        cfg = VOZES[quem]
        direcao = DIRECAO_PENSA
    else:
        cfg = VOZES[quem]
        direcao = cfg["direcao"]
    prompt = f"{direcao} {texto}"
    bruto, usado = None, None
    # Primeiro o modelo da voz; se a cota desse modelo acabar, usa o modelo de reserva, com a mesma voz.
    for modelo in [cfg["modelo"], cfg["reserva"]]:
        for tentativa in range(1, 4):
            try:
                bruto = chamar_api(modelo, cfg["voz"], prompt)
                usado = modelo
                break
            except urllib.error.HTTPError as erro:
                corpo = erro.read()[:200].decode(errors="ignore")
                if erro.code != 429:
                    raise SystemExit(f"  {id_}: HTTP {erro.code} {corpo}")
                CHAMADAS["erro_cota"] += 1
                print(f"  {id_}: cota (429) em {modelo}, tentativa {tentativa}", flush=True)
                time.sleep(20 * tentativa)
            except (KeyError, IndexError):
                print(f"  {id_}: resposta sem áudio em {modelo}, tentando de novo", flush=True)
                time.sleep(8)
        if bruto is not None:
            break
    if bruto is None:
        raise SystemExit(f"  {id_}: sem cota nos dois modelos. Os áudios já feitos ficam salvos.")
    pcm, taxa = bruto
    CHAMADAS["sucesso"] += 1
    cfg = dict(cfg, modelo_usado=usado)
    bruto_pcm = PASTA / f"_{id_}.pcm"
    bruto_pcm.write_bytes(pcm)
    filtros = ["silenceremove=start_periods=1:start_silence=0.05:start_threshold=-40dB",
               "areverse", "silenceremove=start_periods=1:start_silence=0.05:start_threshold=-40dB", "areverse"]
    if tipo == "pensa":
        filtros += ["volume=0.8", "aecho=0.8:0.5:50|90:0.3|0.2"]
    filtros += ["loudnorm=I=-16:TP=-1.5:LRA=11"]
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(taxa), "-ac", "1", "-i", str(bruto_pcm),
         "-af", ",".join(filtros), "-ar", "48000", "-ac", "1", str(destino)], check=True)
    bruto_pcm.unlink()
    return destino


def duracao(caminho):
    saida = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                            "-of", "default=nw=1:nk=1", str(caminho)], capture_output=True, text=True, check=True)
    return round(float(saida.stdout.strip()), 3)


def main():
    PASTA.mkdir(parents=True, exist_ok=True)
    manifesto = json.loads(MANIFESTO.read_text()) if MANIFESTO.exists() else {}
    for id_, tipo, quem, texto in falas_do_dia():
        print(f"{id_} [{tipo}/{quem}] {texto}", flush=True)
        arquivo = gerar_fala(id_, tipo, quem, texto)
        manifesto[id_] = {"arquivo": f"sons/vozes/2026-11-07/{arquivo.name}", "duracaoSeg": duracao(arquivo),
                          "tipo": tipo, "quem": quem, "texto": texto,
                          "modelo": manifesto.get(id_, {}).get("modelo", VOZES[quem]["modelo"])}
        MANIFESTO.write_text(json.dumps(manifesto, ensure_ascii=False, indent=2))
        time.sleep(PAUSA_SEG)
    print("pedidos à API nesta execução:", CHAMADAS)


if __name__ == "__main__":
    main()
