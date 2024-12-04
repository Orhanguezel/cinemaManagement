import { cinemas } from "./Cinema.js";
import { salons } from "./Salon.js";
import { films } from "./Film.js";

// Seçilen sinemanın gösterimlerini getirir
export function getCinemaShows(cinemaId) {
  const selectedCinema = cinemas.find((c) => c.id === cinemaId);
  if (!selectedCinema) {
    console.error(`Kein Kino mit der ID ${cinemaId} gefunden!`);
    return [];
  }

  if (!selectedCinema.shows || selectedCinema.shows.length === 0) {
    console.warn(`Keine Shows für das Kino mit der ID ${cinemaId} gefunden.`);
    return [];
  }

  return selectedCinema.shows;
}

// Kontrol Fonksiyonu
export function checkCinemaStructure() {
  // Tüm sinemalar listelensin
  cinemas.forEach((cinema) => {
    console.log(`Sinema: ${cinema.name}`);
    console.log(`Adres: ${cinema.address}`);
    console.log(`Telefon: ${cinema.phone}`);
    console.log(`Salonlar:`);

    // Her sinema için salonlar
    cinema.salons.forEach((salon) => {
      console.log(`  Salon: ${salon.name}`);
      console.log(`    Özellikler: ${salon.features.is3D ? "3D" : "2D"}, ${salon.features.isVIP ? "VIP" : "Standart"}, Ses: ${salon.features.sound}`);
    });

    // Gösterimleri listeleyelim
    const shows = getCinemaShows(cinema.id);
    if (shows.length === 0) {
      console.log(`  Bu sinema için gösterim bulunamadı.`);
    } else {
      console.log(`  Gösterimler:`);
      shows.forEach((show, idx) => {
        console.log(`    ${idx + 1}. Film: ${show.film.name}, Süre: ${show.film.duration}dk`);
        console.log(`    Gösterim Saati: ${show.time}, Salon: ${show.salon.name}`);
      });
    }
  });

  // Ek olarak filmleri kontrol edelim
  console.log("Tüm Filmler:");
  films.forEach((film) => {
    console.log(`Film: ${film.name}`);
    console.log(`  Süre: ${film.duration}dk`);
    console.log(`  Kategoriler: ${film.categories.join(", ")}`);
    console.log(`  Gösterim Saatleri: ${film.showtimes.join(", ")}`);
  });
}
