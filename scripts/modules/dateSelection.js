// scripts/management/dateSelection.js
import { getCinemaSalons } from "../management/cinemaManagement.js"; // Yönetim klasöründen çağır
import { getCinemaById } from "../management/cinemaManagement.js"; // Yönetim fonksiyonunu kullan
import { showSeatSelection } from "../modules/seatSelection.js";

// Tarih ve Saat Seçimi Ekranını Gösterir
export function showDateSelection() {
  const cinemaId = localStorage.getItem("selectedCinemaId");
  const salonId = localStorage.getItem("selectedSalonId");

  if (!cinemaId || !salonId) {
    alert("Sinema veya salon bilgisi eksik!");
    return;
  }

  // Sinema ve salon bilgilerini al
  const selectedCinema = getCinemaById(Number(cinemaId));
  const selectedSalon = getCinemaSalons(Number(cinemaId))?.find(
    (s) => s.id === Number(salonId)
  );

  if (!selectedCinema) {
    alert("Sinema bilgisi bulunamadı.");
    return;
  }

  if (!selectedSalon) {
    alert("Salon bilgisi bulunamadı.");
    return;
  }

  // Ana içeriği oluştur
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("Ana içerik alanı bulunamadı.");
    return;
  }

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
                .map(
                  (show) => `<option value="${show.time}">${show.time}</option>`
                )
                .join("")}
          </select>
        </div>
        <button type="button" id="proceedToSeats" class="btn-primary">Koltuk Seçimine Devam Et</button>
    </form>
  `;

  setupDateForm(selectedSalon);
}

// Tarih Seçimi Formunu Ayarlar
function setupDateForm(selectedSalon) {
  const dateSelect = document.getElementById("dateSelect");
  const today = new Date().toISOString().split("T")[0];
  dateSelect.min = today;

  const proceedButton = document.getElementById("proceedToSeats");
  if (!proceedButton) {
    console.error("Devam butonu bulunamadı.");
    return;
  }

  proceedButton.addEventListener("click", () => {
    const selectedDate = dateSelect.value;
    const selectedTime = document.getElementById("timeSelect")?.value;

    if (!selectedDate || !selectedTime) {
      alert("Lütfen geçerli bir tarih ve saat seçin.");
      return;
    }

    saveSelectedDateTime(selectedDate, selectedTime);
    navigateToSeatSelection(selectedSalon);
  });
}

// Seçilen Tarih ve Saati Kaydeder
function saveSelectedDateTime(selectedDate, selectedTime) {
  localStorage.setItem("selectedDate", selectedDate);
  localStorage.setItem("selectedTime", selectedTime);
  console.log(`Seçilen Tarih: ${selectedDate}, Seçilen Saat: ${selectedTime}`);
}

// Koltuk Seçim Ekranına Yönlendirir
function navigateToSeatSelection(selectedSalon) {
  const cinemaId = localStorage.getItem("selectedCinemaId");
  const salonId = selectedSalon.id;
  const selectedDate = localStorage.getItem("selectedDate");
  const selectedTime = localStorage.getItem("selectedTime");

  try {
    showSeatSelection(cinemaId, salonId, selectedDate, selectedTime);
  } catch (error) {
    console.error("Koltuk seçim ekranına yönlendirme başarısız:", error);
    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
  }
}
