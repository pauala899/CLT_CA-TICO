"""Gera os efeitos sonoros da CLT Caótica em public/sons/efeitos/.

Os sons são sintetizados aqui mesmo, sem amostras de terceiros, então não
dependem de licença. Uso: python3 scripts/gerar-efeitos.py (a partir de reels/).
Precisa do numpy.
"""
import wave
from pathlib import Path

import numpy as np

SR = 48000
PASTA = Path(__file__).resolve().parent.parent / "public" / "sons" / "efeitos"


def salvar(nome, x, ganho=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * ganho
    with wave.open(str(PASTA / nome), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def t(seg):
    return np.arange(int(SR * seg)) / SR


def nota(freq, seg, vib=False):
    tt = t(seg)
    fv = freq * (1 + (0.025 * np.sin(2 * np.pi * 6 * tt) if vib else 0))
    fase = 2 * np.pi * np.cumsum(fv) / SR
    onda = sum(np.sin(k * fase) / k for k in range(1, 9))
    env = np.minimum(1, tt / 0.04) * np.minimum(1, (tt[-1] - tt) / 0.08 + 0.001)
    if vib:
        env *= np.exp(-tt * 0.6)
    return onda * env


def main():
    PASTA.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(7)

    # pop: bolha subindo, para o balão aparecer
    tt = t(0.14)
    f = 260 + 900 * (tt / tt[-1])
    pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 28)
    pop[:96] *= np.linspace(0, 1, 96)
    salvar("pop.wav", pop, 0.7)

    # whoosh: ruído com filtro que varre, para o deslize
    tt = t(0.5)
    n = rng.standard_normal(len(tt))
    env = np.sin(np.pi * tt / tt[-1]) ** 2
    out = np.zeros_like(n)
    y1 = y2 = 0.0
    for i in range(len(n)):
        fc = 300 + 3200 * (i / len(n))
        a = np.exp(-2 * np.pi * fc / SR)
        y1 = (1 - a) * n[i] + a * y1
        y2 = (1 - a) * y1 + a * y2
        out[i] = n[i] - y2
    salvar("whoosh.wav", out * env, 0.55)

    # impacto: pancada grave com estalo, para o grito
    tt = t(0.6)
    grave = np.sin(2 * np.pi * (55 + 60 * np.exp(-tt * 18)) * tt) * np.exp(-tt * 6)
    estalo = rng.standard_normal(len(tt)) * np.exp(-tt * 45)
    salvar("impacto.wav", grave + 0.5 * estalo, 0.9)

    # trombone triste: quatro notas descendo, a última longa e tremida
    notas = [nota(293.66, 0.42), nota(277.18, 0.42), nota(261.63, 0.42), nota(246.94, 1.25, True)]
    pausa = np.zeros(int(SR * 0.06))
    trombone = np.concatenate([parte for n_ in notas for parte in (n_, pausa)])
    salvar("trombone-triste.wav", trombone, 0.6)

    # plim: sininho para o nome da marca
    tt = t(0.9)
    plim = (np.sin(2 * np.pi * 1318.5 * tt) + 0.5 * np.sin(2 * np.pi * 2637 * tt)) * np.exp(-tt * 5)
    salvar("plim.wav", plim, 0.5)


if __name__ == "__main__":
    main()
