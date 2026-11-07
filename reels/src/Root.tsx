import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import dadosTesteCafe from "../roteiros/teste-cafe.json";
import dadosTesteCafeIlustrado from "../roteiros/teste-cafe-ilustrado.json";
import dadosTesteSexta from "../roteiros/teste-sexta.json";
import dadosTesteSextaSom from "../roteiros/teste-sexta-som.json";
import dadosDia01Reel from "../roteiros/dia01-reel.json";
import { duracaoTotal, ReelQuadrinho } from "./ReelQuadrinho";
import { SlideCarrossel, type Slide } from "./componentes/SlideCarrossel";
import type { PropsReel, Reel } from "./tipos";

const FPS = 30;
const testeCafe = dadosTesteCafe as Reel;
// Precisa das ilustrações em public/artes/teste-cafe/, que ficam fora do GitHub.
const testeCafeIlustrado = dadosTesteCafeIlustrado as Reel;
// Precisa das ilustrações em public/artes/2026-11-05/, que ficam fora do GitHub.
const testeSexta = dadosTesteSexta as Reel;
// Precisa também das vozes em public/sons/vozes/2026-11-05/, fora do GitHub.
const testeSextaSom = dadosTesteSextaSom as Reel;
// Dia 01: reel de 13 quadros, com balões de fala, pensamento e narração. Gerado por scripts/montar-dia01.py.
const dia01Reel = (dadosDia01Reel as { reel: Reel }).reel;
const slideInicial: Slide = { tipo: "capa", imagem: "artes/2026-11-07/2026-11-07_carrossel1_q1_v4.jpg", titulo: "Tradutor de chefe" };

const calcularDuracao: CalculateMetadataFunction<PropsReel> = ({ props }) => ({
  durationInFrames: duracaoTotal(props.reel, FPS),
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelTesteCafe"
        component={ReelQuadrinho}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={duracaoTotal(testeCafe, FPS)}
        defaultProps={{ reel: testeCafe }}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="ReelTesteCafeIlustrado"
        component={ReelQuadrinho}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={duracaoTotal(testeCafeIlustrado, FPS)}
        defaultProps={{ reel: testeCafeIlustrado }}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="ReelTesteSexta"
        component={ReelQuadrinho}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={duracaoTotal(testeSexta, FPS)}
        defaultProps={{ reel: testeSexta }}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="ReelTesteSextaSom"
        component={ReelQuadrinho}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={duracaoTotal(testeSextaSom, FPS)}
        defaultProps={{ reel: testeSextaSom }}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="ReelDia01"
        component={ReelQuadrinho}
        width={1080}
        height={1920}
        fps={FPS}
        durationInFrames={duracaoTotal(dia01Reel, FPS)}
        defaultProps={{ reel: dia01Reel }}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="SlideCarrossel"
        component={SlideCarrossel}
        width={1080}
        height={1350}
        fps={FPS}
        durationInFrames={1}
        defaultProps={{ slide: slideInicial }}
      />
    </>
  );
};
