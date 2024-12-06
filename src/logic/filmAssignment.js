import { films } from "../data/Film.js";
import { cinemas } from "../data/Cinemas.js";
import { categories } from "../data/Category.js";

export function assignFilmsToSalons(film, cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      salon.assignedFilm = film;
      console.log(`Film '${film.name}' salon '${salon.name}' için atandı.`);
    });
  });
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

export function assignFilmsByCategory() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const categoryId = salon.features.isVIP ? 1 : salon.seats > 150 ? 5 : 6;
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

export function assignRandomFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomFilm = films[Math.floor(Math.random() * films.length)];
      salon.assignedFilm = randomFilm;
      console.log(`Film '${randomFilm.name}' salon '${salon.name}' için rastgele atandı.`);
    });
  });
}

export function assignOptimalFilmsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const categoryId = salon.seats > 150 ? 5 : salon.features.is3D ? 2 : 1;
      const suitableFilms = films.filter((film) => film.categories.includes(categoryId));
      suitableFilms.sort((a, b) => b.duration - a.duration);

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

export function renderFilmSelectionButtons() {
  // Önce 'output' öğesinin varlığını kontrol et, yoksa oluştur
  let output = document.getElementById("output");
  if (!output) {
    output = document.createElement("div");
    output.id = "output";
    document.body.appendChild(output);
  }

  // İçeriği temizle
  output.innerHTML = "";

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    cinemaContainer.className = "cinema-container";

    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;
    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const filmButton = document.createElement("button");
      filmButton.innerText = `${salon.name} - Film Göster`;
      filmButton.style.margin = "5px";
      filmButton.onclick = () => renderFilmDetails(salon);
      cinemaContainer.appendChild(filmButton);
    });

    output.appendChild(cinemaContainer);
  });
}



export function renderFilmDetails(salon) {
  const film = salon.assignedFilm;
  if (!film) {
    console.error(`Salon '${salon.name}' için atanmış bir film bulunamadı!`);
    return;
  }

  // Kategorileri isim olarak haritalandırın
  const categoryNames = film.categories
    .map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category.name : "Bilinmeyen Kategori";
    })
    .join(", ");

  // Film detaylarını göstermek için bir modal/div oluştur
  const filmDetailsContainer = document.createElement("div");
  filmDetailsContainer.className = "film-details";
  filmDetailsContainer.style.border = "1px solid #ddd";
  filmDetailsContainer.style.borderRadius = "5px";
  filmDetailsContainer.style.padding = "15px";
  filmDetailsContainer.style.marginTop = "20px";
  filmDetailsContainer.style.backgroundColor = "#f9f9f9";

  filmDetailsContainer.innerHTML = `
    <h4>${film.name}</h4>
    <p><strong>Süre:</strong> ${film.duration} dakika</p>
    <p><strong>Kategoriler:</strong> ${categoryNames}</p>
    <p><strong>Salon:</strong> ${salon.name}</p>
  `;

  // Film detaylarını 'output' div'ine ekle
  const output = document.getElementById("output");
  if (!output) {
    console.error("Çıkış (output) alanı bulunamadı!");
    return;
  }

  output.innerHTML = ""; // Mevcut içeriği temizle
  output.appendChild(filmDetailsContainer);
}


