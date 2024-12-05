// İş akışının durumunu takip eden nesne
import { cinemas } from "./Cinemas.js"; // Mevcut sinemaları çekiyoruz
import { salons } from "./Salons.js"; // Salon bilgileri
import { assignSalonsToCinemas } from "./sinemasalon.js";
import { assignSeatsToSalons } from "./salonkoltuk.js";

// İş akışının durumunu takip eden nesne
const state = {
  salonsAssigned: false,
  seatsAssigned: false,
};

// Durum kontrol fonksiyonu
function checkState(step) {
  switch (step) {
    case "assignSalons":
      if (!cinemas || cinemas.length === 0) {
        throw new Error("Hata: Sinema bilgileri bulunamadı!");
      }
      break;
    case "assignSeats":
      if (!state.salonsAssigned) {
        throw new Error("Hata: Salonlar henüz atanmadı!");
      }
      break;
    default:
      throw new Error("Hata: Geçersiz işlem!");
  }
}

// İş akışını başlatma
try {
  // 1. Sinemaları kullanarak salonları ata
  checkState("assignSalons"); // Ön koşulu kontrol et
  assignSalonsToCinemas(cinemas, salons);
  state.salonsAssigned = true;

  // 2. Salonlara koltukları ata
  checkState("assignSeats"); // Ön koşulu kontrol et
  assignSeatsToSalons(cinemas);
  state.seatsAssigned = true;

  // 3. Sonucu göster
  console.log("Sistem başarıyla tamamlandı!", cinemas);
} catch (error) {
  console.error(error.message);
}
         