export const FPS = 30;

// duração (s) de cada fala, já processada. Vem de durations.json (gerado por mesclar_duracoes.py quando as vozes ficam prontas)
import durations from "./durations.json";
export const D = durations as Record<string, number>;
export type VoiceId = string;

export type BalloonItem = {k: "balloon"; who: "ela" | "chefe" | "think"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; tail: "bl" | "br"; size?: number; emph?: string[]};
export type SfxItem = {k: "sfx"; text: string; t: number; x: number; y: number; color: string; star?: string; size: number; rot: number; dur?: number};
export type FlashItem = {k: "flash"; t: number; color: string; dur?: number; a?: number};
export type BurstItem = {k: "burst"; t: number; x: number; y: number; color?: string};
export type NarrItem = {k: "narr"; text: string; voice: VoiceId; t: number; x: number; y: number; w: number; size: number};
export type BigItem = {k: "big"; text: string; t: number; until?: number; y: number; bg: string; color: string; size: number};
export type CtaItem = {k: "cta"; t: number; y?: number};
export type LabelItem = {k: "label"; text: string; t: number; x: number; y: number; w: number; size: number; bg: string; color: string; rot: number};
export type ArrowItem = {k: "arrow"; t: number; x: number; y: number; dir: "down" | "up"};
export type Item = BalloonItem | SfxItem | FlashItem | BurstItem | NarrItem | BigItem | CtaItem | LabelItem | ArrowItem;
export type Shake = {t: number; dur: number; amp: number};
export type Snd = {src: string; t: number; vol: number};
export type Scene = {
  id: string;
  images: {src: string; from: number}[];
  dur: number;
  z0: number; z1: number; origin: string;
  items: Item[];
  shakes: Shake[];
  sounds: Snd[];
};

const INK = "#111111", YEL = "#FFE600", MAG = "#FF2D95", CYAN = "#00E5FF", NIGHT = "#1B1464";

// Dia 3: "A novela do crush" (academia). Cada cena tem uma fala (balão branco) e um pensamento (balão tracejado),
// com corte para um segundo enquadramento (close) quando o pensamento começa.
// Regra do usuário: o rosto da ELA nunca é coberto. Balões e frases ficam no topo (cabelo); efeitos no corpo, ombros e fundo.
// Desenho em 1080x1920; Root.tsx reduz a saída para 720x1280.

// Ids de falas que podem ser cortadas se o reel passar de 60 s com as vozes reais (hoje nenhuma é cortada).
// Candidatos: "L01" (pensamento da cena 1) e "L11" (fala da cena 6).
const SKIP = new Set<string>([]);
const has = (id: string) => !SKIP.has(id);
const PRE = 0.3, GAP = 0.2, POST = 0.4;

// ---------------------------------------------------------------- Cena 1: a promessa (r1 -> r9)
const a1 = PRE, b1 = a1 + D.L00 + GAP;
const c1 = has("L01") ? b1 : a1 + 0.55 * D.L00; // momento do corte para o close
const S1: Scene = {
  id: "01-promessa", images: [{src: "frames/r1.jpg", from: 0}, {src: "frames/r9.jpg", from: c1 - 0.25}],
  dur: (has("L01") ? b1 + D.L01 : a1 + D.L00) + POST, z0: 1.0, z1: 1.09, origin: "50% 45%",
  items: [
    {k: "balloon", who: "ela", text: "Hoje eu treino pesado.", voice: "L00", t: a1, x: 130, y: 215, w: 830, tail: "bl", size: 60, emph: ["pesado"]},
    {k: "flash", t: c1 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    ...(has("L01") ? [{k: "balloon", who: "think", text: "Hoje eu treino pesado para não passar vergonha.", voice: "L01", t: b1, x: 130, y: 215, w: 830, tail: "bl", size: 52, emph: ["vergonha"]} as Item] : []),
    {k: "sfx", text: "BORA!", t: c1 + 0.2, x: 840, y: 1560, color: YEL, star: MAG, size: 130, rot: 7, dur: 1.0},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: c1 - 0.3, vol: 0.4}, {src: "sfx_tick", t: c1 + 0.2, vol: 0.6}],
};

// ---------------------------------------------------------------- Cena 2: ele existe (r2 -> r10)
const a2 = PRE, b2 = a2 + D.L02 + GAP;
const S2: Scene = {
  id: "02-ele-existe", images: [{src: "frames/r2.jpg", from: 0}, {src: "frames/r10.jpg", from: b2 - 0.25}],
  dur: b2 + D.L03 + POST, z0: 1.0, z1: 1.1, origin: "50% 42%",
  items: [
    {k: "balloon", who: "ela", text: "Ai, meu Deus.", voice: "L02", t: a2, x: 240, y: 215, w: 600, tail: "bl", size: 64, emph: ["Deus"]},
    {k: "flash", t: b2 - 0.25, color: "#ffffff", dur: 0.2, a: 0.6},
    {k: "balloon", who: "think", text: "Ele existe. Ele respira. Ele levanta halter como se fosse poesia.", voice: "L03", t: b2, x: 120, y: 215, w: 840, tail: "bl", size: 52, emph: ["existe", "poesia"]},
    {k: "sfx", text: "PLIM!", t: b2 + 0.7, x: 840, y: 1560, color: "#ffffff", star: NIGHT, size: 130, rot: -8, dur: 1.4},
  ],
  shakes: [],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_whoosh", t: b2 - 0.3, vol: 0.4}, {src: "sfx_pop", t: b2 + 0.7, vol: 0.5}],
};

// ---------------------------------------------------------------- Cena 3: a novela começa (r3 -> r11)
const a3 = 0.25, b3 = a3 + D.L04 + GAP;
const S3: Scene = {
  id: "03-novela", images: [{src: "frames/r3.jpg", from: 0}, {src: "frames/r11.jpg", from: b3 - 0.25}],
  dur: b3 + D.L05 + POST, z0: 1.08, z1: 1.0, origin: "40% 40%",
  items: [
    {k: "balloon", who: "think", text: "Casamos na praia. Dois filhos. Um cachorro chamado Haltere.", voice: "L04", t: a3, x: 110, y: 215, w: 860, tail: "bl", size: 52, emph: ["praia", "Haltere"]},
    {k: "burst", t: b3 + 0.05, x: 850, y: 1700, color: YEL},
    {k: "sfx", text: "!!!", t: b3 + 0.05, x: 850, y: 1700, color: MAG, star: YEL, size: 165, rot: 6, dur: 1.4},
    {k: "flash", t: b3 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "ela", text: "Respira. Respira.", voice: "L05", t: b3, x: 190, y: 215, w: 560, tail: "bl", size: 62, emph: ["Respira"]},
  ],
  shakes: [{t: b3 + 0.05, dur: 0.7, amp: 16}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: b3 + 0.05, vol: 0.7}, {src: "sfx_whoosh", t: b3 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 4: a sogra e as temporadas (r4 -> r12)
const a4 = PRE, b4 = a4 + D.L06 + GAP;
const S4: Scene = {
  id: "04-temporadas", images: [{src: "frames/r4.jpg", from: 0}, {src: "frames/r12.jpg", from: b4 - 0.25}],
  dur: b4 + D.L07 + POST, z0: 1.0, z1: 1.1, origin: "42% 40%",
  items: [
    {k: "balloon", who: "think", text: "Já briguei com a sogra, já perdoei e já estou na terceira temporada.", voice: "L06", t: a4, x: 110, y: 215, w: 860, tail: "bl", size: 50, emph: ["sogra", "terceira", "temporada"]},
    {k: "sfx", text: "GULP!", t: a4 + 1.0, x: 850, y: 1580, color: "#ffffff", star: MAG, size: 140, rot: -7, dur: 1.2},
    {k: "flash", t: b4 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "ela", text: "Tchau!", voice: "L07", t: b4, x: 330, y: 215, w: 520, tail: "bl", size: 70, emph: ["Tchau"]},
    {k: "sfx", text: "ACENO!", t: b4 + 0.9, x: 830, y: 1660, color: CYAN, star: NIGHT, size: 130, rot: 6, dur: 1.4},
  ],
  shakes: [{t: a4 + 1.0, dur: 0.5, amp: 12}, {t: b4 + 0.9, dur: 0.6, amp: 14}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a4 + 1.0, vol: 0.6}, {src: "sfx_whoosh", t: b4 - 0.3, vol: 0.4}, {src: "sfx_buzz", t: b4 + 0.9, vol: 0.35}],
};

// ---------------------------------------------------------------- Cena 5: ele nem sabe (r5 -> r13)
const a5 = PRE, b5 = a5 + D.L08 + GAP;
const S5: Scene = {
  id: "05-nem-sabe", images: [{src: "frames/r5.jpg", from: 0}, {src: "frames/r13.jpg", from: b5 - 0.25}],
  dur: b5 + D.L09 + POST, z0: 1.0, z1: 1.12, origin: "50% 55%",
  items: [
    {k: "balloon", who: "think", text: "Ele nem sabe que eu existo.", voice: "L08", t: a5, x: 150, y: 215, w: 780, tail: "bl", size: 54, emph: ["existo"]},
    {k: "sfx", text: "SNIF...", t: a5 + 0.9, x: 840, y: 1450, color: YEL, star: MAG, size: 120, rot: -6, dur: 1.2},
    {k: "flash", t: b5 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "balloon", who: "ela", text: "Foi só um treino.", voice: "L09", t: b5, x: 220, y: 215, w: 640, tail: "bl", size: 60, emph: ["treino"]},
  ],
  shakes: [{t: b5 + 0.2, dur: 0.6, amp: 6}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_tick", t: a5 + 0.9, vol: 0.6}, {src: "sfx_tock", t: a5 + 1.25, vol: 0.5}, {src: "sfx_whoosh", t: b5 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 6: a série (r6 -> r14)
const a6 = PRE, b6 = a6 + D.L10 + GAP;
const c6 = has("L11") ? b6 : a6 + 0.55 * D.L10;
const S6: Scene = {
  id: "06-serie", images: [{src: "frames/r6.jpg", from: 0}, {src: "frames/r14.jpg", from: c6 - 0.25}],
  dur: (has("L11") ? b6 + D.L11 : a6 + D.L10) + POST, z0: 1.0, z1: 1.1, origin: "50% 40%",
  items: [
    {k: "balloon", who: "think", text: "Mas o cachorro já tem nome, e o casamento já tem lista de convidados.", voice: "L10", t: a6, x: 110, y: 215, w: 860, tail: "bl", size: 52, emph: ["nome", "convidados"]},
    {k: "sfx", text: "PLAY!", t: a6 + 0.5, x: 860, y: 1180, color: CYAN, star: NIGHT, size: 130, rot: 7, dur: 1.0},
    {k: "flash", t: c6 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    ...(has("L11") ? [{k: "balloon", who: "ela", text: "Mais uma série.", voice: "L11", t: b6, x: 170, y: 215, w: 740, tail: "bl", size: 58, emph: ["série"]} as Item] : []),
    {k: "sfx", text: "ZZZ...", t: c6 + 0.25, x: 800, y: 1660, color: "#ffffff", star: MAG, size: 130, rot: -6, dur: 1.2},
  ],
  shakes: [{t: a6 + 0.5, dur: 0.4, amp: 8}],
  sounds: [{src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a6 + 0.5, vol: 0.6}, {src: "sfx_whoosh", t: c6 - 0.3, vol: 0.4}],
};

// ---------------------------------------------------------------- Cena 7: o treino de hoje (r7 -> r15)
const a7 = PRE, b7 = a7 + D.L12 + GAP;
const S7: Scene = {
  id: "07-treino", images: [{src: "frames/r7.jpg", from: 0}, {src: "frames/r15.jpg", from: b7 - 0.25}],
  dur: b7 + D.L13 + POST, z0: 1.08, z1: 1.0, origin: "40% 45%",
  items: [
    {k: "balloon", who: "think", text: "Eu treino para me distrair do que eu sinto.", voice: "L12", t: a7, x: 130, y: 215, w: 820, tail: "bl", size: 54, emph: ["distrair", "sinto"]},
    {k: "sfx", text: "SUOR!", t: a7 + 0.4, x: 900, y: 560, color: "#ffffff", size: 120, rot: -6, dur: 0.9},
    {k: "sfx", text: "PUF!", t: a7 + 1.1, x: 900, y: 1190, color: "#ffffff", size: 120, rot: 6, dur: 0.9},
    {k: "flash", t: b7 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "narr", text: "Treino de hoje: coração, braço e trinta minutos de expectativa.", voice: "L13", t: b7, x: 90, y: 215, w: 900, size: 56},
  ],
  shakes: [],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_tick", t: a7 + 0.4, vol: 0.6}, {src: "sfx_tock", t: a7 + 1.1, vol: 0.6},
    {src: "sfx_whoosh", t: b7 - 0.3, vol: 0.4}, {src: "sfx_trombone", t: b7 + D.L13 - 0.6, vol: 0.4},
  ],
};

// ---------------------------------------------------------------- Cena 8: punchline (r8 -> r16)
const a8 = PRE;
const L14 = "Resultado: o único músculo que cresceu foi a ilusão.";
const p1 = "Resultado: o único músculo".length / L14.length; // parte da fala L14 antes da pausa dramática (por número de letras)
const e1 = a8 + p1 * D.L14, e2 = a8 + D.L14;
const b8 = e2 + 0.45; // corte para r16 + chamada final
const ctaT = b8 + 0.1;
const S8: Scene = {
  id: "08-punchline", images: [{src: "frames/r8.jpg", from: 0}, {src: "frames/r16.jpg", from: b8 - 0.25}],
  dur: ctaT + 2.7, z0: 1.0, z1: 1.07, origin: "50% 55%",
  items: [
    {k: "narr", text: "", voice: "L14", t: a8, x: 0, y: 0, w: 0, size: 0},
    {k: "big", text: "RESULTADO: O ÚNICO MÚSCULO", t: a8, until: e1 - 0.05, y: 250, bg: "#ffffff", color: INK, size: 84},
    {k: "big", text: "QUE CRESCEU FOI A ILUSÃO.", t: e1, until: e2 + 0.1, y: 250, bg: MAG, color: "#ffffff", size: 84},
    {k: "flash", t: b8 - 0.25, color: "#ffffff", dur: 0.2, a: 0.7},
    {k: "cta", t: ctaT, y: 1340},
  ],
  shakes: [{t: e1, dur: 0.5, amp: 10}],
  sounds: [
    {src: "sfx_whoosh", t: 0, vol: 0.5}, {src: "sfx_pop", t: a8, vol: 0.7}, {src: "sfx_pop", t: e1, vol: 0.7},
    {src: "sfx_whoosh", t: b8 - 0.3, vol: 0.4}, {src: "sfx_trombone", t: b8 - 0.1, vol: 0.5}, {src: "sfx_ding", t: ctaT, vol: 0.55},
  ],
};

export const SCENES: Scene[] = [S1, S2, S3, S4, S5, S6, S7, S8];
export const sec = (t: number) => Math.round(t * FPS);
export const sceneDurFrames = SCENES.map((s) => sec(s.dur));
export const sceneStarts = sceneDurFrames.reduce<number[]>((acc, d, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + sceneDurFrames[i - 1]); return acc; }, []);
export const TOTAL_FRAMES = sceneDurFrames.reduce((a, b) => a + b, 0);

export const layout = (scenes: Scene[]) => {
  const durs = scenes.map((s) => sec(s.dur));
  const starts = durs.reduce<number[]>((acc, d, i) => { acc.push(i === 0 ? 0 : acc[i - 1] + durs[i - 1]); return acc; }, []);
  return {durs, starts, total: durs.reduce((a, b) => a + b, 0)};
};
