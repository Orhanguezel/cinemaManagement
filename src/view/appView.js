import { renderHeader } from "./headerView.js";
import { renderAdminPanel, renderUserPanel } from "./panelView.js";

export function initializeApp(cinemas) {
  // Header'ı render et
  renderHeader(cinemas);

  // Header yüklendikten sonra butonları seç
  const adminButton = document.getElementById("admin-view");
  const userButton = document.getElementById("user-view");

  if (adminButton) {
    adminButton.onclick = () => {
      document.body.innerHTML = ""; // Sayfayı temizle
      renderHeader(cinemas);
      renderAdminPanel(cinemas);
    };
  } else {
    console.error("'admin-view' butonu bulunamadı. Header düzgün render edilmemiş olabilir.");
  }

  if (userButton) {
    userButton.onclick = () => {
      document.body.innerHTML = ""; // Sayfayı temizle
      renderHeader(cinemas);
      renderUserPanel(cinemas);
    };
  } else {
    console.error("'user-view' butonu bulunamadı. Header düzgün render edilmemiş olabilir.");
  }
}
