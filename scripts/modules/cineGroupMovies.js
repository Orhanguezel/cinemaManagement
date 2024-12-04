// File: /scripts/modules/cineGroupMovies.js

import { getAllFilms } from "../data/Film.js";
import { showModal } from "../components/modal.js";

// Tüm filmleri getir ve listele
export function listAllMovies() {
    const films = getAllFilms();

    if (!films || films.length === 0) {
        showModal("<p>Şu anda gösterimde herhangi bir film bulunmamaktadır.</p>");
        return;
    }

    const movieListContent = `
        <h2>Tüm Filmler</h2>
        <ul class="movie-list">
            ${films.map((film) => `<li>${film.name} (${film.category})</li>`).join("")}
        </ul>
    `;

    showModal(movieListContent, "moviesModal");
}

// Filmleri kategoriye göre filtrele
export function filterMoviesByCategory(category) {
    const films = getAllFilms();
    const filteredFilms = films.filter((film) => film.category === category);

    if (!filteredFilms || filteredFilms.length === 0) {
        showModal("<p>Bu kategoriye ait film bulunmamaktadır.</p>");
        return;
    }

    const filteredContent = `
        <h2>${category} Filmleri</h2>
        <ul class="movie-list">
            ${filteredFilms.map((film) => `<li>${film.name}</li>`).join("")}
        </ul>
    `;

    showModal(filteredContent, "moviesModal");
}

// Filmleri isimlere göre ara
export function searchMoviesByName(searchTerm) {
    const films = getAllFilms();
    const searchResults = films.filter((film) =>
        film.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!searchResults || searchResults.length === 0) {
        showModal("<p>Aramanıza uygun film bulunamadı.</p>");
        return;
    }

    const searchContent = `
        <h2>Arama Sonuçları</h2>
        <ul class="movie-list">
            ${searchResults.map((film) => `<li>${film.name}</li>`).join("")}
        </ul>
    `;

    showModal(searchContent, "moviesModal");
}
