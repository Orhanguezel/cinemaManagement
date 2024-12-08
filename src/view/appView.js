import { loadStateFromLocalStorage, initializeState, saveStateToLocalStorage } from "./stateManager.js";
import { renderNavbar, renderHeader } from "./panelView.js";
import { renderAdminPanel } from "./panelView.js";

// Uygulama başlatma
document.addEventListener("DOMContentLoaded", () => {
  // State'i yükle veya başlat
  try {
    loadStateFromLocalStorage();
    console.log("State başarıyla LocalStorage'dan yüklendi.");
  } catch (error) {
    console.warn("State yüklenemedi, başlatılıyor...");
    initializeState();
  }

  // Header ve Navbar'ı render et
  renderHeader();
  renderNavbar(state.cinemas, state.salons);

  // Yönetici panelini başlat
  renderAdminPanel(state.cinemas, state.salons);
});

