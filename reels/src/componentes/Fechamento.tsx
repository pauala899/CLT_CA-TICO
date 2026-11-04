import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CORES, FONTE_MARCA, reticula } from "../marca";

// Cartão final com o nome da marca. A chamada para ação ainda não foi definida no briefing.
export const Fechamento: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 9, stiffness: 160 } });

  return (
    <AbsoluteFill style={{ ...reticula(CORES.amarelo), justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: -120,
          right: -120,
          top: "44%",
          height: 260,
          backgroundColor: CORES.magenta,
          borderTop: `14px solid ${CORES.preto}`,
          borderBottom: `14px solid ${CORES.preto}`,
          rotate: "-6deg",
          translate: `${interpolate(frame, [0, 10], [-1400, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          })}px 0px`,
        }}
      />
      <div
        style={{
          fontFamily: FONTE_MARCA,
          fontSize: 230,
          // Espaço para o acento de "CAÓTICA" não encostar em "CLT".
          lineHeight: 1.18,
          textAlign: "center",
          textTransform: "uppercase",
          color: CORES.preto,
          textShadow: `12px 12px 0 ${CORES.branco}`,
          maxWidth: 920,
          opacity: frame < 4 ? 0 : 1,
          scale: interpolate(pop, [0, 1], [0.3, 1], { output: "perceptual-scale" }),
          rotate: `${interpolate(pop, [0, 1], [-14, -4])}deg`,
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};
