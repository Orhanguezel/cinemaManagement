import {
    assignManualShowtimes,
    assignRandomShowtimes,
    assignOptimalShowtimes,
    validateShowtimes,
  } from "../logic/showAssignment.js";
  import { cinemas } from "../data/Cinemas.js";
  import { loadShowtimesFromLocalStorage } from "../logic/storageManager.js";
  
  export function renderShowtimeAssignmentView() {
    // LocalStorage'dan gösterim saatlerini yükle
    loadShowtimesFromLocalStorage(cinemas);
  
    const container = document.createElement("div");
    container.id = "showtime-assignment-view";
    container.innerHTML = `
      <h2>Gösterim Atama Paneli</h2>
      <p>Salonlar için gösterim saatlerini atamak için aşağıdaki seçenekleri kullanabilirsiniz.</p>
      <div>
        <button id="manual-showtime-button" class="assignment-button">Manuel Atama</button>
        <button id="random-showtime-button" class="assignment-button">Rastgele Atama</button>
        <button id="optimal-showtime-button" class="assignment-button">Optimum Atama</button>
      </div>
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
              value="${salon.showtimes ? salon.showtimes.join(", ") : ""}"
            />
            <button id="save-showtime-${cinema.id}-${salon.id}" class="save-showtime-button">Kaydet</button>
          `;
  
          salonDiv.querySelector(`#save-showtime-${cinema.id}-${salon.id}`).onclick = () => {
            const inputField = document.getElementById(`showtime-${cinema.id}-${salon.id}`);
            const showtimes = inputField.value.split(",").map((time) => time.trim());
  
            if (showtimes.length === 0 || !validateShowtimes(showtimes)) {
              alert("Lütfen geçerli gösterim saatleri giriniz. Örn: 10:00, 13:00, 16:00");
              return;
            }
  
            const success = assignManualShowtimes(cinema.id, salon.id, showtimes);
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
  
    // Butonlara olay dinleyicisi ekle
    document.getElementById("manual-showtime-button").onclick = () => {
      renderShowtimeAssignmentView();
      console.log("Manuel gösterim saati atama ekranı.");
    };
  
    document.getElementById("random-showtime-button").onclick = () => {
      assignRandomShowtimes();
      renderShowtimeAssignmentView();
      console.log("Rastgele gösterim saatleri atandı.");
    };
  
    document.getElementById("optimal-showtime-button").onclick = () => {
      assignOptimalShowtimes();
      renderShowtimeAssignmentView();
      console.log("Optimum gösterim saatleri atandı.");
    };
  }
  