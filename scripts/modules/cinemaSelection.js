// /scripts/modules/cinemaSelection.js
import { cineGroupInfo, cinemas } from "../data/Cinema.js";
import { loadHeader } from "../components/header.js";
import { startReservation } from "../modules/reservationHandler.js";
import { setupContactHamburgerMenu } from "../components/contactHamburger.js";
import "../styles/modules/cinemaSelection.css";

/**
 * Sinema Seçimi Yapıldığında Çalışır
 * @param {number} cinemaId - Seçilen sinema ID'si
 */
export function selectCinema(cinemaId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Cinema with ID ${cinemaId} not found.`);
    return;
  }

  // Seçilen sinemayı kaydet
  localStorage.setItem("selectedCinema", JSON.stringify(cinema));

  // Header ve Main Content güncelle
  loadHeader(cinema);
  setupMainContent(cinema);
  setupContactHamburgerMenu();
}

/**
 * LocalStorage'dan Seçili Sinemayı Alır
 * @returns {object} Seçili Sinema veya Varsayılan Grup Bilgisi
 */
export function getSelectedCinema() {
  const storedCinema = localStorage.getItem("selectedCinema");
  return storedCinema ? JSON.parse(storedCinema) : cineGroupInfo;
}

/**
 * Main Content Alanını Dinamik Olarak Günceller
 * @param {object} cinema - Seçilen Sinema Nesnesi
 */
export function setupMainContent(cinema) {
  const mainContent = document.getElementById("main-content");

  if (!mainContent) return;

  // Varsayılan sinema bilgisi kullan
  cinema = cinema || getSelectedCinema();

  mainContent.innerHTML = `
    ${
      cinema.name
        ? `
        <div class="cinema-details">
          <h2>Willkommen bei ${cinema.name}</h2>
          <p>${cinema.description}</p>
          <div class="cinema-actions">
              <button id="startReservationButton" class="btn-primary">Buchen oder Reservieren</button>
              <button id="toMainPageButton" class="btn-secondary">Zurück zur Startseite</button>
          </div>
        </div>
      `
        : `
        <div class="group-info">
          <h2>${cineGroupInfo.title}</h2>
          <p>${cineGroupInfo.description}</p>
          <div class="cinema-actions">
              ${cinemas
                .map(
                  (cinema) =>
                    `<button class="btn-primary cinema-select" data-id="${cinema.id}">${cinema.name}</button>`
                )
                .join("")}
          </div>
        </div>
      `
    }
  `;

  // Main content arka plan ayarları
  mainContent.style.backgroundImage = `url('${
    cinema.backgroundImage || "../../assets/cinema/default-bg.jpg"
  }')`;
  mainContent.style.backgroundSize = "cover";
  mainContent.style.backgroundPosition = "center";
  mainContent.style.backgroundAttachment = "fixed";
  mainContent.style.transition = "background-image 0.5s ease-in-out";
  mainContent.style.minHeight = "500px"; // Minimum yükseklik

  // Dinamik sinema seçimi için butonları bağla
  setupCinemaSelection();

  const toMainPageButton = document.getElementById("toMainPageButton");
  if (toMainPageButton) {
    toMainPageButton.addEventListener("click", () => {
      localStorage.removeItem("selectedCinema");
      loadHeader(); // Varsayılan header
      setupMainContent(cineGroupInfo); // Varsayılan içerik
      setupContactHamburgerMenu(); // Varsayılan menü
    });
  }

  // Rezervasyon başlatma butonuna event listener ekle
  const startReservationButton = document.getElementById("startReservationButton");
  if (startReservationButton) {
    startReservationButton.addEventListener("click", () => {
      if (cinema) {
        console.log(`Reservation started for cinema: ${cinema.name}`);
        startReservation(cinema.id); // Rezervasyonu başlat
      } else {
        console.error("No cinema selected for reservation.");
      }
    });
  }
}

/**
 * Sinema Seçim Butonlarını Ayarlar
 */
function setupCinemaSelection() {
  document.querySelectorAll(".cinema-select").forEach((button) =>
    button.addEventListener("click", (e) => {
      const cinemaId = e.target.dataset.id;
      if (cinemaId) {
        selectCinema(parseInt(cinemaId)); // Sinema seçimi
      }
    })
  );
}
console.log(cinema.backgroundImage)