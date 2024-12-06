
import { assignSalonsToCinemas } from "../logic/salonAssignment.js";
import { assignSeatsToSalons} from "../logic/seatAssignment.js";
import { assignRandomOccupancy } from "./seatManager.js";
import { assignOptimalFilmsToSalons } from "../logic/filmAssignment.js";
import { cinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";

export function initializeCinemaData() {
  // Salonları sinemalara ata
  assignSalonsToCinemas(cinemas, salons);

  // Salonlara koltuk ata
  assignSeatsToSalons(cinemas);
  
// Koltukların doluluk oranını ayarla (örnek: %30 doluluk oranı)
  assignRandomOccupancy(cinemas, 30);

  // Filmleri optimal şekilde salonlara ata
  assignOptimalFilmsToSalons(cinemas);

  

  console.log("Veriler başarıyla başlatıldı!");
  return cinemas;
}


// Belirli bir sinemayı ID'ye göre getir
export function getCinemaById(cinemaId) {
  return cinemas.find((cinema) => cinema.id === cinemaId);
}
