import { initializeCinemaData, getCinemaById } from "../programlar/scripts/cinemaManager.js";
import { handleSeatSelection } from "../programlar/scripts/seatManager.js";

// Sinema verilerini başlat
const cinemas = initializeCinemaData();

// Sayfa başlığını ve ana yapıyı dinamik olarak oluştur
function initializePage() {
  // Sayfa başlığını ekle
  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetim Paneli";
  document.body.appendChild(title);

  // Düğmelerin bulunacağı alan
  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "cinema-buttons";
  document.body.appendChild(buttonsContainer);

  // Çıktının gösterileceği alan
  const outputContainer = document.createElement("div");
  outputContainer.id = "output";
  document.body.appendChild(outputContainer);

  renderCinemaButtons(); // Sinema düğmelerini oluştur
}

// Yönetim paneli düğmelerini oluştur
function renderCinemaButtons() {
  const buttonsContainer = document.getElementById("cinema-buttons");
  buttonsContainer.innerHTML = ""; // Daha önceki düğmeleri temizle

  cinemas.forEach((cinema) => {
    const button = document.createElement("button");
    button.innerText = cinema.name;
    button.className = "cinema-button";
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
  output.appendChild(title);

  cinema.salons.forEach((salon) => {
    const hallContainer = document.createElement("div");
    hallContainer.className = "hall";

    const screen = document.createElement("div");
    screen.className = "hall__screen";
    screen.innerText = "Leinwand";

    hallContainer.appendChild(screen);

    const seatsContainer = document.createElement("div");
    seatsContainer.className = "seats";

    salon.seatsList.forEach((seat) => {
      const seatElement = document.createElement("div");
      seatElement.className = `seat ${seat.status === "boş" ? "available" : seat.status === "seçili" ? "selected" : "occupied"}`;
      seatElement.dataset.seatId = seat.id;
      seatElement.dataset.salonId = salon.id;
      seatElement.innerText = `${String.fromCharCode(64 + seat.row)}${seat.number}`; // Alfabetik sıra

      seatsContainer.appendChild(seatElement);
    });

    hallContainer.appendChild(seatsContainer);
    output.appendChild(hallContainer);
  });

  // Koltuğa tıklama olaylarını bağla
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
