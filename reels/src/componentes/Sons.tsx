import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import type { Som } from "../tipos";

// Toca as vozes e os efeitos de uma cena, cada um no seu tempo.
export const Sons: React.FC<{ sons?: Som[] }> = ({ sons }) => {
  const { fps } = useVideoConfig();
  if (!sons || sons.length === 0) return null;
  return (
    <>
      {sons.map((som, i) => (
        <Sequence key={`${som.arquivo}-${i}`} from={Math.round(som.emSeg * fps)} layout="none" name={`Som: ${som.arquivo}`}>
          <Audio src={staticFile(som.arquivo)} volume={som.volume ?? 1} />
        </Sequence>
      ))}
    </>
  );
};
