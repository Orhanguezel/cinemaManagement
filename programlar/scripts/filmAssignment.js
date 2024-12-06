import { films } from "./data/Films.js";

export function assignFilmsToSalons(cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      // Rastgele bir film seç
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      salon.filmId = randomFilm.id; // Film atama
    });
  });
  console.log("Filmler salonlara başarıyla atandı!");
}


export function createSalonInfoPanel(salon) {
  const film = films.find((f) => f.id === salon.filmId);
  const { totalSeats, availableSeats, occupiedSeats } = calculateSalonCapacity(salon);

  const infoPanel = document.createElement("div");
  infoPanel.className = "info-box";

  infoPanel.innerHTML = `
    <h4>${salon.name}</h4>
    <p><strong>Toplam Koltuk:</strong> ${totalSeats}</p>
    <p><strong>Boş Koltuk:</strong> ${availableSeats}</p>
    <p><strong>Dolu Koltuk:</strong> ${occupiedSeats}</p>
    <p><strong>Özellikler:</strong> ${salon.features.is3D ? "3D" : "2D"}, ${
    salon.features.isVIP ? "VIP" : "Standart"
  }, ${salon.features.sound}</p>
    <p><strong>Ücret Tarifesi:</strong> ${salon.price} €</p>
    <p><strong>Film:</strong> ${film ? film.name : "Henüz atanmadı"}</p>
    <p><strong>Süre:</strong> ${film ? film.duration + " dakika" : "Henüz atanmadı"}</p>
  `;

  return infoPanel;
}

export function manuallyAssignFilmToSalon(filmId, salonId) {
  const film = films.find((f) => f.id === filmId);
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);

  if (!film || !salon) {
    console.error("Film veya salon bulunamadı!");
    return;
  }

  salon.assignedFilm = film;
  console.log(`Film '${film.name}' başarıyla '${salon.name}' salonuna atandı!`);
}

// Örnek Kullanım:
manuallyAssignFilmToSalon(1, "1-1"); // ID'si 1 olan filmi, ID'si 1-1 olan salona ata.


export function assignFilmsByCategory() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      let categoryId;
      if (salon.features.isVIP) {
        categoryId = 1; // Örneğin, VIP salonlar için Drama
      } else if (salon.seats > 150) {
        categoryId = 5; // Büyük salonlar için Action
      } else {
        categoryId = 6; // Küçük salonlar için Animation
      }

      const suitableFilms = films.filter((film) => film.categories.includes(categoryId));
      const randomFilm = suitableFilms[Math.floor(Math.random() * suitableFilms.length)];

      if (randomFilm) {
        salon.assignedFilm = randomFilm;
        console.log(`Film '${randomFilm.name}' salon '${salon.name}' için atandı.`);
      } else {
        console.warn(`Salon '${salon.name}' için uygun film bulunamadı!`);
      }
    });
  });
}

// Örnek Kullanım:
assignFilmsByCategory();


export function assignRandomFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      salon.assignedFilm = randomFilm;
      console.log(`Film '${randomFilm.name}' salon '${salon.name}' için rastgele atandı.`);
    });
  });
}

// Örnek Kullanım:
assignRandomFilmsToSalons();


export function assignOptimalFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      let categoryId;

      // Kural: Büyük salonlara aksiyon veya bilim kurgu filmleri
      if (salon.seats > 150) {
        categoryId = 5; // Action
      } else if (salon.features.is3D) {
        categoryId = 2; // Science Fiction
      } else if (salon.features.isVIP) {
        categoryId = 1; // Drama
      } else {
        categoryId = 6; // Animation
      }

      const suitableFilms = films.filter((film) => film.categories.includes(categoryId));
      suitableFilms.sort((a, b) => b.duration - a.duration); // Daha uzun filmleri öne al

      if (suitableFilms.length > 0) {
        salon.assignedFilm = suitableFilms[0];
        console.log(
          `Film '${suitableFilms[0].name}' salon '${salon.name}' için optimal olarak atandı.`
        );
      } else {
        console.warn(`Salon '${salon.name}' için uygun film bulunamadı!`);
      }
    });
  });
}

// Örnek Kullanım:
assignOptimalFilmsToSalons();

// Yönetim Paneline Atama Seçeneklerini Ekle

function renderFilmAssignmentOptions() {
  const output = document.getElementById("output");
  const assignMethodsContainer = document.createElement("div");
  assignMethodsContainer.id = "assign-methods";

  const manualButton = document.createElement("button");
  manualButton.innerText = "Manuel Atama";
  manualButton.onclick = () => manuallyAssignFilmToSalon(1, "1-1");

  const categoryButton = document.createElement("button");
  categoryButton.innerText = "Kategorilere Göre Atama";
  categoryButton.onclick = assignFilmsByCategory;

  const randomButton = document.createElement("button");
  randomButton.innerText = "Rastgele Atama";
  randomButton.onclick = assignRandomFilmsToSalons;

  const optimalButton = document.createElement("button");
  optimalButton.innerText = "Optimal Atama";
  optimalButton.onclick = assignOptimalFilmsToSalons;

  assignMethodsContainer.appendChild(manualButton);
  assignMethodsContainer.appendChild(categoryButton);
  assignMethodsContainer.appendChild(randomButton);
  assignMethodsContainer.appendChild(optimalButton);

  output.appendChild(assignMethodsContainer);
}

// Yönetim Paneline Atama Seçeneklerini Ekle
renderFilmAssignmentOptions();
