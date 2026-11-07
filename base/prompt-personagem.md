# Prompt da personagem para o FLUX do Pollinations

Decidido pelo responsável em 2026-11-07: todo prompt escreve primeiro a descrição da personagem e depois o cenário. A geração usa o FLUX do Pollinations. O texto do prompt fica em inglês.

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
- Referência `base_ancora_v3` (imagem de referência do modelo FLUX que aceita imagem). Se o script do agente não passar a referência, o status do id leva `sem-referencia`.
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
- **Moldura:** a âncora tem moldura preta e borda de papel. Com a âncora como referência, o modelo pode copiar a moldura para os quadros. O fechamento pede página inteira; conferir na revisão de cada imagem.
