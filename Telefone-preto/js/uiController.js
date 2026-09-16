class UIController {
    constructor() {
      this.typingInterval = null;
      this.isTyping = false;
      this.pendingCallback = null;
      this.currentFullText = "";
      this.currentTextEl = null;
    }

    renderChapter(chapterNode, onChoiceClick) {
      document.getElementById("chapter-title").textContent = chapterNode.titulo;
  
      const phoneSvg = document.getElementById("phone-svg");
      const phoneBadge = document.getElementById("phone-status-text");
      const redPulse = document.getElementById("red-pulse");
  
      if (chapterNode.isRinging) {
        phoneSvg.classList.add("ringing");
        phoneBadge.textContent = "📞 TOCANDO...";
        phoneBadge.classList.add("ringing-badge");
        redPulse.classList.add("active");
        audioEngine.playPhoneRing();
      } else {
        phoneSvg.classList.remove("ringing");
        phoneBadge.textContent = "DESCONECTADO";
        phoneBadge.classList.remove("ringing-badge");
        redPulse.classList.remove("active");
        audioEngine.stopPhoneRing();
      }
  
      this.typeText(chapterNode.texto, () => {
        this.renderButtons(chapterNode.botoes, onChoiceClick);
      });
  
      if (chapterNode.isEnding && chapterNode.endingId) {
        achievementsManager.unlockEnding(chapterNode.endingId);
      }
  
      if (chapterNode.addItem) {
        inventorySystem.addItem(chapterNode.addItem);
      }
    }
  
    typeText(fullText, callback) {
      const textEl = document.getElementById("chapter-text");
      const buttonsEl = document.getElementById("choice-buttons");
      buttonsEl.innerHTML = "";

      // Se já existia uma escrita em andamento (ex: reiniciar o jogo no meio
      // de uma frase), ela precisa ser cancelada antes de começar a nova.
      // Sem isso, os dois intervalos escrevem ao mesmo tempo e as letras
      // ficam bugadas/misturadas.
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
      this.pendingCallback = null;

      textEl.textContent = "";
      this.currentFullText = fullText;
      this.currentTextEl = textEl;
      this.pendingCallback = callback;
      this.isTyping = true;

      let i = 0;
      this.typingInterval = setInterval(() => {
        if (i < fullText.length) {
          textEl.textContent += fullText.charAt(i);
          i++;
        } else {
          this.finishTyping();
        }
      }, 15);
    }

    // Termina a escrita instantaneamente (usado ao acabar o texto normalmente
    // ou quando o jogador clica na tela para pular o efeito de digitação).
    finishTyping() {
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
      if (this.currentTextEl) {
        this.currentTextEl.textContent = this.currentFullText;
      }
      this.isTyping = false;
      const callback = this.pendingCallback;
      this.pendingCallback = null;
      if (callback) callback();
    }

    skipTyping() {
      if (this.isTyping) {
        this.finishTyping();
      }
    }
  
    renderButtons(botoes, onChoiceClick) {
      const buttonsEl = document.getElementById("choice-buttons");
      buttonsEl.innerHTML = "";
      if (!botoes) return;
  
      botoes.forEach(btnData => {
        if (btnData.reqItem && !inventorySystem.hasItem(btnData.reqItem)) {
          return;
        }
  
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = btnData.texto;
        btn.addEventListener("click", () => {
          audioEngine.playClickSound();
          onChoiceClick(btnData.destino);
        });
        buttonsEl.appendChild(btn);
      });
    }
  }
  
  const uiController = new UIController();