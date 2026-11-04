import React from "react";
import { CORES } from "../marca";
import type { Expressao } from "../tipos";

// Ilustração PROVISÓRIA, desenhada em código só para testar a montagem.
// Segue os traços fixos da ficha (base/ficha-personagem.md), mas não substitui a arte final.

const PELE = "#F4C7A1";
const PELE_SOMBRA = "#DFA27A";
const CABELO = "#6B3E26";
const SOBRANCELHA = "#3B2215";
const IRIS = "#5A3A22";
const SARDA = "#C98B63";
const BOCA = "#5A1E1E";
const CAFE = "#5B3A1E";

const OLHO_E = 460;
const OLHO_D = 620;
const OLHO_Y = 1090;

const Caneca: React.FC<{
  x: number;
  y: number;
  giro: number;
  vapor: boolean;
  frame: number;
}> = ({ x, y, giro, vapor, frame }) => (
  <g transform={`translate(${x} ${y}) rotate(${giro})`}>
    {vapor
      ? [-34, 0, 34].map((dx, i) => {
          const subida = (frame * 1.4 + i * 14) % 42;
          return (
            <path
              key={dx}
              d={`M ${dx} -100 q -16 -26 0 -52 q 16 -26 0 -52`}
              fill="none"
              stroke={CORES.preto}
              strokeWidth={7}
              strokeLinecap="round"
              opacity={0.55 - subida / 100}
              transform={`translate(0 ${-subida})`}
            />
          );
        })
      : null}
    <path
      d="M 70 -45 Q 128 -42 122 4 Q 116 46 70 42"
      fill="none"
      stroke={CORES.preto}
      strokeWidth={13}
      strokeLinecap="round"
    />
    <rect x={-70} y={-80} width={140} height={165} rx={20} fill={CORES.branco} stroke={CORES.preto} strokeWidth={10} />
    <rect x={-65} y={-28} width={130} height={34} fill={CORES.magenta} />
    <ellipse cx={0} cy={-80} rx={70} ry={16} fill={CAFE} stroke={CORES.preto} strokeWidth={8} />
  </g>
);

const Mao: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <circle cx={x} cy={y} r={38} fill={PELE} stroke={CORES.preto} strokeWidth={9} />
);

const Olhos: React.FC<{ expressao: Expressao }> = ({ expressao }) => {
  if (expressao === "calma") {
    return (
      <g fill="none" stroke={CORES.preto} strokeWidth={9} strokeLinecap="round">
        <path d={`M ${OLHO_E - 35} ${OLHO_Y + 8} Q ${OLHO_E} ${OLHO_Y - 18} ${OLHO_E + 35} ${OLHO_Y + 8}`} />
        <path d={`M ${OLHO_D - 35} ${OLHO_Y + 8} Q ${OLHO_D} ${OLHO_Y - 18} ${OLHO_D + 35} ${OLHO_Y + 8}`} />
      </g>
    );
  }
  const branco = expressao === "panico" ? 46 : expressao === "surpresa" ? 37 : 32;
  const iris = expressao === "panico" ? 11 : expressao === "surpresa" ? 19 : 17;
  const desvio = expressao === "surpresa" ? 15 : 0;
  return (
    <g>
      {[OLHO_E, OLHO_D].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={OLHO_Y} r={branco} fill={CORES.branco} stroke={CORES.preto} strokeWidth={6} />
          <circle cx={cx + desvio} cy={OLHO_Y} r={iris} fill={IRIS} />
          <circle cx={cx + desvio} cy={OLHO_Y} r={iris / 2} fill={CORES.preto} />
          <circle cx={cx + desvio + iris / 3} cy={OLHO_Y - iris / 3} r={4} fill={CORES.branco} />
          {expressao === "exausta" ? (
            <>
              <path d={`M ${cx - 36} ${OLHO_Y + 2} A 36 36 0 0 1 ${cx + 36} ${OLHO_Y + 2} Z`} fill={PELE} stroke={CORES.preto} strokeWidth={8} />
              <path d={`M ${cx - 30} ${OLHO_Y + 46} Q ${cx} ${OLHO_Y + 60} ${cx + 30} ${OLHO_Y + 46}`} fill="none" stroke={PELE_SOMBRA} strokeWidth={7} strokeLinecap="round" />
            </>
          ) : null}
        </g>
      ))}
    </g>
  );
};

const Sobrancelhas: React.FC<{ expressao: Expressao }> = ({ expressao }) => {
  const caminhos: Record<Expressao, [string, string]> = {
    calma: ["M 410 1010 Q 460 990 505 1008", "M 575 1008 Q 620 990 670 1010"],
    surpresa: ["M 410 982 Q 460 950 505 976", "M 575 976 Q 620 950 670 982"],
    panico: ["M 405 988 Q 455 970 505 950", "M 575 950 Q 625 970 675 988"],
    exausta: ["M 410 1016 L 505 1024", "M 575 1024 L 670 1016"],
  };
  const [esquerda, direita] = caminhos[expressao];
  return (
    <g fill="none" stroke={SOBRANCELHA} strokeWidth={15} strokeLinecap="round">
      <path d={esquerda} />
      <path d={direita} />
    </g>
  );
};

const Boca: React.FC<{ expressao: Expressao }> = ({ expressao }) => {
  if (expressao === "calma") {
    return <path d="M 490 1235 Q 540 1282 590 1235" fill="none" stroke={CORES.preto} strokeWidth={9} strokeLinecap="round" />;
  }
  if (expressao === "surpresa") {
    return <ellipse cx={540} cy={1250} rx={22} ry={28} fill={BOCA} stroke={CORES.preto} strokeWidth={8} />;
  }
  if (expressao === "panico") {
    return (
      <g>
        <ellipse cx={540} cy={1255} rx={56} ry={50} fill={BOCA} stroke={CORES.preto} strokeWidth={9} />
        <ellipse cx={540} cy={1282} rx={30} ry={13} fill="#E0607E" />
      </g>
    );
  }
  return <path d="M 495 1252 Q 540 1242 585 1254" fill="none" stroke={CORES.preto} strokeWidth={9} strokeLinecap="round" />;
};

export const PersonagemProvisoria: React.FC<{
  expressao: Expressao;
  frame: number;
}> = ({ expressao, frame }) => {
  const sardas: [number, number][] = [
    [450, 1185], [472, 1198], [437, 1201],
    [630, 1185], [608, 1198], [643, 1201],
    [525, 1150], [556, 1152],
  ];
  return (
    <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      {/* corpo e pescoço */}
      <path
        d="M 480 1350 L 290 1430 Q 238 1462 230 1560 L 210 1950 L 870 1950 L 850 1560 Q 842 1462 790 1430 L 600 1350 Z"
        fill={CORES.magenta}
        stroke={CORES.preto}
        strokeWidth={10}
        strokeLinejoin="round"
      />
      <rect x={492} y={1280} width={96} height={90} fill={PELE} stroke={CORES.preto} strokeWidth={8} />

      {/* coque alto, mechas soltas e cabelo de trás */}
      <circle cx={540} cy={770} r={135} fill={CABELO} stroke={CORES.preto} strokeWidth={10} />
      <path d="M 470 760 Q 540 690 610 765 Q 560 730 500 790" fill="none" stroke={SOBRANCELHA} strokeWidth={8} strokeLinecap="round" />
      <ellipse cx={540} cy={1030} rx={238} ry={235} fill={CABELO} stroke={CORES.preto} strokeWidth={10} />
      <path d="M 332 1000 Q 290 1125 336 1240" fill="none" stroke={CABELO} strokeWidth={17} strokeLinecap="round" />
      <path d="M 748 1000 Q 790 1125 744 1240" fill="none" stroke={CABELO} strokeWidth={17} strokeLinecap="round" />

      {/* orelhas e rosto */}
      <ellipse cx={338} cy={1125} rx={30} ry={48} fill={PELE} stroke={CORES.preto} strokeWidth={8} />
      <ellipse cx={742} cy={1125} rx={30} ry={48} fill={PELE} stroke={CORES.preto} strokeWidth={8} />
      <ellipse cx={540} cy={1115} rx={205} ry={218} fill={PELE} stroke={CORES.preto} strokeWidth={10} />
      <path
        d="M 340 1040 Q 380 900 540 895 Q 700 900 740 1040 Q 650 975 540 985 Q 430 975 340 1040 Z"
        fill={CABELO}
        stroke={CORES.preto}
        strokeWidth={8}
        strokeLinejoin="round"
      />

      <Sobrancelhas expressao={expressao} />
      <Olhos expressao={expressao} />

      {/* óculos redondos pretos */}
      <g fill="rgba(255,255,255,0.16)" stroke={CORES.preto} strokeWidth={14}>
        <circle cx={OLHO_E} cy={OLHO_Y} r={72} />
        <circle cx={OLHO_D} cy={OLHO_Y} r={72} />
      </g>
      <g fill="none" stroke={CORES.preto} strokeWidth={12} strokeLinecap="round">
        <path d="M 532 1084 Q 540 1072 548 1084" />
        <path d="M 388 1080 L 344 1096" />
        <path d="M 692 1080 L 736 1096" />
      </g>

      {/* nariz, sardas e boca */}
      <path d="M 540 1130 Q 527 1166 546 1173" fill="none" stroke={PELE_SOMBRA} strokeWidth={7} strokeLinecap="round" />
      {sardas.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} fill={SARDA} />
      ))}
      <Boca expressao={expressao} />

      {expressao === "panico" ? (
        <path d="M 772 955 Q 802 1008 776 1034 Q 746 1008 772 955 Z" fill="#9ED8FF" stroke={CORES.preto} strokeWidth={6} />
      ) : null}

      {/* mesa */}
      <rect x={-20} y={1650} width={1120} height={300} fill={CORES.preto} />
      <rect x={-20} y={1650} width={1120} height={14} fill="#3A3A3A" />

      {/* caneca e mãos, conforme o momento da piada */}
      {expressao === "calma" ? (
        <>
          <Caneca x={540} y={1520} giro={0} vapor frame={frame} />
          <Mao x={450} y={1548} />
          <Mao x={630} y={1548} />
        </>
      ) : null}
      {expressao === "surpresa" ? (
        <>
          {/* Sem vapor aqui: com a caneca perto da boca, ele passaria por cima do rosto. */}
          <Caneca x={610} y={1420} giro={-8} vapor={false} frame={frame} />
          <Mao x={522} y={1452} />
          <Mao x={700} y={1440} />
        </>
      ) : null}
      {expressao === "panico" ? (
        <>
          <Caneca x={650} y={1450} giro={28} vapor={false} frame={frame} />
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={700 + i * 34 + ((frame * 3) % 30)}
              cy={1330 - i * 26 - ((frame * 2) % 24)}
              r={14 - i * 2}
              fill={CAFE}
              stroke={CORES.preto}
              strokeWidth={5}
            />
          ))}
          <Mao x={560} y={1490} />
          <Mao x={735} y={1470} />
        </>
      ) : null}
      {expressao === "exausta" ? (
        <>
          <rect x={250} y={1585} width={300} height={80} rx={40} fill={PELE} stroke={CORES.preto} strokeWidth={9} />
          <rect x={530} y={1585} width={300} height={80} rx={40} fill={PELE} stroke={CORES.preto} strokeWidth={9} />
          <Caneca x={900} y={1568} giro={0} vapor={false} frame={frame} />
        </>
      ) : null}
    </svg>
  );
};
