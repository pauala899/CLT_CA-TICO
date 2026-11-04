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

Links do Drive:

- CLT Caótica: https://drive.google.com/drive/folders/1r07eCK20K-RPA94PsqOerfNQGD-ahbEp
- dias: https://drive.google.com/drive/folders/1gbVy2pF_IOKkHO1ah4vKdijPce7NPyfm
- base: https://drive.google.com/drive/folders/14kXF_S5AlTySF_c-bmq9AaxZg74-jxvR

## Pendente

| Item | Situação |
|------|----------|
| Onde ficam artes e vídeos | Proposta: no Drive, fora do GitHub, por serem arquivos pesados. Falta decidir se o Drive substitui o R2 ou se os dois serão usados. Até lá, a seção 11 do `CLAUDE.md` continua pedindo o R2. |
| Geração de imagens | Funcionando desde 2026-11-04, depois de liberar `gen.pollinations.ai` e `media.pollinations.ai` na rede do ambiente. Usa a chave secreta `POLLINATIONS_API_KEY02` (`sk_`); pela documentação do Pollinations, a chave pública (`pk_`) não autentica pedidos. A chave só gasta Pollen de missões (gratuito). No teste foram usados `black-forest-labs/flux.1-kontext-pro` (0,03 pollen por imagem) e `black-forest-labs/flux.2-klein-4b` (0,005), os dois com imagem de referência. O Pollen de missões quase acabou (cerca de 0,024, pela conta dos pedidos). Para continuar: fazer missões no painel ou liberar Pollen pago na chave. Para eu ver o saldo, a chave precisa da permissão `account:usage`. Cloudflare: a chave `CLOUDFLARE_API_TOKEN` foi recusada (parece ser a chave secreta do R2) e falta o ID da conta. |
| Storyboard | Skill criada em `.claude/skills/storyboard-clt/` e usada no teste `testes/2026-11-04-reel-cafe/storyboard.md`. Aguardando aprovação do conteúdo. |
| Reel de teste | Projeto do Remotion em `reels/`, com o teste da piada do café em duas versões: `ReelTesteCafe` (ilustrações provisórias em código) e `ReelTesteCafeIlustrado` (ilustrações do Pollinations). As ilustrações ficam em `reels/public/artes/`, fora do GitHub, e por enquanto só existem neste ambiente e em links não listados do Pollinations, que expiram em 30 dias. No quadro 3 a personagem cospe o café, diferente do storyboard. Aguardando aprovação do visual, do movimento e do quadro 3. |
| Cores e fontes | Proposta usada no teste: amarelo `#FFD60A`, magenta `#E6007E`, preto `#111111` e branco `#FFFFFF`; Bangers nas falas e Anton nos títulos, ambas de licença aberta (SIL OFL). Aguardando aprovação. |
| Chamada para ação | O briefing não define a frase do fechamento dos reels. O teste termina só com o nome da marca. |
| Primeiro dia | Tema e data a definir pelo responsável. |
| Seção 9 do briefing | O `CLAUDE.md` pula da seção 8 para a 10. Confirmar se falta conteúdo. |
| Protocolo do gerador | Proposta do formato dos e-mails, do nome dos arquivos e do uso das pastas em `base/protocolo-gerador-imagens.md`. O responsável criou no Drive a pasta `CENTRAL IA`, com `01_PEDIDOS`, `02_IMAGENS`, `03_ENTREGAS` e `04_CONTROLE`; os IDs estão no protocolo. Falta definir o e-mail de cada agente, confirmar o uso das pastas, testar como o Claude baixa e envia arquivos pelo Drive e saber qual modelo os agentes usam, se ele aceita imagem de referência e se a licença permite uso comercial. |
