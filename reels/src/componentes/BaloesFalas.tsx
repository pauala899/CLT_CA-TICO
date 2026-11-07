import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES, FONTE_FALA } from "../marca";
import type { FalaQuadro } from "../tipos";

const BORDA = 10;
const SOMBRA = 14;

// Balões de um quadro. Cada um aparece no seu tempo e sai quando o próximo começa.
export const BaloesFalas: React.FC<{ falas: FalaQuadro[]; duracao: number }> = ({ falas, duracao }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {falas.map((fala, i) => {
        const inicio = Math.round(fala.inicioSeg * fps);
        const fim = i + 1 < falas.length ? Math.round(falas[i + 1].inicioSeg * fps) : duracao;
        if (frame < inicio || frame >= fim) return null;
        return <BalaoUnico key={i} fala={fala} local={frame - inicio} />;
      })}
    </>
  );
};

const BalaoUnico: React.FC<{ fala: FalaQuadro; local: number }> = ({ fala, local }) => {
  const { fps } = useVideoConfig();
  const pop = spring({ frame: local, fps, config: { damping: 12, stiffness: 150 } });
  const escala = interpolate(pop, [0, 1], [0.3, 1], { output: "perceptual-scale", extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const aberto = interpolate(local, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });

  const base: React.CSSProperties = {
    position: "absolute",
    left: 70,
    right: 70,
    display: "flex",
    justifyContent: "center",
    scale: `${escala}`,
    opacity: aberto,
    transformOrigin: "50% 100%",
  };

  if (fala.tipo === "narracao") {
    return (
      <div style={{ ...base, top: "5%" }}>
        <div
          style={{
            backgroundColor: CORES.branco,
            border: `${BORDA}px solid ${CORES.preto}`,
            boxShadow: `${SOMBRA}px ${SOMBRA}px 0 ${CORES.preto}`,
            padding: "26px 44px 30px",
            fontFamily: FONTE_FALA,
            fontSize: 84,
            lineHeight: 1.2,
            letterSpacing: 1,
            color: CORES.preto,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {fala.texto}
        </div>
      </div>
    );
  }

  if (fala.tipo === "pensa") {
    // Balão de pensamento: nuvem arredondada com bolhas que sobem até a cabeça.
    const sobeDireita = fala.quem !== "ela";
    return (
      <div style={{ ...base, top: "5%", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            backgroundColor: CORES.branco,
            border: `${BORDA}px solid ${CORES.preto}`,
            borderRadius: 120,
            boxShadow: `${SOMBRA}px ${SOMBRA}px 0 ${CORES.preto}`,
            padding: "36px 56px 40px",
            fontFamily: FONTE_FALA,
            fontSize: 74,
            lineHeight: 1.2,
            letterSpacing: 1,
            color: CORES.preto,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {fala.texto}
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 14, alignSelf: sobeDireita ? "flex-end" : "flex-start", marginRight: sobeDireita ? 160 : 0, marginLeft: sobeDireita ? 0 : 200 }}>
          {[34, 22, 12].map((r) => (
            <div key={r} style={{ width: r * 2, height: r * 2, borderRadius: "50%", backgroundColor: CORES.branco, border: `${BORDA - 2}px solid ${CORES.preto}` }} />
          ))}
        </div>
      </div>
    );
  }

  // Fala: balão com rabicho apontando para quem fala (protagonista à esquerda, fora de cena à direita).
  const foraDeCena = fala.quem !== "ela";
  const pontaEsquerda = foraDeCena ? "74%" : "40%";
  const pontaX = foraDeCena ? 210 : 25;
  const pontaAltura = 125;
  return (
    <div style={{ ...base, top: "5%" }}>
      <div style={{ position: "relative", maxWidth: 900 }}>
        <svg width={120} height={pontaAltura} style={{ position: "absolute", top: "100%", marginTop: -BORDA * 2, left: pontaEsquerda, overflow: "visible", zIndex: 0 }}>
          <polygon points={`0,0 116,0 ${pontaX},${pontaAltura}`} fill={CORES.preto} />
        </svg>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backgroundColor: CORES.branco,
            border: `${BORDA}px solid ${CORES.preto}`,
            borderRadius: 80,
            boxShadow: `${SOMBRA}px ${SOMBRA}px 0 ${CORES.preto}`,
            padding: "40px 58px 46px",
            fontFamily: FONTE_FALA,
            fontSize: 88,
            lineHeight: 1.22,
            letterSpacing: 1,
            color: CORES.preto,
            textAlign: "center",
          }}
        >
          {fala.texto}
        </div>
        <svg width={120} height={pontaAltura} style={{ position: "absolute", top: "100%", marginTop: -BORDA * 2, left: pontaEsquerda, overflow: "visible", zIndex: 2 }}>
          <polygon
            points={`${BORDA * 1.9},0 ${116 - BORDA * 1.9},0 ${pontaX + (foraDeCena ? -BORDA * 2.2 : BORDA * 0.6)},${pontaAltura - BORDA * 2.4}`}
            fill={CORES.branco}
          />
        </svg>
      </div>
    </div>
  );
};
