import { cinemas } from "../data/Cinema.js";
import { startReservation } from "../data/Reservation.js";

export function renderMainContent() {
  // Dinamik olarak grid öğeleri oluşturuyoruz
  const gridElements = [
    { id: "hamburger-menu", className: "grid-hamburger-menu", content: "Hamburger Menu" },
    { id: "header-logo", className: "header-logo", content: "Logo" },
    { id: "header-nav", className: "header-nav", content: "Header Navigation" },
    { id: "sidebar", className: "grid-sidebar", content: "Sidebar" },
    {
      id: "main-content",
      className: "main-content",
      content: createCinemaDropdown(), // Açılır menü burada ekleniyor
    },
    { id: "top-section", className: "top-section", content: "Top Section" },
    { id: "about-section", className: "grid-about", content: "About uns Section" },
    { id: "movie-section", className: "grid-movie", content: "Movie Section" },
    { id: "blog-section", className: "grid-blog", content: "Blog Section" },
    { id: "footer", className: "grid-footer", content: "Footer" },
  ];

  // HTML yapısını döndür
  return `
    <div class="grid-container">
      ${gridElements
        .map(
          (element) => `
          <div id="${element.id}" class="${element.className}">
            ${element.content}
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

// Sinema seçim açılır menüsünü oluşturan fonksiyon
function createCinemaDropdown() {
  return `
    <h2>Wählen Sie ein Kino aus:</h2>
    <div class="dropdown">
      <button class="btn-primary dropdown-button" id="cinema-dropdown-button">Kino Liste</button>
      <ul class="dropdown-menu" id="cinema-dropdown-menu">
        ${cinemas
          .map(
            (cinema) => `
            <li class="dropdown-item" data-id="${cinema.id}">${cinema.name}</li>
          `
          )
          .join("")}
      </ul>
    </div>
  `;
}

// Başlangıç olay dinleyicisi
export function initializeMainContentEvents() {
  const dropdownButton = document.getElementById("cinema-dropdown-button");
  const dropdownMenu = document.getElementById("cinema-dropdown-menu");

  // Açılır menüyü göster/gizle
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  // Dropdown öğelerine tıklama
  dropdownMenu.addEventListener("click", (event) => {
    if (event.target.classList.contains("dropdown-item")) {
      const cinemaId = parseInt(event.target.dataset.id, 10);
      console.log(`Seçilen Sinema ID: ${cinemaId}`); // Konsola yazdır
      startReservation(cinemaId); // Rezervasyonu başlat
    }
  });

  console.log("Dropdown olay dinleyicileri başarıyla yüklendi.");
}
