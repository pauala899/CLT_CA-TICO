# Etapas e decisões do projeto

Atualizado em 2026-11-05. Este arquivo registra o que já foi decidido e o que ainda está pendente. Ele vale junto com o `CLAUDE.md`.

## Regra: conferir antes de presumir

Antes de qualquer ação:

1. Ler este arquivo e conferir se o assunto já foi decidido.
2. Se não foi decidido, perguntar ao responsável pelo projeto. Uma proposta só vira decisão depois que ele confirmar.
3. Antes de dizer que algo foi feito (push, merge, envio para o Drive, upload), conferir no lugar real: GitHub, Drive ou o próprio arquivo.
4. Antes de passar um link ou um passo a passo de outro serviço, conferir se ele existe e está atualizado.
5. Quando um pedido for ambíguo, confirmar o entendimento antes de agir. Exemplo: "repositório novo" era o repositório recém-criado, não um segundo repositório.
6. Antes de criar, alterar ou apagar algo fora da sessão (repositório, Drive, R2, redes sociais), confirmar com o responsável.
7. Ao concluir uma etapa ou receber uma decisão, atualizar este arquivo.

## Decidido

| Item | Decisão |
|------|---------|
| Repositório | `pauala899/CLT_CA-TICO`, branch `main`. |
| Briefing | `CLAUDE.md`, mesclado no PR #1 em 2026-11-04. |
| Ficha e guia | `base/ficha-personagem.md` e `base/guia-visual.md`. |
| Estrutura dos dias | `dias/AAAA-MM-DD/`, conforme a seção 10 do `CLAUDE.md`. Status das peças em `dias/registro-aprovacao.md`. |
| Google Drive | Pasta "CLT Caótica" criada no Meu Drive, com as subpastas `dias` e `base`. Links abaixo. |
| Alterações no GitHub | Branch novo, commit, push e PR como rascunho. O responsável tira do rascunho e faz o merge. O Claude não faz merge sem pedido. |
| Credenciais | Nunca enviar no chat. Cadastrar como segredo do ambiente. |
| Publicação | Manual, só depois da aprovação humana. O Claude não publica. |
| Geração de vídeo | Não há gerador de vídeo por API no momento. O Google Flow só funciona no navegador, com cota grátis de 30 segundos por dia, e quem usa é o responsável. |
| Montagem | Feita pelo Claude. |
| Formato do reel | Ilustrações paradas animadas com motion graphics (texto animado, balões, transições), sem gerador de vídeo. Os motion graphics são feitos em código pelo Claude, no Remotion, escolha do responsável no lugar do Claude Motion. |
| Revisão | Toda a estrutura feita, imagem ou vídeo, é revisada antes de ser apresentada, conforme a seção 11 do `CLAUDE.md`. |
| Gerador de imagens no VPS | Decidido em 2026-11-04. Um agente Hermes no VPS do responsável gera as imagens com um modelo aberto rodando no próprio VPS. O Claude pede as imagens por e-mail e recebe a resposta quando a imagem estiver no Drive. |
| Formato dos prompts de imagem | Pedido do responsável em 2026-11-04: seguir o jeito de escrever do Nano Banana e do GPT Image 2, com frases completas em blocos rotulados (`Use`, `Style`, `Character`, `Scene`, `Camera`, `Composition`, `Constraints`). O modelo fica na seção 3 da skill `storyboard-clt`. |
| Identificação dos pedidos e nome dos arquivos | Decidido em 2026-11-04, para todos os pedidos enviados pelo Claude: `AAAA-MM-DD_<peça>_<quadro>_v<versão>`, por exemplo `2026-11-05_reel_q1_v1`. A peça é `reel`, `story`, `feed` ou `carrossel1` a `carrossel5`; o quadro segue a ordem de leitura (`q1`, `q2`...); a versão começa em `v1` e sobe a cada refação. O `id` do pedido é o nome do arquivo sem a extensão. A âncora da personagem é `base_ancora_v1`. Detalhes em `base/protocolo-gerador-imagens.md`. |
| Regras do Gerenciador V4 | Decidido em 2026-11-04. O gerenciador dos agentes de imagem não altera os nomes definidos pelo Claude, não confunde versões diferentes, não sobrescreve imagens anteriores, preserva a âncora da personagem e registra cada imagem recebida e processada. Como cada regra se aplica está em `base/protocolo-gerador-imagens.md` (proposta). |
| Modelo de reel | Aprovado pelo responsável em 2026-11-05 ("gostei demais deste modelo"): o reel de teste da sexta com voz e efeitos, composição `ReelTesteSextaSom`, com a legenda em `testes/2026-11-05-reel-sexta/legenda.md`. É a referência para os próximos reels: 4 quadros (expectativa, interrupção, escalada e punchline) e o fechamento, balões animados, ilustrações no estilo do teste, vozes da API do Gemini, efeitos sintetizados em código e legenda com chamada para comentar e marcar. Detalhes em `testes/2026-11-05-reel-sexta/storyboard.md`. |
| Cores e fontes | Aprovadas junto com o modelo de reel em 2026-11-05: amarelo `#FFD60A`, magenta `#E6007E`, preto `#111111` e branco `#FFFFFF`; Bangers nas falas e Anton nos títulos, ambas de licença aberta (SIL OFL). |
| Custo da geração de imagens | Decidido pelo responsável em 2026-11-05: buscar só opções gratuitas. Nada de gerar imagem paga. Cada serviço com uma conta só, sem somar contas para multiplicar cota. |
| Fontes de geração de imagem | Decidido pelo responsável em 2026-11-05: o Hugging Face é uma fonte de imagens e o Pollinations é outra, junto com o agente de imagem 01. Como usar cada uma, os limites e a ordem de uso (proposta) estão em `base/fontes-imagem.md`. |
| Frequência e durações | Decidido pelo responsável em 2026-11-05: 1 reel por dia, de 45 a 60 s; 6 stories por dia, em vídeo de 20 a 30 s; 5 carrosséis por semana, de 5 a 7 imagens. Detalhes em `planejamento/producao.md`. |
| Número de quadros | Decidido em 2026-11-05: não é fixo. Cada peça usa os quadros que a história precisar. A skill `storyboard-clt` e a seção 3 do `CLAUDE.md` ainda dizem o contrário, e ficam para ajuste depois de confirmação. |
| Formato em quadrinho | Decidido em 2026-11-05: as peças são quadrinhos. A imagem sai sem texto, e os balões entram depois. Um mesmo quadro serve ao reel, ao story e ao carrossel. |
| Som | Decidido em 2026-11-05: estímulo visual e sonoro juntos. Stories e reels têm som, com voz e efeito no tempo de cada quadro. O carrossel fica sem som. |
| Conteúdo | Decidido pelo responsável em 2026-11-05: humor ácido e ironia forte, com pensamentos intrusivos em balão de pensamento. Cenas principais: casa, trabalho e academia. Toda peça leva chamada para comentar. |
| Capacidade de produção | Decidido pelo responsável em 2026-11-05: 50 imagens por dia no início. Novos agentes quando a necessidade passar de 45 por dia. |
| Foco da próxima etapa | Decidido pelo responsável em 2026-11-06: a persona vem antes do público, que fica em aberto por falta de dados. Sem nome fictício: a personagem representa o trabalhador CLT. Proposta da persona em `base/personagem-universo.md`, aguardando aprovação. |
| Planejamento de conteúdo | Decidido pelo responsável em 2026-11-06: os vídeos de teste servem só para validar o formato, e não como base de conteúdo. O planejamento recomeça do zero, em etapas: público, personagem, pilares, semana-modelo e ideias. |
| Pasta de material no Drive | Criada em 2026-11-06, no Meu Drive: "CLT Caótica - Material", com `01-planejamento`, `02-dias`, `03-aprovados` e `04-testes`. Link: https://drive.google.com/drive/folders/1GkbiaWU7Fdph-ONmQXHl2MzgJAlDdwdO. A pasta antiga "CLT Caótica" segue na lixeira, sem alteração. |
| Usuário do Instagram | Decidido pelo responsável em 2026-11-06: `@cltcaotica`, confirmado livre. A conta é criada pelo responsável, em conta profissional de criador de conteúdo. |
| Automação de comentários e DMs | Decidido pelo responsável em 2026-11-06: SendPulse, no plano gratuito. Respostas só para palavras-chave previstas, com textos aprovados antes. O plano gratuito cobre 3 chatbots e 10 mil mensagens por mês, segundo a SendPulse. O teto de assinantes ainda está em aberto: sites de terceiros citam 500, e a SendPulse diz que o plano gratuito não limita assinantes. Confirmar também se as respostas a comentários contam como mensagens. |

Links do Drive:

- CLT Caótica: https://drive.google.com/drive/folders/1r07eCK20K-RPA94PsqOerfNQGD-ahbEp
- dias: https://drive.google.com/drive/folders/1gbVy2pF_IOKkHO1ah4vKdijPce7NPyfm
- base: https://drive.google.com/drive/folders/14kXF_S5AlTySF_c-bmq9AaxZg74-jxvR

## Pendente

| Item | Situação |
|------|----------|
| Música dos vídeos | Pendente: gravar uma faixa livre no vídeo, ou escolher a música no Instagram na hora de publicar. |
| Agentes de imagem | Pendente: confirmar 10 agentes de 5 imagens por dia, quais aceitam imagem de referência, e os e-mails de cada um (fora do repositório). |
| Ciclo de produção | Proposta: pedido de manhã, resposta dos agentes à noite e edição no dia seguinte. Aguarda confirmação. |
| Ferramenta paga de imagem | Pendente: a conversa indicou pagar uma ferramenta, mas a decisão de custo acima ainda diz "só gratuito". Confirmar e atualizar o registro de custo. |
| Clipe animado pelos agentes | Adiado pelo responsável em 2026-11-06 ("esquece gif por enquanto"). Não usar por enquanto. Se voltar, a proposta era um clipe de 4 segundos em MP4, não GIF, com teste e aprovação, porque muda a regra "sem gerador de vídeo". |
| Skill e briefing | Pendente: atualizar a skill `storyboard-clt` e as seções 3, 7 e 8 do `CLAUDE.md` com as durações e quantidades novas. |
| Pasta "CLT Caótica" no Drive | Pendente: a pasta está na lixeira. Restaurar, ou trocar o destino dos arquivos. |
| R2 | Pendente: a seção 11 do `CLAUDE.md` ainda pede confirmar o armazenamento no R2, mesmo com a parte de Cloudflare retirada. |
| Configuração do SendPulse | Pendente: confirmar os limites do plano gratuito, conectar a conta profissional do Instagram, cadastrar as palavras-chave e pelo menos três variações de resposta por palavra-chave, porque o Instagram limita contas que repetem o mesmo texto. Os textos precisam de aprovação antes de ir ao ar. |
| Capacidade do agente 01 | Informada pelo responsável em 2026-11-06: mais de 100 imagens por dia. Ainda não verificada no primeiro lote (LOTE-001, enviado em 2026-11-06, sem resposta até agora). |
| Termo "bipolar" na persona | Pendente: sugerido trocar por "emoções intensas" ou "oscilações de humor", por causa do estigma. Decisão do responsável. |
| Público | Pendente: sem dados ainda. Decidir depois da persona. |
| Licença das imagens e da voz | Pendente: as imagens saem de modelos abertos, e a voz do Gemini tem regras próprias no plano gratuito. Conferir a licença de cada um antes de publicar, para confirmar que é uso comercial. |
| Onde ficam artes e vídeos | Proposta: no Drive, fora do GitHub, por serem arquivos pesados. Falta decidir se o Drive substitui o R2 ou se os dois serão usados. Até lá, a seção 11 do `CLAUDE.md` continua pedindo o R2. |
| Geração de imagens | Funcionando desde 2026-11-04, depois de liberar `gen.pollinations.ai` e `media.pollinations.ai` na rede do ambiente. Usa a chave secreta `POLLINATIONS_API_KEY02` (`sk_`); pela documentação do Pollinations, a chave pública (`pk_`) não autentica pedidos. A chave só gasta Pollen de missões (gratuito). No teste foram usados `black-forest-labs/flux.1-kontext-pro` (0,03 pollen por imagem) e `black-forest-labs/flux.2-klein-4b` (0,005), os dois com imagem de referência. O Pollen de missões quase acabou: em 2026-11-05 o teste da sexta gastou mais 0,02 e sobrou cerca de 0,004, pela conta dos pedidos, menos que uma imagem. Para continuar: fazer missões no painel ou liberar Pollen pago na chave. Para eu ver o saldo, a chave precisa da permissão `account:usage`. Cloudflare: a chave `CLOUDFLARE_API_TOKEN` foi recusada (parece ser a chave secreta do R2) e falta o ID da conta. |
| Storyboard | Skill criada em `.claude/skills/storyboard-clt/` e usada no teste `testes/2026-11-04-reel-cafe/storyboard.md`. Aguardando aprovação do conteúdo. |
| Reel de teste | Projeto do Remotion em `reels/`, com o teste da piada do café em duas versões: `ReelTesteCafe` (ilustrações provisórias em código) e `ReelTesteCafeIlustrado` (ilustrações do Pollinations). As ilustrações ficam em `reels/public/artes/`, fora do GitHub, e por enquanto só existem neste ambiente e em links não listados do Pollinations, que expiram em 30 dias. No quadro 3 a personagem cospe o café, diferente do storyboard. Aguardando aprovação do visual, do movimento e do quadro 3. |
| Música dos reels | O modelo aprovado não tem música. Falta decidir a fonte: a biblioteca do próprio Instagram, na hora de postar, ou a Pixabay, conferindo a licença de cada faixa. As vozes saem da API do Gemini, no plano gratuito, com a chave `GOOGLE_API_KEY`: há limite diário de pedidos, e nesse plano o Google pode usar os textos e áudios para melhorar os produtos dele. A cota de 4 milhões de caracteres por mês citada pelo responsável é da Cloud Text-to-Speech, com vozes Standard, menos expressivas. |
| Chamada para ação | O briefing não define a frase do fechamento dos reels. O teste termina só com o nome da marca. |
| Primeiro dia | Tema e data a definir pelo responsável. |
| Seção 9 do briefing | O `CLAUDE.md` pula da seção 8 para a 10. Confirmar se falta conteúdo. |
| Protocolo do gerador | Proposta do formato dos e-mails, do nome dos arquivos e do uso das pastas em `base/protocolo-gerador-imagens.md`. O responsável criou no Drive a pasta `CENTRAL IA`, com `01_PEDIDOS`, `02_IMAGENS`, `03_ENTREGAS` e `04_CONTROLE`; os IDs estão no protocolo. Primeiro pedido de teste (`base_ancora_v1`, a âncora nova sem referência) enviado ao agente de imagem 01 em 2026-11-04, aguardando a resposta. Falta definir os outros agentes, confirmar o uso das pastas, testar como o Claude baixa e envia arquivos pelo Drive e saber qual modelo os agentes usam, se ele aceita imagem de referência e se a licença permite uso comercial. |
| Hugging Face | Funcionando desde 2026-11-05, de graça, na conta `tech-code2026`, pelo servidor MCP oficial do Hugging Face com o token `HF_TOKEN` (script `reels/scripts/gerar-imagem-hf.py`). O token vai só para huggingface.co, e o próprio Hugging Face roda o Space. O conector oficial do Hugging Face no Claude não serve: vem com os Spaces desligados ("gradio=none"). A API paga do Hugging Face (Inference Providers) respondeu "402 Payment Required" e fica descartada. Spaces testados: `akhaliq/Qwen-Image-Edit-2511-LoRAs-Fast`, que edita a partir da âncora e manteve a personagem igual (saída de 608x1024), e `mcp-tools/Z-Image-Turbo`, que só usa texto e muda a personagem (serve para cenários e apoio). Limite: a cota grátis de GPU é de 3,5 a 5 minutos por dia, e cada imagem consome o tempo reservado pelo Space (60 s no Z-Image, 120 s no Qwen). Na prática, de 1 a 2 imagens por dia com o Qwen, ou de 3 a 5 com o Z-Image. |
