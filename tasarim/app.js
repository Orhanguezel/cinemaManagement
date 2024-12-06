import { initializeCinemaData, getCinemaById } from "../programlar/scripts/cinemaManager.js";
import {
  generateSeatsLayout,
  handleSeatSelection,
  assignRandomOccupancy,
} from "../programlar/scripts/seatManager.js";
import { createSalonInfoPanel } from "../programlar/scripts/salonAssignment.js"; 

// Sinema verilerini başlat
const cinemas = initializeCinemaData();
assignRandomOccupancy(cinemas, 30); // %30 doluluk oranı

// Sayfa başlığını ve ana yapıyı dinamik olarak oluştur
function initializePage() {
  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetim Paneli";
  document.body.appendChild(title);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "cinema-buttons";
  buttonsContainer.style.marginBottom = "20px";
  document.body.appendChild(buttonsContainer);

  const outputContainer = document.createElement("div");
  outputContainer.id = "output";
  document.body.appendChild(outputContainer);

  renderCinemaButtons();
}

// Yönetim paneli düğmelerini oluştur
function renderCinemaButtons() {
  const buttonsContainer = document.getElementById("cinema-buttons");
  buttonsContainer.innerHTML = ""; // Eski butonları temizle

  cinemas.forEach((cinema) => {
    const button = document.createElement("button");
    button.innerText = cinema.name;
    button.onclick = () => renderCinemaDetails(cinema.id);
    buttonsContainer.appendChild(button);
  });
}

// Seçilen sinema bilgilerini ekrana getir
function renderCinemaDetails(cinemaId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema) {
    console.error("Sinema bulunamadı!");
    return;
  }

  const output = document.getElementById("output");
  output.innerHTML = ""; // Önceki içeriği temizle

  const title = document.createElement("h2");
  title.innerText = `Sinema: ${cinema.name}`;
  title.style.marginBottom = "20px";
  output.appendChild(title);

  cinema.salons.forEach((salon) => {
    const hallContainer = document.createElement("div");
    hallContainer.className = "hall";

    const screen = document.createElement("div");
    screen.className = "hall__screen";
    screen.innerText = "Leinwand";
    hallContainer.appendChild(screen);

    // Salon Bilgi Paneli (salonAssignment.js içindeki mevcut fonksiyon kullanılıyor)
    const infoPanel = createSalonInfoPanel(salon);
    hallContainer.appendChild(infoPanel);

    // Koltuk yerleşimi
    const seatsLayout = generateSeatsLayout(salon);
    hallContainer.appendChild(seatsLayout);

    output.appendChild(hallContainer);
  });

  attachSeatClickListener();
}

// Koltuğa tıklama olaylarını dinleyici ile bağla
function attachSeatClickListener() {
  document.querySelectorAll(".seat").forEach((seatElement) => {
    seatElement.addEventListener("click", (event) => {
      const seatId = event.target.dataset.seatId;
      const salonId = event.target.dataset.salonId;

      const updatedSeat = handleSeatSelection(cinemas, salonId, seatId);

      // Arayüzü güncelle
      if (updatedSeat) {
        if (updatedSeat.status === "seçili") {
          event.target.classList.remove("available");
          event.target.classList.add("selected");
        } else if (updatedSeat.status === "boş") {
          event.target.classList.remove("selected");
          event.target.classList.add("available");
        }
      }
    });
  });
}

// Sayfa başlatma
initializePage();
