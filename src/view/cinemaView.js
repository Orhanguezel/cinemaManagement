import { initializeCinemaData } from "../manager/cinemaManager.js";

import { getCinemaById } from "../manager/cinemaManager.js";
import { 
  generateSeatsLayout,
  assignSeatsRandomly,
} from "../manager/seatManager.js";
import { createSalonInfoPanel } from "../logic/salonAssignment.js";
import { 
  renderFilmCards, 
  assignFilmsByCategory, 
  assignOptimalFilmsToSalons, 
  assignRandomFilmsToSalons,
  manuallyAssignFilmToSalon
} from "../logic/filmAssignment.js";

import { saveSalonDataToLocalStorage } from "../manager/localStorageManager.js";

// Sinema verilerini başlat (verileri bir kez oluştur)
const cinemas = initializeCinemaData();


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


export function renderUserPanel(cinemas) {
  const title = document.createElement("h1");
  title.innerText = "Sinema Kullanıcı Paneli";
  document.body.appendChild(title);

  // Film kartlarını göstermek için render function
  renderFilmCards(cinemas);
}

export function renderAdminPanel(cinemas) {
  const container = document.getElementById("admin-panel") || document.createElement("div");
  container.id = "admin-panel";
  container.innerHTML = ""; // Eski içeriği temizle

  // Başlık
  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetici Paneli";
  container.appendChild(title);

  // Menü düğmeleri
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-buttons";

  const seatButton = document.createElement("button");
  seatButton.innerText = "Koltuk Doluluk Ayarları";
  seatButton.onclick = () => renderSeatOccupancySettings(cinemas);

  const filmButton = document.createElement("button");
  filmButton.innerText = "Film Atama İşlemleri";
  filmButton.onclick = () => renderFilmAssignmentPanel(cinemas);

  const reportButton = document.createElement("button");
  reportButton.innerText = "Raporlar ve Analizler";
  reportButton.onclick = () => renderReportsAndAnalytics(cinemas);

  menuContainer.appendChild(seatButton);
  menuContainer.appendChild(filmButton);
  menuContainer.appendChild(reportButton);

  container.appendChild(menuContainer);

  // Başlangıç bölümü
  const defaultSection = document.createElement("div");
  defaultSection.id = "default-section";
  defaultSection.innerText = "Lütfen bir işlem seçiniz.";
  defaultSection.style.marginTop = "20px";

  container.appendChild(defaultSection);

  document.body.appendChild(container);
}



// Koltuk Doluluk Ayarları Panelini Render Etme
function renderSeatOccupancySettings(cinemas) {
  const container = document.getElementById("settings-container") || document.createElement("div");
  container.id = "settings-container";
  container.innerHTML = ""; // Eski içeriği temizle

  // Rastgele uygula düğmesi
  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Uygula";
  randomButton.style.marginBottom = "20px";
  randomButton.style.padding = "10px 20px";
  randomButton.style.backgroundColor = "#007bff";
  randomButton.style.color = "white";
  randomButton.style.border = "none";
  randomButton.style.borderRadius = "5px";
  randomButton.style.cursor = "pointer";
  randomButton.onclick = () => {
    applyRandomOccupancyToAll(cinemas); // Tüm salonlara rastgele doluluk oranı uygula
    renderSeatOccupancySettings(cinemas); // Sayfayı yeniden render et
  };

  container.appendChild(randomButton);

  cinemas.forEach((cinema) => {
    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;
    container.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const salonContainer = document.createElement("div");
      salonContainer.className = "salon-container";

      const salonTitle = document.createElement("h4");
      salonTitle.innerText = `${salon.name} (Toplam Koltuk: ${salon.seatsList.length})`;

      const occupancyLabel = document.createElement("label");
      occupancyLabel.innerText = "Doluluk Oranı: ";

      const occupancyInput = document.createElement("input");
      occupancyInput.type = "number";
      occupancyInput.value = salon.occupancyRate || 0; // Mevcut doluluk oranını inputa yaz
      occupancyInput.min = 0;
      occupancyInput.max = 100;

      const applyButton = document.createElement("button");
      applyButton.innerText = "Uygula";
      applyButton.style.marginLeft = "10px";
      applyButton.style.padding = "5px 10px";
      applyButton.style.backgroundColor = "#28a745";
      applyButton.style.color = "white";
      applyButton.style.border = "none";
      applyButton.style.borderRadius = "5px";
      applyButton.addEventListener("click", () => {
        const newRate = parseInt(occupancyInput.value, 10);
        assignSeatsRandomly(salon, newRate); // Yeni doluluk oranını uygula
        salon.occupancyRate = newRate; // Salon objesindeki oranı güncelle
        saveSalonDataToLocalStorage(salon); // Local storage'a kaydet
        renderSeatOccupancySettings(cinemas); // Sayfayı yeniden render et
      });

      salonContainer.appendChild(salonTitle);
      salonContainer.appendChild(occupancyLabel);
      salonContainer.appendChild(occupancyInput);
      salonContainer.appendChild(applyButton);
      container.appendChild(salonContainer);
    });
  });

  document.body.appendChild(container);
}



export function renderHeader() {
  const header = document.createElement("header");
  header.style.textAlign = "center";
  header.style.padding = "10px";
  header.style.backgroundColor = "#007bff";
  header.style.color = "white";

  const adminButton = document.createElement("button");
  adminButton.innerText = "Yönetici Görünümü";
  adminButton.style.margin = "5px";
  adminButton.onclick = () => {
    document.body.innerHTML = "";
    renderAdminPanel(cinemas);
  };

  const userButton = document.createElement("button");
  userButton.innerText = "Kullanıcı Görünümü";
  userButton.style.margin = "5px";
  userButton.onclick = () => {
    document.body.innerHTML = "";
    renderUserPanel(cinemas);
  };

  header.appendChild(adminButton);
  header.appendChild(userButton);
  document.body.appendChild(header);
}







// Rastgele uygulama butonu
function renderRandomButton(cinemas) {
  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Uygula";
  randomButton.addEventListener("click", () => applyRandomOccupancyToAll(cinemas));

  const header = document.getElementById("header-container") || document.createElement("div");
  header.id = "header-container";
  header.innerHTML = ""; // Eski içeriği temizle
  header.appendChild(randomButton);
  document.body.prepend(header);
}



function initializePage(cinemas) {
  renderRandomButton(cinemas); // Rastgele butonu render et
  renderSeatOccupancySettings(cinemas); // Koltuk doluluk ayarlarını render et
}

initializePage(cinemas);


// Manuel Koltuk Doluluk Ayarları
function showManualOccupancySettings(cinemas) {
  const settingsContainer = document.getElementById("seat-occupancy-settings");
  if (!settingsContainer) {
    console.error("Koltuk Doluluk Ayarları alanı bulunamadı!");
    return;
  }

  const manualContainer = document.createElement("div");
  manualContainer.id = "manual-settings";
  manualContainer.innerHTML = ""; // Önceki içeriği temizle

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    cinemaContainer.className = "cinema-container";

    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;
    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const salonContainer = document.createElement("div");
      salonContainer.className = "salon-container";

      const salonTitle = document.createElement("p");
      salonTitle.innerText = `${salon.name} için doluluk oranı: `;

      const inputField = document.createElement("input");
      inputField.type = "number";
      inputField.min = "0";
      inputField.max = "100";
      inputField.value = salon.occupancyRate || 30; // Varsayılan değer

      const applyButton = document.createElement("button");
      applyButton.innerText = "Uygula";
      applyButton.onclick = () => {
        const occupancyRate = parseInt(inputField.value, 10);
        if (isNaN(occupancyRate) || occupancyRate < 0 || occupancyRate > 100) {
          alert("Lütfen 0-100 arasında bir değer girin!");
          return;
        }
        salon.occupancyRate = occupancyRate; // Salon için doluluk oranını güncelle
        assignSeatsRandomly(salon, occupancyRate); // Koltukları yeniden ata
        alert(`${salon.name} için doluluk oranı başarıyla güncellendi!`);
      };

      salonContainer.appendChild(salonTitle);
      salonContainer.appendChild(inputField);
      salonContainer.appendChild(applyButton);
      cinemaContainer.appendChild(salonContainer);
    });

    manualContainer.appendChild(cinemaContainer);
  });

  settingsContainer.appendChild(manualContainer);
}


function applyRandomOccupancyToAll(cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomRate = Math.floor(Math.random() * 101); // 0-100 arası rastgele doluluk
      assignSeatsRandomly(salon, randomRate); // Doluluk oranını uygula
      salon.occupancyRate = randomRate; // Salona yeni doluluk oranını ata
      saveSalonDataToLocalStorage(salon); // Local storage'a kaydet
    });
  });

  renderSeatOccupancySettings(cinemas); // Ekranı güncelle
  alert("Tüm salonlar için rastgele doluluk oranları atandı!");
}







function updateManualOccupancyRate(salon, newRate) {
  salon.occupancyRate = newRate; // Yeni oranı kaydet
  assignSeatsRandomly(salon, newRate); // Koltuklara uygula
  saveSalonDataToLocalStorage(salon); // LocalStorage'a kaydet
  renderManualOccupancySettings(cinemas); // Görünümü güncelle
}


function renderManualOccupancyInputs(cinema) {
  const container = document.createElement("div");
  container.className = "cinema-container";

  const cinemaTitle = document.createElement("h3");
  cinemaTitle.innerText = cinema.name;
  container.appendChild(cinemaTitle);

  cinema.salons.forEach((salon) => {
      const salonContainer = document.createElement("div");
      salonContainer.className = "salon-container";

      const salonTitle = document.createElement("p");
      salonTitle.innerText = `${salon.name} (Toplam Koltuk: ${salon.seats})`;
      salonContainer.appendChild(salonTitle);

      const input = document.createElement("input");
      input.type = "number";
      input.value = calculateSalonCapacity(salon).occupiedSeatsPercentage || 0;
      input.min = 0;
      input.max = 100;

      input.addEventListener("change", (event) => {
          const newOccupancyRate = parseInt(event.target.value, 10);
          if (newOccupancyRate >= 0 && newOccupancyRate <= 100) {
              assignSeatsRandomly(salon, newOccupancyRate);
              saveSalonDataToLocalStorage(salon);
              console.log(`Salon: ${salon.name} için doluluk oranı güncellendi: %${newOccupancyRate}`);
          } else {
              alert("Doluluk oranı 0 ile 100 arasında olmalıdır!");
              event.target.value = calculateSalonCapacity(salon).occupiedSeatsPercentage || 0;
          }
      });

      salonContainer.appendChild(input);
      container.appendChild(salonContainer);
  });

  return container;
}









//  Koltuk Doluluk Ayarları
export function renderAssignmentOperations(cinemas) {
  const assignmentContainer = document.createElement("div");
  assignmentContainer.id = "assignment-container";

  // Koltuk Doluluk Atama
  const seatAssignmentButton = document.createElement("button");
  seatAssignmentButton.innerText = "Koltuk Doluluk Ayarı";
  seatAssignmentButton.onclick = () => assignRandomOccupancy(cinemas);

  // Film Atama
  const filmAssignmentButton = document.createElement("button");
  filmAssignmentButton.innerText = "Film Atama";
  filmAssignmentButton.onclick = assignOptimalFilmsToSalons;

  assignmentContainer.appendChild(seatAssignmentButton);
  assignmentContainer.appendChild(filmAssignmentButton);
  document.body.appendChild(assignmentContainer);
}


export function renderCinemaDetails(cinema) {
  const output = document.getElementById("output") || document.createElement("div");
  output.id = "output";
  output.innerHTML = "";

  cinema.salons.forEach((salon) => {
    const infoPanel = createSalonInfoPanel(salon);
    output.appendChild(infoPanel);
  });

  document.body.appendChild(output);
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

export function renderSeatsHTML(salon) {
  const seatsContainer = document.createElement("div");
  seatsContainer.className = "seats";

  const rows = {}; // Satırları gruplamak için obje
  salon.seatsList.forEach((seat) => {
    if (!rows[seat.row]) {
      rows[seat.row] = document.createElement("div");
      rows[seat.row].className = "seat-row";
    }

    const seatElement = document.createElement("div");
    seatElement.className = `seat ${seat.status}`;
    seatElement.innerText = `${String.fromCharCode(64 + seat.row)}${seat.number}`;
    seatElement.dataset.seatId = seat.id;
    seatElement.dataset.salonId = salon.id;

    seatElement.addEventListener("click", () => {
      handleSeatSelection(salon.id, seat.id);
    });

    rows[seat.row].appendChild(seatElement);
  });

  Object.values(rows).forEach((rowElement) => {
    seatsContainer.appendChild(rowElement);
  });

  return seatsContainer;
}

export function renderSalonDetails(salon) {
  const container = document.createElement("div");
  container.className = "hall";

  // Ekranda sinema perdesi
  const screen = document.createElement("div");
  screen.className = "hall__screen";
  screen.innerText = "Leinwand";
  container.appendChild(screen);

  // Koltuk düzeni
  const seatsHTML = renderSeatsHTML(salon);
  container.appendChild(seatsHTML);

  return container;
}

