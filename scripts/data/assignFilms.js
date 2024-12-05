import { cinemas } from './Cinemas.js';
import { films } from './Films.js';
import { salons } from './Salons.js';

// **Film Atama Fonksiyonu**
export function assignFilmsToSalons() {
  cinemas.forEach((cinema) => {
    console.log(`\nSinema: ${cinema.name}`);
    if (!cinema.salons || cinema.salons.length === 0) {
      console.error(`Sinema ID ${cinema.id} için salon bilgisi bulunamadı.`);
      return;
    }

    // Salonlar için filmleri sıraya al
    const filmQueue = [...films];
    let filmIndex = 0; // İlk film başlangıç noktası

    cinema.salons.forEach((salon) => {
      console.log(`  Salon: ${salon.name}`);
      
      // Salon için film ata
      const assignedFilm = filmQueue[filmIndex];
      if (!assignedFilm) {
        console.error("Film listesi tükendi, yeterli film yok.");
        return;
      }

      salon.film = assignedFilm; // Salona filmi ata
      console.log(`    Atanan Film: ${assignedFilm.name}, Süre: ${assignedFilm.duration} dk`);

      // Sonraki filme geç
      filmIndex = (filmIndex + 1) % filmQueue.length;
    });
  });
}

// **Gösterim Saatlerini Ayarlayan Fonksiyon**
export function assignShowtimesToCinemas() {
  const startHour = 10; // Sabah 10:00
  const endHour = 22; // Akşam 22:00
  const breakTime = 15; // Filmler arası 15 dakika mola

  cinemas.forEach((cinema) => {
    cinema.shows = [];
    cinema.salons.forEach((salon) => {
      const film = salon.film; // Salona atanmış film
      if (!film) {
        console.error(`Salon ID ${salon.id} için film atanmadı.`);
        return;
      }

      let currentTime = startHour * 60; // Dakika cinsinden başlama saati
      const showtimes = [];

      console.log(`  Salon: ${salon.name}, Film: ${film.name}`);
      while (currentTime + film.duration <= endHour * 60) {
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const startTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        showtimes.push(startTime);
        console.log(`    Gösterim: ${startTime}`);

        // Film süresi ve molayı ekle
        currentTime += film.duration + breakTime;
      }

      // Gösterimleri sinema salonuna ekle
      cinema.shows.push({
        salonId: salon.id,
        filmId: film.id,
        showtimes,
      });
    });
  });
}

// **Veri İşleme**
function setupCinemaData() {
  cinemas.forEach((cinema) => {
    const salonCount = Math.floor(Math.random() * 4) + 2; // 2-5 salon
    cinema.salons = salons.slice(0, salonCount).map(salon => ({
      ...salon,
      id: `${cinema.id}-${salon.id}`, // Benzersiz ID oluştur
    }));
  });

  assignFilmsToSalons(); // Filmleri salonlara ata
  assignShowtimesToCinemas(); // Gösterim saatlerini ata
}

// **Başlat**
setupCinemaData();

// **Sonuçları Göster**
console.log("\nSonuçlar:");
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
