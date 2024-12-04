import { startReservation } from "./data/Reservation.js";

export function setupCinemaSelection() {
  document.querySelectorAll(".select-cinema").forEach((button) => {
    button.addEventListener("click", () => {
      const cinemaId = parseInt(button.dataset.id, 10);
      startReservation(cinemaId); // Rezervasyon sürecini başlat
    });
  });
}
