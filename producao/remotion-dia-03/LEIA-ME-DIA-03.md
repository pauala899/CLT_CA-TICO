# Remotion do Dia 3 ("A novela do crush", academia)

Copia do projeto do Dia 2, com roteiro, cenas, stories e meme do Dia 3. Saida em 720x1280 (720p).

## Estado

- Projeto compila (ver comandos abaixo). Nada foi renderizado.
- Imagens: faltam os 27 quadros. Veja `public/frames/LEIA-ME-PLACEHOLDER.txt`.
- Audios: faltam as 23 vozes e os 7 efeitos. Veja `public/audio/LEIA-ME-PLACEHOLDER.txt`.
- `src/durations.json` tem estimativas (alvo_s do roteiro), nao duracoes reais.
- Meme `m2` e `m3` usam textos de rascunho em `src/Meme.tsx`: confirmar antes de renderizar.

## Decisoes desta copia

- Canvas de desenho continua 1080x1920; `src/Root.tsx` reduz para 720x1280 (reel e stories). Meme segue 1080x1350 (imagem, nao video).
- Carrossel removido (o Dia 3 nao tem carrossel no `FILA.md`).
- Etiqueta "CONTINUA" do story 1 agora em y=1290 (regra de etiquetas), antes estava em 1500.
- Nenhuma fala cortada no reel. Se passar de 60 s com as vozes reais, use `SKIP` em `src/timeline.ts` (candidatos: L01, L11).

## Comandos

```console
npm install
npx tsc --noEmit
npm run dev        # preview no Studio
```

Render só depois que as imagens e as vozes estiverem nas pastas `public/`.
