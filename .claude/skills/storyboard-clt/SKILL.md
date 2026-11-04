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

**Prompt âncora da personagem.** Gere uma vez e use como imagem de referência em todas as cenas:

> Brazilian comic and meme style digital illustration, clean bold ink lines, flat colors, high contrast, palette of yellow, magenta, black and white. Adult woman with a delicate face, big expressive brown eyes, round black glasses, soft freckles on nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands. Exaggerated facial expression that reads instantly on a small screen.

**Um prompt por quadro**, com: referência à imagem âncora, cena, expressão, enquadramento, proporção, espaço livre para o balão (por exemplo, "empty plain space in the upper third") e a frase de bloqueio no fim.

**Frase de bloqueio, sempre no fim de todo prompt:**

> No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

Os prompts ficam em inglês porque os geradores de imagem costumam seguir melhor as instruções nesse idioma. As falas ficam sempre em português.

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
