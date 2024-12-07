import { films } from "../data/Film.js";
import { assignFilmsToSalons } from "../logic/filmAssignment.js";

export function renderFilmAssignmentView(cinemas) {
  const mainContainer = document.getElementById("output") || document.createElement("div");
  mainContainer.id = "output";
  mainContainer.innerHTML = "<h2>Film Atama Paneli</h2>";

  const filmList = document.createElement("div");
  filmList.className = "film-list";

  films.forEach((film) => {
    const filmDiv = document.createElement("div");
    filmDiv.className = "film-item";

    filmDiv.innerHTML = `
      <img src="${film.image}" alt="${film.name}" />
      <h3>${film.name}</h3>
      <p>Süre: ${film.duration} dk</p>
    `;
    filmDiv.onclick = () => assignFilmsToSalons(film, cinemas);

    filmList.appendChild(filmDiv);
  });

  mainContainer.appendChild(filmList);
  document.body.appendChild(mainContainer);
}
