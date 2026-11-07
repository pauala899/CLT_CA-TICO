import React from "react";
import {Composition} from "remotion";
import {Dia3, Montage} from "./Composition";
import {MemePost} from "./Meme";
import {FPS, SCENES, layout} from "./timeline";
import {STORY1, STORY2, STORY3, STORY4, STORY5, STORY6} from "./stories";
import type {Scene} from "./timeline";

// Desenho em 1080x1920; a saída de reel e stories é 720x1280 (720p, regra do projeto).
const CANVAS_W = 1080, CANVAS_H = 1920, OUT_W = 720, OUT_H = 1280;
const Scaled: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: "relative", width: OUT_W, height: OUT_H, overflow: "hidden"}}>
    <div style={{position: "absolute", left: 0, top: 0, width: CANVAS_W, height: CANVAS_H, transform: `scale(${OUT_W / CANVAS_W})`, transformOrigin: "0 0"}}>
      {children}
    </div>
  </div>
);

const story = (id: string, scenes: Scene[], brand: boolean) => {
  const total = layout(scenes).total;
  const C: React.FC = () => <Scaled><Montage scenes={scenes} brand={brand} progress={false} /></Scaled>;
  return <Composition key={id} id={id} component={C} durationInFrames={total} fps={FPS} width={OUT_W} height={OUT_H} />;
};

const Reel: React.FC = () => <Scaled><Dia3 /></Scaled>;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="CLT-Dia3" component={Reel} durationInFrames={layout(SCENES).total} fps={FPS} width={OUT_W} height={OUT_H} />
      {story("Story1", STORY1, false)}
      {story("Story2", STORY2, false)}
      {story("Story3", STORY3, false)}
      {story("Story4", STORY4, false)}
      {story("Story5", STORY5, false)}
      {story("Story6", STORY6, false)}
      <Composition id="Meme" component={MemePost} durationInFrames={1} fps={FPS} width={1080} height={1350} defaultProps={{n: 1}} />
    </>
  );
};
