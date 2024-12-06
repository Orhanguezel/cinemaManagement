import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";
import { assignSalonsToCinemas } from "./logic/salonAssignment.js";
import { assignSeatsToSalons } from "./logic/seatAssignment.js";
import { saveToLocalStorage, loadFromLocalStorage } from "./logic/storageManager.js";

// Uygulama durumunu yönetmek için global state objesi
export const state = {
  cinemas: null,
  salons: null,
  salonsAssigned: false,
  seatsAssigned: false,
  activeView: null, // Aktif sayfa bilgisi
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

// LocalStorage'dan State Yükleme
export function loadStateFromLocalStorage() {
  console.log("LocalStorage'dan uygulama durumu yükleniyor...");
  const savedCinemas = loadFromLocalStorage("cinemas");
  const savedSalons = loadFromLocalStorage("salons");

  if (savedCinemas) {
    state.cinemas = savedCinemas;
    state.salonsAssigned = true;
  } else {
    console.warn("LocalStorage'da sinema verisi bulunamadı.");
    state.cinemas = cinemas;
  }

  if (savedSalons) {
    state.salons = savedSalons;
  } else {
    console.warn("LocalStorage'da salon verisi bulunamadı.");
    state.salons = salons;
  }

  state.seatsAssigned = !!state.cinemas.find(
    (cinema) => cinema.salons && cinema.salons.some((salon) => salon.seatsList)
  );
  console.log("LocalStorage'dan uygulama durumu yüklendi.");
}

// LocalStorage'a State Kaydetme
export function saveStateToLocalStorage() {
  console.log("Uygulama durumu LocalStorage'a kaydediliyor...");
  saveToLocalStorage("cinemas", state.cinemas);
  saveToLocalStorage("salons", state.salons);
  console.log("Uygulama durumu LocalStorage'a kaydedildi.");
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

    saveStateToLocalStorage(); // Başlangıç durumu kaydet
    console.log("Uygulama durumu başarıyla başlatıldı!");
  } catch (error) {
    console.error("Başlatma sırasında hata oluştu:", error);
  }
}

// Aktif sayfayı değiştir
export function setActiveView(viewName) {
  state.activeView = viewName;
  console.log(`Aktif görünüm değiştirildi: ${viewName}`);
}

// Aktif sayfayı kontrol et
export function isActiveView(viewName) {
  return state.activeView === viewName;
}

// State sıfırlama fonksiyonu
export function resetState() {
  console.log("Uygulama durumu sıfırlanıyor...");
  state.cinemas = null;
  state.salons = null;
  state.salonsAssigned = false;
  state.seatsAssigned = false;
  state.activeView = null;
  saveToLocalStorage("cinemas", null);
  saveToLocalStorage("salons", null);
  console.log("Uygulama durumu sıfırlandı.");
}

// State bilgisini konsola yazdıran yardımcı fonksiyon
export function printState() {
  console.log("Uygulama durumu:", JSON.stringify(state, null, 2));
}
