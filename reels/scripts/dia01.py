"""Conteúdo do dia 01 (07/11/2026), conforme o roteiro "Dia 1 (07/11) - pacote completo" do Drive.

Falas exatas do roteiro. Quando o roteiro tinha um erro ou uma imagem que não batia com a fala,
o ajuste está marcado com AJUSTE e precisa de aprovação do responsável.

Imagens: cópia escolhida de cada id entre as entregas do LOTE-005 (ver MAPA_IMAGENS).
"""

# Cópia escolhida de cada id. Os nomes são os arquivos baixados da pasta IMAGENS PARA CLAUDE.
MAPA_IMAGENS = {
    "reel_q1": "2026-11-07_reel_q1_v4__1QoKwY.jpg",
    "reel_q2": "2026-11-07_reel_q2_v4__1mf-1R.jpg",
    "reel_q3": "2026-11-07_reel_q3_v4__1uHPwo.jpg",
    "reel_q4": "2026-11-07_reel_q4_v4__1qVHpt.jpg",
    "reel_q5": "2026-11-07_reel_q5_v4__1H_vGR.jpg",
    "reel_q6": "2026-11-07_reel_q6_v4__13M_vj.jpg",
    "reel_q7": "2026-11-07_reel_q7_v4__1MTZ7z.jpg",
    "reel_q8": "2026-11-07_reel_q8_v4__1Y_5HV.jpg",
    "reel_q9": "2026-11-07_reel_q9_v4__1fF1sw.jpg",
    "reel_q10": "2026-11-07_reel_q10_v4__1iDeYu.jpg",
    "reel_q11": "2026-11-07_reel_q11_v4__1DsyLX.jpg",
    "reel_q12": "2026-11-07_reel_q12_v4__12ZgvH.jpg",
    "reel_q13": "2026-11-07_reel_q13_v4__1dZtuM.jpg",
    "story_q1": "2026-11-07_story_q1_v4__1g0903.jpg",
    "story_q2": "2026-11-07_story_q2_v4__1J-FJY.jpg",
    "story_q3": "2026-11-07_story_q3_v4__1wj_RU.jpg",
    "story_q4": "2026-11-07_story_q4_v4__1lv1us.jpg",
    "story_q5": "2026-11-07_story_q5_v4__1v-yed.jpg",
    "story_q6": "2026-11-07_story_q6_v4__1MHAYJ.jpg",
    "story_q7": "2026-11-07_story_q7_v4__11ioCt.jpg",
    "story_q8": "2026-11-07_story_q8_v4__1hHTdj.jpg",
    "carrossel1_q1": "2026-11-07_carrossel1_q1_v4__1x8c_s.jpg",
    "carrossel1_q2": "2026-11-07_carrossel1_q2_v4__12omzi.jpg",
}

# Vozes: cada personagem tem uma voz e um modelo. Um modelo tem cota própria, então
# dividimos as falas entre os dois para não estourar o limite diário de um só.
VOZES = {
    "ela": {"modelo": "gemini-2.5-flash-preview-tts", "reserva": "gemini-3.1-flash-tts-preview", "voz": "Laomedeia",
            "direcao": "Say naturally, with a dry, slightly tired and ironic tone:"},
    "chefe": {"modelo": "gemini-3.1-flash-tts-preview", "reserva": "gemini-2.5-flash-preview-tts", "voz": "Fenrir",
              "direcao": "Say in a deep, bossy, authoritative voice, calm but menacing:"},
    "colega": {"modelo": "gemini-2.5-flash-preview-tts", "reserva": "gemini-3.1-flash-tts-preview", "voz": "Leda",
               "direcao": "Say in a high-pitched, excited whisper, gossiping:"},
    "narrador": {"modelo": "gemini-2.5-flash-preview-tts", "reserva": "gemini-3.1-flash-tts-preview", "voz": "Charon",
                 "direcao": "Narrate in a flat, dramatic voice:"},
}
# Pensamento: a mesma voz da personagem, mais baixa e com eco (feito no ffmpeg).
DIRECAO_PENSA = "Say quietly and slowly, as if thinking to herself, a little exaggerated:"

# Quadros do reel. Cada fala: (tipo, quem, texto). tipo: fala | pensa | narracao.
# imagemDesce: quanto a ilustração desce, para abrir espaço para o balão acima da cabeça.
REEL = {
    "titulo": "Dia 01: feedback de cinco minutos",
    "quadros": [
        {"id": "reel_q1", "papel": "expectativa", "desce": 160, "falas": [
            ("fala", "ela", "Hoje o dia vai ser tranquilo."),
            ("pensa", "ela", "Já devia ter desconfiado, o chefe chegou sorrindo.")]},
        {"id": "reel_q2", "papel": "interrupcao", "desce": 160, "falas": [
            ("fala", "chefe", "Tem um minutinho?")]},
        {"id": "reel_q3", "papel": "escalada", "desce": 260, "falas": [
            ("fala", "chefe", "É só um feedback rápido."),
            ("pensa", "ela", "Feedback rápido é o nome que chefe dá para aula de duas horas.")]},
        {"id": "reel_q4", "papel": "expectativa", "desce": 200, "falas": [
            ("fala", "ela", "Claro, pode falar."),
            ("pensa", "ela", "Claro é a palavra que eu digo quando estou com fome e sem saída.")]},
        {"id": "reel_q5", "papel": "escalada", "desce": 0, "falas": [
            ("fala", "chefe", "Gostei muito do seu trabalho.")]},
        {"id": "reel_q6", "papel": "escalada", "desce": 200, "falas": [
            ("fala", "chefe", "Só uma coisinha: refaz tudo, e é pra ontem."),
            ("pensa", "ela", "Gostei muito. Essa frase é sempre o começo de um sofrimento.")]},
        {"id": "reel_q7", "papel": "expectativa", "desce": 260, "falas": [
            ("fala", "ela", "Perfeito! Vou ajustar."),
            ("pensa", "ela", "Vou ajustar minha paciência, que já está no limite.")]},
        {"id": "reel_q8", "papel": "interrupcao", "desce": 160, "falas": [
            ("fala", "colega", "Ele te chamou na sala? Não me diz que foi de novo.")]},
        {"id": "reel_q9", "papel": "expectativa", "desce": 260, "falas": [
            ("pensa", "ela", "De novo? Eu ainda nem entendi se fui promovida ou demitida.")]},
        {"id": "reel_q10", "papel": "expectativa", "desce": 160, "falas": [
            ("fala", "ela", "Estou ótima."),
            ("pensa", "ela", "Já virei um feedback vivo.")]},
        {"id": "reel_q11", "papel": "narracao", "desce": 0, "falas": [
            ("narracao", "narrador", "Duas horas depois.")]},
        {"id": "reel_q12", "papel": "punchline", "desce": 260, "falas": [
            ("pensa", "ela", "E o relatório ainda está faltando o resto do ano.")]},
        {"id": "reel_q13", "papel": "punchline", "desce": 160, "falas": [
            ("fala", "ela", "Feedback de cinco minutos. Duas horas de reunião. Um ano de paciência.")]},
    ],
    "fechamento": "CLT Caótica",
}

# Legenda e comentário fixado do reel, do roteiro do Drive.
LEGENDA_REEL = ("Feedback rápido, reunião de duas horas. Me conta aqui: qual foi o seu feedback "
                "mais \"rápido\" da vida? 👇")
COMENTARIO_FIXADO = "O meu durou um ano inteiro. Alguém supera?"

# Stories 3 a 6: cada um tem dois quadros (imagem, tipo, quem, texto).
# Stories 1 e 2 não são montados: são recortes do reel (Q1 a Q6 e Q7 a Q13).
STORIES = {
    3: {"titulo": "Story 3: enquete", "quadros": [
        ("story_q1", ("fala", "ela", "Seu chefe já disse: é só um feedback rápido?")),
        ("story_q2", ("pensa", "ela", "Eu sei que já disse."))],
        "obs": "Enquete no app ao postar: Já / Muitas vezes. Não vai no vídeo."},
    4: {"titulo": "Story 4: caixa de pergunta", "quadros": [
        ("story_q3", ("fala", "ela", "Qual foi o \"só um minutinho\" mais longo da sua vida?")),
        ("story_q4", ("pensa", "ela", "O meu durou até a hora do almoço."))],
        "obs": "Caixa de pergunta no app ao postar. Não vai no vídeo. AJUSTE: o roteiro dizia 'o só um minutinho', sem aspas."},
    5: {"titulo": "Story 5: meme em texto", "quadros": [
        ("story_q5", ("fala", "ela", "Feedback rápido, versão real:")),
        ("story_q6", ("pensa", "ela", "Cinco minutos de conversa, duas horas de reunião e um ano de paciência."))],
        "obs": "AJUSTE de imagem: story_q5 aponta o dedo para cima, e o roteiro pedia para o lado do espectador."},
    6: {"titulo": "Story 6: chamada para comentar", "quadros": [
        ("story_q7", ("fala", "ela", "Vai lá no reel e comenta o seu feedback mais longo!")),
        ("story_q8", ("pensa", "ela", "Eu quero ver se alguém supera o meu."))],
        "obs": "AJUSTE de imagem: story_q7 tem as mãos nas bochechas, e o roteiro pedia a personagem chamando."},
}

# Carrossel "Tradutor de chefe", 4:5 (1080x1350). Os slides 2 a 5 trazem a frase do chefe e a tradução.
CARROSSEL = [
    {"tipo": "capa", "imagem": "carrossel1_q1", "titulo": "Tradutor de chefe"},
    {"tipo": "traducao", "imagem": "reel_q2", "frase": "Tem um minutinho?", "traducao": "Cancele seus planos."},
    {"tipo": "traducao", "imagem": "reel_q5", "frase": "Gostei muito do seu trabalho.", "traducao": "Vem coisa aí.",
     "obs": "AJUSTE: a frase está no quadro 5 (caneca com ondas), e não no quadro 4 como dizia o roteiro."},
    {"tipo": "traducao", "imagem": "reel_q6", "frase": "Refaz tudo, é pra ontem.", "traducao": "Meu fim de semana acabou."},
    {"tipo": "traducao", "imagem": "reel_q7", "frase": "Perfeito, vou ajustar.", "traducao": "Estou me segurando.",
     "obs": "AJUSTE: a frase está no quadro 7, e não no quadro 13 como dizia o roteiro."},
    {"tipo": "fechamento", "imagem": "carrossel1_q2", "pergunta": "Qual frase de chefe você traduziria? Comenta aqui."},
]
LEGENDA_CARROSSEL = "Traduzi as frases do chefe. Faltou alguma? Comenta a sua aqui embaixo."
