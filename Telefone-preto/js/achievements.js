class AchievementsManager {
    constructor() {
      // O progresso fica só na memória (não usa localStorage): ao dar F5 na
      // página, o contador de finais volta para 0, como pedido.
      this.unlockedEndings = [];
      this.endingsInfo = this.buildEndingsInfo();
    }

    // Monta a lista de todos os finais (título e um resuminho) a partir do
    // storyData, para a sala de troféus mostrar informação real de cada um.
    buildEndingsInfo() {
      const info = {};
      for (const key in storyData) {
        const node = storyData[key];
        if (node.isEnding && node.endingId) {
          const primeiraLinha = node.texto.split("\n")[0].trim();
          info[node.endingId] = {
            titulo: node.titulo.replace(/^[^\w]*\s*/u, ""), // remove emoji do início
            resumo: primeiraLinha
          };
        }
      }
      return info;
    }

    get allEndingIds() {
      return Object.keys(this.endingsInfo).sort();
    }

    unlockEnding(endingId) {
      if (endingId && !this.unlockedEndings.includes(endingId)) {
        this.unlockedEndings.push(endingId);
      }
      this.updateCounter();
    }

    resetProgress() {
      this.unlockedEndings = [];
      this.updateCounter();
      this.renderGrid();
    }

    updateCounter() {
      const countEl = document.getElementById("endings-count");
      if (countEl) {
        countEl.textContent = `${this.unlockedEndings.length} / ${this.allEndingIds.length}`;
      }
    }

    renderGrid() {
      const gridEl = document.getElementById("achievements-grid");
      if (!gridEl) return;
      gridEl.innerHTML = "";

      this.allEndingIds.forEach(id => {
        const isUnlocked = this.unlockedEndings.includes(id);
        const data = this.endingsInfo[id];
        const card = document.createElement("div");
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        card.innerHTML = `
          <span class="card-icon">${isUnlocked ? '🏆' : '❓'}</span>
          <span class="card-code">[FINAL ${id}]</span>
          <h3 class="card-title">${isUnlocked ? data.titulo : '??? (BLOQUEADO)'}</h3>
          <p class="card-desc">${isUnlocked ? data.resumo : 'Ainda não descoberto. Tente escolhas diferentes.'}</p>
        `;
        gridEl.appendChild(card);
      });
    }
  }
  
  const achievementsManager = new AchievementsManager();