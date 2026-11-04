import { loadFont } from "@remotion/fonts";
import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

// Cores da seção 4 do CLAUDE.md. Os tons exatos são uma proposta aguardando aprovação.
export const CORES = {
  amarelo: "#FFD60A",
  magenta: "#E6007E",
  preto: "#111111",
  branco: "#FFFFFF",
};

// Fontes de licença aberta (SIL OFL), com acentos do português.
export const FONTE_FALA = "Bangers";
export const FONTE_MARCA = "Anton";

const esperaFontes = delayRender("Carregando as fontes da marca");
Promise.all([
  loadFont({
    family: FONTE_FALA,
    url: staticFile("fonts/Bangers-Regular.woff2"),
    weight: "400",
  }),
  loadFont({
    family: FONTE_MARCA,
    url: staticFile("fonts/Anton-Regular.woff2"),
    weight: "400",
  }),
])
  .then(() => continueRender(esperaFontes))
  .catch((erro) => cancelRender(erro));

// Fundo de retícula, como em quadrinho impresso.
export const reticula = (cor: string): React.CSSProperties => ({
  backgroundColor: cor,
  backgroundImage:
    "radial-gradient(rgba(0, 0, 0, 0.13) 3.5px, transparent 4px)",
  backgroundSize: "30px 30px",
});
