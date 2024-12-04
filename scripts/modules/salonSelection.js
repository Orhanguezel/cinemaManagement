import { getCinemaShows } from "../data/data.js";
import { showModal, closeModal } from "./modalHandler.js";
import { showDateSelection } from "./dateSelection.js";


// Salon Seçimi Ekranını Gösterir
export function showSalonSelection() {
  // LocalStorage'dan sinema ve film ID'lerini al
  const cinemaId = localStorage.getItem("selectedCinemaId");
  const filmId = localStorage.getItem("selectedFilmId");

  console.log(`Salon seçimi için alınan veriler - Sinema ID: ${cinemaId}, Film ID: ${filmId}`);

  // Sinema veya film ID kontrolü
  if (!cinemaId || !filmId) {
    console.error("Sinema veya Film bilgisi eksik!");
    alert("Sinema veya Film bilgisi eksik!");
    return;
  }

  // Gösterimleri al
  const cinemaShows = getCinemaShows(Number(cinemaId)).filter(
    (show) => show.film.id === Number(filmId)
  );
  console.log("Alınan salon bilgileri:", cinemaShows);

  // Eğer salon bilgisi yoksa hata mesajı göster
  if (!cinemaShows || cinemaShows.length === 0) {
    console.error("Bu film için mevcut salon bulunmamaktadır.");
    showModal("<p>Bu film için mevcut salon bulunmamaktadır.</p>");
    return;
  }

  // Salon seçim ekranı içeriği
  const content = `
    <h3>Salon Seçimi</h3>
    <div class="salon-list" style="display: flex; flex-wrap: wrap; gap: 20px;">
      ${cinemaShows
        .map(
          (show) => `
            <label class="salon-label" style="text-align: center; max-width: 150px; cursor: pointer;">
              <input type="radio" name="salon" value="${show.salon.id}" style="display: none;">
              <div class="salon-option" style="border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
                <img src="${show.salon.image}" alt="${show.salon.name}" class="salon-image" style="width: 100%; border-radius: 5px;">
                <div>${show.salon.name} - Saat: ${show.time}</div>
                <p>Kapasite: ${show.salon.seats}, Fiyat: ${show.salon.price}€</p>
              </div>
            </label>`
        )
        .join("")}
    </div>
    <button id="confirmSalon" class="btn-primary" style="margin-top: 20px;">Devam Et</button>
  `;

  console.log("Salon seçim ekranı oluşturuldu.");

  // Modal içeriğini göster
  showModal(content, { title: "Salon Seçimi" });

  // Radio butonlar için olay dinleyici ekle
  document.querySelectorAll("input[name='salon']").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const selectedLabel = e.target.closest("label");
      document
        .querySelectorAll(".salon-option")
        .forEach((option) => option.classList.remove("selected"));
      selectedLabel.querySelector(".salon-option").classList.add("selected");
    });
  });

  // Salon seçim işlemini onayla
  const confirmSalonButton = document.getElementById("confirmSalon");
  confirmSalonButton.addEventListener("click", () => {
    const selectedSalon = document.querySelector("input[name='salon']:checked");
    if (selectedSalon) {
      console.log(`Seçilen Salon ID: ${selectedSalon.value}`);
      localStorage.setItem("selectedSalonId", selectedSalon.value); // Seçilen salon ID'sini kaydet
      closeModal(); // Modalı kapat
      showDateSelection(); // Tarih seçimine yönlendir
    } else {
      console.warn("Hiçbir salon seçilmedi!");
      alert("Lütfen bir salon seçin.");
    }
  });
}
