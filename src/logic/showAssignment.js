import { cinemas } from "../data/Cinemas.js";
import { saveShowtimesToLocalStorage } from "../logic/storageManager.js";

export function assignShowtimesToSalon(cinemaId, salonId, showtimes) {
  const cinema = cinemas.find((c) => c.id === cinemaId);
  if (!cinema) {
    console.error(`Sinema bulunamadı: ID ${cinemaId}`);
    return false;
  }

  const salon = cinema.salons.find((s) => s.id === salonId);
  if (!salon) {
    console.error(`Salon bulunamadı: ID ${salonId}`);
    return false;
  }

  if (!validateShowtimes(showtimes)) {
    console.error(`Geçersiz gösterim saatleri: ${showtimes}`);
    return false;
  }

  salon.showtimes = showtimes;
  console.log(`Gösterim saatleri atandı: ${salon.name} -> ${showtimes.join(", ")}`);
  return true;
}

// Gösterim Saatlerini Doğrulama
export function validateShowtimes(showtimes) {
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/; // Saat formatı: HH:MM
  return showtimes.every((time) => timeFormat.test(time));
}

// Manuel Gösterim Saatleri Atama
export function assignManualShowtimes(cinemaId, salonId, showtimes) {
    const cinema = cinemas.find((c) => c.id === cinemaId);
    if (!cinema) {
      console.error(`Sinema bulunamadı: ID ${cinemaId}`);
      return false;
    }
  
    const salon = cinema.salons.find((s) => s.id === salonId);
    if (!salon) {
      console.error(`Salon bulunamadı: ID ${salonId}`);
      return false;
    }
  
    if (!validateShowtimes(showtimes)) {
      console.error(`Geçersiz gösterim saatleri: ${showtimes}`);
      return false;
    }
  
    salon.showtimes = showtimes;
    saveShowtimesToLocalStorage(cinemas); // LocalStorage'a kaydet
    console.log(`Gösterim saatleri atandı: ${salon.name} -> ${showtimes.join(", ")}`);
    return true;
  }



// Rastgele Gösterim Saatleri Atama
export function assignRandomShowtimes() {
  const sampleShowtimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomTimes = sampleShowtimes.slice(0, Math.floor(Math.random() * 4) + 2);
      salon.showtimes = randomTimes;
    });
  });
  saveShowtimesToLocalStorage(cinemas); // LocalStorage'a kaydet
  console.log("Rastgele gösterim saatleri atandı.");
}



// Optimum Gösterim Saatleri Atama
export function assignOptimalShowtimes() {
    const primeTimes = ["17:00", "19:00", "21:00"];
    const nonPrimeTimes = ["10:00", "13:00", "15:00"];
  
    cinemas.forEach((cinema) => {
      cinema.salons.forEach((salon, index) => {
        if (index % 2 === 0) {
          salon.showtimes = primeTimes;
        } else {
          salon.showtimes = [...nonPrimeTimes, ...primeTimes.slice(0, 1)];
        }
      });
    });
    saveShowtimesToLocalStorage(cinemas); // LocalStorage'a kaydet
    console.log("Optimum gösterim saatleri atandı.");
  }
