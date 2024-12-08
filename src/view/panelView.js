import { renderSalonAssignmentView } from "./salonView.js";
import { renderFilmAssignmentView } from "./filmView.js";
import { renderShowtimeAssignmentView } from "./showtimeView.js";
import { renderSeatOccupancySettings } from "./seatsView.js";
import { renderAnalysisView } from "./analysisView.js";

export function renderNavbar() {
  const navbar = document.createElement("nav");
  navbar.id = "navbar";
  navbar.innerHTML = `
    <button id="salon-assignment">Salon Atama</button>
    <button id="film-assignment" disabled>Film Atama</button>
    <button id="showtime-assignment" disabled>Gösterim Atama</button>
    <button id="seat-settings" disabled>Koltuk Doluluk</button>
    <button id="analysis-reports" disabled>Analiz</button>
  `;
  document.body.appendChild(navbar);

  document.getElementById("salon-assignment").onclick = renderSalonAssignmentView;
  document.getElementById("film-assignment").onclick = renderFilmAssignmentView;
  document.getElementById("showtime-assignment").onclick = renderShowtimeAssignmentView;
  document.getElementById("seat-settings").onclick = renderSeatOccupancySettings;
  document.getElementById("analysis-reports").onclick = renderAnalysisView;
}








// Yönetici Panelini Render Etme
export function renderAdminPanel(cinemas, salons) {
  const container = document.getElementById("main-container") || document.createElement("div");
  container.id = "main-container";
  container.innerHTML = `<h2>Yönetici Paneli</h2>`;
  document.body.appendChild(container);
}

export function renderHeader(cinemas) {
  const header = document.createElement("header");
  header.style.textAlign = "center";
  header.style.padding = "10px";
  header.style.backgroundColor = "#007bff";
  header.style.color = "white";

  header.innerHTML = `
    <button id="admin-view" class="header-button admin-button">Yönetici Görünümü</button>
  `;

  document.body.appendChild(header);
}


// Adım butonlarını aktif hale getiren yardımcı fonksiyon
export function enableStep(stepId) {
  const button = document.getElementById(stepId);
  if (button) button.disabled = false;
}





export function renderDynamicContent(contentHTML, activeSectionId) {
  let container = document.getElementById("main-container");
  if (!container) {
    console.error("Ana konteyner bulunamadı! Yeni bir ana konteyner oluşturuluyor.");
    container = document.createElement("div");
    container.id = "main-container";
    document.body.appendChild(container);
  }

  // Eski içeriği temizle ve yeni içeriği ekle
  container.innerHTML = contentHTML;

  // Navbar'daki aktif durumu güncelle
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.querySelectorAll("button").forEach((button) => {
      button.classList.remove("active");
    });
    const activeButton = document.getElementById(activeSectionId);
    if (activeButton) activeButton.classList.add("active");
  }
}





// Kullanıcı Panelini Render Etme
export function renderUserPanel(cinemas) {
  const container = document.getElementById("main-container") || document.createElement("div");
  container.id = "main-container";
  container.innerHTML = `<h1>Sinema Kullanıcı Paneli</h1>`;
  document.body.appendChild(container);
}

// Ortak Buton Oluşturma Fonksiyonu
function createButton(parent, id, text, onClick) {
  const button = document.createElement("button");
  button.id = id;
  button.innerText = text;
  button.addEventListener("click", onClick);
  parent.appendChild(button);
}
