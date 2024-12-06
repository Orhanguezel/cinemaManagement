import { getCinemaById } from "../manager/cinemaManager.js";
import { generateSeatsLayout } from "../manager/seatManager.js";
import { createSalonInfoPanel } from "../logic/salonAssignment.js";

export function renderCinemaView(cinemas) {
  const mainContainer =
    document.getElementById("output") || document.createElement("div");
  mainContainer.id = "output";
  mainContainer.innerHTML = "";

  const buttonsContainer = document.createElement("div");
  buttonsContainer.id = "cinema-buttons";
  cinemas.forEach((cinema) => {
    const button = document.createElement("button");
    button.innerText = cinema.name;
    button.onclick = () => renderCinemaDetails(cinema.id, cinemas);
    buttonsContainer.appendChild(button);
  });

  mainContainer.appendChild(buttonsContainer);
  document.body.appendChild(mainContainer);
}

function renderCinemaDetails(cinemaId, cinemas) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema) return;

  const output = document.getElementById("output");
  output.innerHTML = `<h2>${cinema.name}</h2>`;

  cinema.salons.forEach((salon) => {
    const hallContainer = document.createElement("div");
    hallContainer.className = "hall";

    const screen = document.createElement("div");
    screen.className = "hall__screen";
    screen.innerText = "Leinwand";

    const infoPanel = createSalonInfoPanel(salon);
    const seatsLayout = generateSeatsLayout(salon);

    hallContainer.appendChild(screen);
    hallContainer.appendChild(infoPanel);
    hallContainer.appendChild(seatsLayout);
    output.appendChild(hallContainer);
  });
}
