import { cinemas } from "../data/Cinema.js";
import { showSalonSelection } from "./salonSelection.js"; // Salon seçim fonksiyonunu içe aktar

// Sinema Rezervasyonunu Başlatır
export function startReservation(cinemaId) {
  if (typeof cinemaId !== "number") {
    console.error("Hatalı cinemaId tipi, beklenen: 'number', alınan:", cinemaId);
    alert("Geçersiz sinema seçimi.");
    return;
  }

  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Sinema bulunamadı! ID: ${cinemaId}`);
    alert("Geçersiz sinema seçimi.");
    return;
  }

  const mainContent = document.getElementById("main-content");

  if (mainContent) {
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
  }

  // Film seçim ekranına yönlendirme
  const reservationButton = document.getElementById("reservation-button");
  if (reservationButton) {
    reservationButton.addEventListener("click", () => {
      console.log(`Film seçim ekranına yönlendiriliyor: ${cinema.name}`);
      loadFilmSelection(cinema); // Film seçim ekranını yükler
    });
  }

  // Geri dönüş işlemi
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", () => {
      console.log("Ana sayfaya dönülüyor...");
      location.reload(); // Sayfayı yenileyerek başlangıç ekranına dön
    });
  }

  console.log(`Rezervasyon başlatıldı: ${cinema.name}`);
}

// Film seçim ekranını yükler
function loadFilmSelection(cinema) {
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
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
  }

  // Geri dönüş butonu için olay dinleyici
  const backToCinemaDetailsButton = document.getElementById("back-to-cinema-details");
  if (backToCinemaDetailsButton) {
    backToCinemaDetailsButton.addEventListener("click", () => {
      console.log("Sinema detaylarına geri dönülüyor...");
      startReservation(cinema.id); // Sinema detay ekranını yeniden yükler
    });
  }

  // Film seçim butonlarına olay dinleyici ekle
  const filmButtons = document.querySelectorAll(".select-film");
  filmButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filmId = parseInt(button.dataset.filmId, 10);
      console.log(`Seçilen Film ID: ${filmId}`);
      
      // Seçilen film ve sinema bilgilerini localStorage'a kaydet
      localStorage.setItem("selectedCinemaId", cinema.id);
      localStorage.setItem("selectedFilmId", filmId);
      console.log("Seçilen sinema ve film bilgileri kaydedildi.");
      console.log(`Sinema ID: ${cinema.id}, Film ID: ${filmId}`);
  
      try {
        // Salon seçim ekranına yönlendir
        showSalonSelection(cinema.id, filmId);
      } catch (error) {
        console.error("Salon seçim ekranına yönlendirme başarısız:", error);
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  });
  
}
