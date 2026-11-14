export type Papel = "expectativa" | "interrupcao" | "escalada" | "punchline" | "narracao";

export type Expressao = "calma" | "surpresa" | "panico" | "exausta";

export type Entrada = {
  tipo: "corte" | "deslize" | "fade" | "wipe";
  quadros: number;
};

// Um som tocado dentro de uma cena: voz, efeito ou música.
export type Som = {
  // Caminho do arquivo dentro de public/.
  arquivo: string;
  // Quando o som começa, em segundos, contados do início da cena.
  emSeg: number;
  // De 0 a 1. Sem ele, volume 1.
  volume?: number;
};

export type TipoFala = "fala" | "pensa" | "narracao";

// Uma fala dentro de um quadro. Cada balão aparece em inicioSeg e sai quando o próximo começa.
export type FalaQuadro = {
  tipo: TipoFala;
  quem: "ela" | "chefe" | "colega" | "narrador";
  texto: string;
  inicioSeg: number;
};

export type Quadro = {
  papel: Papel;
  // Fala exata do roteiro aprovado. Nunca é gerada pelo código.
  fala: string;
  quemFala: "protagonista" | "fora-de-cena";
  duracaoSeg: number;
  expressao: Expressao;
  balao: {
    estilo: "normal" | "grito";
    // Distância do topo da tela, em porcentagem.
    topo: number;
  };
  // Como este quadro entra depois do anterior.
  entrada: Entrada;
  // Caminho da ilustração dentro de public/. Sem ele, usa a ilustração provisória.
  imagem?: string;
  // Cor que preenche o espaço acima da ilustração (a cor de fundo da própria imagem).
  imagemFundo?: string;
  // Quantos pixels a ilustração desce, para abrir espaço para o balão acima da cabeça.
  imagemDesce?: number;
  // Vozes e efeitos da cena.
  sons?: Som[];
  // Várias falas no mesmo quadro (fala, pensamento e narração). Se existir, substitui fala/quemFala/balao.
  falas?: FalaQuadro[];
};

export type Reel = {
  titulo: string;
  quadros: Quadro[];
  fechamento: {
    texto: string;
    duracaoSeg: number;
    entrada: Entrada;
    sons?: Som[];
  };
};

export type PropsReel = {
  reel: Reel;
};
