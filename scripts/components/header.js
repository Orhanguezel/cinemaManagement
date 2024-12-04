import { getSelectedCinema } from "../modules/cinemaSelection.js";

/**
 * Header içeriklerini yükler.
 */
export function loadHeader() {
  const cinema = getSelectedCinema(); // LocalStorage'dan seçili sinema bilgisi al
  const headerElement = document.getElementById("header");

  if (!headerElement) return;

  headerElement.innerHTML = `
    <header class="header">
      <img src="${cinema.logo || './assets/logo/default-logo.png'}" alt="Logo" class="logo" />
      <nav class="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#cinemas">Cinemas</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
      </nav>
    </header>
  `;
}

