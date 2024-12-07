// stateManager.js
import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";
import { assignSalonsToCinemas } from "./logic/salonAssignment.js";
import { assignSeatsToSalons } from "./logic/seatAssignment.js";

// Uygulama durumunu yönetmek için global state objesi
export const state = {
  cinemas: null,
  salons: null,
  salonsAssigned: false,
  seatsAssigned: false,
};

// State kontrol fonksiyonu
export function checkState(step) {
  console.log("Durum kontrol ediliyor:", step);
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
    case "cinemasInitialized":
      if (!state.cinemas) {
        throw new Error("Hata: Sinema verisi henüz başlatılmadı!");
      }
      break;
    default:
      throw new Error("Hata: Geçersiz işlem!");
  }
}

// Salon ve koltuk atama işlemlerini başlatan fonksiyon
export function initializeState() {
  try {
    console.log("Başlatılıyor: Sinema verileri...");
    state.cinemas = cinemas;
    state.salons = salons;

    assignSalonsToCinemas(state.cinemas, state.salons);
    state.salonsAssigned = true;

    assignSeatsToSalons(state.cinemas);
    state.seatsAssigned = true;

    console.log("Uygulama durumu başarıyla başlatıldı!");
  } catch (error) {
    console.error("Başlatma sırasında hata oluştu:", error);
  }
}

// State sıfırlama fonksiyonu
export function resetState() {
  console.log("Uygulama durumu sıfırlanıyor...");
  state.cinemas = null;
  state.salons = null;
  state.salonsAssigned = false;
  state.seatsAssigned = false;
  console.log("Uygulama durumu sıfırlandı.");
}

// State bilgisini konsola yazdıran yardımcı fonksiyon
export function printState() {
  console.log("Uygulama durumu:", JSON.stringify(state, null, 2));
}
