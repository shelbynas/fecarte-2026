class AchievementsManager {
  constructor() {
    this.storageKey = "telefone_preto_endings_v10";
    this.unlockedEndings = this.loadProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  unlockEnding(endingId) {
    if (endingId && !this.unlockedEndings.includes(endingId)) {
      this.unlockedEndings.push(endingId);
      localStorage.setItem(this.storageKey, JSON.stringify(this.unlockedEndings));
    }
    this.updateCounter();
  }

  resetProgress() {
    this.unlockedEndings = [];
    localStorage.removeItem(this.storageKey);
    this.updateCounter();
    this.renderGrid();
  }

  updateCounter() {
    const countEl = document.getElementById("endings-count");
    if (countEl) {
      countEl.textContent = `${this.unlockedEndings.length} / 19`;
    }
  }

  renderGrid() {
    const gridEl = document.getElementById("achievements-grid");
    if (!gridEl) return;
    gridEl.innerHTML = "";

    const ALL_ENDINGS = [
      { id: "6A", title: "Resgate de Gwen" },
      { id: "6B", title: "Silêncio no Porão" },
      { id: "6C", title: "Derrota no Chão Frio" },
      { id: "6D", title: "Sem Esperança" },
      { id: "6E", title: "Capturado na Escada" },
      { id: "6F", title: "Implorar por Vida" },
      { id: "6G", title: "Fuga com a Chave Prateada" },
      { id: "6H", title: "Final Sombrio (Luta)" },
      { id: "6I", title: "Corte na Janela" },
      { id: "6J", title: "Fuga por entre as Pernas" },
      { id: "6K", title: "Encarar o Sequestrador" },
      { id: "6L", title: "O Jogo de Perguntas" },
      { id: "6M", title: "Recusar e Arrombar" },
      { id: "6N", title: "A Porta Aberta" },
      { id: "6O", title: "Soltar a Fita Adesiva" },
      { id: "6P", title: "Correr para a Rua" },
      { id: "6Q", title: "Fuga Furtiva no Quintal" },
      { id: "6R", title: "O Segredo de Griffin (Cadeado)" },
      { id: "6S", title: "A Rota de Vance (Duto)" }
    ];

    ALL_ENDINGS.forEach(item => {
      const isUnlocked = this.unlockedEndings.includes(item.id);
      const card = document.createElement("div");
      card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
      card.innerHTML = `
        <span class="card-code">[FINAL ${item.id}]</span>
        <h3 class="card-title">${isUnlocked ? item.title : '??? (BLOQUEADO)'}</h3>
        <p class="card-desc">${isUnlocked ? 'Desfecho descoberto.' : 'Jogue novamente com outras escolhas.'}</p>
      `;
      gridEl.appendChild(card);
    });
  }
}

const achievementsManager = new AchievementsManager();