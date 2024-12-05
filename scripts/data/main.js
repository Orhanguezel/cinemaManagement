import { assignSalonsToCinemas } from './assignSalons.js';
import { assignFilmsToSalons } from './assignFilms.js';
import { assignShowtimesToCinemas } from './assignShowtimes.js';
import { cinemas } from './Cinemas.js';
import { films } from './Films.js';

function setupCinemaData() {
  console.log("\n--- Salon Atamaları ---");
  assignSalonsToCinemas();

  console.log("\n--- Film Atamaları ---");
  assignFilmsToSalons();

  console.log("\n--- Gösterim Atamaları ---");
  assignShowtimesToCinemas();

  console.log("\n--- Sonuçlar ---");
  cinemas.forEach((cinema) => {
    console.log(`\nSinema: ${cinema.name}`);
    if (!cinema.salons || cinema.salons.length === 0) {
      console.log("  Salon bilgisi bulunamadı.");
      return;
    }

    cinema.salons.forEach((salon) => {
      console.log(`  Salon: ${salon.name}, Kapasite: ${salon.seats}`);
      if (cinema.shows) {
        const show = cinema.shows.find((s) => s.salonId === salon.id);
        if (show && show.showtimes.length > 0) {
          show.showtimes.forEach((showtime) => {
            const film = films.find((f) => f.id === showtime.filmId);
            console.log(`    Film: ${film.name}, Saat: ${showtime.time}`);
          });
        } else {
          console.log("    Gösterim bulunamadı.");
        }
      }
    });
  });
}

// Başlat
setupCinemaData();
