/*
listAllMovies()
getMoviesByCategory(categoryId)
getShortMovies(maxDuration)
listMoviesWithShowings()
getMovieShowings(filmId)
findCommonSalonsForMovies(filmIds)
findLongestMovie()
*/

import { films } from "../data/Movies.js";
import { categories } from "../data/Category.js";

// **Tüm Filmleri Listele**
export function listAllMovies() {
  console.log("Tüm Filmler:");
  films.forEach((film) => {
    console.log(
      `Film: ${film.name}, Süre: ${
        film.duration
      }dk, Kategoriler: ${film.categories
        .map(
          (id) => categories.find((cat) => cat.id === id)?.name || "Bilinmeyen"
        )
        .join(", ")}`
    );
  });
}

// **Bir Kategoriye Göre Filmleri Listele**
export function getMoviesByCategory(categoryId) {
  const filteredFilms = films.filter((film) =>
    film.categories.includes(categoryId)
  );

  const category = categories.find((cat) => cat.id === categoryId);

  if (!category) {
    console.error(`Kategori ID ${categoryId} bulunamadı.`);
    return;
  }

  console.log(`Kategori: ${category.name} - Filmler:`);
  if (filteredFilms.length === 0) {
    console.warn(`Kategori: ${category.name} için film bulunamadı.`);
    return;
  }

  filteredFilms.forEach((film) => {
    console.log(`Film: ${film.name}, Süre: ${film.duration}dk`);
  });
}

// **Belirli Sürenin Altındaki Filmleri Getir**
export function getShortMovies(maxDuration) {
  const shortMovies = films.filter((film) => film.duration <= maxDuration);

  console.log(`Süresi ${maxDuration} dakikadan kısa olan filmler:`);
  shortMovies.forEach((film) => {
    console.log(`Film: ${film.name}, Süre: ${film.duration}dk`);
  });
}

// **Gösterimi Olan Filmleri Listele**
export function listMoviesWithShowings() {
  console.log("Gösterimi Olan Filmler:");
  films
    .filter((film) => film.salonShows && film.salonShows.length > 0)
    .forEach((film) => {
      console.log(
        `Film: ${film.name}, Gösterim Sayısı: ${film.salonShows.length}`
      );
      film.salonShows.forEach((show) => {
        console.log(`  Salon ID: ${show.salonId}, Saat: ${show.time}`);
      });
    });
}

// **Bir Filmin Gösterimlerini Al**
export function getMovieShowings(filmId) {
  const film = films.find((f) => f.id === filmId);

  if (!film) {
    console.error(`Film ID ${filmId} bulunamadı.`);
    return;
  }

  console.log(`Film: ${film.name} - Gösterimler:`);
  if (film.salonShows.length === 0) {
    console.warn(`Film: ${film.name} için gösterim bulunamadı.`);
    return;
  }

  film.salonShows.forEach((show) => {
    console.log(`Salon ID: ${show.salonId}, Saat: ${show.time}`);
  });
}

// **Belirli Filmlerin Ortak Salonlarını Bul**
export function findCommonSalonsForMovies(filmIds) {
  const filmsToCompare = films.filter((film) => filmIds.includes(film.id));

  if (filmsToCompare.length < 2) {
    console.warn("En az iki film seçmelisiniz.");
    return;
  }

  const commonSalons = filmsToCompare
    .map((film) => film.salonShows.map((show) => show.salonId))
    .reduce((common, current) => common.filter((id) => current.includes(id)));

  console.log(
    `Ortak Salonlar: ${
      commonSalons.length > 0 ? commonSalons.join(", ") : "Yok"
    }`
  );
}

// **En Uzun Süreli Filmi Bul**
export function findLongestMovie() {
  const longestMovie = films.reduce((longest, current) =>
    current.duration > longest.duration ? current : longest
  );

  console.log(
    `En Uzun Süreli Film: ${longestMovie.name}, Süre: ${longestMovie.duration}dk`
  );
}

// **Test Fonksiyonları**
console.log("\nTüm Filmler:");
listAllMovies();

console.log("\nBir Kategoriye Göre Filmler:");
getMoviesByCategory(1);

console.log("\nKısa Filmler:");
getShortMovies(120);

console.log("\nGösterimi Olan Filmler:");
listMoviesWithShowings();

console.log("\nBir Filmin Gösterimleri:");
getMovieShowings(1);

console.log("\nOrtak Salonları Bul:");
findCommonSalonsForMovies([1, 2]);

console.log("\nEn Uzun Süreli Film:");
findLongestMovie();
