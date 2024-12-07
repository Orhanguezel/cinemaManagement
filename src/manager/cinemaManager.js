import {
  loadCinemaDataFromLocalStorage,
  saveCinemaDataToLocalStorage,
} from "../logic/storageManager.js";
import { assignSalonsToCinemas } from "../logic/salonAssignment.js";
import { assignSeatsToSalons } from "../logic/seatAssignment.js";
import { assignOptimalFilmsToSalons } from "../logic/filmAssignment.js";

// Başlatma işlemleri
export function initializeCinemaData(cinemas, salons) {
  if (!cinemas || !Array.isArray(cinemas) || cinemas.length === 0) {
    console.error("Hata: Sinema verileri geçerli değil veya boş!");
    return [];
  }

  console.log("Uygulama başlatılıyor: Sinema verileri kontrol ediliyor...");

  // LocalStorage'dan veri yükleme
  loadCinemaDataFromLocalStorage(cinemas);

  // Eğer salon ve koltuk verisi yoksa, oluştur
  if (!cinemas.some((cinema) => cinema.salons && cinema.salons.length > 0)) {
    console.log("LocalStorage'da veri bulunamadı. Yeni veriler oluşturuluyor...");
    assignSalonsToCinemas(cinemas, salons);
    assignSeatsToSalons(cinemas);
    assignOptimalFilmsToSalons(cinemas);
    saveCinemaDataToLocalStorage(cinemas); // Yeni veriyi kaydet
    console.log("Sinema ve salon verileri başarıyla başlatıldı!");
  } else {
    console.log("Sinema ve salon verileri LocalStorage'dan yüklendi!");
  }

  return cinemas;
}

