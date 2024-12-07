// cinemaManager.js
import {
  loadCinemaDataFromLocalStorage,
  saveSalonDataToLocalStorage,
} from "../logic/storageManager.js";
import { assignSalonsToCinemas } from "../logic/salonAssignment.js";
import { assignSeatsToSalons } from "../logic/seatAssignment.js";

export function initializeCinemaData(cinemas, salons) {
  // Sinema verilerini LocalStorage'dan yükle
  loadCinemaDataFromLocalStorage(cinemas);

  // Eğer LocalStorage'da veri yoksa yeni veriler oluştur
  if (!cinemas.some((cinema) => cinema.salons && cinema.salons.length > 0)) {
    assignSalonsToCinemas(cinemas, salons);
    assignSeatsToSalons(cinemas);
    saveSalonDataToLocalStorage(cinemas); // İlk durumu kaydet
    console.log("Sinema ve salon verileri başarıyla başlatıldı!");
  } else {
    console.log("Sinema verileri LocalStorage'dan yüklendi!");
  }

  return cinemas;
}
