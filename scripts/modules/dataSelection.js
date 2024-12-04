import { getCinemaSalons } from "../data/filmsData.js";
import { cinemas } from "../data/cinemas.js";
import { showSeatSelection } from "./seatSelection.js";

/**
 * Tarih ve Saat Seçimi Ekranını Gösterir
 * @param {number} cinemaId - Seçilen sinema ID'si
 * @param {number} salonId - Seçilen salon ID'si
 */
export function showDateSelection(cinemaId, salonId) {
  const mainContent = document.getElementById("main-content");
  const selectedCinema = cinemas.find((c) => c.id === cinemaId);
  const selectedSalon = getCinemaSalons(cinemaId)?.find((s) => s.id === parseInt(salonId));

  if (!selectedCinema) {
    alert("Sinema bilgisi bulunamadı.");
    return;
  }

  if (!selectedSalon) {
    alert("Salon bilgisi bulunamadı.");
    return;
  }

  // Tarih ve saat seçim formunu oluştur
  mainContent.innerHTML = `
    <h2>${selectedCinema.name} - ${selectedSalon.name}</h2>
    <form id="dateForm" class="date-form">
        <div>
          <label for="dateSelect">Tarih:</label>
          <input type="date" id="dateSelect" class="input-date" required>
        </div>
        <div>
          <label for="timeSelect">Saat:</label>
          <select id="timeSelect" class="input-time" required>
              <option value="">Lütfen bir saat seçin...</option>
              ${selectedSalon.shows
                .map((show) => `<option value="${show.time}">${show.time}</option>`)
                .join("")}
          </select>
        </div>
        <button type="button" id="proceedToSeats" class="btn-primary">Koltuk Seçimine Devam Et</button>
    </form>
  `;

  // Geçmiş tarihleri devre dışı bırak
  const dateSelect = document.getElementById("dateSelect");
  const today = new Date().toISOString().split("T")[0];
  dateSelect.min = today;

  // Koltuk seçimine yönlendirme
  document.getElementById("proceedToSeats")?.addEventListener("click", () => {
    const selectedDate = dateSelect.value;
    const selectedTime = document.getElementById("timeSelect")?.value;

    if (!selectedDate || !selectedTime) {
      alert("Lütfen geçerli bir tarih ve saat seçin.");
      return;
    }

    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
  });
}

/**
 * Salon Seçimi Onay Düğmesini Bağlar
 * @param {number} cinemaId - Seçilen sinema ID'si
 */
export function attachConfirmSalonListener(cinemaId) {
  document.getElementById("confirmSalon")?.addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (selectedSalon) {
      showDateSelection(cinemaId, selectedSalon.value);
    } else {
      alert("Lütfen bir salon seçin.");
    }
  });
}
