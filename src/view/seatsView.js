import { generateSeatsLayout } from "./seatsLayout.js";
import { updateSalonOccupancy } from "../logic/seatManager.js";
import { calculateSalonCapacity } from "../logic/salonAssignment.js";

export function renderSeatOccupancySettings(cinemas) {
  if (!cinemas || cinemas.length === 0) {
    console.error("'seat-occupancy-settings' için geçerli bir cinemas verisi yok!");
    return;
  }

  // Ana konteyneri temizle veya oluştur
  const mainContainer = document.getElementById("main-container");
  if (!mainContainer) {
    console.error("Ana konteyner bulunamadı. Yeni bir ana konteyner oluşturuluyor.");
    const newContainer = document.createElement("div");
    newContainer.id = "main-container";
    document.body.appendChild(newContainer);
  } else {
    mainContainer.innerHTML = ""; // Önceki içerikleri temizle
  }

  // Yeni içerik oluşturma
  const contentHTML = `
    <h2>Koltuk Doluluk Ayarları</h2>
    <button id="random-seat-assignment" class="random-button">Rastgele Uygula</button>
    ${cinemas
      .map((cinema) => `
        <div class="cinema-container">
          <h3 class="cinema-title">${cinema.name}</h3>
          ${cinema.salons
            .map((salon) => `
              <div class="salon-container">
                <h4 class="salon-title">${salon.name} (Toplam Koltuk: ${salon.seatsList.length})</h4>
                <p class="salon-info">
                  <strong>Sinema:</strong> ${cinema.name} <br>
                  <strong>Dolu Koltuk:</strong> ${salon.seatsList.filter((seat) => seat.status === "dolu").length} / ${salon.seatsList.length} <br>
                  <strong>Doluluk Yüzdesi:</strong> ${((salon.seatsList.filter((seat) => seat.status === "dolu").length / salon.seatsList.length) * 100).toFixed(2)}%
                </p>
                <div class="salon-screen">Ekran</div>
                <div class="seats-layout">${generateSeatsLayout(salon).outerHTML}</div>
              </div>
            `)
            .join("")}
        </div>
      `)
      .join("")}
  `;

  mainContainer.innerHTML = contentHTML;

  // Rastgele atama düğmesi için olay dinleyici
  document.getElementById("random-seat-assignment").onclick = () => {
    cinemas.forEach((cinema) => {
      cinema.salons.forEach((salon) => {
        salon.seatsList.forEach((seat) => {
          seat.status = Math.random() > 0.5 ? "dolu" : "boş";
        });
      });
    });
    renderSeatOccupancySettings(cinemas); // Yeniden render et
  };
}
