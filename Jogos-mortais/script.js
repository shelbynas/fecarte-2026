
const interfaceTV = document.getElementById("interface");
const inicio = document.getElementById("inicio");
const menu = document.getElementById("menu");
const jogo = document.getElementById("jogo");

const nomeInput = document.getElementById("nome");
const comecar = document.getElementById("comecar");
const iniciarHistoria = document.getElementById("iniciarHistoria");

const nomeMenu = document.getElementById("nomeMenu");

const texto = document.getElementById("texto");
const avancar = document.getElementById("avancar");
const play = document.getElementById("play");
const escolhas = document.getElementById("escolhas");

const tituloCena = document.getElementById("tituloCena");
const capitulo = document.getElementById("capitulo");
const contadorCena = document.getElementById("contadorCena");
const indicadorMensagem = document.getElementById("indicadorMensagem");

const areaHistoria = document.getElementById("areaHistoria");
const final = document.getElementById("final");
const finalTexto = document.getElementById("finalTexto");
const reiniciarFinal = document.getElementById("reiniciarFinal");
const statusCena = document.getElementById("statusCena");

let nomeJogador = "";
let cenaAtual = null;
let indiceFala = 0;
let escrevendo = false;
let timer = null;
let timerJogo = null;
let tempoRestante = 120;
let bloqueado = false;
let numeroCena = 0;
let timerIniciado = false;

const cenas = {

    despertar: {
        titulo: "PRÓLOGO",
        falas: [
            "Você lentamente abre os olhos, com a cabeça doendo e sentindo-se atordoado.",
            "Lentamente, percebe que está em um banheiro abandonado e sujo com uma corrente prendendo seu pé a um cano enferrujado.",
            "Antes que você possa reagir, uma televisão posicionada pouco a frente se liga, revelando uma figura misteriosa interpretada por um boneco palido com olhos e bochechas vermelhas",
            () => `Olá, ${nomeJogador}.`,
            () => `${nomeJogador}, quero que preste atenção: Alguns são tão ingratos por estarem vivos, mas você não, não mais.`,
            "Eu quero jogar um jogo.",
            "Em dois minutos um gás tóxico presente nas ventilações da sala será liberado e você sufocará até sua morte.",
            "Você tem esse tempo para achar uma forma de se libertar e destrancar a porta.",
            () => `Viver ou morrer, ${nomeJogador}, a escolha é sua.`,
            "Que o jogo comece."
        ],
        escolhas: [
            { texto: "OBSERVAR O AMBIENTE", proxima: "ambiente" },
            { texto: "IR ATÉ A BANCADA PRÓXIMA", proxima: "bancada" },
            { texto: "PUXAR A CORRENTE", proxima: "corrente" }
        ]
    },

    ambiente: {
        titulo: "A SALA",
        falas: [
            "Você decide observar o ambiente antes de fazer qualquer coisa.",
            "A porta para a saída está à sua esquerda e há uma pia a sua direita.",
            "Uma televisão antiga está posicionada no centro da sala.",
            "No chão existe uma pequena chave.",
            "Um pouco a frente existe uma bancada com ferramentas e acima dela uma câmera te observando.",
            "Além disso, há um interruptor de luz atrás de você.",
        ],
        escolhas: [
            { texto: "PEGAR E USAR A CHAVE", proxima: "chave" },
            { texto: "IR ATÉ A BANCADA PRÓXIMA", proxima: "bancada" },
            { texto: "PUXAR A CORRENTE", proxima: "corrente" },
            { texto: "DESLIGAR AS LUZES", proxima: "escuro" }
        ]
    },

    bancada: {
        titulo: "A BANCADA",
        falas: [
            "Há várias ferramentas na bancada. Um serrote, um martelo e uma machadinha.",
            "Todas em péssimas condições. Inúteis.",
        ],
        escolhas: [
            { texto: "TENTAR QUEBRAR A CORRENTE", proxima: "quebrar" },
        ]
    },

    corrente: {
        titulo: "A CORRENTE",
        falas: [
            "Você tenta puxar a corrente com toda a sua força. Não há efeito.",
        ],
        escolhas: [
            { texto: "OBSERVAR O AMBIENTE", proxima: "ambiente" },
            { texto: "IR ATÉ A BANCADA PRÓXIMA", proxima: "bancada" },
        ]
    },

    chave: {
        titulo: "A CHAVE",
        falas: [
            "Você pega a chave do chão. Ela parece antiga.",
            "Há uma pequena marca de quebra-cabeça gravada nela. Uma marca que geralmente aparece em cenas criminais do serial killer conhecido como Jigsaw.",
            "Você tenta usar a chave para destrancar a corrente que prende seu pé. Não funciona."
        ],
        escolhas: [
            { texto: "TENTAR ABRIR A PORTA", proxima: "abrir" },
        ]
    },

    abrir: {
        titulo: "A PORTA",
        falas: [
            "A porta abre com a chave que estava no chão.",
            "Do lado de fora, você vê túneis pouco iluminados que levam à saída.",
            "Você continua preso pela corrente no seu pé."
        ],
        escolhas: [
            { texto: "CHECAR A SI MESMO", proxima: "checar" }
        ]
    },

    quebrar: {
        titulo: "AS FERRAMENTAS",
        falas: [
            "Você tenta quebrar a corrente enquanto seus olhos fervem e o desespero toma conta de você.",
            "Entanto, nenhuma das ferramentas conseguem quebrar a corrente."
        ],
        escolhas: [
            { texto: "OBSERVAR O AMBIENTE", proxima: "ambiente" },
        ]
    },

    checar: {
        titulo: "A FITA",
        falas: [
            "Você estava tão desesperado que não percebeu que havia um toca-fitas em seu bolso. Ao tocar a fita que havia dentro:",
            () => `Olá novamente, ${nomeJogador}.`,
            "Se procura pela sua chance de escapar, recomendo que procure no escuro.",
        ],
        escolhas: [
            { texto: "DESLIGAR AS LUZES", proxima: "escuro" }
        ]
    },

    escuro: {
        titulo: "O ESCURO",
        falas: [
            "Assim que as luzes se apagam você percebe uma marcação em forma de X na parede ao seu lado.",
            "Você quebra a parede na marcação e descobre uma caixa com uma foto sua ao lado de um antigo tio desaparecido.",
            "Ao lado da foto uma chave.",
        ],
        escolhas: [
            { texto: "LIBERTAR-SE", proxima: "libertar" }
        ]
    },

    libertar: {
        titulo: "A LIBERTAÇÃO",
        falas: [
            "Você tira a corrente e sai pela porta.",
            "Ainda atordoado, você vaga pelos corredores até achar uma caixa sobre uma mesa que divide o corredor em dois.",
            "Dentro da caixa um cartão escrito:",
            () => `Olá, ${nomeJogador}. Se está lendo significa que conseguiu escapar. No entanto, o jogo ainda não acabou.`,
            "Se quiser saber a verdade, siga a esquerda. Caso contrário, você pode sair daqui seguindo a direita.",
        ],
        escolhas: [
            { texto: "A VERDADE", proxima: "esquerda" },
            { texto: "SAIR", proxima: "final2" }
        ]
    },

    esquerda: {
        titulo: "A VERDADE",
        falas: [
            "Seguindo, você se depara com uma grande porta. Ao abrir, você vê o escritório do homem por trás de tudo.",
            "Com vários protótipos de armadilhas e jogos, a figura do homem aparece de fundo vestindo uma capa preta que esconde seu rosto.",
            "Ele se aproxima e se revela como John Kramer, seu tio desaparecido após ter sido diagnosticado com câncer de cólon.",
            "Ele te entrega um revólver com uma bala e pergunta se quer ter vingança ou virar seu pupilo."
        ],
        escolhas: [
            { texto: "VINGAR-SE", proxima: "final3" },
            { texto: "CURVAR-SE", proxima: "final4" }
        ]
    },


    final1: {
        titulo: "FIM 01 — FIM DE JOGO",
        final: {
            titulo: "O TEMPO ACABOU",
            texto: "O contador chega a zero. O gás é liberado e você morre sufocado. O jogo termina."
        }
    },

    final2: {
        titulo: "FIM 02 — FUGA",
        final: {
            titulo: "VOCÊ ESCAPOU",
            texto: "Você escolhe a saída e deixa o local."
        }
    },

    final3: {
        titulo: "FIM 03 — VINGANÇA",
        final: {
            titulo: "A ESCOLHA DA VINGANÇA",
            texto: "Você decide enfrentar John Kramer, o Jigsaw. Você escapa mas os assassinatos de Jigsaw continuam... Como?"
        }
    },

    final4: {
        titulo: "FIM 04 — O PUPILO",
        final: {
            titulo: "O NOVO PUPILO",
            texto: "Você aceita a proposta de John Kramer. O jogo termina, mas uma nova etapa começa."
        }
    }
};

function obterFala() {
    const cena = cenas[cenaAtual];

    if (!cena || indiceFala >= cena.falas.length) {
        return "";
    }

    const fala = cena.falas[indiceFala];
    return typeof fala === "function" ? fala() : fala;
}

function iniciarJogo() {
    const nome = nomeInput.value.trim();

    if (nome.length === 0) {
        nomeInput.value = "";
        nomeInput.focus();
        nomeInput.classList.remove("erro");
        void nomeInput.offsetWidth;
        nomeInput.classList.add("erro");

        setTimeout(() => nomeInput.classList.remove("erro"), 500);
        return;
    }

    nomeJogador = nome;
    nomeMenu.textContent = nomeJogador;

    inicio.classList.add("escondida");
    menu.classList.remove("escondida");

    avancar.disabled = true;
    texto.textContent = "";
    escolhas.innerHTML = "";
}


function atualizarTimerVisual() {
    const timerElement = document.getElementById("timerJogo");
    if (!timerElement) return;

    const minutos = Math.floor(tempoRestante / 60);
    const segundos = tempoRestante % 60;

    timerElement.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

    timerElement.classList.toggle("timer-critico", tempoRestante <= 10);
}

function iniciarTimerJogo() {
    if (timerIniciado) return;

    timerIniciado = true;
    clearInterval(timerJogo);

    tempoRestante = 120;
    atualizarTimerVisual();

    timerJogo = setInterval(() => {
        tempoRestante--;
        atualizarTimerVisual();

        if (tempoRestante <= 0) {
            pararTimerJogo();

            cenaAtual = "final1";
            numeroCena++;
            tituloCena.textContent = cenas.final1.titulo;
            atualizarCabecalho();
            mostrarFinal(cenas.final1.final);
        }
    }, 1000);
}

function pararTimerJogo() {
    clearInterval(timerJogo);
    timerJogo = null;
}

function iniciarHistoriaJogo() {
    menu.classList.add("escondida");
    jogo.classList.remove("escondida");

    interfaceTV.classList.add("modo-historia");

    cenaAtual = "despertar";
    indiceFala = 0;
    numeroCena = 1;

    escrevendo = false;
    bloqueado = false;

    clearInterval(timer);

    final.classList.add("escondida");
    finalTexto.textContent = "";

    escolhas.innerHTML = "";
    escolhas.classList.add("escondida");
    areaHistoria.classList.remove("escondida");

    tituloCena.textContent = cenas[cenaAtual].titulo;

    atualizarCabecalho();

    avancar.disabled = false;
    mostrarMensagem();
}
function atualizarCabecalho() {
    capitulo.textContent = "ARQUIVO 01";
    if (contadorCena) contadorCena.textContent = String(numeroCena).padStart(2, "0");
    indicadorMensagem.textContent = String(indiceFala + 1).padStart(2, "0");
}

function mostrarMensagem() {
    const cena = cenas[cenaAtual];

    if (!cena) return;

    if (indiceFala >= cena.falas.length) {
        mostrarEscolhasOuFinal();
        return;
    }

    indicadorMensagem.textContent = String(indiceFala + 1).padStart(2, "0");
    escreverMensagem(obterFala());
}

function verificarInicioTimer() {
    if (
        cenaAtual === "despertar" &&
        indiceFala === cenas.despertar.falas.length - 1 &&
        !timerIniciado
    ) {
        iniciarTimerJogo();
    }
}

function escreverMensagem(mensagem) {
    clearInterval(timer);

    texto.textContent = "";
    escrevendo = true;
    bloqueado = true;
    play.textContent = "■";

    let i = 0;

    timer = setInterval(() => {
        texto.textContent += mensagem.charAt(i);
        i++;

        if (i >= mensagem.length) {
            clearInterval(timer);
            escrevendo = false;
            bloqueado = false;
            play.textContent = "▶";
            verificarInicioTimer();
        }
    }, 28);
}

function completarMensagem() {
    if (!escrevendo) return;

    clearInterval(timer);

    texto.textContent = obterFala();
    escrevendo = false;
    bloqueado = false;
    play.textContent = "▶";
    verificarInicioTimer();
}

function proximaMensagem() {
    if (!cenaAtual || bloqueado && !escrevendo) return;

    if (escrevendo) {
        completarMensagem();
        return;
    }

    const cena = cenas[cenaAtual];
    indiceFala++;

    if (indiceFala < cena.falas.length) {
        atualizarCabecalho();
        mostrarMensagem();
        return;
    }

    mostrarEscolhasOuFinal();
}

function mostrarEscolhasOuFinal() {
    const cena = cenas[cenaAtual];

    if (!cena) return;

    clearInterval(timer);
    escrevendo = false;
    bloqueado = true;

    avancar.disabled = true;

    if (cena.final) {
        mostrarFinal(cena.final);
        return;
    }

    if (!cena.escolhas || cena.escolhas.length === 0) return;

    areaHistoria.classList.add("escondida");
    escolhas.classList.remove("escondida");
    escolhas.innerHTML = "";

    cena.escolhas.forEach((escolha, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "escolha";
        botao.textContent = `${String(indice + 1).padStart(2, "0")} // ${escolha.texto}`;

        botao.addEventListener("click", () => escolher(escolha.proxima));

        escolhas.appendChild(botao);
    });
}

function escolher(proximaCena) {
    if (!cenas[proximaCena]) {
        console.error("Cena não encontrada:", proximaCena);
        return;
    }

    clearInterval(timer);

    cenaAtual = proximaCena;
    numeroCena++;
    indiceFala = 0;

    if (cenaAtual === "libertar") {
        pararTimerJogo();
    }

    escrevendo = false;
    bloqueado = false;

    escolhas.innerHTML = "";
    escolhas.classList.add("escondida");
    areaHistoria.classList.remove("escondida");

    tituloCena.textContent = cenas[cenaAtual].titulo;

    atualizarCabecalho();

    if (cenas[cenaAtual].final) {
        mostrarFinal(cenas[cenaAtual].final);
        return;
    }

    avancar.disabled = false;
    mostrarMensagem();
}

function mostrarFinal(dadosFinal) {
    pararTimerJogo();
    areaHistoria.classList.add("escondida");
    escolhas.classList.add("escondida");
    final.classList.remove("escondida");

    finalTexto.innerHTML = `
        <strong>${dadosFinal.titulo}</strong>
        <br><br>
        ${dadosFinal.texto}
    `;

    bloqueado = true;
    avancar.disabled = true;
}

function reiniciar() {
    pararTimerJogo();
    timerIniciado = false;
    clearInterval(timer);

    cenaAtual = null;
    indiceFala = 0;
    numeroCena = 0;
    escrevendo = false;
    bloqueado = false;

    texto.textContent = "";
    finalTexto.textContent = "";
    escolhas.innerHTML = "";

    final.classList.add("escondida");
    escolhas.classList.add("escondida");
    areaHistoria.classList.remove("escondida");

    jogo.className = "tela-cena escondida";
    interfaceTV.classList.remove("modo-historia");

    menu.classList.remove("escondida");
    inicio.classList.add("escondida");

    avancar.disabled = true;
    nomeInput.focus();
}
comecar.addEventListener("click", iniciarJogo);
iniciarHistoria.addEventListener("click", iniciarHistoriaJogo);

avancar.addEventListener("click", () => {
    if (!avancar.disabled && cenaAtual) {
        proximaMensagem();
    }
});

if (reiniciarFinal) reiniciarFinal.addEventListener("click", reiniciar);
nomeInput.addEventListener("keydown", event => {
    if (event.key === "Enter") iniciarJogo();
});
