import { initializeCinemaData } from "./manager/cinemaManager.js";
import {
  manuallyAssignFilmToSalon,
  assignFilmsByCategory,
  assignRandomFilmsToSalons,
  assignOptimalFilmsToSalons,
} from "./logic/filmAssignment.js";
import { createSalonInfoPanel } from "./logic/salonAssignment.js";


// Sinema verilerini başlat
const cinemas = initializeCinemaData();

// Sayfa başlığı ve yönetim paneli oluştur
function initializePage() {
  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetim Paneli";
  document.body.appendChild(title);

  const assignOptions = createFilmAssignmentOptions();
  document.body.appendChild(assignOptions);

  const cinemaButtons = createCinemaButtons();
  document.body.appendChild(cinemaButtons);
}

// Film atama seçeneklerini oluştur
function createFilmAssignmentOptions() {
  const container = document.createElement("div");
  container.id = "film-assignment-options";

  const manualButton = document.createElement("button");
  manualButton.innerText = "Manuel Atama";
  manualButton.onclick = () => manuallyAssignFilmToSalon(1, "1-1");

  const categoryButton = document.createElement("button");
  categoryButton.innerText = "Kategorilere Göre Atama";
  categoryButton.onclick = assignFilmsByCategory;

  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Atama";
  randomButton.onclick = assignRandomFilmsToSalons;

  const optimalButton = document.createElement("button");
  optimalButton.innerText = "Optimal Atama";
  optimalButton.onclick = assignOptimalFilmsToSalons;

  container.appendChild(manualButton);
  container.appendChild(categoryButton);
  container.appendChild(randomButton);
  container.appendChild(optimalButton);

  return container;
}

// Sinema butonlarını oluştur
function createCinemaButtons() {
  const container = document.createElement("div");
  container.id = "cinema-buttons";

  cinemas.forEach((cinema) => {
    const button = document.createElement("button");
    button.innerText = cinema.name;
    button.onclick = () => renderCinemaDetails(cinema.id);
    container.appendChild(button);
  });

  return container;
}

// Sinema detaylarını göster
function renderCinemaDetails(cinemaId) {
  const cinema = cinemas.find((cinema) => cinema.id === cinemaId);

  const output = document.getElementById("output") || document.createElement("div");
  output.id = "output";
  output.innerHTML = "";

  cinema.salons.forEach((salon) => {
    const infoPanel = createSalonInfoPanel(salon);
    output.appendChild(infoPanel);
  });

  document.body.appendChild(output);
}

initializePage();
