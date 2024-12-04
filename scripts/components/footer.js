import { getSelectedCinema} from "../modules/cinemaSelection.js";

/**
 * Footer içeriklerini yükler.
 * @param {object|null} cinema - Seçili sinema nesnesi (Varsa)
 */
export function loadFooter(cinema = null) {
  cinema = cinema || getSelectedCinema();

  return `
    <footer class="footer">
      <img src="${cinema.logo || './assets/logo/default-logo.png'}" alt="Footer Logo" class="footer-logo" />
      <p>© ${cinema.name || 'CineGrup'} - ${new Date().getFullYear()}</p>
      <p>Telefon: ${cinema.phone || 'N/A'}</p>
    </footer>
  `;
}
