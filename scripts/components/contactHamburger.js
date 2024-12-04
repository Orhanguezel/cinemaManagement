// File: /scripts/components/contactHamburger.js
import { getSelectedCinema } from "../modules/cinemaSelection.js";

/**
 * Contact Hamburger Menüyü Ayarlar
 */
export function setupContactHamburgerMenu() {
  const cinema = getSelectedCinema();
  const contactInfo = cinema
    ? `
      <h3>${cinema.name}</h3>
      <p>Adres: ${cinema.address}</p>
      <p>Telefon: ${cinema.phone}</p>
      <p>Email: ${cinema.email || "info@cinegrup.com"}</p>
    `
    : `
      <h3>İletişim</h3>
      <p>Genel Merkez: CineGrup</p>
      <p>Email: info@cinegrup.com</p>
    `;

  const hamburgerMenu = document.getElementById("hamburger-menu");
  if (hamburgerMenu) {
    hamburgerMenu.innerHTML = `
      <div class="hamburger-content">
        ${contactInfo}
      </div>
    `;
  }
}

