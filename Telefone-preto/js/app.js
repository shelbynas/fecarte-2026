document.addEventListener("DOMContentLoaded", () => {
  achievementsManager.updateCounter();

  function loadChapter(chapterId) {
    const chapterNode = storyData[chapterId];
    if (!chapterNode) return;

    if (chapterId === "prologo" || chapterId === "cap1") {
      inventorySystem.reset();
      fearSystem.reset();
      uiController.resetCallsTracker();
    }

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
    achievementsManager.resetProgress();
  });

  document.getElementById("btn-reset-game").addEventListener("click", () => {
    inventorySystem.reset();
    fearSystem.reset();
    uiController.resetCallsTracker();
    loadChapter("prologo");
  });

  document.getElementById("btn-audio").addEventListener("click", () => {
    const isAudioOn = audioEngine.toggleAudio();
    document.getElementById("audio-status").textContent = isAudioOn ? "SOM: ON" : "SOM: OFF";
  });

  loadChapter("prologo");
});