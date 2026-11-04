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
| Revisão | Toda a estrutura feita, imagem ou vídeo, é revisada antes de ser apresentada, conforme a seção 11 do `CLAUDE.md`. |

Links do Drive:

- CLT Caótica: https://drive.google.com/drive/folders/1r07eCK20K-RPA94PsqOerfNQGD-ahbEp
- dias: https://drive.google.com/drive/folders/1gbVy2pF_IOKkHO1ah4vKdijPce7NPyfm
- base: https://drive.google.com/drive/folders/14kXF_S5AlTySF_c-bmq9AaxZg74-jxvR

## Pendente

| Item | Situação |
|------|----------|
| Onde ficam artes e vídeos | Proposta: no Drive, fora do GitHub, por serem arquivos pesados. Falta decidir se o Drive substitui o R2 ou se os dois serão usados. Até lá, a seção 11 do `CLAUDE.md` continua pedindo o R2. |
| Geração de imagens | Pollinations: acesso ainda não testado neste ambiente. Cloudflare Workers AI: precisa de conta e de chave cadastrada como segredo do ambiente. Proposta alternativa: o responsável gera as imagens no Google Flow e salva no Drive, e o Claude baixa de lá (ainda não testado). |
| Storyboard | Proposta: adaptar a skill `gerador-storyboard-video-1min` ao humor da marca, com a estrutura da seção 7 do `CLAUDE.md` e sem texto na imagem. Aguardando confirmação. |
| Cenas do Remotion | O responsável enviou 8 cenas de exemplo. Proposta: reescrevê-las em formato vertical, com as cores da marca e o texto vindo do roteiro aprovado. Aguardando confirmação. |
| Primeiro dia | Tema e data a definir pelo responsável. |
| Seção 9 do briefing | O `CLAUDE.md` pula da seção 8 para a 10. Confirmar se falta conteúdo. |
