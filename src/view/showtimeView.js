import {
  assignManualShowtimes,
  assignRandomShowtimes,
  assignOptimalShowtimes,
  validateShowtimes,
} from "../logic/showAssignment.js";
import { cinemas } from "../data/Cinemas.js";
import { loadShowtimesFromLocalStorage } from "../logic/storageManager.js";
import { renderDynamicContent } from "./panelView.js";

export function renderShowtimeAssignmentView() {
  loadShowtimesFromLocalStorage(cinemas);

  const contentHTML = `
    <h2>Gösterim Atama Paneli</h2>
    <p>Salonlar için gösterim saatlerini atamak için aşağıdaki seçenekleri kullanabilirsiniz.</p>
    <div>
      <button id="manual-showtime-button" class="assignment-button">Manuel Atama</button>
      <button id="random-showtime-button" class="assignment-button">Rastgele Atama</button>
      <button id="optimal-showtime-button" class="assignment-button">Optimum Atama</button>
    </div>
    <div id="showtime-assignment-container"></div>
  `;
  renderDynamicContent(contentHTML, "showtime-assignment");

  const container = document.getElementById("showtime-assignment-container");
  cinemas.forEach((cinema) => {
    const cinemaDiv = document.createElement("div");
    cinemaDiv.innerHTML = `<h3>${cinema.name}</h3>`;
    cinema.salons.forEach((salon) => {
      cinemaDiv.innerHTML += `
        <div>
          <p><strong>Salon Adı:</strong> ${salon.name}</p>
          <input 
            type="text" 
            id="showtime-input-${salon.id}" 
            placeholder="Örn: 10:00, 13:00, 16:00"
            value="${salon.showtimes ? salon.showtimes.join(", ") : ""}"
          />
          <button id="save-showtime-${salon.id}" class="save-showtime-button">Kaydet</button>
        </div>
      `;
    });
    container.appendChild(cinemaDiv);
  });

  // Event Listeners
  document.querySelectorAll(".save-showtime-button").forEach((button) => {
    button.onclick = (e) => {
      const salonId = e.target.id.split("-").pop();
      const inputField = document.getElementById(`showtime-input-${salonId}`);
      const showtimes = inputField.value.split(",").map((time) => time.trim());
      const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
      if (showtimes.length > 0 && validateShowtimes(showtimes)) {
        assignManualShowtimes(salon, showtimes);
        alert(`Gösterim saatleri kaydedildi: ${showtimes.join(", ")}`);
      } else {
        alert("Geçerli gösterim saatleri giriniz!");
      }
    };
  });
}
