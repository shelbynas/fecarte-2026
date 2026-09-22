class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ringInterval = null;

    // --- Trilha sonora de fundo ---
    this.musicNormalVolume = 0.45;
    this.musicDuckedVolume = 0.08;
    this.music = new Audio("audio/terror.mp3");
    this.music.loop = true;
    this.music.volume = this.musicNormalVolume;
    this.musicStarted = false;
    this._duckLevel = 0; // contador de "falas"/toques abaixando a música ao mesmo tempo
    this._ringDucked = false;
    this._fadeInterval = null;

    // A trilha só pode começar após uma interação do usuário (política dos navegadores)
    const startOnFirstInteraction = () => {
      this.startMusic();
      document.removeEventListener("click", startOnFirstInteraction);
      document.removeEventListener("keydown", startOnFirstInteraction);
    };
    document.addEventListener("click", startOnFirstInteraction);
    document.addEventListener("keydown", startOnFirstInteraction);
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  startMusic() {
    if (this.musicStarted || this.isMuted) return;
    this.musicStarted = true;
    this.music.currentTime = 0;
    this.music.play().catch(() => {
      // Se o navegador ainda bloquear, tenta de novo na próxima interação
      this.musicStarted = false;
    });
  }

  toggleAudio() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopPhoneRing();
      this.music.pause();
      if (window.narrator) narrator.stop();
    } else {
      if (this.musicStarted) this.music.play().catch(() => {});
      else this.startMusic();
    }
    return !this.isMuted;
  }

  _fadeMusicTo(target) {
    if (this._fadeInterval) clearInterval(this._fadeInterval);
    const step = 0.05;
    this._fadeInterval = setInterval(() => {
      const diff = target - this.music.volume;
      if (Math.abs(diff) <= step) {
        this.music.volume = target;
        clearInterval(this._fadeInterval);
        this._fadeInterval = null;
      } else {
        this.music.volume += diff > 0 ? step : -step;
      }
    }, 40);
  }

  // Chamado quando uma fala começa a ser narrada: abaixa a música
  duckMusic() {
    this._duckLevel++;
    this._fadeMusicTo(this.musicDuckedVolume);
  }

  // Chamado quando a fala termina de ser narrada: volta o volume da música
  unduckMusic() {
    this._duckLevel = Math.max(0, this._duckLevel - 1);
    if (this._duckLevel === 0) {
      this._fadeMusicTo(this.musicNormalVolume);
    }
  }

  // O telefone toca BEM alto: abaixa a música enquanto ele estiver tocando
  duckMusicForRing() {
    if (this._ringDucked) return;
    this._ringDucked = true;
    this.duckMusic();
  }

  playPhoneRing() {
    if (this.isMuted) return;
    this.initContext();
    this.stopPhoneRing();
    this.duckMusicForRing();

    const ringOnce = () => {
      if (this.isMuted || !this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.frequency.value = 440;
      osc2.frequency.value = 480;

      // Toque BEM alto, com corpo sustentado, imitando um telefone antigo tocando forte
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.9, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.9, this.ctx.currentTime + 1.4);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 1.8);
      osc2.stop(this.ctx.currentTime + 1.8);
    };

    ringOnce();
    this.ringInterval = setInterval(ringOnce, 3000);
  }

  stopPhoneRing() {
    if (this._ringDucked) {
      this._ringDucked = false;
      this.unduckMusic();
    }
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
  }

  playClickSound() {
    if (this.isMuted) return;
    this.initContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playDiceRollSound() {
    if (this.isMuted) return;
    this.initContext();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = 150 + Math.random() * 200;
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      }, i * 100);
    }
  }

  playVictorySound() {
    if (this.isMuted) return;
    this.initContext();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      }, idx * 120);
    });
  }

  playTensionSound() {
    if (this.isMuted) return;
    this.initContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }
}

const audioEngine = new AudioEngine();