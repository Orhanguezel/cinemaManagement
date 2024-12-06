import { initializeCinemaData } from "./manager/cinemaManager.js";
import { renderUserPanel, renderAdminPanel } from "./view/cinemaView.js";

// Sinema verilerini başlat (verileri bir kez oluştur)
const cinemas = initializeCinemaData();

// Header'ı render eden fonksiyon
function renderHeader() {
  const header = document.createElement("header");
  header.style.textAlign = "center";
  header.style.padding = "10px";
  header.style.backgroundColor = "#007bff";
  header.style.color = "white";

  const adminButton = document.createElement("button");
  adminButton.innerText = "Yönetici Görünümü";
  adminButton.style.margin = "5px";
  adminButton.style.padding = "5px 10px";
  adminButton.style.color = "white";
  adminButton.style.backgroundColor = "#007bff";
  adminButton.style.border = "none";
  adminButton.style.borderRadius = "5px";
  adminButton.onclick = () => {
    document.body.innerHTML = ""; // Sayfanın içeriğini temizle
    renderHeader(); // Header'ı tekrar ekle
    renderAdminPanel(cinemas); // Yönetici panelini göster
  };

  const userButton = document.createElement("button");
  userButton.innerText = "Kullanıcı Görünümü";
  userButton.style.margin = "5px";
  userButton.style.padding = "5px 10px";
  userButton.style.color = "white";
  userButton.style.backgroundColor = "#28a745";
  userButton.style.border = "none";
  userButton.style.borderRadius = "5px";
  userButton.onclick = () => {
    document.body.innerHTML = ""; // Sayfanın içeriğini temizle
    renderHeader(); // Header'ı tekrar ekle
    renderUserPanel(cinemas); // Kullanıcı panelini göster
  };

  header.appendChild(adminButton);
  header.appendChild(userButton);
  document.body.appendChild(header);
}

// Başlangıç sayfasını oluştur
function initializeStartPage() {
  document.body.innerHTML = ""; // Tüm içerikleri temizle
  renderHeader(); // Header'ı render et

  const container = document.createElement("div");
  container.id = "start-panel";
  container.style.textAlign = "center";
  container.style.marginTop = "50px";

  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetim Sistemi";
  title.style.marginBottom = "20px";
  container.appendChild(title);

  const description = document.createElement("p");
  description.innerText = "Lütfen bir işlem seçiniz.";
  description.style.marginBottom = "20px";
  container.appendChild(description);

  document.body.appendChild(container);
}

// Başlangıç sayfasını başlat
initializeStartPage();
