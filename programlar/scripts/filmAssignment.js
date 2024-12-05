import { state, checkState } from "./stateManager.js";
import { cinemas } from "./data/Cinemas.js";
import { films } from "./data/Film.js";

// Salonlara filmleri ve gösterim zamanlarını atama
export function assignFilmsToSalons() {
  // Durum kontrolü
  checkState("assignSalons");

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const assignedFilms = [];
      const showTimes = [];

      // Rastgele film ve gösterim zamanı atanıyor
      for (let i = 0; i < 3; i++) {
        const randomFilm = films[Math.floor(Math.random() * films.length)];
        const startTime = `${10 + i * 3}:00`; // Örn: 10:00, 13:00, 16:00
        assignedFilms.push(randomFilm);
        showTimes.push({ film: randomFilm, time: startTime });
      }

      salon.films = assignedFilms;
      salon.showTimes = showTimes;
    });
  });

  state.filmsAssigned = true; // Durumu güncelle
  console.log("Filmler salonlara başarıyla atandı!");
}
