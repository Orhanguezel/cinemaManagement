import { cinemas } from './Cinemas.js';
import { films } from './Films.js';
import { salons } from './Salons.js';

// **Salonları Sinemalara Atama Fonksiyonu**
export function assignSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const salonCount = Math.floor(Math.random() * 4) + 2; // Her sinema için 2-5 arası salon
    cinema.salons = salons.slice(0, salonCount).map((salon, index) => ({
      ...salon,
      id: `${cinema.id}-${index + 1}`, // Benzersiz salon ID'si oluştur
    }));
  });
  console.log("\nSalon atamaları tamamlandı!");
  console.log(cinemas);
}
assignSalonsToCinemas(); // Salonları sinemalara ata

/*
// **Filmleri Salonlara Atama Fonksiyonu**
export function assignFilmsToSalons() {
  cinemas.forEach((cinema) => {
    if (!cinema.salons || cinema.salons.length === 0) {
      console.error(`Sinema ID ${cinema.id} için salon bilgisi bulunamadı.`);
      return;
    }

    const filmQueue = [...films]; // Filmleri sıraya al
    let filmIndex = 0; // İlk film başlangıç noktası

    cinema.salons.forEach((salon) => {
      const assignedFilm = filmQueue[filmIndex];
      if (!assignedFilm) {
        console.error("Film listesi tükendi, yeterli film yok.");
        return;
      }
      salon.film = assignedFilm; // Salona filmi ata
      filmIndex = (filmIndex + 1) % filmQueue.length; // Döngüsel olarak film değiştir
    });
  });
  console.log("\nFilm atamaları tamamlandı!");
}

// **Gösterim Saatlerini Atama Fonksiyonu**
export function assignShowtimesToCinemas() {
  const startHour = 10; // Sabah 10:00
  const endHour = 22; // Akşam 22:00
  const breakTime = 15; // Filmler arası mola (dakika)

  cinemas.forEach((cinema) => {
    if (!cinema.salons || cinema.salons.length === 0) {
      console.error(`Sinema ID ${cinema.id} için salon bilgisi bulunamadı.`);
      return;
    }

    cinema.shows = []; // Gösterimleri saklayacak

    cinema.salons.forEach((salon) => {
      const film = salon.film; // Salona atanmış film
      if (!film) {
        console.error(`Salon ID ${salon.id} için film atanmadı.`);
        return;
      }

      let currentTime = startHour * 60; // Dakika cinsinden başlama saati
      const showtimes = [];

      while (currentTime + film.duration <= endHour * 60) {
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        showtimes.push(startTime);
        currentTime += film.duration + breakTime; // Film süresi ve molayı ekle
      }

      cinema.shows.push({
        salonId: salon.id,
        filmId: film.id,
        showtimes,
      });
    });
  });
  console.log("\nGösterim saatleri atamaları tamamlandı!");
}

// **Sinema Verilerini İşleme**
export function setupCinemaData() {
  assignSalonsToCinemas(); // Salonları sinemalara ata
  assignFilmsToSalons(); // Filmleri salonlara ata
  assignShowtimesToCinemas(); // Gösterim saatlerini ata
}

// **Sonuçları Göster**
export function logCinemaData() {
  cinemas.forEach((cinema) => {
    console.log(`\nSinema: ${cinema.name}`);
    cinema.salons.forEach((salon) => {
      console.log(`  Salon: ${salon.name}, Kapasite: ${salon.seats}`);
      console.log(`    Film: ${salon.film.name}`);
      console.log("    Gösterim Saatleri:");
      cinema.shows
        .filter((show) => show.salonId === salon.id)
        .forEach((show) => {
          show.showtimes.forEach((time) => {
            console.log(`      Saat: ${time}`);
          });
        });
    });
  });
}

// **Tüm Atama Sürecini Başlat**
setupCinemaData();
logCinemaData();
*/