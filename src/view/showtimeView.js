import { cinemas } from "../data/Cinemas.js";
import { assignShowtimesToSalon, validateShowtimes } from "../logic/showAssignment.js";

export function renderShowtimeAssignmentView() {
  const container = document.createElement("div");
  container.id = "showtime-assignment-view";
  container.innerHTML = `
    <h2>Gösterim Atama Paneli</h2>
    <p>Salonlar için gösterim saatlerini atamak için aşağıdaki seçenekleri kullanabilirsiniz.</p>
  `;

  cinemas.forEach((cinema) => {
    const cinemaSection = document.createElement("div");
    cinemaSection.className = "cinema-section";

    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;

    const salonContainer = document.createElement("div");
    salonContainer.className = "salon-container";

    if (cinema.salons && cinema.salons.length > 0) {
      cinema.salons.forEach((salon) => {
        const salonDiv = document.createElement("div");
        salonDiv.className = "salon-div";
        salonDiv.innerHTML = `
          <p><strong>Salon Adı:</strong> ${salon.name}</p>
          <label for="showtime-${cinema.id}-${salon.id}">Gösterim Saatleri:</label>
          <input 
            type="text" 
            id="showtime-${cinema.id}-${salon.id}" 
            placeholder="Örn: 10:00, 13:00, 16:00"
          />
          <button id="assign-showtime-${cinema.id}-${salon.id}" class="assign-showtime-button">Kaydet</button>
        `;

        salonDiv.querySelector(`#assign-showtime-${cinema.id}-${salon.id}`).onclick = () => {
          const inputField = document.getElementById(`showtime-${cinema.id}-${salon.id}`);
          const showtimes = inputField.value.split(",").map((time) => time.trim());

          if (showtimes.length === 0 || !validateShowtimes(showtimes)) {
            alert("Lütfen geçerli gösterim saatleri giriniz. Örn: 10:00, 13:00, 16:00");
            return;
          }

          const success = assignShowtimesToSalon(cinema.id, salon.id, showtimes);
          if (success) {
            alert(`Gösterim saatleri kaydedildi: ${showtimes.join(", ")}`);
          }
        };

        salonContainer.appendChild(salonDiv);
      });
    } else {
      salonContainer.innerHTML = `<p>Bu sinemada salon bulunmamaktadır.</p>`;
    }

    cinemaSection.appendChild(cinemaTitle);
    cinemaSection.appendChild(salonContainer);
    container.appendChild(cinemaSection);
  });

  document.body.innerHTML = ""; // Sayfayı temizle
  document.body.appendChild(container);
}
