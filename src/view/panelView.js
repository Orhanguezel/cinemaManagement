import { renderSeatOccupancySettings } from "./seatsView.js";
import { state } from "../stateManager.js";

// Yönetici Panelini Render Etme
export function renderAdminPanel(cinemas) {
  const container = document.createElement("div");
  container.id = "admin-panel";

  // "Koltuk Doluluk Ayarları" butonunu oluştur
  const seatButton = document.createElement("button");
  seatButton.id = "seat-occupancy-settings";
  seatButton.innerText = "Koltuk Doluluk Ayarları";
  container.appendChild(seatButton);

  document.body.appendChild(container);

  // Butona olay dinleyicisi ekle
  seatButton.addEventListener("click", () => {
    if (!cinemas || cinemas.length === 0) {
      console.error("Hata: 'cinemas' verisi geçerli değil!");
      return;
    }
    console.log("Koltuk doluluk ayarlarına tıklandı.");
    renderSeatOccupancySettings(cinemas); // seatsView.js içindeki fonksiyon
  });
}

// Kullanıcı Panelini Render Etme
export function renderUserPanel(cinemas) {
  const container = document.createElement("div");
  container.id = "user-panel";
  container.innerHTML = `<h1>Sinema Kullanıcı Paneli</h1>`;
  document.body.appendChild(container);

  // Kullanıcı paneline özel işlemler buraya eklenebilir
}

// Header'ı Render Etme
export function renderHeader(cinemas) {
  const header = document.createElement("header");
  header.innerHTML = `
    <button id="admin-view">Yönetici Görünümü</button>
    <button id="user-view">Kullanıcı Görünümü</button>
  `;
  document.body.appendChild(header);

  // Yönetici Görünümü butonuna olay dinleyicisi ekle
  document.getElementById("admin-view").onclick = () => {
    document.body.innerHTML = ""; // Sayfayı temizle
    renderHeader(cinemas); // Header'ı tekrar render et
    renderAdminPanel(cinemas); // Yönetici panelini render et
  };

  // Kullanıcı Görünümü butonuna olay dinleyicisi ekle
  document.getElementById("user-view").onclick = () => {
    document.body.innerHTML = ""; // Sayfayı temizle
    renderHeader(cinemas); // Header'ı tekrar render et
    renderUserPanel(cinemas); // Kullanıcı panelini render et
  };
}
