import { salons } from './Salons.js';
import { films } from './Films.js';
import { cinemas } from './Cinemas.js';

export function generateShowtimesForSalon(salon, film) {
  const startHour = 10;
  const interval = 30;
  const showtimes = [];
  let currentTime = startHour * 60;

  for (let i = 0; i < 3; i++) {
    const hours = Math.floor(currentTime / 60);
    const minutes = currentTime % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    showtimes.push({ time: formattedTime, filmId: film.id });
    currentTime += film.duration + interval;
  }

  return showtimes;
}

export function assignShowtimesToCinemas() {
  cinemas.forEach(cinema => {
    cinema.salons.forEach(salon => {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      salon.showtimes = generateShowtimesForSalon(salon, randomFilm);
    });
  });
}
