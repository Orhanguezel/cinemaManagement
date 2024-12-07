import { renderUserPanel, renderAdminPanel } from "./panelView.js";

export function renderHeader(cinemas) {
  const header = document.createElement("header");
  header.style.textAlign = "center";
  header.style.padding = "10px";
  header.style.backgroundColor = "#007bff";
  header.style.color = "white";

  const adminButton = document.createElement("button");
  adminButton.innerText = "Yönetici Görünümü";
  adminButton.className = "header-button admin-button";
  adminButton.onclick = () => {
    document.body.innerHTML = ""; // Sayfanın içeriğini temizle
    renderHeader(cinemas); // Header'ı tekrar ekle
    renderAdminPanel(cinemas); // Yönetici panelini göster
  };

  const userButton = document.createElement("button");
  userButton.innerText = "Kullanıcı Görünümü";
  userButton.className = "header-button user-button";
  userButton.onclick = () => {
    document.body.innerHTML = ""; // Sayfanın içeriğini temizle
    renderHeader(cinemas); // Header'ı tekrar ekle
    renderUserPanel(cinemas); // Kullanıcı panelini göster
  };

  header.appendChild(adminButton);
  header.appendChild(userButton);
  document.body.appendChild(header);
}
