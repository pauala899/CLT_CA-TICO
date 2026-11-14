---
name: storyboard-clt
description: "Use quando pedirem roteiro, storyboard ou prompts de imagem para um reel, carrossel, quadrinho ou sequência de stories da CLT Caótica, por exemplo \"monta o storyboard do reel\", \"cria os quadros da piada\", \"gera os prompts das imagens\". Baseada na skill gerador-storyboard-video-1min, adaptada ao humor da marca."
---

# Storyboard da CLT Caótica

Antes de começar, leia `CLAUDE.md`, `etapas-e-decisoes.md` e `base/ficha-personagem.md`. Esta skill segue o fluxo obrigatório da seção 6 do `CLAUDE.md`: primeiro a história e as falas, depois a imagem sem texto, e só no fim o texto aplicado.

Aproveitado da skill `gerador-storyboard-video-1min`: personagem sempre original, prompt âncora da personagem usado em todas as cenas e revisão de cada cena antes de passar para a próxima. Trocado: o arco de venda de produto pelo arco de humor da marca, as 8 cenas de 8 segundos por 4 quadros curtos, e o texto dentro da imagem por texto aplicado depois.

## Regras que não mudam

1. **Não inventar falas.** As falas vêm do responsável ou de um roteiro já aprovado. Se faltar uma fala, escreva `[fala a definir]` e pergunte.
2. **A imagem nunca tem texto.** Todo prompt de imagem termina com a frase de bloqueio (seção 3). O texto entra depois, no balão, pelo compositor.
3. **Personagem sempre original.** A protagonista é a da ficha. Nunca basear personagem em pessoa real, celebridade ou criador de conteúdo.
4. **Cada fala tem dono.** Protagonista, personagem secundário ou alguém fora de cena. Se o roteiro não disser quem fala, escreva `[quem fala: a definir]` e pergunte.
5. **Uma proposta não é uma decisão.** Visual, enquadramento e movimento sugeridos aqui são propostas até o responsável aprovar.

## Estrutura narrativa (seção 7 do `CLAUDE.md`)

| Quadro | Papel | O que precisa mostrar |
|---|---|---|
| 1 | Expectativa | A protagonista tranquila, com um plano simples. |
| 2 | Interrupção ou conflito | Alguém ou algo quebra o plano. |
| 3 | Escalada do caos | A situação piora. Exagero visual e ritmo mais rápido. |
| 4 | Punchline | O final engraçado. Uma pausa antes e uma expressão forte. |

Quatro quadros é o padrão. Use três se a piada for curta. No carrossel, use no máximo seis.

## Formatos

| Peça | Proporção | Tamanho | Observação |
|---|---|---|---|
| Reel | 9:16 | 1080x1920 | De 12 a 30 segundos: cerca de 3 a 4 segundos por quadro, mais um fechamento curto. |
| Stories | 9:16 | 1080x1920 | De 4 a 6 telas. Reserve espaço para enquete ou caixa de pergunta. |
| Feed e carrossel | 4:5 | 1080x1350 | O quadro 1 é a capa e precisa ser forte. |

## Documento a gerar

Salve em `dias/AAAA-MM-DD/01-roteiro/<peça>-storyboard.md`, ou na pasta de teste que o responsável indicar. O documento tem cinco seções.

### 1. Tema e falas

Tabela: Quadro | Papel | Quem fala | Fala exata, copiada do roteiro aprovado sem alterar nenhuma palavra.

### 2. Storyboard

Tabela: Quadro | Duração | Visual (cenário, enquadramento, expressão) | Balão (posição e para quem aponta) | Movimento.

Movimentos sugeridos por papel, feitos em motion graphics no Remotion:

- **Expectativa:** zoom lento e balão surgindo com mola suave.
- **Interrupção:** corte rápido ou deslize, com o balão entrando pela lateral num tranco.
- **Escalada:** tremida, zoom mais rápido e flash de cor da marca.
- **Punchline:** meio segundo de pausa, depois o balão grande com mola forte.

### 3. Prompts de imagem

> **Atualização de 2026-11-07:** para o Pollinations (Z-Image-Turbo), o formato mudou por decisão do responsável: a descrição fixa da personagem vem na frente e depois o cenário, com semente única. O texto exato está em `base/prompt-personagem.md`. Os blocos rotulados abaixo (`Use`, `Style`, `Character`...) ficam como referência para outros geradores, até o ajuste desta skill.

Os prompts seguem o jeito de escrever que funciona no Nano Banana (Gemini) e no GPT Image 2. São frases completas que descrevem a cena, não listas de palavras-chave, separadas em blocos com rótulo. Diga o que deve aparecer no lugar de só dizer o que não deve: "o terço de cima é uma área amarela lisa e vazia" funciona melhor que "sem nada no topo".

**Blocos de todo prompt, nesta ordem:**

1. `Use:` para que serve a imagem, a proporção e qual é a imagem de referência (`Image 1`).
2. `Style:` o estilo da marca, sempre com o mesmo texto.
3. `Character:` a personagem, sempre com o mesmo texto.
4. `Scene:` o que acontece no quadro: ação, expressão e cenário.
5. `Camera:` enquadramento e ângulo.
6. `Composition:` onde fica a personagem e qual área fica vazia para o balão.
7. `Constraints:` a regra do texto, sempre com o mesmo texto, terminando com a frase de bloqueio.

Texto fixo de `Style:`:

> Brazilian comic and meme style digital illustration, clean bold black ink lines, flat colors, high contrast, a palette of yellow, magenta, black and white.

Texto fixo de `Character:`, quando há imagem de referência:

> The same woman shown in Image 1. Keep her identity exactly the same: delicate face, big expressive brown eyes, round black glasses, soft freckles on her nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands.

Texto fixo de `Constraints:`:

> The image contains no text of any kind. Mugs, screens, papers and walls are completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

**Frase de bloqueio, sempre no fim de todo prompt:**

> No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

**Prompt âncora da personagem.** Gere uma vez, sem referência, e use como `Image 1` em todos os quadros:

```
Use: vertical 4:5 character reference portrait for a comic series. This image will be the reference for every future panel.
Style: Brazilian comic and meme style digital illustration, clean bold black ink lines, flat colors, high contrast, a palette of yellow, magenta, black and white.
Character: An adult woman with a delicate face, big expressive brown eyes, round black glasses, soft freckles on her nose and cheeks, dark eyebrows, and brown hair in a big high voluminous bun with loose strands.
Scene: She stands relaxed and faces the viewer with a neutral, relaxed expression and her mouth closed.
Camera: Waist-up portrait at eye level, centered.
Composition: A plain, flat yellow background with nothing else in it.
Constraints: The image contains no text of any kind. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

**Um prompt por quadro.** Exemplo com o quadro 1 do teste do café:

```
Use: vertical 9:16 panel for an Instagram comic reel. Image 1 is the character reference.
Style: Brazilian comic and meme style digital illustration, clean bold black ink lines, flat colors, high contrast, a palette of yellow, magenta, black and white.
Character: The same woman shown in Image 1. Keep her identity exactly the same: delicate face, big expressive brown eyes, round black glasses, soft freckles on her nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands.
Scene: She sits at her office desk on a calm morning, holding a coffee mug with both hands, eyes half closed and a peaceful smile, with a little steam rising from the mug.
Camera: Medium shot at eye level.
Composition: She fills the lower two thirds of the frame. The top third is an empty, flat yellow area with nothing in it.
Constraints: The image contains no text of any kind. Mugs, screens, papers and walls are completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

**Para mudar só uma coisa num quadro já gerado**, use o próprio quadro como `Image 1` e diga o que muda e o que fica:

```
Use: edit of Image 1, a panel of a comic reel.
Change only: her facial expression. Make her look exhausted and deadpan: heavy droopy eyelids, dark circles under her eyes, flat eyebrows, and a flat straight mouth with no smile.
Keep exactly the same: her face and identity, glasses, hair bun, clothes, pose, desk, coffee mug, background, colors, framing and ink style.
Constraints: The image contains no text of any kind. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

A proporção vai no bloco `Use:` e também nos campos `largura` e `altura` do pedido (ver `base/protocolo-gerador-imagens.md`), para o gerador passar ao parâmetro de tamanho do modelo.

Os prompts ficam em inglês porque os geradores de imagem costumam seguir melhor as instruções nesse idioma. As falas ficam sempre em português.

**Lições do primeiro teste (2026-11-04):**

- O modelo com referência copia a expressão da âncora. Por isso a âncora tem expressão neutra: no teste, uma âncora sorrindo fez a personagem sorrir até na punchline.
- Para mudar só a expressão de um quadro, use o próprio quadro como referência e uma instrução de edição, começando por "Edit only her facial expression and keep everything else identical."
- Os geradores não respeitaram o pedido de espaço livre no topo. No reel, isso se resolve descendo a ilustração (`imagemDesce`) e preenchendo o topo com a cor de fundo da imagem (`imagemFundo`), nos arquivos de `reels/roteiros/`.
- Se o pedido passar do tempo limite, repita exatamente o mesmo pedido: a geração continua no servidor e não é cobrada de novo.

### 4. Onde gerar

Use o gerador registrado como disponível em `etapas-e-decisoes.md`. Se não houver nenhum funcionando, entregue os prompts para o responsável gerar no Google Flow. A cota grátis de vídeo do Flow é de 30 segundos por dia: use vídeo em no máximo um momento, como a punchline, com até 8 segundos. Guarde os originais gerados sem editar.

### 5. Checklist de revisão por quadro

Revise cada imagem logo depois de gerada, antes de gerar a próxima:

- A personagem bate com a ficha? Óculos redondos pretos, coque alto, sardas e olhos castanhos.
- A imagem está sem nenhum texto, letra, número, logotipo ou marca d'água?
- Mãos, rosto e objetos estão sem deformação?
- Sobra espaço livre para o balão sem cobrir rosto ou expressão?
- O quadro ajuda a contar a piada?

Se algo falhar, gere de novo só aquele quadro. Depois da montagem, faça a revisão completa da seção 11 do `CLAUDE.md`.

## Entrega

Mostre o documento ao responsável e espere a aprovação antes de gerar as imagens. Para ajustes, edite o mesmo arquivo em vez de começar do zero.

**Modelo aprovado.** O reel de teste da sexta, com voz e efeitos (`testes/2026-11-05-reel-sexta/`, composição `ReelTesteSextaSom`), foi aprovado pelo responsável em 2026-11-05 como modelo. Use-o como referência de ritmo, balões, vozes, efeitos e legenda.
