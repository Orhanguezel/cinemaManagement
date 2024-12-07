import { cinemas } from "../data/Cinemas.js";

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

export function validateShowtimes(showtimes) {
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/; // Saat formatı: HH:MM
  return showtimes.every((time) => timeFormat.test(time));
}

// Tüm salonlara rastgele gösterim saatleri atama (örnek)
export function assignRandomShowtimes() {
  const sampleShowtimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomTimes = sampleShowtimes.slice(0, Math.floor(Math.random() * 4) + 2); // Rastgele 2-4 saat seçimi
      salon.showtimes = randomTimes;
      console.log(`Gösterim saatleri atandı: ${salon.name} -> ${randomTimes.join(", ")}`);
    });
  });
}
