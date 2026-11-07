import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";

const INK = "#111111", YEL = "#FFE600";
const FX = '"Bangers", "DejaVu Sans", sans-serif';

type Variant = {img: string; l1: string; l2: string; l1y: number; l2y?: number; size1?: number; size2?: number};

// Memes de vitrine do Dia 3 (faixa amarela no topo e piada em duas linhas, sobre o fundo ou a roupa).
// meme_q1 é o texto do FILA.md: "Ele nem sabe que eu existo. Mas o cachorro já tem nome."
// meme_q2 e meme_q3 são RASCUNHOS de texto: confirmar com o usuário antes de renderizar.
// O rosto da ELA fica livre (texto só no topo e no rodapé).
const VARIANTS: Record<number, Variant> = {
  1: {img: "frames/m1.jpg", l1: "ELE NEM SABE QUE EU EXISTO.", l2: "MAS O CACHORRO JÁ TEM NOME.", l1y: 150, size1: 82, size2: 70},
  2: {img: "frames/m2.jpg", l1: "RASCUNHO: ELE LEVANTOU O HALTERE.", l2: "EU JÁ PLANEJEI O CASAMENTO.", l1y: 150, size1: 78, size2: 70},
  3: {img: "frames/m3.jpg", l1: "RASCUNHO: EU SÓ QUERIA ALONGAR.", l2: "E LÁ FOI MAIS UMA TEMPORADA.", l1y: 150, size1: 78, size2: 70},
};

const Stroke: React.FC<{size: number; color?: string; children: React.ReactNode; rot?: number}> = ({size, color = "#FFFFFF", children, rot = 0}) => (
  <div style={{fontFamily: FX, fontSize: size, lineHeight: 1.0, letterSpacing: 2, color, textAlign: "center", WebkitTextStroke: `10px ${INK}`, paintOrder: "stroke fill", textShadow: `6px 6px 0 ${INK}`, rotate: `${rot}deg`}}>{children}</div>
);

export const MemePost: React.FC<{n: number}> = ({n}) => {
  const v = VARIANTS[n] ?? VARIANTS[1];
  return (
    <AbsoluteFill style={{background: "#0b1040", overflow: "hidden"}}>
      <Img src={staticFile(v.img)} style={{position: "absolute", left: 0, top: 0, width: 1080, height: 1350, objectFit: "cover"}} />
      <div style={{position: "absolute", left: 56, top: 46, background: INK, color: YEL, fontFamily: FX, fontSize: 36, letterSpacing: 3, padding: "4px 18px 2px", border: `5px solid ${YEL}`, borderRadius: 10, rotate: "-2deg"}}>CLT CAÓTICA</div>
      <div style={{position: "absolute", left: 40, right: 40, top: v.l1y - 40, background: YEL, border: `8px solid ${INK}`, padding: "12px 20px 6px", textAlign: "center", boxShadow: `10px 10px 0 ${INK}`, rotate: "-1.2deg"}}>
        <div style={{fontFamily: FX, fontSize: 60, letterSpacing: 2, color: INK, lineHeight: 1.0}}>MEU CRUSH, VERSÃO REAL:</div>
      </div>
      <div style={{position: "absolute", left: 40, right: 40, bottom: 46}}>
        <Stroke size={v.size1 ?? 80} color="#FFFFFF" rot={-1.5}>{v.l1}</Stroke>
        <div style={{height: 10}} />
        <Stroke size={v.size2 ?? 70} color={YEL} rot={1}>{v.l2}</Stroke>
      </div>
      <AbsoluteFill style={{pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "radial-gradient(rgba(0,0,0,0.9) 1.4px, transparent 1.8px)", backgroundSize: "11px 11px"}} />
    </AbsoluteFill>
  );
};
