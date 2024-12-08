import { renderCinemaView } from "./cinemaView.js";
import { renderSalonView } from "./salonView.js";
import { renderFilmView } from "./filmView.js";
import { renderShowtimeView } from "./showtimeView.js";
import { renderAnalysisView } from "./analysisView.js";
import { resetData } from "./stateManager.js";


export function renderNavbar() {
  const navbar = document.createElement("nav");
  navbar.id = "navbar";
  navbar.innerHTML = `
    <button id="cinema-tab">Sinemalar</button>
    <button id="salon-tab">Salonlar</button>
    <button id="film-tab">Filmler</button>
    <button id="showtime-tab">Gösterimler</button>
    <button id="analysis-tab">Analiz</button>
    <button id="reset-data-tab">Verileri Sıfırla</button>
  `;

  document.body.prepend(navbar);

  document.getElementById("cinema-tab").onclick = () => renderCinemaView();
  document.getElementById("salon-tab").onclick = () => renderSalonView();
  document.getElementById("film-tab").onclick = () => renderFilmView();
  document.getElementById("showtime-tab").onclick = () => renderShowtimeView();
  document.getElementById("analysis-tab").onclick = () => renderAnalysisView();
  document.getElementById("reset-data-tab").onclick = () => resetData();
}

