// app.js
import { renderSeatOccupancySettings } from "./view/seatsView.js";
import { initializeCinemaData } from "./manager/cinemaManager.js";
import { renderHeader } from "./view/panelView.js";
import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";

let cinemaData = initializeCinemaData(cinemas, salons);

// Uygulama başlatma
if (cinemaData && cinemaData.length > 0) {
  renderHeader(cinemaData);
  renderSeatOccupancySettings(cinemaData); // Koltuk doluluk ayarları
} else {
  console.error("Hata: Sinema verileri geçersiz!");
}