import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";
import { assignSalonsToCinemas } from "./salonAssignment.js";
import { assignSeatsToSalons } from "./seatAssignment.js";

// Ana iş akışı fonksiyonu
export const state = {
  salonsAssigned: false,
  seatsAssigned: false,
};

export function checkState(step) {
  console.log("Kontrol ediliyor:", step); // Hangi işlem kontrol ediliyor?
  switch (step) {
    case "assignSalons":
      if (!state.salonsAssigned) {
        throw new Error("Hata: Salonlar henüz atanmadı!");
      }
      break;
    case "assignSeats":
      if (!state.seatsAssigned) {
        throw new Error("Hata: Koltuklar henüz atanmadı!");
      }
      break;
    default:
      throw new Error("Hata: Geçersiz işlem!");
  }
}

      