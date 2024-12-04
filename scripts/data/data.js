import { cinemas } from "./Cinema.js";

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
