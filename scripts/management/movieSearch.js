// searchMovies(keyword)
// attachMovieSearch(inputElement, resultElement)

import { films } from "../data/Movies.js";

// **Film Arama Fonksiyonu**
export function searchMovies(keyword) {
  if (!keyword || keyword.trim() === "") {
    console.warn("Arama için geçerli bir kelime girin.");
    return [];
  }

  const lowerCaseKeyword = keyword.toLowerCase();

  // Filme göre filtreleme
  const matchingFilms = films.filter((film) =>
    film.name.toLowerCase().includes(lowerCaseKeyword)
  );

  if (matchingFilms.length === 0) {
    console.log(`"${keyword}" ile eşleşen film bulunamadı.`);
    return [];
  }

  console.log(`"${keyword}" ile eşleşen filmler:`);
  matchingFilms.forEach((film) =>
    console.log(`Film: ${film.name}, Süre: ${film.duration}dk`)
  );

  return matchingFilms;
}

// **Film Arama ve Öneri Fonksiyonu**
export function attachMovieSearch(inputElement, resultElement) {
  if (!inputElement || !resultElement) {
    console.error("Geçerli bir giriş veya sonuç elementi belirtin.");
    return;
  }

  inputElement.addEventListener("input", () => {
    const keyword = inputElement.value;
    const results = searchMovies(keyword);

    // Sonuçları temizleme
    resultElement.innerHTML = "";

    if (results.length === 0) {
      resultElement.innerHTML = "<p>Hiçbir sonuç bulunamadı.</p>";
      return;
    }

    // Önerileri listeleme
    const list = document.createElement("ul");
    results.forEach((film) => {
      const listItem = document.createElement("li");
      listItem.textContent = film.name;
      list.appendChild(listItem);
    });

    resultElement.appendChild(list);
  });
}

// **Test Fonksiyonları**
// Kullanıcı tarafından oluşturulmuş bir input ve sonuç elementi varsa bu kod çalıştırılabilir
// Örnek:
// const inputElement = document.getElementById("movieSearchInput");
// const resultElement = document.getElementById("searchResults");
// attachMovieSearch(inputElement, resultElement);
