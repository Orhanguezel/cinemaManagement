// scripts/management/cinemaManagement.js
import { getCinemaById } from "../management/cinemaManagement.js";
import { loadHeader } from "../components/header.js";
import { loadMainContent } from "../components/main.js";
import { setupContactHamburgerMenu } from "../components/contactHamburger.js";
import { cineGroupInfo } from "../data/cineGroupInfo.js";
import { startReservation } from "../modules/reservationHandler.js";

// **Seçili Sinemayı Getir**
export function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  return storedCinema ? JSON.parse(storedCinema) : cineGroupInfo; // Varsayılan bilgiyi döndür
}

// **Ana İçeriği Ayarla**
export function setupMainContent(cinema = null) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  cinema = cinema || getSelectedCinema();

  if (!cinema || !cinema.name) {
    mainContent.innerHTML = `
      <h2>Sinema Bilgisi Bulunamadı</h2>
      <p>Lütfen bir sinema seçiniz.</p>
    `;
    return;
  }

  mainContent.innerHTML = `
    <div class="cinema-details">
      <h2>Willkommen bei ${cinema.name}</h2>
      <p>${cinema.description}</p>
      <div class="cinema-actions">
        <button id="startFilmSelection" class="btn-primary">Film Seçimi</button>
        <button id="toMainPageButton" class="btn-secondary">Geri Dön</button>
      </div>
    </div>
  `;

  mainContent.style.backgroundImage = `url('${cinema.backgroundImage || "./assets/cinema/default-bg.jpg"}')`;
  mainContent.style.backgroundSize = "cover";
  mainContent.style.backgroundPosition = "center";
  mainContent.style.minHeight = "500px";

  // Film Seçimi Buton Olayı
  const startFilmSelectionButton = document.getElementById("startFilmSelection");
  if (startFilmSelectionButton) {
    startFilmSelectionButton.addEventListener("click", () => {
      console.log("Film seçim ekranına geçiliyor...");
      startReservation(cinema.id); // Doğru değişken adı kullanıldı
    });
  }

  // Ana Sayfaya Dönüş Buton Olayı
  const toMainPageButton = document.getElementById("toMainPageButton");
  if (toMainPageButton) {
    toMainPageButton.addEventListener("click", () => {
      console.log("Ana sayfaya dönülüyor...");
      localStorage.removeItem("selectedCinema");
      loadMainContent();
      loadHeader();
      setupContactHamburgerMenu();
    });
  }
}

// **Film Seçim Ekranı Yükle**
function loadFilmSelection(cinema) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  mainContent.innerHTML = `
    <h2>Film Seçimi - ${cinema.name}</h2>
    <div class="film-selection">
      <p>Film seçim ekranı burada görünecek...</p>
    </div>
    <button id="backToCinemaDetails" class="btn-secondary">Geri Dön</button>
  `;

  // Geri Dön Buton Olayı
  const backToCinemaDetailsButton = document.getElementById("backToCinemaDetails");
  if (backToCinemaDetailsButton) {
    backToCinemaDetailsButton.addEventListener("click", () => {
      console.log("Sinema detaylarına geri dönülüyor...");
      setupMainContent(cinema);
    });
  }
}
