import {
  assignManualSalonsToCinemas,
  assignOptimalSalonsToCinemas,
  assignRandomSalonsToCinemas,
} from "../logic/salonLogic.js";
import { cinemas } from "../data/Cinemas.js";

// Salonları listeleme fonksiyonu
function renderSalonList() {
  const listContainer = document.getElementById("salon-list");
  if (!listContainer) {
    console.error("Salon listesi için bir konteyner bulunamadı!");
    return;
  }

  listContainer.innerHTML = ""; // Eski listeyi temizle

  cinemas.forEach((cinema) => {
    const cinemaSection = document.createElement("div");
    cinemaSection.className = "cinema-section";
    cinemaSection.innerHTML = `<h3>${cinema.name}</h3>`;

    if (cinema.salons && cinema.salons.length > 0) {
      cinema.salons.forEach((salon) => {
        const salonInfo = document.createElement("div");
        salonInfo.className = "salon-info";
        salonInfo.innerHTML = `
          <p><strong>Salon Adı:</strong> ${salon.name}</p>
          <p><strong>Toplam Koltuk:</strong> ${salon.seats}</p>
          <p><strong>VIP:</strong> ${salon.features.isVIP ? "Evet" : "Hayır"}</p>
          <p><strong>3D:</strong> ${salon.features.is3D ? "Evet" : "Hayır"}</p>
          <p><strong>Ses Sistemi:</strong> ${salon.features.sound}</p>
          <p><strong>Ücret Tarifesi:</strong> ${salon.price} €</p>
        `;
        cinemaSection.appendChild(salonInfo);
      });
    } else {
      cinemaSection.innerHTML += "<p>Bu sinemaya henüz salon atanmamış.</p>";
    }

    listContainer.appendChild(cinemaSection);
  });
}

// Salon Atama Panelini Render Et
export function renderSalonAssignmentView() {
  const mainContainer = document.createElement("div");
  mainContainer.id = "salon-assignment-view";
  mainContainer.innerHTML = `
    <h2>Salon Atama Paneli</h2>
    <p>Salon atamalarını yapmak için aşağıdaki seçeneklerden birini seçebilirsiniz.</p>
    <div id="button-container">
      <button id="manual-button" class="assignment-button">Manuel Atama</button>
      <button id="optimum-button" class="assignment-button">Optimum Atama</button>
      <button id="random-button" class="assignment-button">Rastgele Atama</button>
    </div>
    <div id="salon-list"></div>
  `;

  document.body.innerHTML = ""; // Mevcut içeriği temizle
  document.body.appendChild(mainContainer);

  // Butonlara olay dinleyicileri ekle
  document.getElementById("manual-button").onclick = () => {
    assignManualSalonsToCinemas();
    renderSalonList();
    console.log("Manuel salon ataması tamamlandı!");
  };

  document.getElementById("optimum-button").onclick = () => {
    assignOptimalSalonsToCinemas();
    renderSalonList();
    console.log("Optimum salon ataması tamamlandı!");
  };

  document.getElementById("random-button").onclick = () => {
    assignRandomSalonsToCinemas();
    renderSalonList();
    console.log("Rastgele salon ataması tamamlandı!");
  };

  // İlk yüklemede listeyi temizle
  renderSalonList();
}
