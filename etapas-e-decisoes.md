# Etapas e decisões do projeto

Atualizado em 2026-11-04. Este arquivo registra o que já foi decidido e o que ainda está pendente. Ele vale junto com o `CLAUDE.md`.

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

Links do Drive:

- CLT Caótica: https://drive.google.com/drive/folders/1r07eCK20K-RPA94PsqOerfNQGD-ahbEp
- dias: https://drive.google.com/drive/folders/1gbVy2pF_IOKkHO1ah4vKdijPce7NPyfm
- base: https://drive.google.com/drive/folders/14kXF_S5AlTySF_c-bmq9AaxZg74-jxvR

## Pendente

| Item | Situação |
|------|----------|
| Onde ficam artes e vídeos | Proposta: no Drive, fora do GitHub, por serem arquivos pesados. Falta decidir se o Drive substitui o R2 ou se os dois serão usados. Até lá, a seção 11 do `CLAUDE.md` continua pedindo o R2. |
| Geração de imagens | Funcionando desde 2026-11-04, depois de liberar `gen.pollinations.ai` e `media.pollinations.ai` na rede do ambiente. Usa a chave secreta `POLLINATIONS_API_KEY02` (`sk_`); pela documentação do Pollinations, a chave pública (`pk_`) não autentica pedidos. A chave só gasta Pollen de missões (gratuito). No teste foram usados `black-forest-labs/flux.1-kontext-pro` (0,03 pollen por imagem) e `black-forest-labs/flux.2-klein-4b` (0,005), os dois com imagem de referência. O Pollen de missões quase acabou: em 2026-11-05 o teste da sexta gastou mais 0,02 e sobrou cerca de 0,004, pela conta dos pedidos, menos que uma imagem. Para continuar: fazer missões no painel ou liberar Pollen pago na chave. Para eu ver o saldo, a chave precisa da permissão `account:usage`. Cloudflare: a chave `CLOUDFLARE_API_TOKEN` foi recusada (parece ser a chave secreta do R2) e falta o ID da conta. |
| Storyboard | Skill criada em `.claude/skills/storyboard-clt/` e usada no teste `testes/2026-11-04-reel-cafe/storyboard.md`. Aguardando aprovação do conteúdo. |
| Reel de teste | Projeto do Remotion em `reels/`, com o teste da piada do café em duas versões: `ReelTesteCafe` (ilustrações provisórias em código) e `ReelTesteCafeIlustrado` (ilustrações do Pollinations). As ilustrações ficam em `reels/public/artes/`, fora do GitHub, e por enquanto só existem neste ambiente e em links não listados do Pollinations, que expiram em 30 dias. No quadro 3 a personagem cospe o café, diferente do storyboard. Aguardando aprovação do visual, do movimento e do quadro 3. |
| Reel de teste da sexta | Pedido do responsável em 2026-11-05, para ver a qualidade: piada nova, escrita pelo Claude, "a sexta-feira que não acabou", na composição `ReelTesteSexta`. Storyboard, falas e prompts em `testes/2026-11-05-reel-sexta/storyboard.md`. Imagens do Pollinations em `reels/public/artes/2026-11-05/`, fora do GitHub, com o padrão de nomes decidido. Aguardando aprovação das falas, do visual e do movimento. |
| Som dos reels | Teste em 2026-11-05, a pedido do responsável, na composição `ReelTesteSextaSom`. Vozes da API do Gemini (`gemini-2.5-flash-preview-tts` e `gemini-3.1-flash-tts-preview`), com a chave `GOOGLE_API_KEY`, no plano gratuito, que tem limite diário de pedidos; no plano gratuito o Google pode usar os textos e áudios para melhorar os produtos dele. A cota de 4 milhões de caracteres por mês citada pelo responsável é da Cloud Text-to-Speech, com vozes Standard, menos expressivas. Efeitos sintetizados em código (`reels/scripts/gerar-efeitos.py`), sem licença de terceiros. Sem música por enquanto: falta decidir a fonte (biblioteca do Instagram ou Pixabay, conferindo a licença de cada faixa). Aguardando aprovação das vozes e dos efeitos. |
| Cores e fontes | Proposta usada no teste: amarelo `#FFD60A`, magenta `#E6007E`, preto `#111111` e branco `#FFFFFF`; Bangers nas falas e Anton nos títulos, ambas de licença aberta (SIL OFL). Aguardando aprovação. |
| Chamada para ação | O briefing não define a frase do fechamento dos reels. O teste termina só com o nome da marca. |
| Primeiro dia | Tema e data a definir pelo responsável. |
| Seção 9 do briefing | O `CLAUDE.md` pula da seção 8 para a 10. Confirmar se falta conteúdo. |
| Protocolo do gerador | Proposta do formato dos e-mails, do nome dos arquivos e do uso das pastas em `base/protocolo-gerador-imagens.md`. O responsável criou no Drive a pasta `CENTRAL IA`, com `01_PEDIDOS`, `02_IMAGENS`, `03_ENTREGAS` e `04_CONTROLE`; os IDs estão no protocolo. Primeiro pedido de teste (`base_ancora_v1`, a âncora nova sem referência) enviado ao agente de imagem 01 em 2026-11-04, aguardando a resposta. Falta definir os outros agentes, confirmar o uso das pastas, testar como o Claude baixa e envia arquivos pelo Drive e saber qual modelo os agentes usam, se ele aceita imagem de referência e se a licença permite uso comercial. |
