import { films } from "../data/Film.js";
import { cinemas } from "../data/Cinemas.js";

export function assignFilmsToSalons(film, cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.assignedFilm = film;
      console.log(`Film '${film.name}' salon '${salon.name}' için atandı.`);
    });
  });
}

export function manuallyAssignFilmToSalon(filmId, salonId) {
  const film = films.find((f) => f.id === filmId);
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);

  if (!film || !salon) {
    console.error("Film veya salon bulunamadı!");
    return;
  }

  salon.assignedFilm = film;
  console.log(`Film '${film.name}' başarıyla '${salon.name}' salonuna atandı!`);
}

export function assignFilmsByCategory() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const categoryId = salon.features.isVIP ? 1 : salon.seats > 150 ? 5 : 6;
      const suitableFilms = films.filter((film) => film.categories.includes(categoryId));
      const randomFilm = suitableFilms[Math.floor(Math.random() * suitableFilms.length)];

      if (randomFilm) {
        salon.assignedFilm = randomFilm;
        console.log(`Film '${randomFilm.name}' salon '${salon.name}' için atandı.`);
      } else {
        console.warn(`Salon '${salon.name}' için uygun film bulunamadı!`);
      }
    });
  });
}

export function assignRandomFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      salon.assignedFilm = randomFilm;
      console.log(`Film '${randomFilm.name}' salon '${salon.name}' için rastgele atandı.`);
    });
  });
}

export function assignOptimalFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const categoryId = salon.seats > 150 ? 5 : salon.features.is3D ? 2 : 1;
      const suitableFilms = films.filter((film) => film.categories.includes(categoryId));
      suitableFilms.sort((a, b) => b.duration - a.duration);

      if (suitableFilms.length > 0) {
        salon.assignedFilm = suitableFilms[0];
        console.log(
          `Film '${suitableFilms[0].name}' salon '${salon.name}' için optimal olarak atandı.`
        );
      } else {
        console.warn(`Salon '${salon.name}' için uygun film bulunamadı!`);
      }
    });
  });
}
