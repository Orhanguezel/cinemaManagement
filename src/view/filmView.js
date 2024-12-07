import { films } from "../data/Film.js";
import { 
  assignFilmsToSalons, 
  assignFilmsByCategory, 
  assignRandomFilmsToSalons 
} from "../logic/filmAssignment.js";

export function renderFilmAssignmentView(cinemas) {
  const mainContainer = document.getElementById("output") || document.createElement("div");
  mainContainer.id = "output";
  mainContainer.innerHTML = `
    <h2>Film Atama Paneli</h2>
    <p>Filmleri salonlara atamak için bir yöntem seçin.</p>
  `;

  // Atama yöntemi düğmeleri
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const manualButton = document.createElement("button");
  manualButton.innerText = "Manuel Atama";
  manualButton.className = "atama-button";
  manualButton.onclick = () => renderManualFilmAssignment(cinemas);

  const optimalButton = document.createElement("button");
  optimalButton.innerText = "Optimal Atama";
  optimalButton.className = "atama-button";
  optimalButton.onclick = () => {
    assignFilmsByCategory(cinemas);
    alert("Filmler optimal şekilde salonlara atandı!");
    renderCinemasWithFilms(cinemas);
  };

  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Atama";
  randomButton.className = "atama-button";
  randomButton.onclick = () => {
    assignRandomFilmsToSalons(cinemas);
    alert("Filmler rastgele salonlara atandı!");
    renderCinemasWithFilms(cinemas);
  };

  buttonContainer.appendChild(manualButton);
  buttonContainer.appendChild(optimalButton);
  buttonContainer.appendChild(randomButton);
  mainContainer.appendChild(buttonContainer);

  document.body.appendChild(mainContainer);
}

// Manuel film atama işlemi
function renderManualFilmAssignment(cinemas) {
  const manualContainer = document.createElement("div");
  manualContainer.className = "manual-container";

  const filmList = document.createElement("div");
  filmList.className = "film-list";

  films.forEach((film) => {
    const filmCard = document.createElement("div");
    filmCard.className = "film-card";

    filmCard.innerHTML = `
      <img src="${film.image}" alt="${film.name}" />
      <h3>${film.name}</h3>
      <p>Süre: ${film.duration} dk</p>
      <button class="assign-button">Atama Yap</button>
    `;

    filmCard.querySelector(".assign-button").onclick = () => {
      const salonSelection = document.createElement("div");
      salonSelection.className = "salon-selection";
      salonSelection.innerHTML = `
        <h4>${film.name} için Salon Seçin</h4>
        <select id="salon-select">
          ${cinemas
            .flatMap((cinema) => cinema.salons)
            .map((salon) => `<option value="${salon.id}">${cinema.name} - ${salon.name}</option>`)
            .join("")}
        </select>
        <button id="confirm-assignment">Atama Yap</button>
        <button id="cancel-assignment">İptal</button>
      `;

      document.body.appendChild(salonSelection);

      document.getElementById("confirm-assignment").onclick = () => {
        const selectedSalonId = document.getElementById("salon-select").value;
        const salon = cinemas
          .flatMap((cinema) => cinema.salons)
          .find((salon) => salon.id === selectedSalonId);

        if (salon) {
          salon.assignedFilm = film;
          alert(`Film '${film.name}' başarıyla '${salon.name}' salonuna atandı!`);
          renderCinemasWithFilms(cinemas);
        }

        document.body.removeChild(salonSelection);
      };

      document.getElementById("cancel-assignment").onclick = () => {
        document.body.removeChild(salonSelection);
      };
    };

    filmList.appendChild(filmCard);
  });

  manualContainer.appendChild(filmList);
  document.body.appendChild(manualContainer);
}

// Salonları ve atanmış filmleri göster
function renderCinemasWithFilms(cinemas) {
  const mainContainer = document.getElementById("output");
  mainContainer.innerHTML = "<h3>Salonlara Atanmış Filmler</h3>";

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    cinemaContainer.className = "cinema-container";

    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;
    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const film = salon.assignedFilm;
      const filmInfo = document.createElement("p");

      if (film) {
        filmInfo.innerText = `${salon.name}: ${film.name}`;
      } else {
        filmInfo.innerText = `${salon.name}: Henüz atanmadı.`;
      }

      cinemaContainer.appendChild(filmInfo);
    });

    mainContainer.appendChild(cinemaContainer);
  });
}
