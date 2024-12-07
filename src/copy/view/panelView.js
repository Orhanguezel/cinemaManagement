
export function renderUserPanel(cinemas) {
  const title = document.createElement("h1");
  title.innerText = "Sinema Kullanıcı Paneli";
  document.body.appendChild(title);

  // Film kartlarını göstermek için render function
  renderFilmCards(cinemas);
}


export function renderAdminPanel(cinemas) {
  // Panel kapsayıcısı
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
  
  // Koltuk Doluluk Ayarları Düğmesi
  const seatButton = document.createElement("button");
  seatButton.innerText = "Koltuk Doluluk Ayarları";
  seatButton.onclick = () => {
    document.getElementById("default-section").innerHTML = ""; // Varsayılan bölümü temizle
    renderSeatOccupancySettings(cinemas); // Koltuk doluluk ayarlarını render et
  };
  
  // Film Atama İşlemleri Düğmesi
  const filmButton = document.createElement("button");
  filmButton.innerText = "Film Atama İşlemleri";
  filmButton.onclick = () => {
    document.getElementById("default-section").innerHTML = ""; // Varsayılan bölümü temizle
    renderFilmAssignmentPanel(cinemas); // Film atama panelini render et
  };
  
  // Raporlar ve Analizler Düğmesi
  const reportButton = document.createElement("button");
  reportButton.innerText = "Raporlar ve Analizler";
  reportButton.onclick = () => {
    document.getElementById("default-section").innerHTML = ""; // Varsayılan bölümü temizle
    renderReportsAndAnalytics(cinemas); // Raporlar ve analizleri render et
  };
  
  menuContainer.appendChild(seatButton);
  menuContainer.appendChild(filmButton);
  menuContainer.appendChild(reportButton);
  container.appendChild(menuContainer);
  
  // Varsayılan içerik bölümü
  const defaultSection = document.createElement("div");
  defaultSection.id = "default-section";
  defaultSection.innerText = "Lütfen bir işlem seçiniz.";
  defaultSection.style.marginTop = "20px";
  container.appendChild(defaultSection);
  
  document.body.appendChild(container);
}
