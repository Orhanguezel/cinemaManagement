import { cinemas } from "../data/Cinema.js";
import { getSelectedCinema, setupMainContent } from "../modules/cinemaSelection.js"; // Güncel import
import { loadHeader } from "./header.js";

export function loadMainContent() {
  const selectedCinema = getSelectedCinema(); // Seçili sinemayı al

  const gridElements = [
    { id: "hamburger-menu", className: "grid-hamburger-menu", content: "Hamburger Menu" },
    { id: "header-logo", className: "header-logo", content: "Logo" },
    { id: "header-nav", className: "header-nav", content: "Header Navigation" },
    { id: "sidebar", className: "grid-sidebar", content: "Sidebar" },
    {
      id: "main-content",
      className: "main-content",
      content: createCinemaDropdown(),
    },
    {
      id: "top-section",
      className: "top-section",
      content: selectedCinema ? createTopSection(selectedCinema) : "Top Section",
    },
    { id: "about-section", className: "grid-about", content: "About uns Section" },
    { id: "movie-section", className: "grid-movie", content: "Movie Section" },
    { id: "blog-section", className: "grid-blog", content: "Blog Section" },
    { id: "footer", className: "grid-footer", content: "Footer" },
  ];

  const app = document.getElementById("app");
  app.innerHTML = `
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

  initializeMainContentEvents();
}

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

export function initializeMainContentEvents() {
  const dropdownButton = document.getElementById("cinema-dropdown-button");
  const dropdownMenu = document.getElementById("cinema-dropdown-menu");

  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
  });

  dropdownMenu.addEventListener("click", (event) => {
    if (event.target.classList.contains("dropdown-item")) {
      const cinemaId = parseInt(event.target.dataset.id, 10);
      console.log(`Seçilen Sinema ID: ${cinemaId}`);
      const selectedCinema = cinemas.find((c) => c.id === cinemaId); // Seçilen sinema
      if (selectedCinema) {
        setupMainContent(selectedCinema);
        loadHeader(selectedCinema); // Header'ı güncelle
      }
    }
  });
}

function createTopSection(cinema) {
  return `
    <div class="top-section-content">
      <h2>${cinema.name}</h2>
      <p>${cinema.address}</p>
      <p>Telefon: ${cinema.phone}</p>
    </div>
  `;
}
