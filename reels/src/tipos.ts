export type Papel = "expectativa" | "interrupcao" | "escalada" | "punchline";

export type Expressao = "calma" | "surpresa" | "panico" | "exausta";

export type Entrada = {
  tipo: "corte" | "deslize" | "fade" | "wipe";
  quadros: number;
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
};

export type Reel = {
  titulo: string;
  quadros: Quadro[];
  fechamento: {
    texto: string;
    duracaoSeg: number;
    entrada: Entrada;
  };
};

export type PropsReel = {
  reel: Reel;
};
