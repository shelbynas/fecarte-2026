class DiceEngine {
    constructor() {
        this.modalEl = document.getElementById("dice-modal");
        this.cubeEl = document.getElementById("dice-3d-cube");
        this.descEl = document.getElementById("dice-action-desc");
        this.rolledValEl = document.getElementById("dice-rolled-val");
        this.fearPenaltyEl = document.getElementById("dice-fear-penalty");
        this.finalValEl = document.getElementById("dice-final-val");
        this.targetValEl = document.getElementById("dice-target-val");
        this.resultBadgeEl = document.getElementById("dice-result-badge");
        this.btnContinueEl = document.getElementById("btn-dice-continue");

        this.currentSuccessDest = null;
        this.currentFailDest = null;
    }

    roll(actionDesc, targetVal, successDest, failDest, onComplete) {
        this.currentSuccessDest = successDest;
        this.currentFailDest = failDest;

        this.descEl.textContent = actionDesc;
        this.targetValEl.textContent = `${targetVal}+`;
        this.rolledValEl.textContent = "?";
        this.finalValEl.textContent = "?";

        const penalty = fearSystem.getPenalty();
        this.fearPenaltyEl.textContent = penalty > 0 ? `-${penalty}` : "0";

        this.resultBadgeEl.className = "result-badge pending";
        this.resultBadgeEl.textContent = "🎲 ROLANDO DADO D6...";
        this.btnContinueEl.classList.add("hidden");

        this.modalEl.classList.remove("hidden");
        audioEngine.playDiceRollSound();

        const rolled = Math.floor(Math.random() * 6) + 1;
        const finalVal = Math.max(1, rolled - penalty);
        const isSuccess = finalVal >= targetVal;

        const rotations = {
            1: "rotateX(0deg) rotateY(0deg)",
            2: "rotateY(180deg)",
            3: "rotateY(90deg)",
            4: "rotateY(-90deg)",
            5: "rotateX(-90deg)",
            6: "rotateX(90deg)"
        };

        const extraSpins = "rotateX(720deg) rotateY(720deg) ";
        this.cubeEl.style.transform = extraSpins + rotations[rolled];

        setTimeout(() => {
            this.cubeEl.style.transform = rotations[rolled];
            this.rolledValEl.textContent = rolled;
            this.finalValEl.textContent = finalVal;

            if (isSuccess) {
                this.resultBadgeEl.className = "result-badge success";
                this.resultBadgeEl.textContent = `🎯 SUCESSO! (Resultado ${finalVal} >= Alvo ${targetVal})`;
                audioEngine.playVictorySound();
            } else {
                this.resultBadgeEl.className = "result-badge failure";
                this.resultBadgeEl.textContent = `💀 FALHA! (Resultado ${finalVal} < Alvo ${targetVal})`;
                audioEngine.playTensionSound();
            }

            this.btnContinueEl.classList.remove("hidden");
            this.btnContinueEl.onclick = () => {
                this.modalEl.classList.add("hidden");
                onComplete(isSuccess ? successDest : failDest);
            };
        }, 1500);
    }
}

const diceEngine = new DiceEngine();