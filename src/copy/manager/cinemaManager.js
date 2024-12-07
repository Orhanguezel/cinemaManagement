
import { assignSalonsToCinemas } from "../logic/salonAssignment.js";
import { assignSeatsToSalons} from "../logic/seatAssignment.js";
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


// Tüm sinemalar için rastgele doluluk oranı atama
export function assignRandomOccupancy(cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomPercentage = Math.floor(Math.random() * 101); // 0-100 arasında rastgele bir oran belirle
      assignSeatsRandomly(salon, randomPercentage);

      // Input alanını güncelle
      const inputField = document.querySelector(`#salon-${salon.id}-occupancy`);
      if (inputField) {
        inputField.value = randomPercentage; // Rastgele oranı input alanına yaz
      }
    });
  });

  alert("Tüm salonlar için rastgele doluluk oranları atandı!");
}