import { getCinemaShows } from "../data/filmsData.js";
import { showDateSelection } from "./dateSelection.js";
import { showModal, closeModal } from "../components/modal.js";

/**
 * Salon Seçimi Ekranını Gösterir
 * @param {number} cinemaId - Seçilen sinema ID'si
 * @param {number} filmId - Seçilen film ID'si
 */
export function showSalonSelection(cinemaId, filmId) {
  if (!cinemaId || !filmId) {
    alert("Geçersiz parametreler: Sinema veya Film bilgisi eksik!");
    return;
  }

  const cinemaShows = getCinemaShows(cinemaId).filter(
    (show) => show.film.id === filmId
  );

  if (!cinemaShows || cinemaShows.length === 0) {
    showModal("<p>Bu film için mevcut salon bulunmamaktadır.</p>");
    return;
  }

  const content = `
    <h3>Salonu Seçin:</h3>
    <div class="salon-list" style="display: flex; flex-wrap: wrap; gap: 20px;">
      ${cinemaShows
        .map((show) => {
          if (!show.salon) {
            console.error("Eksik Salon Bilgisi:", show);
            return `<p>Hata: Salon bilgisi eksik.</p>`;
          }
          return `
            <label class="salon-label" style="text-align: center; max-width: 150px; cursor: pointer;">
              <input type="radio" name="salon" value="${show.salon.id}" style="display: none;">
              <div class="salon-option">
                <img src="${show.salon.image}" alt="${show.salon.name}" class="salon-image" style="width: 100%; cursor: pointer; border: 1px solid #ccc; border-radius: 5px;">
                <div>${show.salon.name} - ${show.time}</div>
                <p>Kapasiteler: ${show.salon.seats}, Fiyat: ${show.salon.price}€</p>
              </div>
            </label>`;
        })
        .join("")}
    </div>
    <button id="confirmSalon" class="btn-primary" style="margin-top: 20px;">Devam Et</button>
  `;

  // Modal göster
  showModal(content);

  // Radio butonlar için olay dinleyicisi ekle
  document.querySelectorAll("input[name='salon']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const selectedLabel = e.target.closest("label");
      document
        .querySelectorAll(".salon-option")
        .forEach((option) => option.classList.remove("selected"));
      selectedLabel.querySelector(".salon-option").classList.add("selected");
    });
  });

  // Salon seçim işlemini onayla
  document.getElementById("confirmSalon").addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (selectedSalon) {
      closeModal(); // Modalı kapat
      showDateSelection(cinemaId, selectedSalon.value); // Tarih seçimine yönlendir
    } else {
      alert("Lütfen bir salon seçin.");
    }
  });
}
