import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CORES, FONTE_FALA, FONTE_MARCA, reticula } from "../marca";

export type Slide = {
  tipo: "capa" | "traducao" | "fechamento";
  // Caminho da imagem dentro de public/.
  imagem: string;
  titulo?: string;
  frase?: string;
  traducao?: string;
  pergunta?: string;
};

const Rodape: React.FC = () => (
  <div style={{ position: "absolute", left: 60, bottom: 40, fontFamily: FONTE_MARCA, fontSize: 40, color: CORES.preto, letterSpacing: 2 }}>
    CLT CAÓTICA
  </div>
);

// Slide de carrossel 4:5 (1080x1350). Imagem sem texto, e o texto é aplicado aqui.
export const SlideCarrossel: React.FC<{ slide: Slide }> = ({ slide }) => (
  <AbsoluteFill style={{ ...reticula(CORES.amarelo), overflow: "hidden" }}>
    <Img
      src={staticFile(slide.imagem)}
      style={{ position: "absolute", inset: 0, width: 1080, height: 1350, objectFit: "cover", objectPosition: "50% 30%" }}
    />

    {slide.tipo === "capa" ? (
      <div style={{ position: "absolute", top: 70, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: CORES.preto,
            color: CORES.amarelo,
            fontFamily: FONTE_MARCA,
            fontSize: 132,
            lineHeight: 1.05,
            textTransform: "uppercase",
            textAlign: "center",
            padding: "30px 46px 34px",
            rotate: "-3deg",
            boxShadow: `14px 14px 0 ${CORES.magenta}`,
          }}
        >
          {slide.titulo}
        </div>
      </div>
    ) : null}

    {slide.tipo === "traducao" ? (
      <>
        <div style={{ position: "absolute", top: 60, left: 60, right: 60, backgroundColor: CORES.preto, padding: "26px 40px 30px", textAlign: "center" }}>
          <div style={{ fontFamily: FONTE_FALA, fontSize: 56, color: CORES.branco, letterSpacing: 2 }}>O CHEFE DISSE:</div>
          <div style={{ fontFamily: FONTE_FALA, fontSize: 96, lineHeight: 1.15, color: CORES.amarelo }}>&ldquo;{slide.frase}&rdquo;</div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 110,
            backgroundColor: CORES.branco,
            border: `10px solid ${CORES.preto}`,
            boxShadow: `14px 14px 0 ${CORES.preto}`,
            padding: "24px 40px 30px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: FONTE_FALA, fontSize: 56, color: CORES.magenta, letterSpacing: 2 }}>TRADUÇÃO:</div>
          <div style={{ fontFamily: FONTE_MARCA, fontSize: 104, lineHeight: 1.05, color: CORES.preto, textTransform: "uppercase" }}>
            {slide.traducao}
          </div>
        </div>
      </>
    ) : null}

    {slide.tipo === "fechamento" ? (
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 110,
          backgroundColor: CORES.magenta,
          border: `10px solid ${CORES.preto}`,
          boxShadow: `14px 14px 0 ${CORES.preto}`,
          padding: "28px 40px 34px",
          textAlign: "center",
          fontFamily: FONTE_FALA,
          fontSize: 84,
          lineHeight: 1.18,
          color: CORES.branco,
        }}
      >
        {slide.pergunta}
      </div>
    ) : null}

    <Rodape />
  </AbsoluteFill>
);
