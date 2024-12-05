import { cinemas } from './Cinemas.js';
import { films } from './Films.js';
import { salons } from './Salons.js';

// **Salon Atama Fonksiyonu**
export function assignSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const salonCount = Math.floor(Math.random() * 4) + 2; // 2-5 arası salon
    cinema.salons = salons.slice(0, salonCount).map((salon, index) => ({
      ...salon,
      id: `${cinema.id}-${index + 1}`, // Benzersiz ID oluştur
    }));
  });
}

// **Gösterim Atama Fonksiyonu**
export function assignShowtimesToCinemas() {
  const startHour = 10 * 60; // 10:00
  const breakTime = 15; // Filmler arası mola
  const showCount = 4; // Günlük 4 gösterim

  cinemas.forEach((cinema) => {
    if (!cinema.salons || cinema.salons.length === 0) {
      console.error(`Sinema ID ${cinema.id} için salon bilgisi bulunamadı.`);
      return;
    }

    cinema.shows = []; // Gösterimleri saklayacak

    cinema.salons.forEach((salon) => {
      const assignedFilms = [...films].sort((a, b) => a.id - b.id); // Film ID'sine göre sırala
      const showtimes = [];
      let currentTime = startHour;

      for (let i = 0; i < showCount; i++) {
        const filmIndex = i % assignedFilms.length; // Döngüsel olarak film seç
        const film = assignedFilms[filmIndex];
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const startTime = `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}`;

        showtimes.push({
          filmId: film.id,
          time: startTime,
        });

        currentTime += film.duration + breakTime; // Film süresi ve molayı ekle
      }

      cinema.shows.push({
        salonId: salon.id,
        showtimes: showtimes,
      });
    });
  });

  console.log("\nGösterim atamaları tamamlandı!");
}

// **Test için Çalıştır**
assignSalonsToCinemas(); // Önce salonları ata
assignShowtimesToCinemas(); // Gösterimleri ata

// **Sonuçları Kontrol Et**
cinemas.forEach((cinema) => {
  console.log(`\nSinema: ${cinema.name}`);
  cinema.salons.forEach((salon) => {
    console.log(`  Salon: ${salon.name}`);
    const salonShows = cinema.shows.find((show) => show.salonId === salon.id);
    if (salonShows) {
      salonShows.showtimes.forEach((showtime) => {
        const film = films.find((f) => f.id === showtime.filmId);
        console.log(`    Film: ${film.name}, Saat: ${showtime.time}`);
      });
    } else {
      console.log(`    Bu salonda gösterim yok.`);
    }
  });
});
