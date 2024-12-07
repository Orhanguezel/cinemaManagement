import { initializeCinemaData } from "./manager/cinemaManager.js";
import { renderNavbar, renderHeader } from "./view/panelView.js";
import { cinemas } from "./data/Cinemas.js";
import { salons } from "./data/Salons.js";

// Sinema verilerini başlat
const cinemaData = initializeCinemaData(cinemas, salons);

// Yönetim paneli ve Navbar'ı oluştur
if (cinemaData && cinemaData.length > 0) {
  renderHeader(cinemaData);
  renderNavbar(cinemaData, salons);
  console.log("Yönetim paneli başarıyla oluşturuldu!");
} else {
  console.error("Hata: Sinema verileri başlatılamadı!");
}
