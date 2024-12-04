import { getCinemaSalons } from "../data/data.js";
import { cinemas } from "../data/Cinema.js";
import { showSeatSelection } from "./seatSelection.js";

/**
 * Tarih ve Saat Seçimi Ekranını Gösterir
 */
export function showDateSelection() {
  const cinemaId = localStorage.getItem("selectedCinemaId");
  const salonId = localStorage.getItem("selectedSalonId");

  // Sinema ve salon bilgilerini kontrol et
  const mainContent = document.getElementById("main-content");
  const selectedCinema = cinemas.find((c) => c.id === Number(cinemaId));
  const selectedSalon = getCinemaSalons(Number(cinemaId))?.find((s) => s.id === Number(salonId));

  if (!selectedCinema) {
    alert("Sinema bilgisi bulunamadı.");
    return;
  }

  if (!selectedSalon) {
    alert("Salon bilgisi bulunamadı.");
    return;
  }

  // Tarih ve saat seçim ekranı oluştur
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
  document.getElementById("proceedToSeats").addEventListener("click", () => {
    const selectedDate = dateSelect.value;
    const selectedTime = document.getElementById("timeSelect")?.value;

    if (!selectedDate || !selectedTime) {
      alert("Lütfen geçerli bir tarih ve saat seçin.");
      return;
    }

    // Seçilen tarih ve saati sakla
    localStorage.setItem("selectedDate", selectedDate);
    localStorage.setItem("selectedTime", selectedTime);

    console.log(`Seçilen Tarih: ${selectedDate}, Seçilen Saat: ${selectedTime}`);
    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
  });
}
