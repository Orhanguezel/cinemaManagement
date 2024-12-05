// scripts/management/reservationHandler.js
import { getCinemaById } from "../management/cinemaManagement.js";
import { showSalonSelection } from "../modules/salonSelection.js";

// Sinema Rezervasyonunu Başlatır
export function startReservation(cinemaId) {
  if (typeof cinemaId !== "number") {
    console.error("Hatalı cinemaId tipi. Beklenen: 'number', alınan:", cinemaId);
    alert("Geçersiz sinema seçimi.");
    return;
  }

  const cinema = getCinemaById(cinemaId);

  if (!cinema) {
    console.error(`Sinema bulunamadı! ID: ${cinemaId}`);
    alert("Geçersiz sinema seçimi.");
    return;
  }

  renderCinemaDetails(cinema);
}

// Sinema Detaylarını ve Film Seçimini Gösterir
function renderCinemaDetails(cinema) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("Ana içerik elemanı bulunamadı.");
    return;
  }

  mainContent.style.backgroundImage = `url('${cinema.backgroundImage}')`;
  mainContent.style.backgroundSize = "cover";
  mainContent.style.backgroundPosition = "center";
  mainContent.innerHTML = `
    <div class="cinema-details">
      <h2>${cinema.name}</h2>
      <p>${cinema.description}</p>
      <div class="cinema-actions">
        <button class="btn-primary" id="reservation-button">Film Seçimi</button>
        <button class="btn-secondary" id="back-button">Geri Dön</button>
      </div>
    </div>
  `;

  attachCinemaDetailsEvents(cinema);
}

// Sinema Detay Ekranındaki Olayları Bağlar
function attachCinemaDetailsEvents(cinema) {
  const reservationButton = document.getElementById("reservation-button");
  if (reservationButton) {
    reservationButton.addEventListener("click", () => {
      console.log(`Film seçim ekranına yönlendiriliyor: ${cinema.name}`);
      renderFilmSelection(cinema);
    });
  }

  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      console.log("Ana sayfaya dönülüyor...");
      location.reload(); // Sayfayı yenileyerek başlangıç ekranına dön
    });
  }
}

// Film Seçim Ekranını Gösterir
function renderFilmSelection(cinema) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("Ana içerik elemanı bulunamadı.");
    return;
  }

  mainContent.innerHTML = `
    <h2>Film Seçimi - ${cinema.name}</h2>
    <div class="film-selection">
      ${cinema.shows
        .map(
          (show) => `
        <div class="film-card">
          <img src="${show.film.image}" alt="${show.film.name}">
          <h3>${show.film.name}</h3>
          <button class="btn-primary select-film" data-film-id="${show.film.id}">Seç</button>
        </div>
      `
        )
        .join("")}
    </div>
    <button class="btn-secondary" id="back-to-cinema-details">Geri Dön</button>
  `;

  attachFilmSelectionEvents(cinema);
}

// Film Seçim Ekranındaki Olayları Bağlar
function attachFilmSelectionEvents(cinema) {
  const backToCinemaDetailsButton = document.getElementById("back-to-cinema-details");
  if (backToCinemaDetailsButton) {
    backToCinemaDetailsButton.addEventListener("click", () => {
      console.log("Sinema detaylarına geri dönülüyor...");
      renderCinemaDetails(cinema);
    });
  }

  const filmButtons = document.querySelectorAll(".select-film");
  filmButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filmId = parseInt(button.dataset.filmId, 10);
      console.log(`Seçilen Film ID: ${filmId}`);

      // Seçilen film ve sinema bilgilerini kaydet
      localStorage.setItem("selectedCinemaId", cinema.id);
      localStorage.setItem("selectedFilmId", filmId);

      console.log(`Sinema ID: ${cinema.id}, Film ID: ${filmId} kaydedildi.`);
      navigateToSalonSelection(cinema.id, filmId);
    });
  });
}

// Salon Seçim Ekranına Yönlendirir
function navigateToSalonSelection(cinemaId, filmId) {
  try {
    showSalonSelection(cinemaId, filmId);
  } catch (error) {
    console.error("Salon seçim ekranına yönlendirme başarısız:", error);
    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
