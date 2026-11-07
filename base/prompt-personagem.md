# Prompt da personagem para o Pollinations

Decidido pelo responsável em 2026-11-07: todo prompt escreve primeiro a descrição da personagem e depois o cenário. A geração usa o Pollinations. O link que o responsável enviou em 2026-11-07 usa o modelo `tongyi-mai/z-image-turbo`, em 1080x1920, e não um FLUX. O texto do prompt fica em inglês.

Sem imagem de referência, por decisão do responsável em 2026-11-07: a `base_ancora_v3` não é mais usada na geração. O prompt visual único, igual em todas as gerações, é o que mantém sempre a mesma personagem.

## Estrutura de todo prompt

1. Descrição fixa, igual em todos os quadros.
2. `Scene:` o cenário, o enquadramento e a composição, em frases curtas.
3. Fechamento fixo.

## 1. Descrição fixa, quadros com a personagem

```
Pop art modern comic book illustration style, an expressive, intellectual young woman. Fair skin, oval face, large expressive brown eyes, defined eyebrows, long eyelashes. Large round black-rimmed glasses. Voluminous dark brown hair in a high messy bun, loose strands framing her face. Small nose, pink lips. Magenta pink shirt, yellow patterned scarf tied around the neck. Strong bold black outlines, subtle hatch shading, vibrant flat colors, halftone comic print texture, grainy finish.
```

Não reescrever. Qualquer mudança nesse texto muda a personagem.

## 1b. Descrição fixa, quadros sem a personagem

```
Pop art modern comic book illustration style. Strong bold black outlines, subtle hatch shading, vibrant flat colors, halftone comic print texture, grainy finish.
```

O cenário começa com "No people appear in this panel."

## 2. Cenário

`Scene:` e uma sequência de frases curtas: o que acontece, a expressão, o enquadramento (`Medium shot at eye level`) e onde fica a área vazia para o balão (`The top third is an empty, flat yellow area with nothing in it`).

## 3. Fechamento fixo

```
Full-bleed illustration that fills the entire canvas, with no frame, no border and no white margin. High contrast, clean editorial art poster aesthetic, no photorealism, no 3D. The image contains no text of any kind: screens, papers, mugs and walls are completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

## Parâmetros

- Semente única, `4321`, igual em todos os itens. Na refação, só muda a pedido do Claude.
- Sem imagem de referência. A personagem vem só da descrição fixa, idêntica em todos os itens, com a semente única. O `tongyi-mai/z-image-turbo` só usa texto.
- O link do responsável não leva `seed`. O script precisa passar `seed=4321`, senão cada geração sai com uma semente aleatória e o rosto varia.
- Na amostra conferida, o modelo devolveu JPEG de 1088x1920. O script corta para 1080x1920 e salva em PNG.
- Reel e story: 9:16, 1080x1920. Carrossel e feed: 4:5, 1080x1350.
- Id e nome do arquivo: `AAAA-MM-DD_<peça>_<quadro>_v<versão>`, como em `etapas-e-decisoes.md`.

## De onde vem a descrição

É o prompt da âncora `base_ancora_v3`, enviado pelo responsável em 2026-11-07. Foram cortados dele, porque conflitam com o cenário de cada quadro:

- `vertical bust-to-head portrait of`: o enquadramento muda em cada quadro.
- `contemplative look slightly to the left`: a expressão vem do cenário.
- `Geometric pop art background with blocks of bright yellow, magenta, black, and white`: o fundo vem do cenário.
- `Black rectangular frame, slightly aged white paper texture around the border`: o reel é de página inteira, sem moldura.
- `no text`, no fim: trocado pela frase de bloqueio completa do fechamento fixo.

## Pontos em aberto

- **Sardas:** a ficha pede sardas suaves no nariz e nas bochechas, e a descrição do responsável não cita. A âncora tem sardas. Se saírem imagens sem sardas, propor acrescentar `subtle freckles on her nose and cheeks` na descrição. Só com a confirmação do responsável.
- **Consistência sem referência:** a descrição é a única âncora da personagem. Se o rosto, o coque ou o lenço variarem entre quadros, propor mais detalhes na descrição (por exemplo, a estampa do lenço e o tom de pele), só com a confirmação do responsável.
- **Moldura:** o fechamento pede página inteira, sem moldura. Conferir na revisão de cada imagem.
- **`base_ancora_v3`:** deixou de ser usada na geração. Falta confirmar se continua como referência da minha revisão visual.
