import { films } from "./data/Film.js";

export function renderFilmView() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>Filmler</h2>
    <table>
      <thead>
        <tr>
          <th>Film Adı</th>
          <th>Süre</th>
          <th>Kategoriler</th>
          <th>Aksiyon</th>
        </tr>
      </thead>
      <tbody>
        ${films.map(film => `
          <tr>
            <td>${film.name}</td>
            <td>${film.duration} dk</td>
            <td>${film.categories.join(", ")}</td>
            <td>
              <button onclick="editFilm(${film.id})">Düzenle</button>
              <button onclick="removeFilm(${film.id})">Sil</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <button onclick="addFilm()">Yeni Film Ekle</button>
  `;
}

export function editFilm(filmId) {
  // Film düzenleme işlemi
  console.log(`Film ID: ${filmId}`);
}

export function removeFilm(filmId) {
  // Film silme işlemi
  console.log(`Film ID: ${filmId} siliniyor...`);
}

export function addFilm() {
  // Yeni film ekleme işlemi
  console.log("Yeni film ekleniyor...");
}
