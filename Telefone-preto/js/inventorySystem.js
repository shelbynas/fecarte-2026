class InventorySystem {
  constructor() {
    this.items = new Set();
  }

  addItem(item) {
    if (item && typeof item === 'string') {
      this.items.add(item);
      this.updateUI();
    }
  }

  removeItem(item) {
    if (item) {
      this.items.delete(item);
      this.updateUI();
    }
  }

  hasItem(item) {
    return this.items.has(item);
  }

  hasAllItems(itemList) {
    if (!Array.isArray(itemList)) return true;
    return itemList.every(item => this.items.has(item));
  }

  reset() {
    this.items.clear();
    this.updateUI();
  }

  updateUI() {
    const listEl = document.getElementById("inventory-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    if (this.items.size === 0) {
      listEl.innerHTML = '<li class="empty-item">Nenhum item coletado</li>';
      return;
    }

    this.items.forEach(item => {
      const li = document.createElement("li");
      li.className = "inventory-item";
      li.innerHTML = `🎒 <span>${item}</span>`;
      listEl.appendChild(li);
    });
  }
}

const inventorySystem = new InventorySystem();