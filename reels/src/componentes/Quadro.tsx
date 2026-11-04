import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CORES, FONTE_MARCA, reticula } from "../marca";
import type { Papel, Quadro as TipoQuadro } from "../tipos";
import { Balao } from "./Balao";
import { PersonagemProvisoria } from "./PersonagemProvisoria";

const FUNDO: Record<Papel, string> = {
  expectativa: CORES.amarelo,
  interrupcao: CORES.amarelo,
  escalada: CORES.magenta,
  punchline: CORES.amarelo,
};

const limitar = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Linhas de foco de quadrinho, girando devagar, para a escalada do caos.
const LinhasDeFoco: React.FC<{ frame: number }> = ({ frame }) => {
  const total = 40;
  const linhas = Array.from({ length: total }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 1080 1920"
      width={1080}
      height={1920}
      style={{ position: "absolute", inset: 0, rotate: `${frame * 0.45}deg` }}
    >
      {linhas.map((i) => {
        const angulo = (i / total) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={540 + Math.cos(angulo) * 430}
            y1={1080 + Math.sin(angulo) * 430}
            x2={540 + Math.cos(angulo) * 1700}
            y2={1080 + Math.sin(angulo) * 1700}
            stroke={CORES.preto}
            strokeWidth={i % 2 === 0 ? 20 : 8}
            opacity={0.22}
          />
        );
      })}
    </svg>
  );
};

// Movimento de câmera de cada quadro, conforme o papel na piada.
const camera = (papel: Papel, frame: number, duracao: number, ilustrado: boolean): React.CSSProperties => {
  if (papel === "expectativa") {
    return {
      scale: interpolate(frame, [0, duracao], [1, 1.07], { ...limitar, easing: Easing.inOut(Easing.quad) }),
    };
  }
  if (papel === "interrupcao") {
    return {
      scale: interpolate(frame, [0, 10], [1.14, 1.02], { ...limitar, easing: Easing.out(Easing.cubic) }),
      rotate: `${interpolate(frame, [0, 10], [-3, 0], limitar)}deg`,
    };
  }
  if (papel === "escalada") {
    // A ilustração real já vem em close, então o zoom é mais leve que na provisória.
    const forca = interpolate(frame, [0, duracao], ilustrado ? [10, 6] : [16, 9], limitar);
    return {
      scale: interpolate(frame, [0, duracao], ilustrado ? [1.04, 1.12] : [1.22, 1.34], limitar),
      translate: `${Math.sin(frame * 2.1) * forca}px ${Math.cos(frame * 2.7) * forca}px`,
    };
  }
  // Punchline: segura parada durante a pausa e só então dá um leve empurrão.
  return {
    scale: interpolate(frame, [15, 27], [1, 1.05], { ...limitar, easing: Easing.out(Easing.back(2)) }),
  };
};

export const Quadro: React.FC<{ quadro: TipoQuadro; duracao: number }> = ({ quadro, duracao }) => {
  const frame = useCurrentFrame();
  const provisorio = !quadro.imagem;

  const clarao =
    quadro.papel === "escalada"
      ? interpolate(frame, [0, 2, 7], [0.85, 0.5, 0], limitar)
      : quadro.papel === "interrupcao"
        ? interpolate(frame, [0, 5], [0.45, 0], limitar)
        : 0;

  return (
    <AbsoluteFill style={{ ...reticula(FUNDO[quadro.papel]), overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          ...camera(quadro.papel, frame, duracao, !provisorio),
          transformOrigin: provisorio ? "50% 58%" : "50% 70%",
        }}
      >
        {provisorio && quadro.papel === "escalada" ? <LinhasDeFoco frame={frame} /> : null}
        {provisorio ? (
          <PersonagemProvisoria expressao={quadro.expressao} frame={frame} />
        ) : (
          <>
            {/* O topo é preenchido com a cor de fundo da própria imagem, e a ilustração desce
                para o balão ficar acima da cabeça, sem cobrir o rosto. */}
            <AbsoluteFill style={{ backgroundColor: quadro.imagemFundo ?? FUNDO[quadro.papel] }} />
            <Img
              src={staticFile(quadro.imagem as string)}
              style={{ position: "absolute", left: 0, top: quadro.imagemDesce ?? 0, width: "100%", height: "auto" }}
            />
          </>
        )}
      </AbsoluteFill>

      {provisorio ? (
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 120,
            backgroundColor: CORES.branco,
            color: CORES.preto,
            fontFamily: FONTE_MARCA,
            fontSize: 30,
            letterSpacing: 2,
            padding: "8px 18px",
          }}
        >
          IMAGEM PROVISÓRIA
        </div>
      ) : null}

      <Balao quadro={quadro} />

      {clarao > 0 ? <AbsoluteFill style={{ backgroundColor: CORES.branco, opacity: clarao }} /> : null}
    </AbsoluteFill>
  );
};
