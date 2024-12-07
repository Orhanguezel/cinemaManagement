import { generateSeatsLayout } from "./seatsLayout.js";
import { updateSalonOccupancy } from "../logic/seatManager.js";
import { calculateSalonCapacity } from "../logic/salonAssignment.js"; // Salon kapasitesi hesaplama

export function renderSeatOccupancySettings(cinemas) {
  if (!cinemas || cinemas.length === 0) {
    console.error("'seat-occupancy-settings' için geçerli bir cinemas verisi yok!");
    return;
  }

  const container = document.getElementById("settings-container") || document.createElement("div");
  container.id = "settings-container";
  container.innerHTML = ""; // Eski içeriği temizle

  // Rastgele uygula düğmesi
  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Uygula";
  randomButton.className = "random-button";
  randomButton.onclick = () => {
    cinemas.forEach((cinema) => {
      cinema.salons.forEach((salon) => {
        const randomRate = Math.floor(Math.random() * 101); // Rastgele oran
        updateSalonOccupancy(salon, randomRate); // Oranı güncelle
      });
    });
    renderSeatOccupancySettings(cinemas); // Sayfayı yeniden render et
  };

  container.appendChild(randomButton);

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    cinemaContainer.className = "cinema-container";

    // Sinema adı başlığı
    const cinemaTitle = document.createElement("h3");
    cinemaTitle.className = "cinema-title";
    cinemaTitle.innerText = cinema.name;
    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const salonContainer = document.createElement("div");
      salonContainer.className = "salon-container";

      const salonTitle = document.createElement("h4");
      salonTitle.className = "salon-title";
      salonTitle.innerText = `${salon.name} (Toplam Koltuk: ${salon.seatsList.length})`;

      // Salon Bilgileri
      const capacity = calculateSalonCapacity(salon); // Dolu koltuk sayısını ve toplam kapasiteyi hesapla
      const salonInfo = document.createElement("p");
      salonInfo.className = "salon-info";
      salonInfo.innerHTML = `
        <strong>Sinema:</strong> ${cinema.name} <br>
        <strong>Dolu Koltuk:</strong> ${capacity.occupiedSeats} / ${capacity.totalSeats} <br>
        <strong>Doluluk Yüzdesi:</strong> ${((capacity.occupiedSeats / capacity.totalSeats) * 100).toFixed(2)}%
      `;

      // Koltuk Yerleşimini Oluştur
      const seatsLayout = generateSeatsLayout(salon);

      const screenLabel = document.createElement("div");
      screenLabel.className = "salon-screen";
      screenLabel.innerText = "Ekran";

      salonContainer.appendChild(salonTitle);
      salonContainer.appendChild(salonInfo);
      salonContainer.appendChild(screenLabel);
      salonContainer.appendChild(seatsLayout);

      cinemaContainer.appendChild(salonContainer);
    });

    container.appendChild(cinemaContainer);
  });

  document.body.appendChild(container);
}
