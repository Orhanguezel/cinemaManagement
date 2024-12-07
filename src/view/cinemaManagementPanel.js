import { initializeCinemaData, getCinemaById } from "../manager/cinemaManager.js";
import { calculateCinemaCapacity, assignRandomOccupancy } from "../manager/seatManager.js";

const cinemas = initializeCinemaData();
let selectedCinemaId = null;

// Sayfa başlatma
function initializePage() {
  // Sayfa başlığı
  const title = document.createElement("h1");
  title.innerText = "Sinema Yönetim Paneli";
  document.body.appendChild(title);

  // Navigasyon ve kontrol alanı
  const controlContainer = document.createElement("div");
  controlContainer.id = "controls";
  document.body.appendChild(controlContainer);

  // Sinema seçimi için düğmeler
  renderCinemaButtons();

  // Çıktının gösterileceği alan
  const outputContainer = document.createElement("div");
  outputContainer.id = "output";
  document.body.appendChild(outputContainer);
}

// Sinema düğmelerini oluştur
function renderCinemaButtons() {
  const controls = document.getElementById("controls");
  controls.innerHTML = ""; // Mevcut düğmeleri temizle

  // Geri düğmesi
  const backButton = document.createElement("button");
  backButton.innerText = "Geri";
  backButton.style.marginRight = "10px";
  backButton.onclick = goBack;
  controls.appendChild(backButton);

  // İleri düğmesi
  const nextButton = document.createElement("button");
  nextButton.innerText = "İleri";
  nextButton.style.marginRight = "10px";
  nextButton.onclick = goNext;
  controls.appendChild(nextButton);

  // Doluluk oranı seçimi
  const occupancyInput = document.createElement("input");
  occupancyInput.type = "number";
  occupancyInput.min = "0";
  occupancyInput.max = "100";
  occupancyInput.placeholder = "Doluluk Oranı (%)";
  occupancyInput.style.marginRight = "10px";
  controls.appendChild(occupancyInput);

  // Uygula düğmesi
  const applyButton = document.createElement("button");
  applyButton.innerText = "Doluluk Uygula";
  applyButton.onclick = () => applyOccupancy(occupancyInput.value);
  controls.appendChild(applyButton);
}

// Geri butonu işlevi
function goBack() {
  const currentIndex = cinemas.findIndex((c) => c.id === selectedCinemaId);
  if (currentIndex > 0) {
    selectedCinemaId = cinemas[currentIndex - 1].id;
    renderCinemaDetails(selectedCinemaId);
  }
}

// İleri butonu işlevi
function goNext() {
  const currentIndex = cinemas.findIndex((c) => c.id === selectedCinemaId);
  if (currentIndex < cinemas.length - 1) {
    selectedCinemaId = cinemas[currentIndex + 1].id;
    renderCinemaDetails(selectedCinemaId);
  }
}

// Doluluk oranını uygula
function applyOccupancy(occupancyRate) {
  if (!selectedCinemaId) {
    alert("Lütfen bir sinema seçin!");
    return;
  }

  const cinema = getCinemaById(selectedCinemaId);
  cinema.salons.forEach((salon) => assignRandomOccupancy(salon, occupancyRate));
  renderCinemaDetails(selectedCinemaId);
}

// Sinema detaylarını ekrana yazdır
function renderCinemaDetails(cinemaId) {
  selectedCinemaId = cinemaId;

  const cinema = getCinemaById(cinemaId);
  if (!cinema) {
    console.error("Sinema bulunamadı!");
    return;
  }

  const output = document.getElementById("output");
  output.innerHTML = ""; // Önceki içeriği temizle

  // Sinema başlığı
  const title = document.createElement("h2");
  title.innerText = `Sinema: ${cinema.name}`;
  output.appendChild(title);

  // Salon bilgilerini listele
  cinema.salons.forEach((salon) => {
    const salonTitle = document.createElement("h3");
    salonTitle.innerText = `Salon: ${salon.name}`;
    output.appendChild(salonTitle);

    const capacities = calculateCinemaCapacity(cinema).find((c) => c.salonName === salon.name);

    const capacityInfo = document.createElement("p");
    capacityInfo.innerText = `Toplam Koltuk: ${capacities.totalSeats} | Boş: ${capacities.availableSeats} | Dolu: ${capacities.occupiedSeats}`;
    output.appendChild(capacityInfo);

    // Koltuk tablosu
    const table = document.createElement("table");
    table.style.border = "1px solid #ddd";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";
    table.style.width = "100%";

    const headerRow = document.createElement("tr");
    ["Koltuk ID", "Sıra", "Numara", "Durum"].forEach((header) => {
      const th = document.createElement("th");
      th.innerText = header;
      th.style.padding = "10px";
      th.style.border = "1px solid #ddd";
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    salon.seatsList.forEach((seat) => {
      const row = document.createElement("tr");

      const seatIdCell = document.createElement("td");
      seatIdCell.innerText = seat.id;
      seatIdCell.style.padding = "8px";
      seatIdCell.style.border = "1px solid #ddd";

      const seatRowCell = document.createElement("td");
      seatRowCell.innerText = seat.row;
      seatRowCell.style.padding = "8px";
      seatRowCell.style.border = "1px solid #ddd";

      const seatNumberCell = document.createElement("td");
      seatNumberCell.innerText = seat.number;
      seatNumberCell.style.padding = "8px";
      seatNumberCell.style.border = "1px solid #ddd";

      const seatStatusCell = document.createElement("td");
      seatStatusCell.innerText = seat.status;
      seatStatusCell.style.padding = "8px";
      seatStatusCell.style.border = "1px solid #ddd";

      row.appendChild(seatIdCell);
      row.appendChild(seatRowCell);
      row.appendChild(seatNumberCell);
      row.appendChild(seatStatusCell);
      table.appendChild(row);
    });

    output.appendChild(table);
  });
}

// Başlangıç olarak ilk sinema göster
initializePage();
renderCinemaDetails(cinemas[0].id);
