// cinemaManager.js
import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";
import { assignSalonsToCinemas } from "./salonAssignment.js";
import { assignSeatsToSalons } from "./seatAssignment.js";

export function initializeCinemaData() {
  assignSalonsToCinemas(cinemas, salons); // Salonları sinemalara ata
  assignSeatsToSalons(cinemas);          // Salonlara koltuk ata
  console.log("Veriler başarıyla başlatıldı!");
  return cinemas;
}

// Belirli bir sinemayı ID'ye göre getir
export function getCinemaById(cinemaId) {
  return cinemas.find((cinema) => cinema.id === cinemaId);
}

