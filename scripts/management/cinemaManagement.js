import { assignSalonsToCinemas } from '../data/assignSalons.js';
import { assignFilmsToSalons } from '../data/assignFilms.js';
import { assignShowtimesToCinemas } from '../data/assignShowtimes.js';
import { cinemas } from '../data/Cinemas.js';
import { films } from '../data/Films.js';


// **Dinamik Verileri Ayarla**
function setupCinemaData() {
  console.log("\n--- Salon Atamaları ---");
  assignSalonsToCinemas();

  console.log("\n--- Film Atamaları ---");
  assignFilmsToSalons();

  console.log("\n--- Gösterim Atamaları ---");
  assignShowtimesToCinemas();
}

// **Sinema ID ile Getir**
export function getCinemaById(cinemaId) {
  const cinema = cinemas.find((cinema) => cinema.id === cinemaId);
  if (!cinema) {
    console.error(`Sinema ID ${cinemaId} bulunamadı.`);
    return null;
  }
  return cinema;
}

// **Bir Sinemanın Salonlarını Alır**
export function getCinemaSalons(cinemaId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema || !cinema.salons) return;

  console.log(`\nSinema: ${cinema.name} - Salonlar:`);
  cinema.salons.forEach((salon) => {
    console.log(
      `  Salon: ${salon.name}, Koltuk Sayısı: ${salon.seats}, Özellikler: ${salon.features?.sound || "Standart"}`
    );
  });
}

// **Bir Sinemanın Filmlerini Alır**
export function getCinemaFilms(cinemaId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema || !cinema.shows) return;

  console.log(`\nSinema: ${cinema.name} - Filmler:`);
  const filmSet = new Set(cinema.shows.map((show) => show.filmId));
  filmSet.forEach((filmId) => {
    const film = cinema.salons
      .flatMap((salon) => salon.film) // Salondaki filmleri al
      .find((f) => f.id === filmId); // İlgili filmi bul
    if (film) {
      console.log(
        `  Film: ${film.name}, Süre: ${film.duration}dk, Kategoriler: ${film.categories.join(", ")}`
      );
    }
  });
}

// **Bir Sinema ve Filmin Gösterimlerini Alır**
export function getCinemaShows(cinemaId, filmId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema || !cinema.shows) return;

  const shows = cinema.shows.filter((show) => show.filmId === filmId);
  if (shows.length === 0) {
    console.warn(`Sinema ID ${cinemaId} ve Film ID ${filmId} için gösterim bulunamadı.`);
    return;
  }

  console.log(`\nSinema: ${cinema.name} - Film Gösterimleri:`);
  shows.forEach((show) => {
    const salon = cinema.salons.find((s) => s.id === show.salonId);
    console.log(
      `  Film: ${show.film?.name || "Tanımsız"}, Saat: ${show.time}, Salon: ${salon?.name || "Tanımsız"}`
    );
  });
}

// **Tüm Sinemaları Listele**
export function listAllCinemas() {
  return cinemas.map((cinema) => ({
    id: cinema.id,
    name: cinema.name,
    address: cinema.address,
  }));
}

// **Verileri Başlat ve Test Et**
console.log("\n--- Verileri Dinamik Olarak Başlat ---");
setupCinemaData();

console.log("\n--- Tüm Sinemalar ---");
console.log(listAllCinemas());

console.log("\n--- Bir Sinemanın Salonları ---");
getCinemaSalons(1);

console.log("\n--- Bir Sinemanın Filmleri ---");
getCinemaFilms(1);

console.log("\n--- Bir Sinema ve Filmin Gösterimleri ---");
getCinemaShows(1, 2);


cinemas.forEach((cinema) => {
  console.log(`\nSinema: ${cinema.name}`);
  cinema.salons.forEach((salon) => {
    console.log(`  Salon: ${salon.name}, Film: ${salon.film.name}`);
    cinema.shows
      .filter((show) => show.salonId === salon.id)
      .forEach((show) => {
        console.log("    Gösterim Saatleri:");
        show.showtimes.forEach((time) => console.log(`      Saat: ${time.time}`));
      });
  });
});
