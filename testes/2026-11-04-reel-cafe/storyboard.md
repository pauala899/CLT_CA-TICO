# Storyboard de teste: o café que nunca chega

Teste da skill `storyboard-clt` e da montagem do reel. Não é um dia de produção. As falas são o exemplo da seção 7 do `CLAUDE.md`, sem nenhuma alteração. Visual, enquadramento e movimento são propostas aguardando aprovação.

Peça: reel, 9:16, 1080x1920, cerca de 15 segundos.

## 1. Tema e falas

Tema: o café que nunca chega.

| Quadro | Papel | Quem fala | Fala exata |
|---|---|---|---|
| 1 | Expectativa | Protagonista | "Hoje vou tomar meu café em paz." |
| 2 | Interrupção | Fora de cena `[quem fala: a definir]` | "Tem um minutinho?" |
| 3 | Escalada do caos | Fora de cena `[quem fala: a definir]` | "É urgente! Preciso pra agora!" |
| 4 | Punchline | Protagonista | "Meu expediente começou. Minha cafeína, não." |

O briefing não diz quem faz as falas 2 e 3. No teste, os balões delas apontam para fora de cena, para não inventar um personagem.

## 2. Storyboard

| Quadro | Duração | Visual | Balão | Movimento |
|---|---|---|---|---|
| 1 | 3,5 s | Protagonista à mesa do escritório, caneca nas mãos, olhos semicerrados e sorriso tranquilo. Plano médio. | Terço superior, apontando para ela. | Zoom lento. Balão surge com mola suave. |
| 2 | 3 s | Mesmo plano. Ela congela com a caneca a caminho da boca e olha para a direita, de olhos arregalados. | Entra pela direita, apontando para fora de cena. | Deslize rápido com tranco. Balão entra pela lateral. |
| 3 | 3 s | Plano mais fechado no rosto. Expressão de pânico. | Balão de grito (borda serrilhada), apontando para fora de cena. | Tremida, zoom rápido e flash magenta. |
| 4 | 4 s | Ela olha para a câmera, exausta, com a caneca esquecida. | Terço superior, apontando para ela. | Meio segundo de pausa, depois balão grande com mola forte. |
| Fechamento | 1,5 s | Cartão amarelo com o nome da marca. | Sem balão. | Nome entra com mola. |

O fechamento não tem chamada para ação, porque o briefing não define a frase. Quando o responsável definir, ela entra aqui.

## 3. Prompts de imagem

Prompt âncora da personagem: o da skill `storyboard-clt`, sem mudanças.

**Quadro 1:**

> Using the reference character. She sits at an office desk holding a coffee mug with both hands, eyes half closed, peaceful smile, calm morning. Medium shot, vertical 9:16, character in the lower two thirds, empty plain space in the upper third. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

**Quadro 2:**

> Using the reference character. Same office desk. She freezes with the coffee mug halfway to her mouth, wide eyes looking to the right side of the frame, as if someone just called her. Medium shot, vertical 9:16, empty plain space in the upper right area. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

**Quadro 3:**

> Using the reference character. Close-up of her face in panic, eyes huge behind the round glasses, eyebrows raised, coffee splashing out of the mug, comic motion lines. Vertical 9:16, empty plain space in the upper third. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

**Quadro 4:**

> Using the reference character. She looks straight at the camera, exhausted and deadpan, slumped at the desk, the forgotten coffee mug beside her. Medium shot, vertical 9:16, empty plain space in the upper third. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

## 4. Onde gerar

Primeiro o reel foi montado com ilustrações provisórias desenhadas em código. Depois que o Pollinations foi liberado, as ilustrações foram geradas lá, com a chave secreta e a âncora como referência (ver `etapas-e-decisoes.md`).

| Imagem | Modelo e referência | Semente | Resultado |
|---|---|---|---|
| Âncora | `black-forest-labs/flux.1-kontext-pro`, sem referência | 1101 | Bateu com a ficha. Saiu sorrindo. |
| Quadro 1 | `flux.1-kontext-pro`, referência: âncora | 2201 | Aprovado na revisão. |
| Quadro 2 | `flux.1-kontext-pro`, referência: âncora | 2202 | Aprovado na revisão. |
| Quadro 3 | `flux.1-kontext-pro`, referência: âncora | 2203 | A personagem cospe o café, diferente do storyboard. Aguardando aprovação. |
| Quadro 4, passo 1 | `flux.1-kontext-pro`, referência: âncora | 2214 | Pose certa, mas ainda sorrindo. |
| Quadro 4, passo 2 | `black-forest-labs/flux.2-klein-4b`, referência: passo 1 | 2316 | Expressão de exausta corrigida. Aprovado na revisão. |

O tamanho pedido foi 768x1344. O `flux.1-kontext-pro` devolveu 800x1328, e o `flux.2-klein-4b`, 768x1344.

### Prompts usados

Âncora:

> Brazilian comic and meme style digital illustration, clean bold ink lines, flat colors, high contrast, palette of yellow, magenta, black and white. Adult woman with a delicate face, big expressive brown eyes, round black glasses, soft freckles on nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands. Character reference portrait from the waist up, facing the viewer, friendly neutral smile, wearing a simple magenta blouse, plain flat yellow background.

Início comum dos quadros 1 a 3 e do passo 1 do quadro 4:

> Keep the exact same character from the reference image: same delicate face, big brown eyes, round black glasses, freckles, dark eyebrows, brown high messy bun, same comic ink art style and flat colors.

Cenas:

- **Quadro 1:** She sits at an office desk holding a coffee mug with both hands, eyes half closed, peaceful smile, calm morning, a little steam rising from the mug. Medium shot, vertical 9:16, character in the lower two thirds, empty plain yellow space in the upper third.
- **Quadro 2:** Same office desk. She freezes with the coffee mug halfway to her mouth, wide surprised eyes looking to the right side of the frame, as if someone just called her name. Medium shot, vertical 9:16, character in the lower two thirds, empty plain yellow space in the upper third.
- **Quadro 3:** Close-up of her face in total panic, eyes huge behind the round glasses, eyebrows raised, mouth open, coffee splashing out of the mug, comic speed lines, magenta background. Vertical 9:16, empty plain space in the upper third.
- **Quadro 4, passo 1:** She stares straight at the viewer with a tired, deadpan, unamused expression: heavy half-closed eyelids, dark circles under her eyes, flat straight mouth, no smile at all. She is slumped over the office desk with her cheek squished against her hand, the forgotten coffee mug beside her. Medium shot, vertical 9:16, plain yellow background.
- **Quadro 4, passo 2** (sem o início comum): Edit only her facial expression and keep everything else identical. Make her look exhausted and deadpan: heavy droopy eyelids half covering her eyes, dark tired circles under the eyes, eyebrows flat and slightly lowered, mouth a flat straight line with no smile. Keep the same pose, glasses, hair bun, clothes, desk, coffee mug, colors and comic ink style.

Todos terminam com a frase de bloqueio:

> No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.

## 5. Revisão

Checklist por quadro da skill `storyboard-clt`, e depois a revisão completa da seção 11 do `CLAUDE.md`.

Resultado da revisão das ilustrações:

- A personagem bateu com a ficha nos quatro quadros, e nenhuma imagem tem texto, logotipo ou marca d'água.
- O quadro 3 ficou diferente do storyboard (ela cospe o café) e o quadro 4 precisou ser refeito (saiu sorrindo).
- O gerador não deixou o espaço livre pedido no topo. No reel, a ilustração desce e o topo é preenchido com a cor de fundo da imagem, para o balão não cobrir o rosto.
