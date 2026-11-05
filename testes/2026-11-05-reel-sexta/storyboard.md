# Storyboard de teste: a sexta-feira que não acabou

Teste pedido pelo responsável em 2026-11-05, para ver a qualidade do vídeo. Não é um dia de produção. As falas foram escritas pelo Claude a pedido do responsável e aguardam aprovação, assim como o visual e o movimento.

Peça: reel, 9:16, 1080x1920, 14,7 segundos. Composição `ReelTesteSexta`, roteiro em `reels/roteiros/teste-sexta.json`.

## 1. Tema e falas

Tema: a sexta-feira que acaba em trabalho extra.

| Quadro | Papel | Quem fala | Fala exata |
|---|---|---|---|
| 1 | Expectativa | Protagonista | "Sexta, 17h58. Ninguém me segura!" |
| 2 | Interrupção | Fora de cena | "Antes de você ir... é rapidinho!" |
| 3 | Escalada do caos | Fora de cena | "É só refazer tudo. Pra segunda, 8h!" |
| 4 | Punchline | Protagonista | "Meu fim de semana pediu demissão." |

As falas 2 e 3 são de alguém fora de cena, como no teste do café, para não criar um personagem novo sem aprovação.

## 2. Storyboard

| Quadro | Duração | Visual | Balão | Movimento |
|---|---|---|---|---|
| 1 | 3,5 s | Ela de pé ao lado da mesa, bolsa no ombro, punho erguido e sorriso enorme. Janela com pôr do sol. | Topo, apontando para ela. | Zoom lento. Balão surge com mola suave. |
| 2 | 3 s | Mesmo cenário. Ela congela e olha para a direita, preocupada. | Entra pela direita, apontando para fora de cena. | Deslize rápido. Balão entra pela lateral. |
| 3 | 3 s | Close no rosto em pânico, papéis voando, fundo magenta. | Balão de grito, apontando para fora de cena. | Tremida, zoom e flash. |
| 4 | 4 s | Ela largada na mesa, exausta, com uma pilha de papéis e a bolsa jogada. | Topo, apontando para ela. | Meio segundo de pausa, depois balão com mola forte. |
| Fechamento | 1,8 s | Cartão amarelo com o nome da marca. | Sem balão. | Faixa magenta em wipe. |

## 3. Prompts de imagem

No formato da seção 3 da skill `storyboard-clt`. Os quadros 2 a 4 usam o modelo de edição, com uma imagem anterior como `Image 1`.

**Quadro 1** (referência: a âncora do teste do café):

```
Use: vertical 9:16 panel for an Instagram comic reel. Image 1 is the character reference.
Style: Brazilian comic and meme style digital illustration, clean bold black ink lines, flat colors, high contrast, a palette of yellow, magenta, black and white.
Character: The same woman shown in Image 1. Keep her identity exactly the same: delicate face, big expressive brown eyes, round black glasses, soft freckles on her nose and cheeks, dark eyebrows, brown hair in a big high voluminous bun with loose strands, the same magenta t-shirt.
Scene: It is Friday at the very end of the workday. She stands next to her office desk, ready to leave, with her bag strap over her shoulder, a huge excited open-mouth grin, and one fist raised high in celebration. Behind her, an office window shows an orange sunset sky.
Camera: Medium shot at eye level, showing her from the waist up.
Composition: She fills the lower two thirds of the frame. The top third is an empty, flat yellow area with nothing in it.
Constraints: The image contains no text of any kind. Screens, papers and walls are completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

**Quadro 2** (referência: o quadro 1 deste teste):

```
Use: edit of Image 1, the next panel of the same comic reel, vertical 9:16.
Change only: her pose and expression. Her raised arm comes down and her fist is gone. She freezes in place with wide, shocked eyes and a small open mouth, turning her head to look toward the right side of the frame, as if someone just called her name. One bag strap slips off her shoulder.
Keep exactly the same: her face and identity, round black glasses, freckles, hair bun, magenta t-shirt, bag, the office, the sunset window, the empty flat yellow area in the top third, colors, framing and ink style.
Constraints: The image contains no text of any kind. Screens, papers and walls are completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

**Quadro 3** (referência: o quadro 3 do teste do café):

```
Use: edit of Image 1, a panel of a comic reel, vertical 9:16.
Change only: remove the coffee mug, her hand and all the coffee completely. Her mouth is wide open in a horrified scream with no liquid at all. Add many blank white sheets of paper and folders flying wildly around her head, and dramatic comic speed lines bursting from behind her.
Keep exactly the same: her face and identity, the panicked eyes and raised eyebrows, round black glasses, freckles, hair bun, magenta t-shirt, the flat magenta background, colors, framing and ink style.
Constraints: The image contains no text of any kind. Every sheet of paper is completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

**Quadro 4** (referência: o quadro 4 do teste do café):

```
Use: edit of Image 1, the last panel of a comic reel, vertical 9:16.
Change only: remove the coffee mug completely. On the desk in front of her, add a tall, messy pile of blank white papers and folders, and her black shoulder bag dropped on the desk beside the pile.
Keep exactly the same: her face and identity, the exhausted deadpan expression with heavy tired eyes and dark circles, round black glasses, freckles, hair bun, magenta t-shirt, her pose with her hand near her chin, the desk, the flat yellow background, colors, framing and ink style.
Constraints: The image contains no text of any kind. Every sheet of paper is completely blank. No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

## 4. Onde gerar

O agente de imagem 01 ainda não tinha respondido ao pedido de teste, então as imagens foram geradas no Pollinations, com o Pollen grátis de missões.

| Arquivo | Modelo | Semente | Custo |
|---|---|---|---|
| `2026-11-05_reel_q1_v1.jpg` | `black-forest-labs/flux.2-klein-4b` | 3101 | 0,005 pollen |
| `2026-11-05_reel_q2_v1.jpg` | `black-forest-labs/flux.2-klein-4b` | 3102 | 0,005 pollen |
| `2026-11-05_reel_q3_v1.jpg` | `black-forest-labs/flux.2-klein-4b` | 3103 | 0,005 pollen |
| `2026-11-05_reel_q4_v1.jpg` | `black-forest-labs/flux.2-klein-4b` | 3104 | 0,005 pollen |

Tamanho: 768x1344. As imagens ficam em `reels/public/artes/2026-11-05/`, fora do GitHub.

## 5. Revisão

- Os quatro quadros saíram na primeira tentativa, com a personagem igual à ficha: óculos redondos pretos, coque alto, sardas, olhos castanhos e a mesma camiseta magenta.
- Nenhuma imagem tem texto, letra, número, logotipo ou marca d'água. Teclados e papéis foram conferidos em recorte ampliado.
- Desta vez o gerador deixou o espaço livre no topo nos quadros 1 e 2. Nos quadros 3 e 4, a ilustração desce e o topo é preenchido com a cor de fundo da imagem.
- No quadro 1, a ilustração desceu um pouco mais para o punho erguido não encostar no balão.
- As quebras de linha dos balões foram ajustadas com espaço fixo, para "é rapidinho" e "ninguém me segura" não ficarem partidos.
- Vídeo final: 1080x1920, 30 fps, 441 quadros, 14,7 s, sem áudio e sem quadros pretos. Os acentos (É, Ê, Ã) aparecem inteiros nos balões.
