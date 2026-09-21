class UIController {
  constructor() {
    this.typeInterval = null;
    this.currentFullText = "";
    this.onTypeComplete = null;
    this.isTyping = false;

    this.callsState = {
      bruce: false,
      billy: false,
      griffin: false,
      vance: false,
      robin: false
    };

    const skipBtn = document.getElementById("btn-skip-text");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.skipTypewriter());
    }

    const narrativeBox = document.getElementById("narrative-box");
    if (narrativeBox) {
      narrativeBox.addEventListener("click", () => this.skipTypewriter());
    }

    document.addEventListener("keydown", (e) => {
      if ((e.code === "Space" || e.code === "Enter") && this.isTyping) {
        this.skipTypewriter();
      }
    });
  }

  resetCallsTracker() {
    this.callsState = {
      bruce: false,
      billy: false,
      griffin: false,
      vance: false,
      robin: false
    };
    this.updateCallsUI();
  }

  markCallReceived(callId) {
    if (callId && this.callsState.hasOwnProperty(callId)) {
      this.callsState[callId] = true;
      this.updateCallsUI();
    }
  }

  updateCallsUI() {
    Object.keys(this.callsState).forEach(id => {
      const el = document.getElementById(`call-${id}`);
      if (el) {
        if (this.callsState[id]) {
          el.className = "call-item received";
          const span = el.querySelector("span");
          if (span) span.textContent = "RECEBIDA ✓";
        } else {
          el.className = "call-item pending";
          const span = el.querySelector("span");
          if (span) span.textContent = "???";
        }
      }
    });
  }

  renderChapter(chapterNode, onChoiceClick) {
    document.getElementById("chapter-title").textContent = chapterNode.titulo;

    const phoneSvg = document.getElementById("phone-svg");
    const phoneBadge = document.getElementById("phone-status-text");
    const redPulse = document.getElementById("red-pulse");
    const padlockBox = document.getElementById("padlock-minigame");

    if (chapterNode.callId) {
      this.markCallReceived(chapterNode.callId);
    }

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

    if (chapterNode.addFear) {
      fearSystem.addFear(chapterNode.addFear);
    }

    if (chapterNode.minigamePadlock) {
      padlockBox.classList.remove("hidden");
      this.initPadlockMinigame(onChoiceClick);
    } else {
      padlockBox.classList.add("hidden");
    }

    this.typeText(chapterNode.texto, () => {
      this.renderButtons(chapterNode.botoes, onChoiceClick);
      if (chapterNode.isEnding) {
        this.renderHomeButton();
      }
    });

    if (chapterNode.isEnding && chapterNode.endingId) {
      achievementsManager.unlockEnding(chapterNode.endingId);
    }
  }

  renderHomeButton() {
    const buttonsEl = document.getElementById("choice-buttons");
    const btn = document.createElement("a");
    btn.href = "../index.html";
    btn.className = "choice-btn btn-home-menu";
    btn.textContent = "🏠 Voltar ao Menu Inicial";
    buttonsEl.appendChild(btn);
  }

  typeText(fullText, callback) {
    if (this.typeInterval) clearInterval(this.typeInterval);

    this.currentFullText = fullText;
    this.onTypeComplete = callback;
    this.isTyping = true;

    const textEl = document.getElementById("chapter-text");
    const buttonsEl = document.getElementById("choice-buttons");
    buttonsEl.innerHTML = "";

    textEl.textContent = "";
    let i = 0;

    this.typeInterval = setInterval(() => {
      if (i < fullText.length) {
        textEl.textContent += fullText.charAt(i);
        i++;
      } else {
        this.finishTypewriter();
      }
    }, 15);
  }

  skipTypewriter() {
    if (!this.isTyping) return;
    if (this.typeInterval) clearInterval(this.typeInterval);
    document.getElementById("chapter-text").textContent = this.currentFullText;
    this.finishTypewriter();
  }

  finishTypewriter() {
    if (this.typeInterval) clearInterval(this.typeInterval);
    this.isTyping = false;
    if (this.onTypeComplete) {
      const cb = this.onTypeComplete;
      this.onTypeComplete = null;
      cb();
    }
  }

  renderButtons(botoes, onChoiceClick) {
    const buttonsEl = document.getElementById("choice-buttons");
    buttonsEl.innerHTML = "";
    if (!botoes) return;

    botoes.forEach(btnData => {
      let hasRequired = true;

      if (btnData.reqItems && Array.isArray(btnData.reqItems)) {
        if (!inventorySystem.hasAllItems(btnData.reqItems)) {
          hasRequired = false;
        }
      } else if (btnData.reqItem && typeof btnData.reqItem === 'string') {
        if (!inventorySystem.hasItem(btnData.reqItem)) {
          hasRequired = false;
        }
      }

      const btn = document.createElement("button");

      if (!hasRequired) {
        btn.className = "choice-btn disabled-locked";
        const lockLabel = btnData.reqItems ? btnData.reqItems.join(" + ") : btnData.reqItem;
        btn.textContent = `🔒 [EXIGE: ${lockLabel}] ${btnData.texto}`;
        btn.disabled = true;
        buttonsEl.appendChild(btn);
        return;
      }

      btn.className = "choice-btn";
      btn.textContent = btnData.texto;

      btn.addEventListener("click", () => {
        audioEngine.playClickSound();

        if (btnData.consumeItems && Array.isArray(btnData.consumeItems)) {
          btnData.consumeItems.forEach(item => inventorySystem.removeItem(item));
        }

        if (btnData.getItem) {
          inventorySystem.addItem(btnData.getItem);
        }

        if (btnData.destino === "prologo" || btnData.destino === "cap1") {
          inventorySystem.reset();
          fearSystem.reset();
          this.resetCallsTracker();
        }

        if (btnData.diceCheck) {
          diceEngine.roll(
            btnData.diceCheck.desc,
            btnData.diceCheck.target,
            btnData.diceCheck.success,
            btnData.diceCheck.fail,
            (chosenDest) => onChoiceClick(chosenDest)
          );
        } else {
          onChoiceClick(btnData.destino);
        }
      });

      buttonsEl.appendChild(btn);
    });
  }

  initPadlockMinigame(onChoiceClick) {
    let currentInput = "";
    const displayEl = document.getElementById("padlock-code-display");
    const padButtons = document.querySelectorAll(".pad-btn[data-val]");
    const clearBtn = document.getElementById("btn-padlock-clear");
    const enterBtn = document.getElementById("btn-padlock-enter");

    const updateDisplay = () => {
      let shown = currentInput;
      while (shown.length < 6) shown += "_";
      displayEl.textContent = shown;
    };

    updateDisplay();

    padButtons.forEach(btn => {
      btn.onclick = () => {
        if (currentInput.length < 6) {
          audioEngine.playClickSound();
          currentInput += btn.getAttribute("data-val");
          updateDisplay();
        }
      };
    });

    clearBtn.onclick = () => {
      audioEngine.playClickSound();
      currentInput = "";
      updateDisplay();
    };

    enterBtn.onclick = () => {
      audioEngine.playClickSound();
      if (currentInput === "334527") {
        audioEngine.playVictorySound();
        onChoiceClick("cap_padlock_open");
      } else {
        audioEngine.playTensionSound();
        fearSystem.addFear(20);
        alert("❌ COMBINAÇÃO INCORRETA! O pavor de Finney aumentou!");
        currentInput = "";
        updateDisplay();
      }
    };
  }
}

const uiController = new UIController();