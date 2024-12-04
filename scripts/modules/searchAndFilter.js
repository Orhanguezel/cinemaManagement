// File: /scripts/modules/searchAndFilter.js

import { getMovies } from "./cineGroupMovies.js";
import { cinemas } from "../data/Cinema.js";

// Filmleri ada göre filtrele
export function searchMovies(query) {
    const movies = getMovies();
    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredMovies;
}

// Sinemaları ada göre filtrele
export function searchCinemas(query) {
    return cinemas.filter(cinema =>
        cinema.name.toLowerCase().includes(query.toLowerCase())
    );
}

// Filmleri kategoriye göre filtrele
export function filterMoviesByCategory(category) {
    const movies = getMovies();
    return movies.filter(movie => movie.category === category);
}

// Filmleri tarihe göre sıralama
export function sortMoviesByDate(order = "asc") {
    const movies = getMovies();
    return movies.sort((a, b) => {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        return order === "asc" ? dateA - dateB : dateB - dateA;
    });
}
