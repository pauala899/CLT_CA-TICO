# Protocolo de pedidos de imagem (Claude e Hermes)

Proposta de 2026-11-04. Vale depois da aprovação do responsável.

O gerador de imagens é um agente Hermes no VPS do responsável, que gera as imagens com um modelo aberto rodando no próprio VPS. O Claude pede cada imagem por e-mail, e o Hermes responde quando a imagem estiver no Drive.

## Regras

- Uma imagem por pedido.
- O Hermes só aceita pedidos enviados pela própria conta `[e-mail a definir]` e com o assunto começando por `[CLT-PEDIDO]`. Ignora qualquer outro e-mail.
- O Hermes usa o prompt exatamente como veio, sem acrescentar nem tirar nada.
- A imagem original vai para o Drive sem edição.
- Para refazer uma imagem, o Claude manda um pedido novo com outro `id`, por exemplo com `-v2` no fim.
- O Claude só pede imagens de um storyboard aprovado e revisa cada imagem antes de usar.

## Pedido (Claude para Hermes)

Assunto: `[CLT-PEDIDO] <id>`

Corpo em texto puro, um campo por linha. Tudo o que vem depois da linha `prompt:` é o prompt.

```
id: 2026-11-05-reel-q1
largura: 768
altura: 1344
semente: 2201
referencia: <link do Drive da imagem âncora, ou "nenhuma">
pasta: <ID da pasta do Drive>
arquivo: 2026-11-05-reel-q1.png
prompt:
Keep the exact same character from the reference image: ... No text, no letters, no words, no numbers, no speech balloons, no logos, no watermark.
```

## Resposta (Hermes para Claude)

Na mesma conversa do pedido.

Imagem pronta, com o assunto `[CLT-PRONTO] <id>`:

```
id: 2026-11-05-reel-q1
link: <link do arquivo no Drive>
modelo: <nome do modelo usado>
semente: <semente usada>
largura: 768
altura: 1344
```

Erro, com o assunto `[CLT-ERRO] <id>`:

```
id: 2026-11-05-reel-q1
motivo: <o que deu errado>
```

## Do lado do Claude

- O Gmail não chama o Claude sozinho. Depois de mandar os pedidos, o Claude agenda uma conferência da caixa de entrada.
- O Claude baixa a imagem, revisa pela lista da skill `storyboard-clt` e só então usa na montagem.

## A definir

- O endereço de e-mail que o Hermes lê.
- A pasta do Drive onde o Hermes salva as imagens.
- Como o Claude baixa a imagem para o ambiente. Pelo conector do Drive, a imagem chega como texto e fica pesada demais. Opções: liberar na rede do ambiente o endereço do VPS, com o Hermes mandando um link direto da imagem, ou liberar o download do Drive, com o arquivo compartilhado por link.
- Qual modelo o Hermes usa. Falta saber se ele aceita imagem de referência, que é o que mantém a personagem igual entre os quadros, e se a licença dele permite uso comercial.
