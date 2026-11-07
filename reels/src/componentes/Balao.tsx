import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES, FONTE_FALA } from "../marca";
import type { Papel, Quadro } from "../tipos";

// Quantos quadros o balão espera antes de aparecer, conforme o papel na piada.
// Na punchline, meio segundo de pausa antes da fala.
const ATRASO: Record<Papel, number> = {
  expectativa: 10,
  interrupcao: 3,
  escalada: 2,
  punchline: 15,
  narracao: 6,
};

const BORDA = 10;
const SOMBRA = 14;

// Pontas de estrela para o balão de grito.
const estrela = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  pontas: number,
  recuo: number,
  anguloPontaLonga: number,
): string => {
  const pontos: string[] = [];
  for (let i = 0; i < pontas * 2; i++) {
    const angulo = (i * Math.PI) / pontas;
    let raio = i % 2 === 0 ? 1 : recuo;
    const diferenca = Math.abs(Math.atan2(Math.sin(angulo - anguloPontaLonga), Math.cos(angulo - anguloPontaLonga)));
    if (i % 2 === 0 && diferenca < Math.PI / pontas) {
      raio = 1.32;
    }
    pontos.push(`${(cx + rx * raio * Math.cos(angulo)).toFixed(1)},${(cy + ry * raio * Math.sin(angulo)).toFixed(1)}`);
  }
  return pontos.join(" ");
};

export const Balao: React.FC<{ quadro: Quadro }> = ({ quadro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const atraso = ATRASO[quadro.papel];
  const forte = quadro.papel === "punchline" || quadro.papel === "escalada";

  const pop = spring({
    frame: frame - atraso,
    fps,
    config: forte
      ? { damping: 8, stiffness: 190, mass: 0.9 }
      : { damping: 12, stiffness: 150 },
  });

  const foraDeCena = quadro.quemFala === "fora-de-cena";
  const grito = quadro.balao.estilo === "grito";

  // Na escalada, o balão continua tremendo depois de aparecer.
  const tremor =
    quadro.papel === "escalada" ? Math.sin(frame * 1.7) * 2.2 : 0;

  const camada: React.CSSProperties = {
    position: "absolute",
    top: `${quadro.balao.topo}%`,
    left: 70,
    right: 70,
    display: "flex",
    justifyContent: "center",
    opacity: frame < atraso ? 0 : 1,
    scale: interpolate(pop, [0, 1], [0.2, 1], { output: "perceptual-scale" }),
    rotate: `${interpolate(pop, [0, 1], [grito ? 10 : -6, 0]) + tremor}deg`,
    translate:
      quadro.papel === "interrupcao"
        ? `${interpolate(frame, [atraso, atraso + 9], [700, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.6)),
          })}px 0px`
        : "0px 0px",
    transformOrigin: foraDeCena ? "85% 100%" : "45% 100%",
  };

  if (grito) {
    const largura = 940;
    const altura = 560;
    const pontosEstrela = estrela(largura / 2, altura / 2, 440, 245, 14, 0.8, Math.PI / 5);
    return (
      <div style={camada}>
        <div style={{ position: "relative", width: largura, height: altura }}>
          <svg width={largura} height={altura} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <polygon points={pontosEstrela} fill={CORES.preto} transform={`translate(${SOMBRA} ${SOMBRA})`} />
            <polygon points={pontosEstrela} fill={CORES.branco} stroke={CORES.preto} strokeWidth={BORDA} strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 170px",
              textAlign: "center",
              fontFamily: FONTE_FALA,
              fontSize: 100,
              // Espaço para os acentos das maiúsculas não encostarem na linha de cima.
              lineHeight: 1.18,
              letterSpacing: 1,
              color: CORES.preto,
            }}
          >
            {quadro.fala}
          </div>
        </div>
      </div>
    );
  }

  // A ponta aponta para a protagonista, ou para a borda direita quando quem fala está fora de cena.
  const pontaEsquerda = foraDeCena ? "74%" : "40%";
  const pontaX = foraDeCena ? 210 : 25;
  const pontaAltura = 125;

  return (
    <div style={camada}>
      <div style={{ position: "relative", maxWidth: 940 }}>
        <svg
          width={120}
          height={pontaAltura}
          style={{ position: "absolute", top: "100%", marginTop: -BORDA * 2, left: pontaEsquerda, overflow: "visible", zIndex: 0 }}
        >
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
            textAlign: "center",
            fontFamily: FONTE_FALA,
            fontSize: 92,
            // Espaço para os acentos das maiúsculas não encostarem na linha de cima.
            lineHeight: 1.22,
            letterSpacing: 1,
            color: CORES.preto,
          }}
        >
          {quadro.fala}
        </div>
        <svg
          width={120}
          height={pontaAltura}
          style={{ position: "absolute", top: "100%", marginTop: -BORDA * 2, left: pontaEsquerda, overflow: "visible", zIndex: 2 }}
        >
          <polygon
            points={`${BORDA * 1.9},0 ${116 - BORDA * 1.9},0 ${pontaX + (foraDeCena ? -BORDA * 2.2 : BORDA * 0.6)},${pontaAltura - BORDA * 2.4}`}
            fill={CORES.branco}
          />
        </svg>
      </div>
    </div>
  );
};
