import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import dadosTesteCafe from "../roteiros/teste-cafe.json";
import dadosTesteCafeIlustrado from "../roteiros/teste-cafe-ilustrado.json";
import { duracaoTotal, ReelQuadrinho } from "./ReelQuadrinho";
import type { PropsReel, Reel } from "./tipos";

const FPS = 30;
const testeCafe = dadosTesteCafe as Reel;
// Precisa das ilustrações em public/artes/teste-cafe/, que ficam fora do GitHub.
const testeCafeIlustrado = dadosTesteCafeIlustrado as Reel;

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
    </>
  );
};
