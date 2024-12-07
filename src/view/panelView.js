import { renderSeatOccupancySettings } from "./seatsView.js";
import { renderSalonAssignmentView } from "./salonView.js";
import { renderFilmAssignmentView } from "./filmView.js";
import { renderShowtimeAssignmentView } from "./showtimeView.js";
import { renderAnalysisView } from "./analysisView.js";



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


// Header'ı Render Etme
export function renderNavbar(cinemas, salons) {
  const navbar = document.getElementById("navbar") || document.createElement("nav");
  navbar.id = "navbar";
  navbar.innerHTML = `
    <button id="seat-settings">Koltuk Atama</button>
    <button id="film-assignment">Film Atama</button>
    <button id="salon-assignment">Salon Atama</button>
    <button id="showtime-assignment">Gösteri Atama</button>
    <button id="analysis-reports">Analiz</button>
  `;
  document.body.insertBefore(navbar, document.body.firstChild);

  // Navbar Buton Olayları
  document.getElementById("seat-settings").onclick = () => {
    renderDynamicContent("", "seat-settings"); // Ana konteyneri temizle
    renderSeatOccupancySettings(cinemas);
  };

  document.getElementById("film-assignment").onclick = () => {
    renderDynamicContent("", "film-assignment"); // Ana konteyneri temizle
    renderFilmAssignmentView(cinemas);
  };

  document.getElementById("salon-assignment").onclick = () => {
    renderDynamicContent("", "salon-assignment"); // Ana konteyneri temizle
    renderSalonAssignmentView(cinemas, salons);
  };

  document.getElementById("showtime-assignment").onclick = () => {
    renderDynamicContent("", "showtime-assignment"); // Ana konteyneri temizle
    renderShowtimeAssignmentView(cinemas, salons);
  };

  document.getElementById("analysis-reports").onclick = () => {
    renderDynamicContent("", "analysis-reports"); // Ana konteyneri temizle
    renderAnalysisView(cinemas);
  };
}


export function renderDynamicContent(contentHTML, activeSectionId) {
  // Ana konteyner kontrolü
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
      button.classList.remove("active"); // Eski aktif durumu kaldır
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
