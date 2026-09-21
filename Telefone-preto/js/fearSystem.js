class FearSystem {
    constructor() {
        this.fear = 0;
    }

    addFear(amount) {
        this.fear = Math.min(100, Math.max(0, this.fear + amount));
        this.updateUI();
    }

    setFear(val) {
        this.fear = Math.min(100, Math.max(0, val));
        this.updateUI();
    }

    getPenalty() {
        if (this.fear >= 60) return 2;
        if (this.fear >= 25) return 1;
        return 0;
    }

    reset() {
        this.fear = 0;
        this.updateUI();
    }

    updateUI() {
        const percentEl = document.getElementById("fear-percent");
        const fillEl = document.getElementById("fear-fill");
        if (percentEl) percentEl.textContent = `${this.fear}%`;
        if (fillEl) fillEl.style.width = `${this.fear}%`;
    }
}

const fearSystem = new FearSystem();