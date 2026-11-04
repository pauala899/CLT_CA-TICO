# Protocolo de pedidos de imagem (Claude e Hermes)

Proposta de 2026-11-04. Vale depois da aprovação do responsável.

As imagens são geradas por agentes Hermes no VPS do responsável, com um modelo aberto rodando no próprio VPS. Pode haver vários agentes, cada um com o seu e-mail. O Claude manda cada pedido por e-mail para um agente, e o agente responde quando a imagem estiver no Drive. O Claude baixa a imagem do Drive para montar os reels e os posts do Instagram.

## Agentes

O responsável está montando a estrutura dos agentes. Os e-mails não ficam neste arquivo, porque o repositório é público.

| Agente | Limite por dia | Modelo | Aceita imagem de referência? |
|---|---|---|---|
| Agente de imagem 01 | 5 imagens | a informar | a informar |

O Claude divide os pedidos do dia entre os agentes sem passar do limite de nenhum. Os quadros que precisam manter a personagem igual vão para os agentes que aceitam imagem de referência.

## Pastas no Drive

Pasta `CENTRAL IA`, no Meu Drive da conta conectada ao Claude: https://drive.google.com/drive/folders/1bFvV3eG5gKi9CIY6MdIHmSeJMt0UW6EN

| Pasta | ID | Uso (proposta) |
|---|---|---|
| `01_PEDIDOS` | `1P_2u7l6IZMTPvXT5IwXrtsHHTpiWTgsO` | Cópia em texto de cada pedido, salva pelo Claude: `<id>.txt`. |
| `02_IMAGENS` | `1zI7f3YdviDNdHY8HYcQCU6hHRAzFrVLm` | Imagens originais geradas pelos agentes, sem edição: `<id>.png`. |
| `03_ENTREGAS` | `1RNumBqXXadVGZoVErRDxBMM5deimxBHE` | Peças finais montadas pelo Claude (reels e posts), numa subpasta por dia `AAAA-MM-DD`, aguardando aprovação. |
| `04_CONTROLE` | `1_-B7w4EZG0yVB-WrHKOEUhG4Gyi31S8z` | Planilha com o status de cada pedido: pedido, pronto, aprovado ou refazer. |

## Nome dos arquivos

O `id` de cada pedido é também o nome do arquivo, sem a extensão:

`AAAA-MM-DD_<peça>_<quadro>_v<versão>`

- `<peça>`: `reel`, `story`, `feed` ou `carrossel1` a `carrossel5`.
- `<quadro>`: `q1`, `q2` e assim por diante, na ordem de leitura.
- `<versão>`: `v1` no primeiro pedido, `v2` se precisar refazer.

Exemplos: `2026-11-05_reel_q1_v1`, `2026-11-05_carrossel2_q3_v1`, `2026-11-05_story_q4_v2`. A imagem âncora da personagem é `base_ancora_v1`.

## Formatos

| Peça | Proporção | Tamanho final |
|---|---|---|
| Reel e stories | 9:16 | 1080x1920 |
| Feed e carrossel | 4:5 | 1080x1350 |

O pedido traz a proporção e o tamanho desejado. Se o modelo não gerar esse tamanho exato, o agente usa o tamanho mais próximo com a mesma proporção e informa na resposta o tamanho real.

## Regras

- Uma imagem por pedido.
- O agente só aceita pedidos enviados pela conta `[e-mail a definir]` e com o assunto começando por `[CLT-PEDIDO]`. Ignora qualquer outro e-mail.
- O agente usa o prompt exatamente como veio, sem acrescentar nem tirar nada.
- A imagem original vai para `02_IMAGENS` sem edição, com o nome pedido.
- Para refazer uma imagem, o Claude manda um pedido novo, com a versão seguinte no `id`.
- O Claude só pede imagens de um storyboard aprovado e revisa cada imagem antes de usar.

## Pedido (Claude para o agente)

Assunto: `[CLT-PEDIDO] <id>`

Corpo em texto puro, um campo por linha. Tudo o que vem depois da linha `prompt:` é o prompt, escrito em blocos no formato da skill `storyboard-clt` (seção 3). A imagem de `referencia` é a `Image 1` do prompt.

```
id: 2026-11-05_reel_q1_v1
projeto: CLT Caótica
proporcao: 9:16
largura: 1080
altura: 1920
formato: png
semente: 2201
referencia: <link do Drive da imagem âncora, ou "nenhuma">
pasta: 1zI7f3YdviDNdHY8HYcQCU6hHRAzFrVLm
arquivo: 2026-11-05_reel_q1_v1.png
prompt:
Use: vertical 9:16 panel for an Instagram comic reel. Image 1 is the character reference.
Style: ...
Character: The same woman shown in Image 1. ...
Scene: ...
Camera: ...
Composition: ...
Constraints: The image contains no text of any kind. ... No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

## Resposta (agente para Claude)

Na mesma conversa do pedido, com o assunto `[CLT-PRONTO] <id>`. Formato definido pelo responsável em 2026-11-04:

```
id: 2026-11-05_reel_q1_v1
arquivo: 2026-11-05_reel_q1_v1.png
projeto: CLT Caótica
link: <link direto do arquivo no Google Drive>
status: concluido
```

- `id`: o ID do pedido.
- `arquivo`: o nome exato da imagem salva.
- `projeto`: o projeto do pedido.
- `link`: o link direto da imagem no Google Drive.
- `status`: `concluido`.

Se der erro, o assunto é `[CLT-ERRO] <id>`, com `status: erro` e uma linha `motivo:` explicando o que deu errado.

## Do lado do Claude

- O Gmail não chama o Claude sozinho. Depois de mandar os pedidos, o Claude agenda uma conferência da caixa de entrada.
- O Claude baixa a imagem, revisa pela lista da skill `storyboard-clt` e só então usa na montagem.

## A definir

- Os outros agentes, com o limite por dia, o modelo e se aceitam imagem de referência.
- Onde guardar o e-mail de cada agente fora do repositório, por exemplo num arquivo em `04_CONTROLE`.
- De qual conta saem os pedidos. O Gmail conectado ao Claude é de uma conta diferente da do Drive: ou o Gmail do Claude passa a ser a mesma conta do Drive, ou os agentes aceitam os pedidos vindos da conta conectada hoje.
- Se o uso proposto para `01_PEDIDOS`, `03_ENTREGAS` e `04_CONTROLE` está certo.
- Como o Claude baixa a imagem para o ambiente. Pelo conector do Drive, a imagem chega como texto codificado. Falta testar com a primeira imagem real se isso funciona. Se não funcionar, as opções são liberar na rede do ambiente o endereço do VPS, com o agente mandando um link direto, ou liberar o download do Drive, com o arquivo compartilhado por link.
- Como o Claude envia arquivos grandes, como os reels prontos, para `03_ENTREGAS`. O conector do Drive tem o mesmo limite.
- Qual modelo os agentes usam. Falta saber se ele aceita imagem de referência, que é o que mantém a personagem igual entre os quadros, e se a licença dele permite uso comercial.
