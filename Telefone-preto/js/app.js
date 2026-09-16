document.addEventListener("DOMContentLoaded", () => {
    achievementsManager.updateCounter();
  
    function loadChapter(chapterId) {
      const chapterNode = storyData[chapterId];
      if (!chapterNode) return;
  
      uiController.renderChapter(chapterNode, (nextDestino) => {
        loadChapter(nextDestino);
      });
    }
  
    document.getElementById("btn-achievements").addEventListener("click", () => {
      achievementsManager.renderGrid();
      document.getElementById("achievements-modal").classList.remove("hidden");
    });
  
    document.getElementById("btn-close-modal").addEventListener("click", () => {
      document.getElementById("achievements-modal").classList.add("hidden");
    });
  
    document.getElementById("btn-reset-progress").addEventListener("click", () => {
      if (confirm("Tem certeza que deseja zerar os finais descobertos?")) {
        achievementsManager.resetProgress();
      }
    });
  
    document.getElementById("btn-reset-game").addEventListener("click", () => {
      inventorySystem.reset();
      loadChapter("prologo");
    });
  
    document.getElementById("btn-audio").addEventListener("click", () => {
      const isAudioOn = audioEngine.toggleAudio();
      document.getElementById("audio-status").textContent = isAudioOn ? "SOM: ON" : "SOM: OFF";
    });
  
    // Clicar na tela pula o efeito de digitação e mostra o texto inteiro na hora.
    document.querySelector(".story-panel").addEventListener("click", () => {
      uiController.skipTyping();
    });

    loadChapter("prologo");
  });