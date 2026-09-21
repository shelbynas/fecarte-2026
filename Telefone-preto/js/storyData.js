const storyData = {
  prologo: {
    id: "prologo",
    titulo: "🎬 PRÓLOGO — Antes de Iniciar",
    texto: `Denver, Colorado — 1978.
A cidade está assustada. Nas últimas semanas, cinco garotos desapareceram sem deixar rastro. As crianças comentam na escola, os adultos ficam em silêncio. Todo mundo sabe: o Grabber está à solta.

Você é Finney Shaw, 13 anos. Você não é o mais forte nem o mais popular da escola, mas é observador e esperto. Sua irmã Gwen tem tido sonhos estranhos — sonhos que mostram coisas reais que ainda vão acontecer.

Esta noite, Gwen sonhou com você preso num porão escuro, onde um telefone preto tocava na parede. O telefone vai tocar... e as vozes do outro lado vão falar com você.`,
    isRinging: false,
    botoes: [{ texto: "🔘 [COMEÇAR A JORNADA]", destino: "cap1" }]
  },

  cap1: {
    id: "cap1",
    titulo: "📖 CAPÍTULO 1 — O DESPERTAR",
    texto: `Você acorda num porão frio com cheiro de poeira e mofo. A luz entra por uma fresta embaixo da porta de metal trancada. Você está num colchão fino deitado no chão de concreto.

Na parede de tijolos, acima do colchão, há um telefone preto de disco antigo. O fio está cortado e pendurado no ar. É impossível que ele funcione.

Repentinamente, o telefone começa a tocar: RIINNG! RIINNG!
O som ecoa pelas paredes frias.`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Atender o telefone imediatamente]", destino: "cap_bruce" },
      { texto: "🔘 [Ignorar o som e procurar uma saída]", destino: "cap2b" },
      { texto: "🔘 [Gritar por socorro na porta]", destino: "cap2c" }
    ]
  },

  cap_bruce: {
    id: "cap_bruce",
    callId: "bruce",
    callName: "Bruce Yamada",
    titulo: "📞 1ª LIGAÇÃO — BRUCE YAMADA (BEISEBOL)",
    texto: `Você atende o fone frio. Uma voz jovem e cansada fala com chiado:

"Ei... sou eu, Bruce Yamada. O garoto do beisebol. Eu estive nesse mesmo porão. O Grabber me pegou no caminho da escola...
Escuta, Finney! O concreto sob o tapete velho ao lado da cama é de terra batida macia. Comecei a cavar um buraco lá antes dele voltar. Cave a terra e guarde-a!"

A ligação cai com um estalo metálico.`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Cavar e PEGAR a terra batida sob o tapete]", getItem: "Terra do Porão", destino: "cap_billy" },
      { texto: "🔘 [Ignorar a dica e procurar outra coisa no chão]", destino: "cap3a" },
      { texto: "🔘 [Tentar arrombar a porta de metal]", destino: "cap3c" }
    ]
  },

  cap_billy: {
    id: "cap_billy",
    callId: "billy",
    callName: "Billy Showalter",
    titulo: "📞 2ª LIGAÇÃO — BILLY SHOWALTER (ENTREGADOR)",
    texto: `O telefone toca de novo. Você atende rapidamente.

"Finney? Aqui é o Billy Showalter, o entregador de jornal... O Grabber usou o cão dele pra me encurralar.
Eu deixei algo pra você! Na fresta da parede de tijolos, do lado direito do vaso sanitário, eu escondi um cabo de aço trançado que achei no chão. Encontre esse cabo, você vai precisar dele!"`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Procurar na fresta e PEGAR o cabo de aço trançado]", getItem: "Cabo de Aço Trançado", destino: "cap_griffin" },
      { texto: "🔘 [Procurar algo solto no chão do porão]", destino: "cap3a" },
      { texto: "🔘 [Olhar para a janela alta no teto]", destino: "cap3d" }
    ]
  },

  cap_griffin: {
    id: "cap_griffin",
    callId: "griffin",
    callName: "Griffin Stinnett",
    titulo: "📞 3ª LIGAÇÃO — GRIFFIN STINNETT (O CADEADO)",
    texto: `Outra ligação entra no telefone desconectado. A voz do pequeno Griffin fala assustada:

"Finney... sou o Griffin. Eu decorava códigos e senhas. A porta de metal do porão tem um cadeado pesado por fora. A combinação é: 33-45-27.
Mas tome cuidado! Ele costuma dormir na cadeira de balanço no topo da escada durante o 'Jogo do Sono'. Se fizer barulho ao abrir o cadeado, ele acorda!"`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Anotar mentalmente a combinação e continuar explorando]", destino: "cap3a" },
      { texto: "🔘 [Ir até a porta e tentar abrir o CADEADO]", destino: "cap_padlock" }
    ]
  },

  cap3a: {
    id: "cap3a",
    titulo: "📖 CAPÍTULO 3A — A PEDRA SOLTA NO CHÃO",
    texto: `Você passa os dedos pelas frestas do chão de concreto frio. Sob uma pedra solta perto do canto, você sente algo pontiagudo enrolado num Pedaço de Vidro Afiado!`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Procurar e PEGAR o pedaço de vidro afiado no buraco]", getItem: "Pedaço de Vidro Afiado", destino: "cap_vance" },
      { texto: "🔘 [Deixar a pedra no lugar e esperar]", destino: "cap4b" }
    ]
  },

  cap_vance: {
    id: "cap_vance",
    callId: "vance",
    callName: "Vance Hopper",
    titulo: "📞 4ª LIGAÇÃO — VANCE HOPPER (O FLIPERAMA)",
    texto: `O telefone vibra de novo com uma voz irritada e firme:

"Finney! É o Vance Hopper! Aquele miserável me trancou aqui, mas eu quebrei a parede de gesso atrás do vaso sanitário!
Ela dá acesso direto ao duto de ventilação do freezer da cozinha. Se você tiver algo afiado pra cortar o gesso, dá pra rastejar por lá!"`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Ir para a parede de gesso tentar quebrar o duto]", reqItem: "Pedaço de Vidro Afiado", destino: "cap_vance_duct" },
      { texto: "🔘 [Aguardar a próxima ligação no telefone]", destino: "cap_robin" }
    ]
  },

  cap_robin: {
    id: "cap_robin",
    callId: "robin",
    callName: "Robin Arellano",
    titulo: "📞 5ª LIGAÇÃO — ROBIN ARELLANO (O LUTADOR)",
    texto: `A voz do seu melhor amigo Robin soa firme no fone:

"Finney! Sou eu, o Robin! Você precisa lutar, cara! Não dá pra fugir sem encarar ele!
Presta atenção na receita pra criar uma arma: pegue a terra do porão, encha o fone do telefone preto até ficar bem pesado, e amarre tudo bem firme com o cabo de aço!
Isso transforma o fone numa clava pesada de impacto! Quando ele entrar, acerte a cabeça dele com força!"`,
    isRinging: true,
    botoes: [
      {
        texto: "🔨 [CRIAR TELEFONE PESADO (Exige: Terra do Porão + Cabo de Aço)]",
        reqItems: ["Terra do Porão", "Cabo de Aço Trançado"],
        consumeItems: ["Terra do Porão", "Cabo de Aço Trançado"],
        getItem: "Telefone Pesado de Impacto",
        destino: "cap_ready_fight"
      },
      { texto: "🔘 [Guardar os itens e esperar o Grabber entrar]", destino: "cap4d" }
    ]
  },

  cap_padlock: {
    id: "cap_padlock",
    titulo: "🔐 CADEADO DA PORTA DE METAL",
    texto: `Você sobe os degraus e alcança a porta de metal. Por uma fresta, você enxerga o cadeado de combinação pesada.

Lembre-se da combinação que Griffin Stinnett lhe disse no telefone e digite os 6 dígitos corretos no painel!`,
    isRinging: false,
    minigamePadlock: true,
    botoes: []
  },

  cap_padlock_open: {
    id: "cap_padlock_open",
    titulo: "🚪 A PORTA SE ABRIU EM SILÊNCIO",
    texto: `O cadeado destranca com um clique suave. Você empurra a porta devagar.

No topo da escada de madeira, o Grabber está sentado numa cadeira de balanço, dormindo com a máscara de diabo no rosto durante o 'Jogo do Sono'. A porta da frente da casa está a poucos metros.`,
    isRinging: false,
    botoes: [
      {
        texto: "🎲 [AÇÃO FÍSICA] Passar furtivamente pela cadeira de balanço (D6 | Alvo 3+)",
        diceCheck: {
          desc: "Manobra furtiva para subir os degraus de madeira sem fazer ranger",
          target: 3,
          success: "cap6r",
          fail: "cap6e"
        }
      }
    ]
  },

  cap_vance_duct: {
    id: "cap_vance_duct",
    titulo: "🛠️ O DUTO DE VENTILAÇÃO DE VANCE",
    texto: `Usando o Pedaço de Vidro Afiado, você rasga o gesso velho atrás do vaso e expõe a grelha de metal do duto que leva à cozinha.`,
    isRinging: false,
    botoes: [
      {
        texto: "🎲 [AÇÃO FÍSICA] Rastejar pelo duto estreito (D6 | Alvo 4+)",
        reqItem: "Pedaço de Vidro Afiado",
        diceCheck: {
          desc: "Forçar a passagem pelo duto de ventilação estreito",
          target: 4,
          success: "cap6s",
          fail: "cap6i"
        }
      }
    ]
  },

  cap_ready_fight: {
    id: "cap_ready_fight",
    titulo: "🥊 PREPARADO PARA O CONFRONTO",
    texto: `Você recheou o fone do Telefone Preto com a terra batida e amarrou com o cabo de aço trançado de Billy. Agora você tem o TELEFONE PESADO DE IMPACTO!

Passos pesados ecoam na escada. A porta se abre. O Grabber entra usando a máscara de diabo.`,
    isRinging: false,
    botoes: [
      {
        texto: "🎲 [AÇÃO FÍSICA] Golpear a máscara com o Telefone Pesado (D6 | Alvo 3+)",
        reqItem: "Telefone Pesado de Impacto",
        diceCheck: {
          desc: "Acertar um golpe devastador com o Telefone Pesado no Grabber",
          target: 3,
          success: "cap5g_heavy",
          fail: "cap5b"
        }
      },
      { texto: "🔘 [Tentar enganar o Grabber com mentiras]", destino: "cap5i" }
    ]
  },

  cap5g_heavy: {
    id: "cap5g_heavy",
    titulo: "💥 O GOLPE CERTEIRO!",
    texto: `O impacto do Telefone Pesado despedaça a máscara do Grabber! Ele cai de joelhos, tonto e sangrando no chão de concreto.

A Chave Prateada cai do bolso do casaco dele no chão.`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [PEGA a Chave Prateada no chão e corre para a porta]", getItem: "Chave Prateada", destino: "cap6g" },
      { texto: "🔘 [Continuar golpeando até ele parar de se mexer]", destino: "cap6h" }
    ]
  },

  cap2b: {
    id: "cap2b",
    titulo: "📖 CAPÍTULO 2B — EXPLORANDO O PORÃO",
    texto: `Você ignora o telefone e tateia as paredes frias. A porta é de metal maciço e a janela está muito alta. O telefone continua tocando de forma insistente.`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Voltar e atender o telefone]", destino: "cap_bruce" },
      { texto: "🔘 [Tentar alcançar a janela empilhando o colchão]", destino: "cap3d" }
    ]
  },

  cap2c: {
    id: "cap2c",
    titulo: "📖 CAPÍTULO 2C — GRITOS NO SILÊNCIO",
    texto: `Você grita por socorro até a garganta doer. O porão é totalmente isolado acusticamente. Ninguém escuta do lado de fora. O telefone toca na parede.`,
    isRinging: true,
    botoes: [
      { texto: "🔘 [Atender o telefone]", destino: "cap_bruce" },
      { texto: "🔘 [Chutar a porta com raiva]", destino: "cap3c" }
    ]
  },

  cap3c: {
    id: "cap3c",
    titulo: "📖 CAPÍTULO 3C — CHUTES NA PORTA",
    texto: `Você chuta a porta de metal. O barulho ecoa e você ouve passos pesados descendo a escada de madeira!`,
    isRinging: false,
    addFear: 25,
    botoes: [
      { texto: "🔘 [Deitar no colchão e fingir que está dormindo]", destino: "cap4d" },
      { texto: "🔘 [Esperar atrás da porta para atacar]", destino: "cap4e" }
    ]
  },

  cap3d: {
    id: "cap3d",
    titulo: "📖 CAPÍTULO 3D — A JANELA DO PORÃO",
    texto: `Você olha para a janela no alto. O vidro é grosso e há grades de ferro enferrujadas.`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Tentar quebrar o vidro com um vaso sanitário solto]", destino: "cap4f" },
      { texto: "🔘 [Voltar para o chão e procurar itens]", destino: "cap3a" }
    ]
  },

  cap4b: {
    id: "cap4b",
    titulo: "📖 CAPÍTULO 4B — A MÁSCARA DO DIABO",
    texto: `O Grabber entra no porão usando a máscara de diabo. Ele encara você e Pergunta: 'Por que você não atendeu o telefone?'`,
    isRinging: false,
    addFear: 20,
    botoes: [
      { texto: "🔘 [Mentir: 'Eu não ouvi nada']", destino: "cap5e" },
      { texto: "🔘 [Perguntar sobre as outras crianças]", destino: "cap5f" }
    ]
  },

  cap4d: {
    id: "cap4d",
    titulo: "📖 CAPÍTULO 4D — FINGIR DORMIR",
    texto: `Você se deita e fecha os olhos. O Grabber entra, toca no seu ombro e diz com voz rouca: 'Acorda, garoto. Hora de brincar...'`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Abrir os olhos e encarar o questionário dele]", destino: "cap5i" }
    ]
  },

  cap4e: {
    id: "cap4e",
    titulo: "📖 CAPÍTULO 4E — ATAQUE IMPULSIVO",
    texto: `Você se esconde atrás da porta e avança no Grabber, mas ele te empurra com violência contra o concreto!`,
    isRinging: false,
    addFear: 30,
    botoes: [
      { texto: "🔘 [Atender o telefone que começa a tocar]", destino: "cap_bruce" },
      { texto: "🔘 [Ficar no chão recuperando o fôlego]", destino: "cap5k" }
    ]
  },

  cap4f: {
    id: "cap4f",
    titulo: "📖 CAPÍTULO 4F — VIDRO QUEBRADO",
    texto: `O barulho da janela quebrando atrai a atenção do Grabber, que desce as escadas furioso com uma faca!`,
    isRinging: false,
    addFear: 35,
    botoes: [
      { texto: "🔘 [Tentar subir e fugir pela janela quebrada]", destino: "cap5m" }
    ]
  },

  cap5b: {
    id: "cap5b",
    titulo: "📖 CAPÍTULO 5B — RESPOSTA VIOLENTA",
    texto: `O Grabber acerta um soco no seu estômago. Você cai sem ar no chão.`,
    isRinging: false,
    addFear: 40,
    botoes: [
      { texto: "🔘 [Tentar se levantar e atender o telefone]", destino: "cap6a" },
      { texto: "🔘 [Chorar de dor no chão]", destino: "cap6c" }
    ]
  },

  cap5e: {
    id: "cap5e",
    titulo: "📖 CAPÍTULO 5E — O TELEFONE ARRANCADO",
    texto: `O Grabber arranca o telefone da parede com raiva. 'Agora você está sozinho!', ele diz antes de trancar a porta.`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Implorar por sua vida]", destino: "cap6f" },
      { texto: "🔘 [Esperar em silêncio no colchão]", destino: "cap6b" }
    ]
  },

  cap5f: {
    id: "cap5f",
    titulo: "📖 CAPÍTULO 5F — AS OUTRAS VÍTIMAS",
    texto: `Você pergunta dos outros meninos. O Grabber ri e diz: 'Eles choraram... mas você é diferente.'`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Atender o telefone que volta a tocar]", destino: "cap6a" }
    ]
  },

  cap5i: {
    id: "cap5i",
    titulo: "🤡 A BRINCADEIRA DO GRABBER — PERGUNTA 1",
    texto: `O Grabber senta na sua frente jogando uma faca para o alto.

"Vamos jogar uma brincadeira! Se você acertar minhas perguntas, eu penso no seu caso.
Primeira pergunta: O que as vozes do telefone sem fio te disseram?"`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Mentir: 'Elas disseram que você é fraco']", destino: "quiz_q2" },
      { texto: "🔘 [Falar a verdade sobre a dica da pedra]", destino: "cap6l" }
    ]
  },

  quiz_q2: {
    id: "quiz_q2",
    titulo: "🤡 A BRINCADEIRA DO GRABBER — PERGUNTA 2",
    texto: `O Grabber estreita os olhos por trás da máscara.

"Interessante... Segunda pergunta: O que você tem escondido debaixo do colchão?"`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Responder: 'Não tem nada lá!']", destino: "quiz_q3" },
      { texto: "🔘 [Atacar o rosto dele com o Pedaço de Vidro Afiado]", reqItem: "Pedaço de Vidro Afiado", destino: "cap5g_heavy" }
    ]
  },

  quiz_q3: {
    id: "quiz_q3",
    titulo: "🤡 A BRINCADEIRA DO GRABBER — PERGUNTA 3",
    texto: `O Grabber se aproxima do seu rosto.

"Última pergunta: Qual máscara eu uso quando fico furioso de verdade?"`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Responder: 'A Máscara do Diabo!']", destino: "quiz_success" },
      { texto: "🔘 [Responder: 'A Máscara do Sapo!']", destino: "cap6l" }
    ]
  },

  quiz_success: {
    id: "quiz_success",
    titulo: "😮 O GRABBER FICOU CHOCADO!",
    texto: `O Grabber recua surpreso! 'Como você sabe disso?!'
Na confusão, ele deixa a Chave Prateada escorregar do bolso para o chão!`,
    isRinging: false,
    botoes: [
      { texto: "🔘 [Pegar a Chave Prateada e correr para a porta]", getItem: "Chave Prateada", destino: "cap6g" }
    ]
  },

  cap5k: {
    id: "cap5k",
    titulo: "📖 CAPÍTULO 5K — DOR E MEDO",
    texto: `Você fica no chão chorando de dor. O som do telefone parece distante.`,
    isRinging: true,
    addFear: 20,
    botoes: [
      { texto: "🔘 [Limpar o rosto e atender o telefone]", destino: "cap6a" },
      { texto: "🔘 [Desistir de tudo]", destino: "cap6d" }
    ]
  },

  cap5m: {
    id: "cap5m",
    titulo: "📖 CAPÍTULO 5M — SUBINDO PELA JANELA",
    texto: `Você pula pelo vaso sanitário e cai no quintal molhado da casa!`,
    isRinging: false,
    botoes: [
      {
        texto: "🎲 [AÇÃO FÍSICA] Correr para a rua (D6 | Alvo 3+)",
        diceCheck: {
          desc: "Correr pela grama molhada até alcançar a rua iluminada",
          target: 3,
          success: "cap6p",
          fail: "cap6q"
        }
      }
    ]
  },

  cap6a: {
    id: "cap6a",
    isEnding: true,
    endingId: "6A",
    titulo: "🏆 FINAL 6A — A VOZ DE GWEN (RESGATE)",
    texto: `Você atende o telefone e ouve a voz de Gwen! Ela conta que os policiais viram o porão nos sonhos dela. Sirenes dobram a esquina e a polícia arromba a casa. Você é salvo!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6b: {
    id: "cap6b",
    isEnding: true,
    endingId: "6B",
    titulo: "🏆 FINAL 6B — SILÊNCIO NO PORÃO",
    texto: `Ao amanhecer, a porta está aberta e a casa está completamente vazia. Você caminha para fora sem encontrar ninguém. O Grabber sumiu para sempre.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6c: {
    id: "cap6c",
    isEnding: true,
    endingId: "6C",
    titulo: "💀 FINAL 6C — DERROTA NO CHÃO FRIO",
    texto: `O cansaço e o medo vencem Finney. O Grabber retorna no silêncio da noite.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6d: {
    id: "cap6d",
    isEnding: true,
    endingId: "6D",
    titulo: "💀 FINAL 6D — SEM ESPERANÇA",
    texto: `Sem forças para lutar, Finney se rende ao destino no porão.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6e: {
    id: "cap6e",
    isEnding: true,
    endingId: "6E",
    titulo: "💀 FINAL 6E — CAPTURADO NA ESCADA",
    texto: `Um degrau de madeira range sob seu pé! O Grabber acorda num pulo e te agarra antes que você alcance a porta da frente!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6f: {
    id: "cap6f",
    isEnding: true,
    endingId: "6F",
    titulo: "💀 FINAL 6F — IMPLORAR POR VIDA",
    texto: `Você implora por misericórdia, mas o sequestrador não demonstra piedade.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6g: {
    id: "cap6g",
    isEnding: true,
    endingId: "6G",
    titulo: "🏆 FINAL 6G — FUGA COM A CHAVE PRATEADA",
    texto: `Com a Chave Prateada na mão, você destranca a porta, sobe as escadas correndo e ganha a rua descalço! A polícia te acolhe a três quarteirões dali!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6h: {
    id: "cap6h",
    isEnding: true,
    endingId: "6H",
    titulo: "🏆 FINAL 6H — FINAL SOMBRIO (LUTA)",
    texto: `Você combate o sequestrador com fúria até garantir que ele não se levante mais. A polícia chega e encontra Finney salvo, porém transformado pela luta.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6i: {
    id: "cap6i",
    isEnding: true,
    endingId: "6I",
    titulo: "💀 FINAL 6I — CORTE NA JANELA",
    texto: `A hesitação diante dos cacos de vidro dá tempo para o Grabber te alcançar na janela.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6j: {
    id: "cap6j",
    isEnding: true,
    endingId: "6J",
    titulo: "🏆 FINAL 6J — FUGA POR ENTRE AS PERNAS",
    texto: `Sendo pequeno e ágil, você desliza por entre as pernas do sequestrador e ganha a porta da rua! A vizinha chama a polícia imediatamente.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6k: {
    id: "cap6k",
    isEnding: true,
    endingId: "6K",
    titulo: "🏆 FINAL 6K — ENCARAR O SEQUESTRADOR",
    texto: `Você encara os olhos da máscara sem demonstrar medo. Impressionado com a coragem, ele se retira.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6l: {
    id: "cap6l",
    isEnding: true,
    endingId: "6L",
    titulo: "💀 FINAL 6L — O JOGO DE PERGUNTAS",
    texto: `Você erra a resposta do questionário e o Grabber encerra a brincadeira.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6m: {
    id: "cap6m",
    isEnding: true,
    endingId: "6M",
    titulo: "🏆 FINAL 6M — RECUSAR E ARROMBAR",
    texto: `Você recusa o jogo, acerta uma cotovelada na máscara dele e chuta a porta de metal até arrombar!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6n: {
    id: "cap6n",
    isEnding: true,
    endingId: "6N",
    titulo: "🏆 FINAL 6N — A PORTA ABERTA",
    texto: `A porta de metal se abre sozinha sem explicações. Você sobe as escadas e caminha livre para o amanhecer.`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6o: {
    id: "cap6o",
    isEnding: true,
    endingId: "6O",
    titulo: "🏆 FINAL 6O — SOLTAR A FITA ADESIVA",
    texto: `Você arranca a fita dos lábios e grita com todas as forças. A patrulha da polícia ouve e arromba a casa!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6p: {
    id: "cap6p",
    isEnding: true,
    endingId: "6P",
    titulo: "🏆 FINAL 6P — CORRER PARA A RUA",
    texto: `Você corre pela grama até a rua e consegue carona com um motorista que chama a polícia!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6q: {
    id: "cap6q",
    isEnding: true,
    endingId: "6Q",
    titulo: "🏆 FINAL 6Q — FUGA FURTIVA NO QUINTAL",
    texto: `Você se esconde atrás do barril de metal até o sequestrador passar reto. Em seguida, pula a cerca do vizinho!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6r: {
    id: "cap6r",
    isEnding: true,
    endingId: "6R",
    titulo: "🏆 FINAL 6R — O SEGREDO DE GRIFFIN (CADEADO)",
    texto: `Usando a combinação de Griffin (33-45-27), a porta se abriu em silêncio! Você passou de mansinho ao lado da cadeira de balanço e saiu pela porta da frente sem acordar o Grabber!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  },

  cap6s: {
    id: "cap6s",
    isEnding: true,
    endingId: "6S",
    titulo: "🏆 FINAL 6S — A ROTA DE VANCE (DUTO)",
    texto: `Seguindo a dica de Vance Hopper, você rasgou o gesso e rastejou pelo duto de ventilação até a despensa da cozinha, escapando pela janela dos fundos!`,
    botoes: [{ texto: "🔄 [Jogar Novamente]", destino: "prologo" }]
  }
};