import { getCinemaShows } from "../management/cinemaManagement.js"; 
import { showModal, closeModal } from "./modalHandler.js"; 
import { showDateSelection } from "./dateSelection.js";

export function showSalonSelection() {
  const cinemaId = Number(localStorage?.getItem("selectedCinemaId"));
  const filmId = Number(localStorage?.getItem("selectedFilmId"));

  if (!cinemaId || !filmId) {
    alert("Sinema veya Film bilgisi eksik!");
    return;
  }

  const cinemaShows = getCinemaShows(cinemaId, filmId);

  if (!cinemaShows || cinemaShows.length === 0) {
    alert("Bu film için mevcut salon bulunmamaktadır.");
    return;
  }

  const content = `
    <h3>Salon Seçimi</h3>
    <div class="salon-list">
      ${cinemaShows
        .map(
          (show) => `
            <label class="salon-label">
              <input type="radio" name="salon" value="${show.salon.id}">
              <div class="salon-option">
                <div>${show.salon.name} - Saat: ${show.time}</div>
                <p>Kapasite: ${show.salon.seats}, Fiyat: ${show.salon.price}€</p>
              </div>
            </label>`
        )
        .join("")}
    </div>
    <button id="confirmSalon" class="btn-primary">Devam Et</button>
  `;

  showModal(content, { title: "Salon Seçimi" });

  document.getElementById("confirmSalon").addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (!selectedSalon) {
      alert("Lütfen bir salon seçin.");
      return;
    }

    localStorage.setItem("selectedSalonId", selectedSalon.value);
    closeModal();
    showDateSelection();
  });
}
