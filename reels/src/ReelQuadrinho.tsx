import React from "react";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Fechamento } from "./componentes/Fechamento";
import { Quadro } from "./componentes/Quadro";
import { Sons } from "./componentes/Sons";
import type { Entrada, PropsReel, Reel } from "./tipos";

const emQuadros = (segundos: number, fps: number) => Math.round(segundos * fps);

// Duração total: soma de todas as cenas, menos a sobreposição das transições.
export const duracaoTotal = (reel: Reel, fps: number): number => {
  let total = emQuadros(reel.fechamento.duracaoSeg, fps);
  reel.quadros.forEach((quadro, i) => {
    total += emQuadros(quadro.duracaoSeg, fps);
    if (i > 0 && quadro.entrada.tipo !== "corte") {
      total -= quadro.entrada.quadros;
    }
  });
  if (reel.fechamento.entrada.tipo !== "corte") {
    total -= reel.fechamento.entrada.quadros;
  }
  return total;
};

const transicao = (entrada: Entrada, chave: string): React.ReactElement | null => {
  const tempo = linearTiming({ durationInFrames: entrada.quadros });
  if (entrada.tipo === "deslize") {
    return <TransitionSeries.Transition key={chave} presentation={slide({ direction: "from-right" })} timing={tempo} />;
  }
  if (entrada.tipo === "fade") {
    return <TransitionSeries.Transition key={chave} presentation={fade()} timing={tempo} />;
  }
  if (entrada.tipo === "wipe") {
    return <TransitionSeries.Transition key={chave} presentation={wipe({ direction: "from-left" })} timing={tempo} />;
  }
  return null;
};

export const ReelQuadrinho: React.FC<PropsReel> = ({ reel }) => {
  const fps = 30;
  const partes: React.ReactElement[] = [];

  reel.quadros.forEach((quadro, i) => {
    if (i > 0) {
      const t = transicao(quadro.entrada, `transicao-${i}`);
      if (t) partes.push(t);
    }
    const duracao = emQuadros(quadro.duracaoSeg, fps);
    partes.push(
      <TransitionSeries.Sequence key={`quadro-${i}`} name={`Quadro ${i + 1}: ${quadro.papel}`} durationInFrames={duracao}>
        <Quadro quadro={quadro} duracao={duracao} />
        <Sons sons={quadro.sons} />
      </TransitionSeries.Sequence>,
    );
  });

  const tFechamento = transicao(reel.fechamento.entrada, "transicao-fechamento");
  if (tFechamento) partes.push(tFechamento);
  partes.push(
    <TransitionSeries.Sequence key="fechamento" name="Fechamento" durationInFrames={emQuadros(reel.fechamento.duracaoSeg, fps)}>
      <Fechamento texto={reel.fechamento.texto} />
      <Sons sons={reel.fechamento.sons} />
    </TransitionSeries.Sequence>,
  );

  return <TransitionSeries>{partes}</TransitionSeries>;
};
