/* ==========================================================================
   ESTADO DO JOGADOR E GERENCIAMENTO DE INVENTÁRIO
   ========================================================================== */
const gameState = {
    hp: 10,
    maxHp: 10,
    stamina: 5,
    maxStamina: 5,
    inventory: [],
    maxInventorySlots: 4,
    currentScene: "prologue",
    isRolling: false,
    rollSpins: 0
};

const faceRotations = {
    1: { x: 0, y: 0 },
    2: { x: -90, y: 0 },
    3: { x: 0, y: -90 },
    4: { x: 0, y: 90 },
    5: { x: 90, y: 0 },
    6: { x: 0, y: 180 }
};

const TROPHY_STORAGE_KEY = "ff13_crystal_lake_trophies";

const endingsMeta = {
    ending_death:      { icon: "💀", kicker: "Fim de Jogo", name: "Não Sobreviveu",        desc: "Jason alcançou você antes do amanhecer." },
    ending_good_car:    { icon: "🚙", kicker: "Final Bom",   name: "Fuga Pela Rodovia",      desc: "Escapou dirigindo a velha Pick-Up de resgate." },
    ending_good_boat:   { icon: "🛶", kicker: "Final Bom",   name: "Além das Águas Escuras", desc: "Atravessou o lago em segurança até a outra margem." },
    ending_heroic:      { icon: "🚓", kicker: "Final Bom",   name: "Resgate da Polícia",     desc: "Pediu socorro a tempo e foi resgatado." }
};
const ENDING_KEYS = Object.keys(endingsMeta);

/* ==========================================================================
   TROFÉUS (persistidos neste computador)
   ========================================================================== */
function loadTrophies() {
    try {
        const raw = localStorage.getItem(TROPHY_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function saveTrophies(data) {
    try {
        localStorage.setItem(TROPHY_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        /* armazenamento indisponível — segue o jogo normalmente */
    }
}

function recordEnding(endingKey) {
    const trophies = loadTrophies();
    const isNew = !trophies[endingKey];
    trophies[endingKey] = (trophies[endingKey] || 0) + 1;
    saveTrophies(trophies);
    updateTrophyBadges();
    return isNew;
}

function updateTrophyBadges() {
    const trophies = loadTrophies();
    const unlockedCount = ENDING_KEYS.filter(k => trophies[k]).length;
    const label = `${unlockedCount}/${ENDING_KEYS.length}`;
    const badgeTitle = document.getElementById("trophy-count-badge");
    const badgeProgress = document.getElementById("trophy-progress");
    if (badgeTitle) badgeTitle.innerText = label;
    if (badgeProgress) badgeProgress.innerText = label;
}

function renderTrophyGrid() {
    const grid = document.getElementById("trophy-grid");
    if (!grid) return;
    const trophies = loadTrophies();
    grid.innerHTML = "";

    ENDING_KEYS.forEach(key => {
        const meta = endingsMeta[key];
        const count = trophies[key] || 0;
        const unlocked = count > 0;

        const card = document.createElement("div");
        card.className = `trophy-card ${unlocked ? "unlocked" : "locked"}`;

        card.innerHTML = `
            <span class="trophy-icon">${unlocked ? meta.icon : "🔒"}</span>
            <span class="trophy-name">${unlocked ? meta.name : "???"}</span>
            <span class="trophy-desc">${unlocked ? meta.desc : "Continue jogando para descobrir este desfecho."}</span>
            ${unlocked ? `<span class="trophy-times">Alcançado ${count}x</span>` : ""}
        `;
        grid.appendChild(card);
    });

    updateTrophyBadges();
}

/* ==========================================================================
   NAVEGAÇÃO ENTRE TELAS
   ========================================================================== */
function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(el => el.classList.remove("is-active"));
    const target = document.getElementById(screenId);
    if (target) target.classList.add("is-active");
}

/* ==========================================================================
   FUNÇÕES DE INVENTÁRIO
   ========================================================================== */
function addItem(itemName) {
    if (gameState.inventory.length < gameState.maxInventorySlots) {
        if (!gameState.inventory.includes(itemName)) {
            gameState.inventory.push(itemName);
            updateHUD();
            showMessage(`Item obtido: [${itemName}]`);
            return true;
        }
    } else {
        showMessage(`Sua mochila está cheia! Não foi possível pegar [${itemName}]`);
        return false;
    }
}

function removeItem(itemName) {
    const index = gameState.inventory.indexOf(itemName);
    if (index > -1) {
        gameState.inventory.splice(index, 1);
        updateHUD();
    }
}

function hasItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function useConsumableItem(itemName) {
    if (itemName === "Kit Médico") {
        if (gameState.hp < gameState.maxHp) {
            restoreHp(4);
            removeItem("Kit Médico");
            showMessage("Você tratou seus ferimentos com o Kit Médico (+4 HP)!");
        } else {
            showMessage("Sua saúde já está no máximo!");
        }
    } else {
        showMessage(`[${itemName}] é um item de uso em momentos específicos da história.`);
    }
}

/* ==========================================================================
   SISTEMA DE MENSAGENS E ATRIBUTOS
   ========================================================================== */
function showMessage(msg) {
    const diceBanner = document.getElementById("dice-banner");
    const diceBannerText = document.getElementById("dice-banner-text");
    if (diceBanner && diceBannerText) {
        diceBannerText.innerText = msg;
        diceBanner.classList.remove("hidden");
    }
}

function hideMessage() {
    const diceBanner = document.getElementById("dice-banner");
    if (diceBanner) diceBanner.classList.add("hidden");
}

function takeDamage(amount) {
    gameState.hp = Math.max(0, gameState.hp - amount);
    updateHUD();
    if (gameState.hp <= 0) {
        setTimeout(() => {
            goToScene("ending_death");
        }, 900);
    }
}

function restoreHp(amount) {
    gameState.hp = Math.min(gameState.maxHp, gameState.hp + amount);
    updateHUD();
}

function useStamina(amount) {
    gameState.stamina = Math.max(0, gameState.stamina - amount);
    updateHUD();
}

function rollD6Value() {
    return Math.floor(Math.random() * 6) + 1;
}

/* ==========================================================================
   ANIMAÇÃO E ROLAGEM 3D DO DADO (ritmo mais lento e suspense maior)
   ========================================================================== */
const DICE_SPIN_DURATION = 2300; // tempo girando antes de revelar o resultado
const DICE_RESULT_HOLD = 1900;   // tempo exibindo o resultado antes de fechar

function handleDiceTest({ bonus = 0, target, statusMsg, onSuccess, onFail }) {
    if (gameState.isRolling) return;
    gameState.isRolling = true;

    const diceStage = document.getElementById("dice-stage");
    const cube = document.getElementById("cube");
    const diceStatus = document.getElementById("dice-status");

    diceStatus.innerText = statusMsg || "TESTANDO SUA SORTE...";
    diceStage.classList.remove("hidden");
    cube.classList.add("rolling");

    const roll = rollD6Value();
    const total = roll + bonus;
    const isSuccess = total >= target;

    setTimeout(() => {
        cube.classList.remove("rolling");

        gameState.rollSpins += 1440;
        const targetRot = faceRotations[roll];
        const finalX = targetRot.x + gameState.rollSpins;
        const finalY = targetRot.y + gameState.rollSpins;
        cube.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;

        let resultSummary = `Resultado: Dado (${roll})`;
        if (bonus > 0) resultSummary += ` + Bônus (${bonus})`;
        resultSummary += ` | Total: ${total}`;
        diceStatus.innerText = `${resultSummary} - ${isSuccess ? "SUCESSO!" : "FALHA!"}`;

        setTimeout(() => {
            diceStage.classList.add("hidden");
            gameState.isRolling = false;
            showMessage(isSuccess ? `Sucesso no teste! (${roll} no dado)` : `Falha no teste! (${roll} no dado)`);

            if (isSuccess && typeof onSuccess === "function") {
                onSuccess();
            } else if (!isSuccess && typeof onFail === "function") {
                onFail();
            }
        }, DICE_RESULT_HOLD);

    }, DICE_SPIN_DURATION);
}

/* ==========================================================================
   ATUALIZAÇÃO DA HUD
   ========================================================================== */
function updateHUD() {
    const hpDisplay = document.getElementById("hp-display");
    const hpBar = document.getElementById("hp-bar");
    if (hpDisplay) hpDisplay.innerText = `${gameState.hp}/${gameState.maxHp}`;
    if (hpBar) hpBar.style.width = `${(gameState.hp / gameState.maxHp) * 100}%`;

    const staminaDisplay = document.getElementById("stamina-display");
    const staminaBar = document.getElementById("stamina-bar");
    if (staminaDisplay) staminaDisplay.innerText = `${gameState.stamina}/${gameState.maxStamina}`;
    if (staminaBar) staminaBar.style.width = `${(gameState.stamina / gameState.maxStamina) * 100}%`;

    const invCount = document.getElementById("inv-count");
    const inventoryList = document.getElementById("inventory-list");
    if (invCount) invCount.innerText = gameState.inventory.length;

    if (inventoryList) {
        inventoryList.innerHTML = "";
        for (let i = 0; i < gameState.maxInventorySlots; i++) {
            if (i < gameState.inventory.length) {
                const item = gameState.inventory[i];
                const chip = document.createElement("div");
                chip.className = "item-chip";
                chip.innerText = item;
                chip.title = "Clique para utilizar";
                chip.onclick = () => useConsumableItem(item);
                inventoryList.appendChild(chip);
            } else {
                const emptySlot = document.createElement("div");
                emptySlot.className = "item-chip item-empty";
                emptySlot.innerText = "—";
                inventoryList.appendChild(emptySlot);
            }
        }
    }
}

/* ==========================================================================
   ROTEIRO E CENAS NARRATIVAS
   ========================================================================== */
const scenes = {
    prologue: {
        chapter: "PRÓLOGO",
        title: "A Estrada Esquecida para Crystal Lake",
        text: "É noite de sexta-feira, 13 de julho de 1984. Uma tempestade implacável castiga a região. Seu carro derrapa na lama e para violentamente no acostamento de uma estrada abandonada.\n\nAo sair do veículo sob o temporal, a luz dos faróis ilumina uma placa de madeira corroída: 'BEM-VINDO AO ACAMPAMENTO CRYSTAL LAKE - FECHADO DESDE 1957'. O vento uiva entre os pinheiros altos.\n\nÀ sua esquerda, as luzes fracas de um antigo posto de gasolina piscam na neblina. À sua frente, uma trilha de terra segue em direção aos portões do acampamento.",
        choices: [
            {
                text: "Investigar a oficina do posto em busca de abrigo e recursos",
                tag: "Teste de Sorte",
                action: () => handleDiceTest({
                    target: 3,
                    statusMsg: "Vasculhando a oficina escura...",
                    onSuccess: () => {
                        addItem("Lanterna");
                        goToScene("prologue_gas_station");
                    },
                    onFail: () => {
                        takeDamage(2);
                        showMessage("Uma prateleira enferrujada desabou sobre você no escuro! (-2 HP)");
                        goToScene("prologue_gas_station");
                    }
                })
            },
            {
                text: "Abandonar o carro e marchar direto para o acampamento",
                action: () => goToScene("arrival")
            }
        ]
    },

    prologue_gas_station: {
        chapter: "PRÓLOGO",
        title: "Sombra na Oficina",
        text: "O interior do posto cheira a combustível velho e um odor pútrido. O teto de madeira goteja sobre o chão de concreto.\n\nNos fundos, você avista um veículo antigo coberto por uma lona rasgada. De repente, passos pesados esmagam o cascalho lá fora. Uma sombra colossal passa pela janela — algo está rondando o local, e não parece amigável.",
        choices: [
            {
                text: "Forçar o porta-malas do carro antigo antes de ser notado",
                tag: "Teste de Força",
                action: () => handleDiceTest({
                    bonus: gameState.stamina > 2 ? 1 : 0,
                    target: 4,
                    statusMsg: "Forçando a trava emperrada...",
                    onSuccess: () => {
                        addItem("Pé de Cabra");
                        goToScene("arrival");
                    },
                    onFail: () => {
                        useStamina(1);
                        showMessage("A trava não cedeu e você se desgastou na tentativa (-1 Fôlego).");
                        goToScene("arrival");
                    }
                })
            },
            {
                text: "Esgueirar-se em silêncio rumo aos portões do acampamento",
                tag: "Ação Furtiva",
                action: () => goToScene("arrival")
            }
        ]
    },

    arrival: {
        chapter: "CAPÍTULO I",
        title: "Os Portões de Crystal Lake",
        text: "Você alcança os portões de ferro do acampamento. A corrente que os trancava foi cortada a golpes de lâmina há pouco tempo — o corte ainda está limpo. Um grunhido abafado ecoa em algum lugar na escuridão; você não está sozinho aqui.\n\nÀ esquerda fica a Cabana Principal dos Monitores. À direita, a trilha afunda na mata rumo ao Lago e à Torre de Vigia.",
        choices: [
            {
                reqItem: "Pé de Cabra",
                text: "Usar o Pé de Cabra para remover as tábuas da Cabana Principal",
                tag: "Usar Item",
                action: () => {
                    showMessage("Você remove as tábuas de madeira sem fazer barulho!");
                    goToScene("cabin_inside");
                }
            },
            {
                text: "Tentar arrombar as tábuas na força bruta",
                tag: "Teste de Força",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Forçando a entrada da cabana...",
                    onSuccess: () => goToScene("cabin_inside"),
                    onFail: () => {
                        takeDamage(2);
                        showMessage("A madeira resiste e você machuca o ombro! (-2 HP)");
                        goToScene("arrival");
                    }
                })
            },
            {
                text: "Seguir pela trilha que leva à Torre de Vigia",
                action: () => goToScene("watchtower_path")
            },
            {
                text: "Caminhar até a margem escura do Lago",
                action: () => goToScene("lake_trail")
            }
        ]
    },

    cabin_inside: {
        chapter: "CAPÍTULO II",
        title: "O Despertar do Assassino",
        text: "Você entra na Cabana Principal. Beliches destruídos e roupas velhas cobrem o chão. Em um armário na parede, você avista um Kit Médico de emergência.\n\nDE REPENTE, A PORTA DOS FUNDOS É DESTRUÍDA! Sob o brilho de um raio, surge uma figura colossal usando uma máscara de hóquei e empunhando um facão ensanguentado: Jason Voorhees!",
        choices: [
            {
                text: "Pegar rapidamente o Kit Médico antes de fugir",
                action: () => {
                    addItem("Kit Médico");
                    goToScene("cabin_fight");
                }
            },
            {
                reqItem: "Lanterna",
                text: "Cegar Jason temporariamente com o facho da Lanterna",
                tag: "Usar Item",
                action: () => {
                    showMessage("A luz intensa incomoda o monstro! Você ganha tempo para escapar!");
                    goToScene("forest_chase");
                }
            },
            {
                text: "Subir os degraus até o Sótão para se esconder",
                action: () => goToScene("cabin_attic")
            },
            {
                text: "Enfrentar o ataque de frente",
                action: () => goToScene("cabin_fight")
            }
        ]
    },

    cabin_attic: {
        chapter: "CAPÍTULO II",
        title: "O Sótão Silencioso",
        text: "Você sobe apressadamente até o sótão. O espaço é pequeno, repleto de caixas antigas. Entre as quinquilharias, uma caixa metálica trancada chama sua atenção.\n\nEmbaixo, os passos pesados de Jason fazem as tábuas do teto rangerem sob seus pés.",
        choices: [
            {
                text: "Tentar abrir a caixa metálica antes de ser descoberto",
                tag: "Teste de Habilidade",
                action: () => handleDiceTest({
                    target: 3,
                    statusMsg: "Abrindo o fecho de metal...",
                    onSuccess: () => {
                        addItem("Sinalizador");
                        showMessage("Você encontrou uma pistola sinalizadora de emergência!");
                        goToScene("forest_chase");
                    },
                    onFail: () => {
                        takeDamage(2);
                        showMessage("A lâmina do facão atravessa o teto e atinge sua perna! (-2 HP)");
                        goToScene("forest_chase");
                    }
                })
            },
            {
                text: "Saltar pela janela em direção ao monte de folhas lá fora",
                tag: "Teste de Agilidade",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Saltando da janela...",
                    onSuccess: () => {
                        showMessage("Queda amortecida com sucesso!");
                        goToScene("forest_chase");
                    },
                    onFail: () => {
                        takeDamage(3);
                        showMessage("Queda dura no chão molhado! (-3 HP)");
                        goToScene("forest_chase");
                    }
                })
            }
        ]
    },

    cabin_fight: {
        chapter: "CAPÍTULO II",
        title: "A Lâmina Sangrenta",
        text: "Jason avança sem emitir som. A lâmina pesada do facão se ergue para atingir você em cheio!",
        choices: [
            {
                text: "Esquivar-se do golpe rolando pelo chão",
                tag: "Teste de Agilidade",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Tentando esquivar no último segundo...",
                    onSuccess: () => {
                        showMessage("Você se esquiva e o facão se crava na parede!");
                        goToScene("forest_chase");
                    },
                    onFail: () => {
                        const dmg = rollD6Value();
                        takeDamage(dmg);
                        showMessage(`O facão rasga suas costas! (-${dmg} HP)`);
                        if (gameState.hp > 0) goToScene("forest_chase");
                    }
                })
            },
            {
                text: "Não arriscar o teste e correr para a saída dos fundos",
                tag: gameState.stamina > 0 ? "Custa Fôlego" : "Sem Fôlego",
                action: () => {
                    if (gameState.stamina > 0) {
                        useStamina(1);
                        showMessage("Você escapa por pouco, gastando fôlego na correria (-1 Fôlego).");
                    } else {
                        takeDamage(2);
                        showMessage("Exausto, você tropeça mas ainda consegue escapar! (-2 HP)");
                    }
                    goToScene("forest_chase");
                }
            }
        ]
    },

    forest_chase: {
        chapter: "CAPÍTULO III",
        title: "Perseguição Sob o Temporal",
        text: "Você corre pela floresta escura enquanto os passos de Jason ressoam logo atrás, quebrando galhos e derrubando arbustos.\n\nA tempestade atinge o ápice. A vegetação abre caminho para três direções:",
        choices: [
            { text: "Correr até a Garagem de Veículos", action: () => goToScene("garage_scene") },
            { text: "Subir a colina íngreme em direção à Torre de Vigia", action: () => goToScene("watchtower_path") },
            { text: "Fugir em direção ao Cais do Lago", action: () => goToScene("lake_trail") }
        ]
    },

    garage_scene: {
        chapter: "CAPÍTULO IV",
        title: "O Galpão dos Veículos",
        text: "Você entra no galpão de manutenção. No centro há uma antiga Pick-Up de resgate. Dentro da cabine, os cabos do painel estão arrancados. Em uma bancada ao fundo, há peças automotivas espalhadas.\n\nJason aproxima-se da entrada principal!",
        choices: [
            {
                reqItem: "Chave da Pick-Up",
                text: "Usar a Chave da Pick-Up e dar partida no motor",
                tag: "Usar Item",
                action: () => goToScene("ending_good_car")
            },
            {
                text: "Fazer uma ligação direta nos cabos da ignição",
                tag: "Teste de Habilidade",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Juntando os fios de ignição...",
                    onSuccess: () => goToScene("ending_good_car"),
                    onFail: () => {
                        takeDamage(3);
                        showMessage("Faíscas queimam suas mãos e o motor engasga! (-3 HP)");
                        if (gameState.hp > 0) goToScene("forest_chase");
                    }
                })
            },
            {
                text: "Procurar a chave no quadro de ferramentas",
                tag: "Teste de Sorte",
                action: () => handleDiceTest({
                    target: 3,
                    statusMsg: "Vasculhando o quadro de ferramentas...",
                    onSuccess: () => {
                        addItem("Chave da Pick-Up");
                        goToScene("garage_scene");
                    },
                    onFail: () => {
                        takeDamage(2);
                        showMessage("Você perde tempo precioso procurando no escuro! (-2 HP)");
                        goToScene("garage_scene");
                    }
                })
            }
        ]
    },

    watchtower_path: {
        chapter: "CAPÍTULO IV",
        title: "A Escalada da Torre",
        text: "Você alcança a alta Torre de Vigia do guarda-florestal. Lá no alto fica a estação de rádio de emergência. A caixa de fusíveis do andar inferior está queimada, então o sinal está fraco.",
        choices: [
            {
                text: "Subir direto para a sala de rádio e tentar a frequência de socorro",
                tag: "Teste de Habilidade",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Alinhando a frequência de socorro...",
                    onSuccess: () => goToScene("ending_heroic"),
                    onFail: () => {
                        takeDamage(3);
                        showMessage("Sem energia total, o rádio emite apenas estática! (-3 HP)");
                        goToScene("forest_chase");
                    }
                })
            },
            {
                reqItem: "Sinalizador",
                text: "Disparar a Pistola Sinalizadora do topo da torre",
                tag: "Usar Item",
                action: () => {
                    showMessage("A luz vermelha ilumina o céu tempestuoso! A polícia avista a emergência!");
                    goToScene("ending_heroic");
                }
            }
        ]
    },

    lake_trail: {
        chapter: "CAPÍTULO IV",
        title: "As Águas de Crystal Lake",
        text: "Você chega às tábuas podres do cais. Uma canoa a motor está presa à estaca de madeira. As águas escuras do lago se agitam com a chuva.\n\nA névoa se abre e uma silhueta emerge da água à sua frente!",
        choices: [
            {
                text: "Tentar ligar o motor da canoa rapidamente",
                tag: "Teste de Agilidade",
                action: () => handleDiceTest({
                    target: 4,
                    statusMsg: "Puxando a corda do motor...",
                    onSuccess: () => goToScene("ending_good_boat"),
                    onFail: () => {
                        takeDamage(4);
                        showMessage("O motor engasga e o assassino alcança o cais! (-4 HP)");
                        if (gameState.hp > 0) goToScene("lake_trail");
                    }
                })
            },
            {
                reqItem: "Sinalizador",
                text: "Disparar o Sinalizador diretamente contra Jason!",
                tag: "Usar Item",
                action: () => {
                    showMessage("O disparo acerta Jason em cheio, arremessando-o de volta às águas!");
                    goToScene("ending_good_boat");
                }
            }
        ]
    },

    ending_death: {
        chapter: "FIM DE JOGO",
        title: "Sua Alma Pertence a Crystal Lake",
        text: "Sua vida se esvai sob a tempestade. O silêncio macabro da noite volta a dominar a floresta. Seu nome se torna mais um mistério esquecido nas profundezas de Crystal Lake...",
        isEnding: true
    },

    ending_good_car: {
        chapter: "FINAL BOM",
        title: "Fuga Pela Rodovia",
        text: "O motor da Pick-Up ganha vida com um rugido! Você acelera com tudo, destruindo os velhos portões e deixando o pesadelo para trás na escuridão da tempestade!",
        isEnding: true
    },

    ending_good_boat: {
        chapter: "FINAL BOM",
        title: "Além das Águas Escuras",
        text: "O motor da canoa ganha potência e corta as águas sombrias do lago. Você navega com segurança até a margem oposta, onde as luzes de uma estrada garantem a sua salvação!",
        isEnding: true
    },

    ending_heroic: {
        chapter: "FINAL BOM",
        title: "O Resgate da Polícia Estadual",
        text: "Seu sinal de emergência é visto a tempo! Em poucos minutos, sirenes iluminam a rodovia e a polícia chega ao acampamento, resgatando você enquanto Jason recua para o fundo da mata.",
        isEnding: true
    }
};

/* ==========================================================================
   NAVEGAÇÃO E CICLO DE JOGO
   ========================================================================== */
function goToScene(sceneKey) {
    const scene = scenes[sceneKey];
    if (!scene) {
        console.error(`Cena não encontrada: ${sceneKey}`);
        return;
    }

    gameState.currentScene = sceneKey;

    if (scene.isEnding) {
        renderEndingScreen(sceneKey, scene);
        return;
    }

    const chapterBadge = document.getElementById("chapter-badge");
    if (chapterBadge) chapterBadge.innerText = scene.chapter || "CAPÍTULO";

    const sceneTitle = document.getElementById("scene-title");
    const sceneText = document.getElementById("scene-text");
    if (sceneTitle) sceneTitle.innerText = scene.title;
    if (sceneText) sceneText.innerText = scene.text;

    const sceneImg = document.getElementById("scene-image");
    const imgPlaceholder = document.getElementById("image-placeholder");

    if (scene.image) {
        sceneImg.src = scene.image;
        sceneImg.classList.remove("hidden");
        if (imgPlaceholder) imgPlaceholder.classList.add("hidden");
        sceneImg.onerror = () => {
            sceneImg.classList.add("hidden");
            if (imgPlaceholder) imgPlaceholder.classList.remove("hidden");
        };
    } else {
        if (sceneImg) sceneImg.classList.add("hidden");
        if (imgPlaceholder) imgPlaceholder.classList.remove("hidden");
    }

    const choicesContainer = document.getElementById("choices-container");
    if (choicesContainer) {
        choicesContainer.innerHTML = "";

        if (scene.choices && scene.choices.length > 0) {
            scene.choices.forEach(choice => {
                const btn = document.createElement("button");
                btn.className = "btn-choice";

                let isDisabled = false;
                if (choice.reqItem && !hasItem(choice.reqItem)) {
                    isDisabled = true;
                }

                let btnHTML = `<span>${choice.text}</span>`;
                if (choice.reqItem) {
                    btnHTML += isDisabled
                        ? ` <span class="btn-tag btn-tag-disabled">Requer: ${choice.reqItem}</span>`
                        : ` <span class="btn-tag btn-tag-item">Usar: ${choice.reqItem}</span>`;
                } else if (choice.tag) {
                    btnHTML += ` <span class="btn-tag">${choice.tag}</span>`;
                }

                btn.innerHTML = btnHTML;
                btn.disabled = isDisabled;
                btn.onclick = () => {
                    hideMessage();
                    if (typeof choice.action === "function") choice.action();
                };

                choicesContainer.appendChild(btn);
            });
        }
    }

    const narrativeBox = document.getElementById("narrative-box");
    if (narrativeBox) {
        narrativeBox.scrollTop = 0;
        narrativeBox.classList.remove("narrative-enter");
        // força reflow para reiniciar a animação a cada troca de cena
        void narrativeBox.offsetWidth;
        narrativeBox.classList.add("narrative-enter");
    }
}

function renderEndingScreen(sceneKey, scene) {
    const meta = endingsMeta[sceneKey] || { icon: "🎬", kicker: "Fim de Jogo" };
    const isNew = recordEnding(sceneKey);

    document.getElementById("ending-icon").innerText = meta.icon;
    document.getElementById("ending-kicker").innerText = meta.kicker;
    document.getElementById("ending-title").innerText = scene.title;
    document.getElementById("ending-text").innerText = scene.text;

    const newBadge = document.getElementById("ending-new-badge");
    if (newBadge) newBadge.classList.toggle("hidden", !isNew);

    showScreen("screen-ending");
}

function restartGame() {
    gameState.hp = gameState.maxHp;
    gameState.stamina = gameState.maxStamina;
    gameState.inventory = [];
    gameState.isRolling = false;
    gameState.rollSpins = 0;
    hideMessage();
    updateHUD();
    showScreen("game-container");
    goToScene("prologue");
}

/* ==========================================================================
   INICIALIZAÇÃO E EVENTOS DE TELA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    updateHUD();
    updateTrophyBadges();

    document.getElementById("btn-start").onclick = () => restartGame();

    document.getElementById("btn-trophies").onclick = () => {
        renderTrophyGrid();
        showScreen("screen-trophies");
    };
    document.getElementById("btn-back-title").onclick = () => showScreen("screen-title");

    document.getElementById("btn-menu").onclick = () => showScreen("screen-title");

    document.getElementById("btn-play-again").onclick = () => restartGame();
    document.getElementById("btn-ending-trophies").onclick = () => {
        renderTrophyGrid();
        showScreen("screen-trophies");
    };
    document.getElementById("btn-ending-menu").onclick = () => showScreen("screen-title");
});
