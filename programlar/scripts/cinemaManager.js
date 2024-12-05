import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";
import { assignSalonsToCinemas } from "./salonAssignment.js";
import { assignSeatsToSalons } from "./seatAssignment.js";

// Sinema verilerini başlatma ve tüm atamaları tamamlama
export function initializeCinemaData() {
  assignSalonsToCinemas(cinemas, salons); // Sinemalara salon atama
  assignSeatsToSalons(cinemas);          // Salonlara koltuk atama
  console.log("Veriler başarıyla başlatıldı!");
  return cinemas;
}

// Belirli bir sinemayı ID'ye göre getir
export function getCinemaById(cinemaId) {
  return cinemas.find((cinema) => cinema.id === cinemaId);
}

