import { renderSeatOccupancySettings } from "./seatsView.js";
import { renderSalonAssignmentView } from "./salonView.js";
import { renderFilmAssignmentView } from "./filmView.js";
import { renderShowtimeAssignmentView } from "./showtimeView.js"; // Gösteri Atama görünümü eklendi

// Yönetici Panelini Render Etme
export function renderAdminPanel(cinemas, salons) {
  const container = document.createElement("div");
  container.id = "admin-panel";
  container.innerHTML = `<h2>Yönetici Paneli</h2>`;

  // "Koltuk Doluluk Ayarları" butonunu oluştur
  createButton(
    container,
    "seat-occupancy-settings",
    "Koltuk Doluluk Ayarları",
    () => {
      if (!cinemas || cinemas.length === 0) {
        console.error("Hata: 'cinemas' verisi geçerli değil!");
        return;
      }
      console.log("Koltuk doluluk ayarlarına tıklandı.");
      renderSeatOccupancySettings(cinemas); // seatsView.js içindeki fonksiyon
    }
  );

  // "Filmleri Salonlara Atama" butonunu oluştur
  createButton(
    container,
    "film-assignment",
    "Filmleri Salonlara Atama",
    () => {
      document.body.innerHTML = ""; // Mevcut içeriği temizle
      renderFilmAssignmentView(cinemas); // Film atama ekranını render et
    }
  );

  // "Salon Atama" Butonu
  createButton(
    container,
    "salon-assignment",
    "Salon Atama",
    () => {
      renderSalonAssignmentView(); // Salon atama ekranını render et
    }
  );

  // "Gösteri Atama" Butonu
  createButton(
    container,
    "showtime-assignment",
    "Gösteri Atama",
    () => {
      document.body.innerHTML = ""; // Mevcut içeriği temizle
      renderShowtimeAssignmentView(cinemas, salons); // Gösteri atama ekranını render et
    }
  );

  document.body.appendChild(container);
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

// Ortak Buton Oluşturma Fonksiyonu
function createButton(parent, id, text, onClick) {
  const button = document.createElement("button");
  button.id = id;
  button.innerText = text;
  button.addEventListener("click", onClick);
  parent.appendChild(button);
}
