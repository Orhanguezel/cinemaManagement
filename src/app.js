import { renderNavbar } from "./navbar.js";
import { renderCinemaView } from "./cinemaView.js";
import { renderSalonView } from "./salonView.js";

// Uygulama başlatma
document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");

  appContainer.innerHTML = `
    <header>
      <h1>Kino-Ticket Yönetim Paneli</h1>
    </header>
    <main id="main-content">
      <div id="start-screen">
        <p>Yönetim paneline hoş geldiniz. Başlamak için aşağıdaki butona tıklayın.</p>
        <button id="start-button">Başla</button>
      </div>
    </main>
  `;

  document.getElementById("start-button").onclick = () => {
    renderNavbar(); // Navbar'ı yükle
    renderCinemaView(); // İlk görünümü yükle
  };
});


