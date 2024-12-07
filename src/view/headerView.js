export function renderHeader(cinemas) {
  const header = document.createElement("header");
  header.style.textAlign = "center";
  header.style.padding = "10px";
  header.style.backgroundColor = "#007bff";
  header.style.color = "white";

  header.innerHTML = `
    <button id="admin-view" class="header-button admin-button">Yönetici Görünümü</button>
    <button id="user-view" class="header-button user-button">Kullanıcı Görünümü</button>
  `;

  document.body.appendChild(header);
}

