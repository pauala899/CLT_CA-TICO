# Fontes de geração de imagem

Atualizado em 2026-11-05. Todas as fontes são gratuitas e usam uma conta só por serviço, como decidido em `etapas-e-decisoes.md`.

## Fontes em uso

| Fonte | Para que serve | Como o Claude usa | Limite grátis |
|---|---|---|---|
| **Hugging Face**, Space `akhaliq/Qwen-Image-Edit-2511-LoRAs-Fast` | Quadros com a protagonista: edita a partir da âncora e mantém a personagem igual. Licença Apache 2.0. | `reels/scripts/gerar-imagem-hf.py`, com `HF_MCP_URL="https://huggingface.co/mcp?gradio=akhaliq/Qwen-Image-Edit-2511-LoRAs-Fast"` e a ferramenta `gr1_qwen_image_edit_2511_loras_fast_infer`. Saída de 608x1024. | Cerca de 1 a 2 imagens por dia (reserva 120 s de GPU por imagem). |
| **Hugging Face**, Space `mcp-tools/Z-Image-Turbo` | Cenários, objetos e imagens de apoio, sem a protagonista: só usa texto, e a personagem sai diferente. Licença Apache 2.0. | O mesmo script, com `HF_MCP_URL="https://huggingface.co/mcp?gradio=mcp-tools/Z-Image-Turbo"` e a ferramenta `gr1_z_image_turbo_generate`. Até 1152x2048 em 9:16. | Cerca de 3 a 5 imagens por dia (reserva 60 s por imagem). |
| **Pollinations** | Quadros com a protagonista, usando a âncora ou um quadro anterior como referência. Foi a fonte dos dois reels de teste. | `GET https://gen.pollinations.ai/image/<prompt>` com a chave `POLLINATIONS_API_KEY02`, modelo `black-forest-labs/flux.2-klein-4b` e `image=<link da referência>`. Saída de 768x1344. | Depende do Pollen das missões (0,005 pollen por imagem). Hoje o saldo está quase zerado. |
| **Agente de imagem 01**, no VPS do responsável | Fonte principal planejada. | Pedido por e-mail, conforme `base/protocolo-gerador-imagens.md`. | 5 imagens por dia. Ainda não respondeu ao pedido de teste. |

As duas entradas do Hugging Face dividem a mesma cota: de 3,5 a 5 minutos de GPU por dia na conta `tech-code2026`, renovada 24 horas depois do primeiro uso.

## Ordem de uso (proposta)

1. Agente de imagem 01, quando estiver funcionando.
2. Hugging Face: Qwen-Image-Edit para os quadros com a protagonista e Z-Image-Turbo para os de apoio.
3. Pollinations, enquanto houver Pollen das missões.

Se uma fonte falhar ou estiver sem cota, o Claude passa para a seguinte. Toda imagem é revisada pela lista da skill `storyboard-clt` antes de entrar na montagem.

## Avaliadas e não usadas

| Fonte | Motivo |
|---|---|
| Conector oficial do Hugging Face no Claude | Vem com os Spaces desligados ("gradio=none"). |
| API paga do Hugging Face (Inference Providers) | Respondeu "402 Payment Required": só funciona com créditos pagos. |
| Geração de imagem do Google (Gemini) | Não tem plano grátis para imagem. |
| `linoyts/qwen-image-2-1-realtime` | Gastaria só uns 14 s de GPU por imagem, mas o modelo Qwen-Image-2.1 tem licença de pesquisa (`qwen-research`), que não cobre uso comercial. |
| `KingNish/Realtime-FLUX` | Não aceita chamada pelo servidor MCP do Hugging Face e só usa texto. |
| `mrfakename/Z-Image-Turbo` | Igual ao `mcp-tools/Z-Image-Turbo`, sem ganho de cota. |
| `prithivMLmods/Flux.2-Klein-Edit-Ultra-Fast` | Reserva os mesmos 120 s do Qwen-Image-Edit, sem ganho de cota. |
| SDXL Turbo | Licença não comercial. |
| Space do Qwen-Image-Edit chamado direto com o token | O token iria para o código de um terceiro (o dono do Space). Bloqueado pela verificação de segurança. |
