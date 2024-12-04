import { updateUI } from "../controllers/uiController.js";

export function init() {
    // DOMContentLoaded olayı: Sayfa yüklendiğinde çalıştırılır
    document.addEventListener("DOMContentLoaded", () => {
        const savedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
        updateUI(savedCinema || null); // UI'yi seçili sinemaya veya varsayılan duruma göre başlat
    });
}

// Başlatma fonksiyonunu çağır
init();
