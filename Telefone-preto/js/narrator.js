class Narrator {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.enabled = !!this.synth;
    this.voice = null;
    this.queue = [];
    this.speaking = false;
    this.unlocked = false;

    if (this.enabled) {
      const pickVoice = () => {
        const voices = this.synth.getVoices();
        if (!voices || voices.length === 0) return;
        this.voice =
          voices.find(v => v.lang === "pt-BR") ||
          voices.find(v => v.lang && v.lang.toLowerCase().startsWith("pt")) ||
          voices[0] ||
          null;
      };

      pickVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = pickVoice;
      }
      // Alguns navegadores demoram para popular a lista de vozes: insiste por alguns segundos
      let tries = 0;
      const retry = setInterval(() => {
        tries++;
        pickVoice();
        if (this.voice || tries > 20) clearInterval(retry);
      }, 250);

      // Muitos navegadores (Chrome/Safari) só liberam a síntese de voz depois
      // de uma interação real do usuário. "Desbloqueamos" no primeiro clique/tecla
      // falando uma "fala" vazia e silenciosa.
      const unlock = () => {
        if (this.unlocked) return;
        this.unlocked = true;
        try {
          const warmUp = new SpeechSynthesisUtterance(" ");
          warmUp.volume = 0;
          this.synth.speak(warmUp);
        } catch (e) {
          /* ignora */
        }
        document.removeEventListener("click", unlock);
        document.removeEventListener("keydown", unlock);
      };
      document.addEventListener("click", unlock);
      document.addEventListener("keydown", unlock);
    }
  }

  // Extrai as falas (trechos entre aspas) de um texto de capítulo
  extractFalas(fullText) {
    if (!fullText) return [];
    const matches = fullText.match(/["“][^"”]+["”]/g);
    if (!matches) return [];
    return matches
      .map(m => m.replace(/^["“]/, "").replace(/["”]$/, "").trim())
      .filter(Boolean);
  }

  // Narra todas as falas encontradas em sequência, abaixando a música durante a narração
  narrateChapterText(fullText) {
    this.stop();
    if (!this.enabled || (window.audioEngine && audioEngine.isMuted)) return;

    const falas = this.extractFalas(fullText);
    if (falas.length === 0) return;

    this.queue = falas.slice();
    if (window.audioEngine) audioEngine.duckMusic();

    // Pequeno atraso depois do cancel() evita um bug conhecido do Chrome
    // em que speak() chamado logo após cancel() é silenciosamente ignorado.
    setTimeout(() => this._speakNext(), 80);
  }

  _speakNext() {
    if (this.queue.length === 0) {
      this.speaking = false;
      if (window.audioEngine) audioEngine.unduckMusic();
      return;
    }

    const text = this.queue.shift();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.98;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      this._speakNext();
    };

    utterance.onend = advance;
    utterance.onerror = advance;

    this.speaking = true;

    if (this.synth.paused) this.synth.resume();
    this.synth.speak(utterance);

    // Salvaguarda: alguns navegadores "engolem" o evento onend em textos longos.
    // Se depois de um tempo razoável o synth não estiver mais falando, força a próxima fala.
    const estimatedMs = Math.max(2500, text.length * 90);
    setTimeout(() => {
      if (!advanced && this.speaking && !this.synth.speaking && !this.synth.pending) {
        advance();
      }
    }, estimatedMs);
  }

  stop() {
    const hadQueueOrSpeech =
      this.speaking || this.queue.length > 0 || (this.enabled && this.synth.speaking);

    if (this.enabled) {
      this.synth.cancel();
    }
    this.queue = [];
    this.speaking = false;

    if (hadQueueOrSpeech && window.audioEngine) {
      audioEngine.unduckMusic();
    }
  }
}

const narrator = new Narrator();
