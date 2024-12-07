import { films } from "../data/Film.js";
import {
  assignFilmsToSalons,
  assignFilmsByCategory,
  assignRandomFilmsToSalons,
} from "../logic/filmAssignment.js";

export function renderFilmAssignmentView(cinemas) {
  const mainContainer = document.getElementById("main-container");
  if (!mainContainer) {
    console.error("Ana konteyner bulunamadı!");
    return;
  }

  // Film atama panelini oluştur
  mainContainer.innerHTML = `
    <h2>Film Atama Paneli</h2>
    <p>Filmleri salonlara atamak için bir yöntem seçin.</p>
    <div>
      <button id="manual-assignment">Manuel Atama</button>
      <button id="optimal-assignment">Optimal Atama</button>
      <button id="random-assignment">Rastgele Atama</button>
    </div>
  `;

  // Olay dinleyiciler
  document.getElementById("manual-assignment").onclick = () => {
    // Manuel atama işlemi
    console.log("Manuel film atama başladı.");
  };

  document.getElementById("optimal-assignment").onclick = () => {
    console.log("Filmler optimal şekilde atandı!");
  };

  document.getElementById("random-assignment").onclick = () => {
    console.log("Filmler rastgele atandı!");
  };
}


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
            .flatMap((cinema) => cinema.salons || [])
            .map((salon) => `<option value="${salon.id}">${salon.name} (${cinema.name})</option>`)
            .join("")}
        </select>
        <button id="confirm-assignment">Atama Yap</button>
        <button id="cancel-assignment">İptal</button>
      `;

      document.body.appendChild(salonSelection);

      document.getElementById("confirm-assignment").onclick = () => {
        const selectedSalonId = document.getElementById("salon-select").value;
        const salon = cinemas
          .flatMap((cinema) => cinema.salons || [])
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
      filmInfo.innerText = film ? `${salon.name}: ${film.name}` : `${salon.name}: Henüz atanmadı.`;
      cinemaContainer.appendChild(filmInfo);
    });

    mainContainer.appendChild(cinemaContainer);
  });
}
