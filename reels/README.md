# Reels da CLT Caótica

Montagem dos reels em motion graphics, feita em código com o [Remotion](https://www.remotion.dev). Cada reel é um arquivo de dados em `roteiros/`, sem código novo por vídeo.

## Como usar

Instalar as dependências (uma vez):

```bash
npm i
```

Pré-visualizar no Remotion Studio:

```bash
npm run dev
```

Renderizar o reel de teste:

```bash
npx remotion render ReelTesteCafe out/reel-teste-cafe.mp4 --codec=h264
```

O vídeo sai em `out/`, que não vai para o GitHub.

A versão com as ilustrações do Pollinations é a composição `ReelTesteCafeIlustrado` (roteiro em `roteiros/teste-cafe-ilustrado.json`). Ela precisa das imagens em `public/artes/teste-cafe/` (`q1.jpg` a `q4.jpg`), que também ficam fora do GitHub:

```bash
npx remotion render ReelTesteCafeIlustrado out/reel-teste-cafe-ilustrado.mp4 --codec=h264
```

O segundo teste, a piada da sexta-feira, é a composição `ReelTesteSexta` (roteiro em `roteiros/teste-sexta.json`). Ele precisa das imagens em `public/artes/2026-11-05/`, também fora do GitHub:

```bash
npx remotion render ReelTesteSexta out/reel-teste-sexta.mp4 --codec=h264
```

## Como funciona

- `roteiros/*.json`: as falas exatas, quem fala, a duração e o movimento de cada quadro. As falas vêm sempre do roteiro aprovado.
- `src/componentes/Quadro.tsx`: o movimento de câmera de cada papel na piada (expectativa, interrupção, escalada e punchline).
- `src/componentes/Balao.tsx`: os balões de fala, normal e de grito, com a entrada animada.
- `src/componentes/PersonagemProvisoria.tsx`: ilustração provisória para testes. Quando um quadro tiver o campo `imagem` (caminho dentro de `public/`), a ilustração real entra no lugar dela.
- `src/marca.ts`: cores e fontes da marca.

## Fontes

Bangers e Anton, em `public/fonts/`, são distribuídas sob a SIL Open Font License 1.1 (os textos das licenças estão na mesma pasta).
