import { listAllCinemas, getCinemaById } from "../management/cinemaManagement.js";
import { getSelectedCinema, setupMainContent } from "../modules/cinemaSelection.js";
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
  const cinemas = listAllCinemas();
  return `
    <select id="cinemaDropdown">
      ${cinemas.map((cinema) => `<option value="${cinema.id}">${cinema.name}</option>`).join("")}
    </select>
  `;
}

export function initializeMainContentEvents() {
  document.getElementById("cinemaDropdown").addEventListener("change", (e) => {
    const cinemaId = Number(e.target.value);
    const cinema = getCinemaById(cinemaId);
    setupMainContent(cinema);
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
