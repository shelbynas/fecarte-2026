function rolarDado() {
    return Math.floor(Math.random() * 20) + 1;
}

// ===================================================================
// NOITE DE PÂNICO — história de terror slasher, protagonista único (Sofia).
// Cada cena pode ter:
//   - mood: 'calm' | 'tense' | 'danger' | 'good' | 'bittersweet' | 'bad'
//   - event: 'call' (mostra o banner de ligação) | 'danger' (treme a tela)
//   - speaker: nome exibido acima da fala (opcional)
//   - options: lista de escolhas. Uma opção com "type: continue" e uma
//     única entrada representa diálogo contínuo (sem decisão real).
// ===================================================================
const story = {
    start: {
        speaker: "",
        text: "Sexta-feira, 23h12. Seus pais viajaram e a casa está silenciosa demais. Hoje faz exatamente vinte anos desde a Noite do Rio Negro, quando três pessoas desapareceram na sua cidade e nunca mais foram encontradas. Você tenta não pensar nisso enquanto termina de guardar a louça. Lá fora, o vento bate contra as janelas.",
        mood: "calm",
        options: [
            { text: "Continuar", type: "continue", next: "tocaTelefone" }
        ]
    },

    tocaTelefone: {
        speaker: "",
        text: "O telefone da sala começa a tocar. Você olha o visor: NÚMERO DESCONHECIDO. Ninguém deveria estar ligando para o fixo àquela hora.",
        mood: "tense",
        event: "call",
        options: [
            { text: "Atender", type: "continue", next: "atender" }
        ]
    },

    atender: {
        speaker: "VOZ DESCONHECIDA",
        text: "Uma voz calma e arrastada pergunta, baixinho, qual final de filme de terror você prefere: aquele em que a garota escapa, ou aquele em que ela é a próxima. Um arrepio sobe pela sua nuca.",
        mood: "tense",
        event: "call",
        options: [
            { text: "Rir e debochar da ligação", next: "debochou", addToChoices: "Debochou da ligação" },
            { text: "Desligar na hora", next: "desligou", addToChoices: "Desligou o telefone" },
            { text: "Perguntar quem está falando", next: "perguntou", addToChoices: "Perguntou quem estava ligando" }
        ]
    },

    debochou: {
        speaker: "VOCÊ",
        text: "Você força uma risada e diz que já assistiu esse filme mil vezes e sabe exatamente como termina. Do outro lado, silêncio. Depois, uma respiração lenta.",
        mood: "tense",
        event: "call",
        options: [{ text: "Continuar", type: "continue", next: "vozAmeaca" }]
    },

    desligou: {
        speaker: "",
        text: "Você desliga na cara. Dois segundos depois, o telefone toca de novo. E de novo. Até você atender de volta.",
        mood: "tense",
        event: "call",
        options: [{ text: "Continuar", type: "continue", next: "vozAmeaca" }]
    },

    perguntou: {
        speaker: "VOZ DESCONHECIDA",
        text: "\"Isso importa?\", a voz responde, quase se divertindo. \"O que importa é que eu sei exatamente onde você está agora.\"",
        mood: "tense",
        event: "call",
        options: [{ text: "Continuar", type: "continue", next: "vozAmeaca" }]
    },

    vozAmeaca: {
        speaker: "VOZ DESCONHECIDA",
        text: "\"Aliás\", ele diz, \"troque aquele abajur de lugar. Daqui de onde eu estou, dá pra ver ele o tempo todo.\" A ligação cai. Você olha para o abajur da sala. Está exatamente onde sempre esteve.",
        mood: "danger",
        event: "call",
        options: [{ text: "Continuar", type: "continue", next: "lucesPiscam" }]
    },

    lucesPiscam: {
        speaker: "",
        text: "As luzes da casa piscam duas vezes e voltam ao normal. Seu coração dispara. Alguma coisa lá fora não está certa.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "primeiraEscolha" }]
    },

    primeiraEscolha: {
        speaker: "",
        text: "Você precisa decidir o que fazer agora.",
        mood: "tense",
        options: [
            { text: "Verificar a porta da frente", next: "verificarPorta", addToChoices: "Foi verificar a porta" },
            { text: "Ligar para Duda, sua melhor amiga", next: "falaComDuda", addToChoices: "Ligou para Duda" },
            { text: "Ir até a cozinha pegar uma faca", next: "pegaFaca", addToChoices: "Pegou uma faca na cozinha" }
        ]
    },

    verificarPorta: {
        speaker: "",
        text: "Você se aproxima devagar da porta da frente. Está trancada, mas a cortina da janela ao lado balança como se alguém a tivesse acabado de soltar.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "checaJanela" }]
    },

    checaJanela: {
        speaker: "",
        text: "Você pode arriscar espiar o quintal escuro, ou preferir não ver nada.",
        mood: "tense",
        options: [
            { text: "Observar o quintal pela janela", roll: true, successThreshold: 12, successNext: "veSilhueta", failNext: "distracaoBarulho", addToChoices: "Espiou o quintal" },
            { text: "Não olhar e trancar tudo", next: "trancaTudo", addToChoices: "Preferiu não olhar" }
        ]
    },

    veSilhueta: {
        speaker: "",
        text: "Por um instante, uma forma alta e imóvel aparece sob o poste da rua. Quando você pisca, ela já não está mais lá.",
        mood: "danger",
        options: [{ text: "Continuar", type: "continue", next: "campainha" }]
    },

    distracaoBarulho: {
        speaker: "",
        text: "Um barulho na parte de trás da casa te distrai por um segundo. Quando você volta o olhar para o quintal, não há mais nada — ou nunca houve.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "campainha" }]
    },

    trancaTudo: {
        speaker: "",
        text: "Você tranca a porta, fecha as cortinas e decide não olhar para fora de novo essa noite.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "campainha" }]
    },

    falaComDuda: {
        speaker: "DUDA",
        text: "\"Também recebi uma ligação estranha\", ela diz, a voz tensa. \"Já tô indo pra tua casa, não fica sozinha.\"",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "campainha" }]
    },

    pegaFaca: {
        speaker: "",
        text: "Você vai até a cozinha e pega a maior faca da gaveta, segurando com as duas mãos trêmulas.",
        mood: "tense",
        addToInventory: "Faca de Cozinha",
        options: [{ text: "Continuar", type: "continue", next: "campainha" }]
    },

    campainha: {
        speaker: "",
        text: "A campainha toca, três vezes seguidas, rápido demais para ser educado.",
        mood: "danger",
        options: [
            { text: "Abrir a porta", next: "abrirPorta", addToChoices: "Abriu a porta direto" },
            { text: "Olhar pelo olho mágico primeiro", next: "olharOlhoMagico", addToChoices: "Checou pelo olho mágico" }
        ]
    },

    abrirPorta: {
        speaker: "",
        text: "Você destrava a porta com o coração na garganta. É a Duda, ofegante, com o celular ainda na mão.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "duda1" }]
    },

    olharOlhoMagico: {
        speaker: "",
        text: "Você espia pelo olho mágico. É a Duda, olhando para os dois lados da rua, claramente assustada.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "duda1" }]
    },

    duda1: {
        speaker: "DUDA",
        text: "\"O Rafa não atende mais o celular\", Duda diz, entrando rápido e trancando a porta atrás dela. \"E eu vi uma coisa branca se mexendo perto da casa dele antes de vir pra cá.\"",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "escolhaResgate" }]
    },

    escolhaResgate: {
        speaker: "",
        text: "Vocês duas se entreolham. Alguma decisão precisa ser tomada agora.",
        mood: "tense",
        options: [
            { text: "Ir a pé até a casa do Rafa agora", roll: true, successThreshold: 14, successNext: "chegamCasaRafa", failNext: "emboscada", addToChoices: "Foi direto até a casa do Rafa" },
            { text: "Chamar a polícia primeiro", next: "chamaPolicia", addToChoices: "Chamou a polícia primeiro" },
            { text: "Trancar tudo e esperar o Rafa aparecer", next: "esperarEmCasa", addToChoices: "Decidiu esperar em casa" }
        ]
    },

    emboscada: {
        speaker: "",
        text: "No meio do caminho, entre duas casas escuras, uma figura mascarada surge do nada e bloqueia a passagem.",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "lutaOuFuga" }]
    },

    lutaOuFuga: {
        speaker: "",
        text: "Não há tempo para pensar.",
        mood: "danger",
        event: "danger",
        options: [
            { text: "Lutar com a faca de cozinha", requiredItem: "Faca de Cozinha", roll: true, successThreshold: 11, successNext: "venceuPrimeiroAtaque", failNext: "feridaGrave", addToChoices: "Lutou com a faca" },
            { text: "Lutar com as próprias mãos", roll: true, successThreshold: 16, successNext: "venceuPrimeiroAtaque", failNext: "feridaGrave", addToChoices: "Lutou com as mãos" },
            { text: "Fugir correndo", roll: true, successThreshold: 12, successNext: "fugiuComSucesso", failNext: "feridaGrave", addToChoices: "Tentou fugir da emboscada" }
        ]
    },

    venceuPrimeiroAtaque: {
        speaker: "",
        text: "Você acerta um golpe certeiro. Ele cambaleia, solta um grunhido abafado pela máscara e foge mancando para a escuridão — deixando para trás um pedaço rasgado de tecido.",
        mood: "tense",
        addToInventory: "Pedaço de Máscara",
        addToChoices: "Feriu o atacante e guardou um pedaço da máscara",
        options: [{ text: "Continuar", type: "continue", next: "chegamCasaRafa" }]
    },

    fugiuComSucesso: {
        speaker: "",
        text: "Vocês correm sem olhar para trás. Quando param para respirar, percebem que se separaram no caminho — mas não há tempo a perder, a casa do Rafa já está logo ali.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "chegamCasaRafa" }]
    },

    feridaGrave: {
        speaker: "",
        text: "Uma dor em fogo corta seu braço. Você consegue se afastar, mas está sangrando e cada passo agora dói.",
        mood: "danger",
        addToChoices: "Ficou ferida na emboscada",
        options: [{ text: "Continuar", type: "continue", next: "chegamCasaRafaFerida" }]
    },

    chamaPolicia: {
        speaker: "",
        text: "Você liga para a polícia. A atendente parece cansada: \"Vamos mandar uma viatura assim que possível, mas hoje está uma loucura por aqui.\"",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "escolhaResgate2" }]
    },

    escolhaResgate2: {
        speaker: "",
        text: "Vocês não sabem quanto tempo a polícia vai demorar.",
        mood: "tense",
        options: [
            { text: "Não dá pra esperar, ir agora", next: "chegamCasaRafa", addToChoices: "Não esperou a polícia" },
            { text: "Esperar a polícia chegar", next: "esperaPolicia", addToChoices: "Esperou a polícia" }
        ]
    },

    esperaPolicia: {
        speaker: "",
        text: "Os minutos passam devagar demais. De repente, um grito curto vem de fora — a voz da Duda.",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "emboscada" }]
    },

    esperarEmCasa: {
        speaker: "",
        text: "Vocês trancam todas as portas e janelas, apagam as luzes e se sentam encostadas na parede, ouvindo cada som da casa.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "ouveBarulhoPorao" }]
    },

    ouveBarulhoPorao: {
        speaker: "",
        text: "Um barulho abafado vem lá de baixo, do porão.",
        mood: "danger",
        options: [
            { text: "Descer para checar o porão", roll: true, successThreshold: 13, successNext: "escondeATempo", failNext: "pegaDesprevenida", addToChoices: "Desceu ao porão" },
            { text: "Ignorar e ficar longe do porão", next: "ignoraPorao", addToChoices: "Ignorou o barulho do porão" }
        ]
    },

    escondeATempo: {
        speaker: "",
        text: "Você desce com cuidado. É só o gato do vizinho, que entrou por uma janela mal fechada. Vocês riem, aliviadas, mas o alívio dura pouco.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "madrugadaSegura" }]
    },

    pegaDesprevenida: {
        speaker: "",
        text: "No escuro do porão, uma mão cobre sua boca antes que você consiga gritar.",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "lutaOuFugaCasa" }]
    },

    ignoraPorao: {
        speaker: "",
        text: "Vocês decidem não arriscar. O barulho não se repete.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "madrugadaSegura" }]
    },

    lutaOuFugaCasa: {
        speaker: "",
        text: "Você precisa reagir agora, ou não vai ter uma segunda chance.",
        mood: "danger",
        event: "danger",
        options: [
            { text: "Lutar com a faca de cozinha", requiredItem: "Faca de Cozinha", roll: true, successThreshold: 11, successNext: "expulsouInvasor", failNext: "finalMorteCasa", addToChoices: "Lutou com a faca dentro de casa" },
            { text: "Lutar com as próprias mãos", roll: true, successThreshold: 16, successNext: "expulsouInvasor", failNext: "finalMorteCasa", addToChoices: "Lutou com as mãos dentro de casa" },
            { text: "Correr para fora pela janela", roll: true, successThreshold: 12, successNext: "fugiuPelaJanela", failNext: "finalMorteCasa", addToChoices: "Fugiu pela janela" }
        ]
    },

    expulsouInvasor: {
        speaker: "",
        text: "Você consegue se soltar e acerta o suficiente para ele recuar e desaparecer pela porta dos fundos. Vocês trancam tudo de novo, tremendo, mas vivas.",
        mood: "bittersweet",
        options: [{ text: "Continuar", type: "continue", next: "finalSobrevivenciaSolitaria" }]
    },

    fugiuPelaJanela: {
        speaker: "",
        text: "Vocês pulam pela janela da cozinha e correm até a casa do vizinho, batendo a porta atrás de vocês.",
        mood: "bittersweet",
        options: [{ text: "Continuar", type: "continue", next: "finalSobrevivenciaSolitaria" }]
    },

    madrugadaSegura: {
        speaker: "",
        text: "As horas passam. Por volta das quatro da manhã, o céu começa a clarear timidamente. Nada mais acontece — pelo menos não com vocês.",
        mood: "bittersweet",
        options: [{ text: "Continuar", type: "continue", next: "finalAmbiguo" }]
    },

    chegamCasaRafa: {
        speaker: "",
        text: "Vocês chegam à casa do Rafa. A porta da frente está entreaberta, e não há nenhuma luz acesa lá dentro.",
        mood: "danger",
        options: [{ text: "Continuar", type: "continue", next: "entramCasaRafa" }]
    },

    chegamCasaRafaFerida: {
        speaker: "",
        text: "Machucada, você se apoia na Duda para caminhar o resto do caminho. A porta da casa do Rafa está entreaberta.",
        mood: "danger",
        options: [{ text: "Continuar", type: "continue", next: "entramCasaRafa" }]
    },

    entramCasaRafa: {
        speaker: "",
        text: "O silêncio lá dentro é pesado demais.",
        mood: "danger",
        options: [
            { text: "Chamar pelo nome do Rafa", next: "chamamRafa", addToChoices: "Chamou pelo Rafa" },
            { text: "Procurar em silêncio", roll: true, successThreshold: 11, successNext: "encontramPista", failNext: "sonsEstranhos", addToChoices: "Procurou em silêncio" }
        ]
    },

    chamamRafa: {
        speaker: "",
        text: "Ninguém responde. Só o eco da própria voz voltando pelos corredores vazios.",
        mood: "danger",
        options: [{ text: "Continuar", type: "continue", next: "sonsEstranhos" }]
    },

    encontramPista: {
        speaker: "",
        text: "No chão da sala, meio escondido sob o sofá, vocês encontram um bilhete manchado de sangue com um símbolo desenhado à mão — o mesmo símbolo da Noite do Rio Negro.",
        mood: "danger",
        addToInventory: "Bilhete Ensanguentado",
        options: [{ text: "Continuar", type: "continue", next: "confrontoFinalPrep" }]
    },

    sonsEstranhos: {
        speaker: "",
        text: "Um som de arrastar vem do andar de cima. Alguma coisa — ou alguém — está esperando.",
        mood: "danger",
        options: [{ text: "Continuar", type: "continue", next: "confrontoFinalPrep" }]
    },

    confrontoFinalPrep: {
        speaker: "MASCARADO",
        text: "No topo da escada, uma figura mascarada aparece, bloqueando a única saída. \"Vinte anos\", ele sussurra. \"Ninguém nunca perguntou o que aconteceu comigo naquela noite.\"",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "revelacaoMascara" }]
    },

    revelacaoMascara: {
        speaker: "",
        text: "É agora ou nunca.",
        mood: "danger",
        event: "danger",
        options: [
            { text: "Usar o pedaço de máscara que você guardou como prova", requiredItem: "Pedaço de Máscara", next: "descobremIdentidade", addToChoices: "Usou o pedaço de máscara como prova" },
            { text: "Mostrar o bilhete e confrontar com a verdade", requiredItem: "Bilhete Ensanguentado", next: "negociarComProva", addToChoices: "Confrontou com o bilhete" },
            { text: "Arrancar a máscara dele à força", roll: true, successThreshold: 15, successNext: "descobremIdentidade", failNext: "contraAtaque", addToChoices: "Tentou arrancar a máscara" },
            { text: "Atacar direto, sem hesitar", roll: true, successThreshold: 13, successNext: "feriuAtacante", failNext: "contraAtaque", addToChoices: "Atacou direto" },
            { text: "Tentar ganhar tempo conversando", next: "negociar", addToChoices: "Tentou negociar" }
        ]
    },

    negociarComProva: {
        speaker: "",
        text: "Diante da prova nas suas mãos, ele hesita — um segundo de dúvida é tudo que vocês precisam.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "descobremIdentidade" }]
    },

    negociar: {
        speaker: "",
        text: "Você fala, tentando prolongar cada segundo. Atrás dele, sem que perceba, Duda se aproxima devagar segurando um abajur de metal.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "dudaAjuda" }]
    },

    dudaAjuda: {
        speaker: "DUDA",
        text: "Duda acerta um golpe certeiro na cabeça dele. Ele cai, atordoado, a máscara escorregando.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "descobremIdentidade" }]
    },

    contraAtaque: {
        speaker: "",
        text: "Ele avança rápido demais, derrubando você no chão. Esta é sua última chance.",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "lastChance" }]
    },

    lastChance: {
        speaker: "",
        text: "Tudo o que você tem é um último movimento.",
        mood: "danger",
        event: "danger",
        options: [
            { text: "Última tentativa de lutar", roll: true, successThreshold: 17, successNext: "descobremIdentidade", failNext: "finalMorteConfronto", addToChoices: "Fez a última tentativa" }
        ]
    },

    feriuAtacante: {
        speaker: "",
        text: "Seu golpe acerta em cheio. Ele recua, segurando o ferimento, a máscara torta sobre o rosto.",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "descobremIdentidade" }]
    },

    descobremIdentidade: {
        speaker: "MASCARADO",
        text: "A máscara cai no chão. O rosto por trás dela é alguém que a cidade toda conhece — o irmão mais novo de uma das vítimas da Noite do Rio Negro, que todos acreditavam ter se mudado anos atrás. \"Vocês esqueceram\", ele murmura, ainda tonto. \"Mas eu não.\"",
        mood: "tense",
        options: [{ text: "Continuar", type: "continue", next: "escolhaFinal" }]
    },

    escolhaFinal: {
        speaker: "",
        text: "Falta pouco para o amanhecer.",
        mood: "tense",
        options: [
            { text: "Prendê-lo até a polícia chegar", next: "finalHeroico", addToChoices: "Prendeu o mascarado" },
            { text: "Fugir e deixar a polícia resolver depois", next: "finalFuga", addToChoices: "Fugiu da casa" },
            { text: "Reparar em um segundo vulto mascarado na porta", roll: true, successThreshold: 14, successNext: "finalReviravolta", failNext: "finalHeroico", addToChoices: "Notou algo estranho na porta" }
        ]
    },

    // ===================== FINAIS =====================

    finalHeroico: {
        speaker: "",
        text: "Vocês o mantêm imobilizado até a polícia chegar. O Rafa é encontrado amarrado, mas vivo, no porão. Nos dias seguintes, a cidade toda fala sobre a Noite do Rio Negro de um jeito que não falava há vinte anos — finalmente em voz alta. Você sobreviveu. Dessa vez, a história teve um final diferente.\n\nFIM — Final: A Verdade Vem à Tona.",
        mood: "good",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalFuga: {
        speaker: "",
        text: "Vocês correm da casa sem olhar para trás e só param na delegacia, ofegantes. Quando a polícia volta ao local, ele já não está mais lá. Ninguém nunca mais o viu — ou pelo menos, ninguém admite ter visto.\n\nFIM — Final: Ele Desapareceu de Novo.",
        mood: "bittersweet",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalReviravolta: {
        speaker: "MASCARADO",
        text: "Pelo canto do olho, você percebe uma segunda figura parada na porta, observando tudo em silêncio, uma máscara idêntica escondendo o rosto. \"Ele nunca trabalhou sozinho\", a voz sussurra atrás de você.",
        mood: "danger",
        event: "danger",
        options: [{ text: "Continuar", type: "continue", next: "ultimaChanceReviravolta" }]
    },

    ultimaChanceReviravolta: {
        speaker: "",
        text: "Só resta uma saída.",
        mood: "danger",
        event: "danger",
        options: [
            { text: "Correr com a Duda antes que o segundo se aproxime", roll: true, successThreshold: 15, successNext: "finalSobrevivenciaAmarga", failNext: "finalMorteConfronto", addToChoices: "Correu do segundo mascarado" }
        ]
    },

    finalSobrevivenciaAmarga: {
        speaker: "",
        text: "Vocês escapam por pouco, mas o segundo mascarado desaparece na noite antes da polícia chegar. Você sobrevive à Noite do Rio Negro — só que, dessa vez, ninguém sabe se ela realmente terminou.\n\nFIM — Final: Nunca Termina de Verdade.",
        mood: "bittersweet",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalMorteConfronto: {
        speaker: "",
        text: "Você não é rápida o suficiente. A última coisa que vê é a máscara branca se aproximando, e depois, nada. A Noite do Rio Negro ganha mais um nome para sua lista.\n\nFIM — Final: Mais um Nome na Lista.",
        mood: "bad",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalMorteCasa: {
        speaker: "",
        text: "Você luta até o fim, mas não é suficiente. Na manhã seguinte, os vizinhos notam que as luzes da sua casa ficaram acesas a noite inteira — e que ninguém nunca mais atendeu à porta.\n\nFIM — Final: Ninguém Atendeu a Porta.",
        mood: "bad",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalSobrevivenciaSolitaria: {
        speaker: "",
        text: "Vocês passam o resto da madrugada trancadas em casa, o coração ainda disparado. Pela manhã, a polícia encontra sinais de invasão, mas nenhuma pista de quem era. A Noite do Rio Negro continua sendo um mistério — e agora, você faz parte dela.\n\nFIM — Final: Mais Uma História Sem Resposta.",
        mood: "bittersweet",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    },

    finalAmbiguo: {
        speaker: "",
        text: "O sol nasce e nada mais acontece. Na manhã seguinte, porém, vocês descobrem que o Rafa nunca foi encontrado. A cidade nunca soube se ele fugiu, se escapou, ou se virou mais um nome na lista da Noite do Rio Negro.\n\nFIM — Final: O Que Aconteceu com o Rafa?",
        mood: "bittersweet",
        options: [{ text: "Jogar novamente", type: "continue", next: "start" }]
    }
};

let playerState = {
    currentScene: 'start',
    inventory: [],
    choices: []
};

const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const characterName = document.getElementById('character-name');
const dialogueText = document.getElementById('dialogue-text');
const optionsContainer = document.getElementById('options-container');
const dadoResultado = document.getElementById('dado-resultado');
const inventarioDiv = document.getElementById('inventario');
const escolhasDiv = document.getElementById('escolhas');
const callLabel = document.getElementById('call-label');

let isTyping = false;
let typingTimeout;

function updateInventory() {
    inventarioDiv.textContent = playerState.inventory.length > 0
        ? ' Itens: ' + playerState.inventory.join(', ')
        : ' Itens: (nenhum)';
}

function updateChoices() {
    escolhasDiv.textContent = playerState.choices.length > 0
        ? ' Registro: ' + playerState.choices.join(' | ')
        : ' Registro: (vazio)';
}

function typeText(text, callback) {
    isTyping = true;
    dialogueText.textContent = '';
    let index = 0;
    function type() {
        if (index < text.length) {
            dialogueText.textContent += text.charAt(index);
            index++;
            typingTimeout = setTimeout(type, 22);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    type();
}

function applyMoodAndEvent(scene) {
    // Remove classes de clima anteriores
    gameContainer.className = '';
    if (scene.mood) {
        gameContainer.classList.add('mood-' + scene.mood);
    }
    if (scene.event === 'call') {
        gameContainer.classList.add('event-call');
        callLabel.textContent = scene.callerLabel || 'NÚMERO DESCONHECIDO';
    } else if (scene.event === 'danger') {
        // Reaplica a animação de tremor mesmo se a classe já existir
        gameContainer.classList.remove('event-danger');
        void gameContainer.offsetWidth; // força reflow
        gameContainer.classList.add('event-danger');
    }
}

function showScene(sceneKey) {
    const scene = story[sceneKey];
    playerState.currentScene = sceneKey;

    applyMoodAndEvent(scene);

    if (scene.addToInventory && !playerState.inventory.includes(scene.addToInventory)) {
        playerState.inventory.push(scene.addToInventory);
    }
    if (scene.addToChoices) {
        playerState.choices.push(scene.addToChoices);
    }

    characterName.textContent = scene.speaker || '';

    typeText(scene.text, () => {
        renderOptions(scene.options);
    });

    updateInventory();
    updateChoices();
}

function renderOptions(options) {
    optionsContainer.innerHTML = '';

    if (!options || options.length === 0) {
        const endMessage = document.createElement('div');
        endMessage.textContent = "Fim da história.";
        optionsContainer.appendChild(endMessage);
        return;
    }

    options.forEach(option => {
        if (option.requiredItem && !playerState.inventory.includes(option.requiredItem)) {
            return;
        }

        const btn = document.createElement('button');
        btn.classList.add(option.type === 'continue' ? 'continue-button' : 'option-button');
        btn.textContent = option.text;
        btn.onclick = () => handleOption(option);
        optionsContainer.appendChild(btn);
    });
}

function handleOption(option) {
    if (isTyping) {
        clearTimeout(typingTimeout);
        dialogueText.textContent = story[playerState.currentScene].text;
        isTyping = false;
        renderOptions(story[playerState.currentScene].options);
        return;
    }

    if (option.next === "start") {
        playerState.inventory = [];
        playerState.choices = [];
    }

    if (option.addToInventory && !playerState.inventory.includes(option.addToInventory)) {
        playerState.inventory.push(option.addToInventory);
    }

    if (option.addToChoices) {
        playerState.choices.push(option.addToChoices);
    }

    if (option.roll) {
        const roll = rolarDado();
        dadoResultado.style.display = 'block';
        dadoResultado.textContent = `Teste de sobrevivência: ${roll} (precisa de ${option.successThreshold}+)`;

        setTimeout(() => {
            dadoResultado.style.display = 'none';
            if (roll >= option.successThreshold) {
                showScene(option.successNext);
            } else {
                showScene(option.failNext);
            }
        }, 1600);
    } else if (option.next) {
        showScene(option.next);
    }
}

gameContainer.addEventListener('click', (e) => {
    if (e.target.closest('.option-button, .continue-button')) return;
    if (isTyping) {
        clearTimeout(typingTimeout);
        dialogueText.textContent = story[playerState.currentScene].text;
        isTyping = false;
        renderOptions(story[playerState.currentScene].options);
    }
});

showScene(playerState.currentScene);
