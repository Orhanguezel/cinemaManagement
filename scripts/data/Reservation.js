import { getCinemaShows } from "./data.js";
import { cinemas } from "./Cinema.js";

// Sinema ve Film Seçimi Başlatma
export function startReservation(cinemaId) {
    const selectedCinema = cinemas.find((c) => c.id === cinemaId);
    if (!selectedCinema) {
        console.error(`Das ausgewählte Kino wurde nicht gefunden! Kino ID: ${cinemaId}`);
        return;
    }

    // Main content alanının arka planını değiştirme
    const mainContent = document.getElementById("main-content");
    mainContent.style.backgroundImage = `url(${selectedCinema.logo})`;
    mainContent.style.backgroundSize = "cover";
    mainContent.style.backgroundPosition = "center";
    mainContent.style.color = "#ffffff";

    // Film seçim ekranını gösterme
    renderFilmSelectionWithShows(selectedCinema);
}

// Film Seçimi Ekranı (Sadece Sinema Seçiminden Gelen)
function renderFilmSelectionWithShows(selectedCinema) {
    const cinemaShows = getCinemaShows(selectedCinema.id);
    const uniqueFilms = new Set();
    const mainContent = document.getElementById("main-content");

    mainContent.innerHTML = `
        <h2>Film Seçimi - ${selectedCinema.name}</h2>
        <div class="film-selection">
          ${cinemaShows
            .filter((show) => {
                if (uniqueFilms.has(show.film.id)) return false;
                uniqueFilms.add(show.film.id);
                return true;
            })
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
        <button class="btn-secondary go-back">Geri Dön</button>
    `;

    // Geri dönüş butonu
    document.querySelector(".go-back").addEventListener("click", () => {
        location.reload(); // Sayfayı yenileyerek başlangıç ekranına döner
    });

    // Film seçimi butonlarına olay dinleyicisi ekle
    document.querySelectorAll(".select-film").forEach((button) => {
        button.addEventListener("click", () => {
            const filmId = parseInt(button.dataset.filmId, 10);
            const selectedFilmShows = cinemaShows.filter((show) => show.film.id === filmId);

            renderShowTimeSelection(selectedFilmShows);
        });
    });
}

// Gösterim Saatleri Ekranı
function renderShowTimeSelection(selectedFilmShows) {
    const mainContent = document.getElementById("main-content");

    mainContent.innerHTML = `
        <h2>Gösterim Saatleri</h2>
        <div class="time-selection">
          ${selectedFilmShows
            .map(
                (show) => `
                <div class="time-card">
                  <p>${show.time}</p>
                  <button class="btn-primary select-time" data-time="${show.time}" data-salon-id="${show.salon.id}">Seç</button>
                </div>
              `
            )
            .join("")}
        </div>
    `;

    document.querySelectorAll(".select-time").forEach((button) => {
        button.addEventListener("click", () => {
            const time = button.dataset.time;
            const salonId = button.dataset.salonId;

            showMenuSelection(time, salonId);
        });
    });
}

// Menü Seçim Ekranı
function showMenuSelection(time, salonId) {
    const mainContent = document.getElementById("main-content");
    const selectedCinema = cinemas.find((c) => c.salons.some((s) => s.id === parseInt(salonId)));

    if (!selectedCinema) return;

    const menuItems = selectedCinema.menu;

    mainContent.innerHTML = `
        <h2>Menü Seçimi</h2>
        <div class="menu-selection">
          ${menuItems
            .map(
                (item) => `
                <div class="menu-item">
                  <p>${item.name} - ${item.price}€</p>
                  <button class="btn-primary add-to-menu" data-name="${item.name}" data-price="${item.price}">Ekle</button>
                </div>
              `
            )
            .join("")}
        </div>
        <button class="btn-secondary finish-reservation">Rezervasyonu Tamamla</button>
    `;

    const selectedItems = [];

    document.querySelectorAll(".add-to-menu").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            selectedItems.push({ name, price });
            console.log("Menüye Eklendi:", { name, price });
        });
    });

    document.querySelector(".finish-reservation").addEventListener("click", () => {
        finalizeReservation(time, salonId, selectedItems);
    });
}

// Rezervasyonu Tamamlama
function finalizeReservation(time, salonId, selectedItems) {
    console.log("Rezervasyon Tamamlandı:", {
        time,
        salonId,
        menu: selectedItems,
    });
    alert("Rezervasyon Başarıyla Tamamlandı!");
}
