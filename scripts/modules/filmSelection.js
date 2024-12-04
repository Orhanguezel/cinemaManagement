// File: /scripts/modules/filmSelection.js

import { getCinemaShows } from "../data/data.js";
import { showModal } from "../components/modal.js";
import { showSalonSelection } from "./salonSelection.js";

// Belirli bir sinema için filmleri listele
export function showFilmSelection(cinemaId) {
    const shows = getCinemaShows(cinemaId);

    if (!shows || shows.length === 0) {
        showModal("<p>Bu sinema için gösterimde herhangi bir film bulunmamaktadır.</p>");
        return;
    }

    // Benzersiz filmleri listele
    const uniqueFilms = Array.from(
        new Set(shows.map((show) => show.film.id))
    ).map((id) => shows.find((show) => show.film.id === id).film);

    const filmSelectionContent = `
        <h2>Film Seçimi</h2>
        <div class="film-selection">
            ${uniqueFilms
                .map(
                    (film) => `
                    <div class="film-card">
                        <img src="${film.image}" alt="${film.name}" class="film-image">
                        <h3>${film.name}</h3>
                        <button class="btn-primary select-film" data-film-id="${film.id}">Seç</button>
                    </div>
                `
                )
                .join("")}
        </div>
    `;

    showModal(filmSelectionContent, "filmSelectionModal");

    document.querySelectorAll(".select-film").forEach((button) => {
        button.addEventListener("click", (e) => {
            const filmId = parseInt(e.target.dataset.filmId, 10);
            if (filmId) {
                showSalonSelection(cinemaId, filmId); // Salon seçim ekranına geçiş
            } else {
                alert("Film seçimi sırasında bir hata oluştu!");
            }
        });
    });
}
