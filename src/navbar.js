export function renderNavbar() {
  const navbar = document.createElement("nav");
  navbar.id = "navbar";
  navbar.innerHTML = `
    <button id="cinema-tab">Sinemalar</button>
    <button id="salon-tab">Salonlar</button>
    <button id="film-tab">Filmler</button>
    <button id="showtime-tab">Gösterimler</button>
    <button id="analysis-tab">Analiz</button>
  `;

  // Navbar'ı body'ye ekle
  document.body.prepend(navbar);

  // Sekme tıklamaları
  document.getElementById("cinema-tab").onclick = () => renderCinemaView();
  document.getElementById("salon-tab").onclick = () => renderSalonView();
  document.getElementById("film-tab").onclick = () => renderFilmView();
  document.getElementById("showtime-tab").onclick = () => renderShowtimeView();
  document.getElementById("analysis-tab").onclick = () => renderAnalysisView();
}
