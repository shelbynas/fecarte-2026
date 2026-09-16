const storyData = {
    prologo: {
      id: "prologo",
      titulo: "🎬 PRÓLOGO — Antes de Iniciar",
      texto: `Denver, Colorado — 1978.
  A cidade está com medo. Nas últimas semanas, cinco garotos desapareceram sem deixar rastro. As crianças sussurram o nome dele no recreio, os adultos fingem que não ouvem. Mas todo mundo sabe: o Grabber está lá fora.
  
  Ele usa máscaras assustadoras. Oferece balões pretos para os meninos que encontra. E ninguém que entrou na van dele jamais voltou.
  
  Você é Finney Shaw, 13 anos. Você é esperto — e isso pode ser a única coisa que vai te salvar. Enquanto isso, sua irmã Gwen tem sonhos estranhos que mostram coisas que ainda não aconteceram. E esta noite ela sonhou com você num porão escuro, com um telefone preto tocando na parede.
  
  O telefone vai tocar. E do outro lado da linha, os mortos vão falar.`,
      isRinging: false,
      botoes: [{ texto: "🔘 [COMEÇAR]", destino: "cap1" }]
    },
  
    cap1: {
      id: "cap1",
      titulo: "📖 CAPÍTULO 1 — O DESPERTAR",
      texto: `A primeira coisa que você sente é o cheiro de mofo, ferrugem e poeira velha. Você está deitado num colchão fino no chão de concreto frio. Sua cabeça dói.
  
  Você se lembra da van preta, do homem de máscara e do balão preto...
  Pendurado na parede há um telefone preto de disco. O fio está arrancado, pendurado inerte. É impossível que ele funcione.
  
  E é exatamente por isso que, quando ele começa a tocar, seu sangue gela.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap2a" },
        { texto: "🔘 [Ignorar e procurar uma saída]", destino: "cap2b" },
        { texto: "🔘 [Gritar por ajuda]", destino: "cap2c" }
      ]
    },
  
    cap2a: {
      id: "cap2a",
      titulo: "📖 CAPÍTULO 2A — A VOZ DO OUTRO LADO",
      texto: `Sua mão treme ao aproximar o fone do ouvido. Uma voz de garoto, meio distorcida, fala:
  "Meu nome é Robin. Robin Arellano. Eu já estive onde você está agora. O Grabber vai querer brincar com você, mas você pode lutar."
  
  "Como? A porta está trancada!", você responde.
  "Tem sempre uma saída, garoto. Procure no chão. Há algo solto. Uma pedra que se move. Fui eu que deixei."
  A ligação cai com um chiado.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Procurar algo solto no chão]", destino: "cap3a" },
        { texto: "🔘 [Perguntar em voz alta quem estava falando]", destino: "cap3b" },
        { texto: "🔘 [Desligar e tentar arrombar a porta]", destino: "cap3c" }
      ]
    },
  
    cap2b: {
      id: "cap2b",
      titulo: "📖 CAPÍTULO 2B — PROCURANDO UMA SAÍDA",
      texto: `Você ignora o telefone. Telefones sem fio não funcionam.
  Você tateia as paredes de concreto. A porta é de metal reforçado sem maçaneta interna. A janela está alta demais.
  O telefone continua tocando na parede. Insistente, desesperado.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Voltar e atender o telefone]", destino: "cap2a" },
        { texto: "🔘 [Tentar alcançar a janela]", destino: "cap3d" },
        { texto: "🔘 [Sentar e esperar o sequestrador voltar]", destino: "cap3e" }
      ]
    },
  
    cap2c: {
      id: "cap2c",
      titulo: "📖 CAPÍTULO 2C — GRITANDO POR AJUDA",
      texto: `Você grita por socorro até a garganta doer. Mas o porão não deixa o som escapar. Ninguém lá fora pode te ouvir.
  O telefone dá uma pausa e volta a tocar de novo, ainda mais alto!`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap2a" },
        { texto: "🔘 [Continuar gritando até a voz falhar]", destino: "cap3f" },
        { texto: "🔘 [Chutar a porta com raiva]", destino: "cap3c" }
      ]
    },
  
    cap3a: {
      id: "cap3a",
      titulo: "📖 CAPÍTULO 3A — O OBJETO NO CHÃO",
      texto: `Você tateia as rachaduras do chão até encontrar uma pedra solta!
  Embaixo dela, há um PEDAÇO DE VIDRO AFIADO envolto num pano sujo.
  O telefone volta a tocar...`,
      isRinging: true,
      addItem: "Pedaço de Vidro Afiado",
      botoes: [
        { texto: "🔘 [Atender o telefone com o vidro na mão]", destino: "cap4a" },
        { texto: "🔘 [Esconder o vidro e esperar]", destino: "cap4b" },
        { texto: "🔘 [Usar o vidro para cortar a corda do telefone]", destino: "cap4c" }
      ]
    },
  
    cap3b: {
      id: "cap3b",
      titulo: "📖 CAPÍTULO 3B — A VOZ SUMIU",
      texto: `Você pergunta quem está aí, mas o telefone fica mudo. A ligação caiu. Você se arrepende de não ter ouvido mais.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Procurar no chão mesmo assim]", destino: "cap3a" },
        { texto: "🔘 [Sentar no colchão e esperar]", destino: "cap4b" }
      ]
    },
  
    cap3c: {
      id: "cap3c",
      titulo: "📖 CAPÍTULO 3C — A PORTA DE METAL",
      texto: `Você chuta a porta com toda a força! CRACK! O metal amassa levemente, mas do outro lado você ouve PASSOS PESADOS descendo a escada!`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Fingir que está dormindo na cama]", destino: "cap4d" },
        { texto: "🔘 [Ficar atrás da porta pronto para atacar com o vidro]", destino: "cap4e", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Ficar atrás da porta e tentar surpreendê-lo desarmado]", destino: "cap4e2" },
        { texto: "🔘 [Atender o telefone que voltou a tocar]", destino: "cap4a" }
      ]
    },
  
    cap3d: {
      id: "cap3d",
      titulo: "📖 CAPÍTULO 3D — A JANELA",
      texto: `Você empilha o vaso e alcança a janela alta. Do outro lado você vê o quintal sob a lua. As grades estão firmes e o vidro é grosso. Quebrá-lo fará muito barulho.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Quebrar o vidro e gritar por socorro]", destino: "cap4f" },
        { texto: "🔘 [Desistir e voltar para o chão]", destino: "cap3a" },
        { texto: "🔘 [Tentar arrancar as grades com as mãos]", destino: "cap4g" }
      ]
    },
  
    cap3e: {
      id: "cap3e",
      titulo: "📖 CAPÍTULO 3E — ESPERAR O SEQUESTRADOR",
      texto: `A tranca se abre. O Grabber entra vestindo sua máscara sorridente de duas partes. Ele traz pão duro e água morna.
  "Comportado, hein? Vamos ver quanto tempo dura."`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Aceitar a comida e ficar quieto]", destino: "cap5a" },
        { texto: "🔘 [Cuspir na máscara dele]", destino: "cap5b" },
        { texto: "🔘 [Tentar pegar a chave do bolso dele]", destino: "cap5c" }
      ]
    },
  
    cap3f: {
      id: "cap3f",
      titulo: "📖 CAPÍTULO 3F — VOZ FALHANDO",
      texto: `Sua voz falha de tanto gritar. Ninguém responde. Você está exausto.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap2a" },
        { texto: "🔘 [Chutar a porta com raiva]", destino: "cap3c" },
        { texto: "🔘 [Sentar e esperar o sequestrador]", destino: "cap3e" }
      ]
    },
  
    cap4a: {
      id: "cap4a",
      titulo: "📖 CAPÍTULO 4A — O TELEFONE",
      texto: `Outra voz de garoto avisa: "Aquele telefone é uma porta. Nós estamos do outro lado. O Grabber acha que o telefone é inútil. Use isso a seu favor!"`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Usar o vidro para cortar a corda do telefone]", destino: "cap5d", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Guardar o vidro e esperar o Grabber]", destino: "cap4d", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Desligar e esperar o Grabber em silêncio]", destino: "cap4d" }
      ]
    },
  
    cap4b: {
      id: "cap4b",
      titulo: "📖 CAPÍTULO 4B — ESPERAR ESCONDIDO",
      texto: `O Grabber entra vestindo uma máscara de DIABO com chifres. Ele nota que o telefone tocou e fica irritado!
  "Você não atendeu o telefone... por quê?"`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Mentir: 'Não ouvi nada']", destino: "cap5e" },
        { texto: "🔘 [Perguntar sobre as outras vítimas]", destino: "cap5f" },
        { texto: "🔘 [Atacar com o vidro]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" }
      ]
    },
  
    cap4c: {
      id: "cap4c",
      titulo: "📖 CAPÍTULO 4C — CORTANDO A CORDA",
      texto: `Você corta a corda do telefone com o vidro. O fone cai no chão. Agora o telefone está quebrado.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Usar o vidro para tentar forçar a fechadura]", destino: "cap5h" },
        { texto: "🔘 [Gritar por ajuda]", destino: "cap3f" }
      ]
    },
  
    cap4d: {
      id: "cap4d",
      titulo: "📖 CAPÍTULO 4D — FINGIR QUE DORME",
      texto: `Você se deita no colchão. O Grabber entra, toca seu ombro com sua mão pesada e diz: "Acorda, garoto. Hora de brincar."`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Abrir os olhos lentamente]", destino: "cap5i" },
        { texto: "🔘 [Atacar com o vidro afiado]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Continuar fingindo que dorme]", destino: "cap5j" }
      ]
    },
  
    cap4e: {
      id: "cap4e",
      titulo: "📖 CAPÍTULO 4E — PRONTO PARA ATACAR",
      texto: `Você golpeia o braço do Grabber com o vidro! Ele urra de dor, te empurra com força e tranca a porta por fora irritado!`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Levantar e atender o telefone]", destino: "cap4a" },
        { texto: "🔘 [Ficar no chão chorando de dor]", destino: "cap5k" }
      ]
    },
  
    cap4e2: {
      id: "cap4e2",
      titulo: "📖 CAPÍTULO 4E — SEM ARMA",
      texto: `Você se esconde atrás da porta, mas está desarmado. Quando o Grabber entra, você tenta agarrá-lo, mas ele é forte demais e te derruba no chão!`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Levantar e atender o telefone]", destino: "cap4a" },
        { texto: "🔘 [Ficar no chão sem forças]", destino: "cap5k" }
      ]
    },

    cap4f: {
      id: "cap4f",
      titulo: "📖 CAPÍTULO 4F — QUEBRANDO A JANELA",
      texto: `Você arremessa o vaso e quebra o vidro da janela! Uma vizinha ouve o barulho, mas o Grabber entra no porão furioso com uma faca!`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Continuar gritando por socorro]", destino: "cap5l" },
        { texto: "🔘 [Tentar fugir pela janela quebrada]", destino: "cap5m" },
        { texto: "🔘 [Atacar o Grabber com o vidro]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" }
      ]
    },
  
    cap4g: {
      id: "cap4g",
      titulo: "📖 CAPÍTULO 4G — ARRANCANDO AS GRADES",
      texto: `Você solta uma das grades da janela com as mãos sangrando, mas as outras continuam firmes.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Largar as grades e atender o telefone]", destino: "cap4a" },
        { texto: "🔘 [Continuar tentando puxar as grades]", destino: "cap5n" }
      ]
    },
  
    cap5a: {
      id: "cap5a",
      titulo: "📖 CAPÍTULO 5A — ACEITAR A COMIDA",
      texto: `Você come o pão duro e bebe a água. O Grabber se retira satisfeito. Em seguida, o telefone toca.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Ignorar e tentar dormir]", destino: "cap6b" }
      ]
    },
  
    cap5b: {
      id: "cap5b",
      titulo: "📖 CAPÍTULO 5B — CUSPIR NO GRABBER",
      texto: `Você cospe na máscara dele! Ele te acerta um soco violento no estômago e promete voltar para te fazer implorar.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Tentar respirar e atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Ficar no chão chorando]", destino: "cap6c" }
      ]
    },
  
    cap5c: {
      id: "cap5c",
      titulo: "📖 CAPÍTULO 5C — PEGAR A CHAVE",
      texto: `Você tenta pegar a chave do bolso dele, mas ele torce seu pulso e te joga no chão antes de sair!`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Levantar e atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Ficar no chão derrotado]", destino: "cap6d" }
      ]
    },
  
    cap5d: {
      id: "cap5d",
      titulo: "📖 CAPÍTULO 5D — TELEFONE CORTADO",
      texto: `O Grabber vê o telefone destruído no chão e fica furioso: "O QUE VOCÊ FEZ?"`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Correr para a porta aberta]", destino: "cap6e" },
        { texto: "🔘 [Atacar com o vidro afiado]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" }
      ]
    },
  
    cap5e: {
      id: "cap5e",
      titulo: "📖 CAPÍTULO 5E — MENTIR",
      texto: `Você diz que não ouviu nada. Ele te chama de mentiroso e arranca o telefone da parede com violência!`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Atacá-lo com o vidro quando ele se aproximar]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Implorar por sua vida]", destino: "cap6f" }
      ]
    },
  
    cap5f: {
      id: "cap5f",
      titulo: "📖 CAPÍTULO 5F — PERGUNTAR SOBRE AS VÍTIMAS",
      texto: `Você pergunta sobre os outros meninos. Ele ri e diz que você é diferente porque não chora, prometendo 'brincar' em breve.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Chorar e perder as forças]", destino: "cap6c" }
      ]
    },
  
    cap5g: {
      id: "cap5g",
      titulo: "📖 CAPÍTULO 5G — ATACAR COM O VIDRO",
      texto: `Você finca o vidro afiado no pescoço do Grabber! Ele cai no chão sangrando. A CHAVE PRATEADA está visível no bolso dele!`,
      isRinging: false,
      addItem: "Chave Prateada",
      botoes: [
        { texto: "🔘 [Pegar a chave no bolso dele e fugir]", destino: "cap6g" },
        { texto: "🔘 [Continuar atacando até ele parar]", destino: "cap6h" },
        { texto: "🔘 [Correr para a janela quebrada]", destino: "cap6i" }
      ]
    },
  
    cap5h: {
      id: "cap5h",
      titulo: "📖 CAPÍTULO 5H — ABRIR A FECHADURA",
      texto: `O vidro quebra na fechadura. O Grabber entra e nota o estrago na porta.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Tentar correr por entre as pernas dele]", destino: "cap6j" },
        { texto: "🔘 [Ficar parado encarando-o]", destino: "cap6k" }
      ]
    },
  
    cap5i: {
      id: "cap5i",
      titulo: "📖 CAPÍTULO 5I — ABRIR OS OLHOS",
      texto: `O Grabber segura uma faca e propõe um jogo de perguntas e respostas valendo sua vida.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Aceitar o jogo]", destino: "cap6l" },
        { texto: "🔘 [Recusar e tentar fugir]", destino: "cap6m" }
      ]
    },
  
    cap5j: {
      id: "cap5j",
      titulo: "📖 CAPÍTULO 5J — CONTINUAR FINGINDO",
      texto: `Você fica imóvel até ele desistir e sair trancando a porta. O telefone volta a tocar.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Esperar mais um pouco com medo]", destino: "cap6n" }
      ]
    },
  
    cap5k: {
      id: "cap5k",
      titulo: "📖 CAPÍTULO 5K — CHORAR DE DOR",
      texto: `Você chora de dor no chão. O Grabber ri do seu desespero e sai. O telefone toca ao fundo.`,
      isRinging: true,
      botoes: [
        { texto: "🔘 [Limpar o rosto e atender o telefone]", destino: "cap6a" },
        { texto: "🔘 [Ficar no chão sem forças]", destino: "cap6d" }
      ]
    },
  
    cap5l: {
      id: "cap5l",
      titulo: "📖 CAPÍTULO 5L — CONTINUAR GRITANDO",
      texto: `Você grita e atrai a vizinhança! O Grabber te prende com FITA ADESIVA na boca para se calar!`,
      isRinging: false,
      addItem: "Fita Adesiva na Boca",
      botoes: [
        { texto: "🔘 [Tentar soltar a fita adesiva]", destino: "cap6o" },
        { texto: "🔘 [Ficar quieto e esperar]", destino: "cap6b" }
      ]
    },
  
    cap5m: {
      id: "cap5m",
      titulo: "📖 CAPÍTULO 5M — FUGIR PELA JANELA",
      texto: `Você passa pela janela cortando a pele e cai no quintal escuro! O Grabber pula atrás de você!`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Correr para a rua]", destino: "cap6p" },
        { texto: "🔘 [Esconder-se no quintal]", destino: "cap6q" }
      ]
    },
  
    cap5n: {
      id: "cap5n",
      titulo: "📖 CAPÍTULO 5N — TENTAR AS GRADES",
      texto: `Você puxa as grades até desmaiar de exaustão. Quando acorda, o Grabber está te observando curioso.`,
      isRinging: false,
      botoes: [
        { texto: "🔘 [Levantar e enfrentá-lo]", destino: "cap5g", reqItem: "Pedaço de Vidro Afiado" },
        { texto: "🔘 [Implorar por sua vida]", destino: "cap6f" }
      ]
    },
  
    // ==========================================
    // OS 17 FINAIS COMPLETOS (6A ATÉ 6Q)
    // ==========================================
    cap6a: {
      id: "cap6a",
      isEnding: true,
      endingId: "6A",
      titulo: "🏆 FINAL 6A — A VOZ DE GWEN (RESGATE)",
      texto: `Gwen liga pelo telefone desconectado! Ela sonhou com a casa e guiou a polícia até o local. As sirenes chegam e você é resgatado vivo!
  
  FIM. Você sobreviveu!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6b: {
      id: "cap6b",
      isEnding: true,
      endingId: "6B",
      titulo: "🏆 FINAL 6B — SILÊNCIO (FINAL AMBÍGUO)",
      texto: `Você acorda e encontra a porta entreaberta. A casa está deserta e o Grabber sumiu. Você caminha de volta para casa sob o sol, mas carregando marcas eternas.
  
  FIM. Nem tudo tem uma resposta.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6c: {
      id: "cap6c",
      isEnding: true,
      endingId: "6C",
      titulo: "💀 FINAL 6C — DERROTA (FINAL TRÁGICO)",
      texto: `Você chora até adormecer no chão frio. O Grabber retorna nas sombras e você não tem forças para lutar.
  
  FIM. O Grabber venceu.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6d: {
      id: "cap6d",
      isEnding: true,
      endingId: "6D",
      titulo: "💀 FINAL 6D — SEM ESPERANÇA (FINAL TRÁGICO)",
      texto: `O medo tomou conta de você. Quando o Grabber volta, você não reage.
  
  FIM. A esperança foi perdida.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6e: {
      id: "cap6e",
      isEnding: true,
      endingId: "6E",
      titulo: "💀 FINAL 6E — CORRIDA PARA A PORTA",
      texto: `Você tenta correr pela porta aberta, mas o Grabber te agarra pela camisa e a tranca novamente.
  
  FIM. A liberdade estava tão perto.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6f: {
      id: "cap6f",
      isEnding: true,
      endingId: "6F",
      titulo: "💀 FINAL 6F — IMPLORAR (FINAL TRÁGICO)",
      texto: `Você implora por sua vida, mas o Grabber sorri por baixo da máscara e diz que todo mundo promete mentiras.
  
  FIM. Implorar não adiantou.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6g: {
      id: "cap6g",
      isEnding: true,
      endingId: "6G",
      titulo: "🏆 FINAL 6G — FUGA COM A CHAVE",
      texto: `Você pega a Chave Prateada do bolso do Grabber ferido, destranca a porta de metal e corre descalço pela rua até ser resgatado!
  
  FIM. Você venceu e escapou!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6h: {
      id: "cap6h",
      isEnding: true,
      endingId: "6H",
      titulo: "🏆 FINAL 6H — FINAL SOMBRIO",
      texto: `No desespero da luta, você derrota o Grabber de vez com o vidro. A polícia chega e te resgata, mas o porão mudou você para sempre.
  
  FIM. Sobreviver é apenas o começo.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6i: {
      id: "cap6i",
      isEnding: true,
      endingId: "6I",
      titulo: "💀 FINAL 6I — JANELA QUEBRADA",
      texto: `Você hesita ao ver os cacos de vidro na janela e o Grabber se recupera te agarrando pela cintura.
  
  FIM. A hesitação custou caro.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6j: {
      id: "cap6j",
      isEnding: true,
      endingId: "6J",
      titulo: "🏆 FINAL 6J — CORRER POR ENTRE AS PERNAS",
      texto: `Você desliza por entre as pernas do sequestrador, dispara pelas escadas e ganha a rua gritando até ser acolhido por vizinhos!
  
  FIM. A agilidade te salvou!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6k: {
      id: "cap6k",
      isEnding: true,
      endingId: "6K",
      titulo: "🏆 FINAL 6K — ENCARAR",
      texto: `Você encara o Grabber sem mostrar medo. Surpreso com sua coragem, ele se afasta e deixa a porta aberta.
  
  FIM. Coragem diante do horror.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6l: {
      id: "cap6l",
      isEnding: true,
      endingId: "6L",
      titulo: "💀 FINAL 6L — O JOGO",
      texto: `Você responde à pergunta do jogo do Grabber dizendo que ele é apenas um monstro. Ele ri e encerra a brincadeira.
  
  FIM. Alguns jogos não podem ser vencidos.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6m: {
      id: "cap6m",
      isEnding: true,
      endingId: "6M",
      titulo: "🏆 FINAL 6M — RECUSAR E FUGIR",
      texto: `Você recusa o jogo, acerta a máscara dele com uma cotovelada e arromba a fechadura no chute escapando para a liberdade!
  
  FIM. Você lutou e venceu!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6n: {
      id: "cap6n",
      isEnding: true,
      endingId: "6N",
      titulo: "🏆 FINAL 6N — ESPERAR (MISTERIOSO)",
      texto: `A porta do porão se abre sozinha. A casa está vazia e você caminha para a rua sem nunca mais ver o sequestrador.
  
  FIM. Algumas perguntas nunca têm resposta.`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6o: {
      id: "cap6o",
      isEnding: true,
      endingId: "6O",
      titulo: "🏆 FINAL 6O — SOLTAR A FITA",
      texto: `Você arranca a fita adesiva dos lábios e grita por socorro! A polícia invade o local e prende o Grabber no quintal!
  
  FIM. Você foi resgatado!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6p: {
      id: "cap6p",
      isEnding: true,
      endingId: "6P",
      titulo: "🏆 FINAL 6P — CORRER PARA A RUA",
      texto: `Você corre desesperadamente para a rua iluminada. Um motorista te ajuda e a polícia prende o Grabber naquela noite!
  
  FIM. Fuga perfeita!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    },
  
    cap6q: {
      id: "cap6q",
      isEnding: true,
      endingId: "6Q",
      titulo: "🏆 FINAL 6Q — ESCONDER-SE (FUGA FURTIVA)",
      texto: `Você se esconde atrás do barril de metal. O Grabber passa direto e você pula a cerca para pedir socorro na casa vizinha!
  
  FIM. Você foi esperto e se escondeu bem!`,
      botoes: [{ texto: "🔄 [JOGAR NOVAMENTE]", destino: "prologo" }]
    }
  };