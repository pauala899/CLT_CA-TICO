import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import dadosTesteCafe from "../roteiros/teste-cafe.json";
import { duracaoTotal, ReelQuadrinho } from "./ReelQuadrinho";
import type { PropsReel, Reel } from "./tipos";

const FPS = 30;
const testeCafe = dadosTesteCafe as Reel;

const calcularDuracao: CalculateMetadataFunction<PropsReel> = ({ props }) => ({
  durationInFrames: duracaoTotal(props.reel, FPS),
});

export const RemotionRoot: React.FC = () => {
  return (
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
  );
};
