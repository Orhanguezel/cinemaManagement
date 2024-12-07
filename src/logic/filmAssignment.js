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

export function assignRandomFilmsToSalons(cinemas) {
  cinemas.forEach((cinema) => {
    // Bu sinema için atanmış filmleri takip etmek için bir dizi oluştur
    const assignedFilms = new Set();

    cinema.salons.forEach((salon) => {
      // Kullanılabilir filmleri filtrele
      const availableFilms = films.filter((film) => !assignedFilms.has(film.id));

      if (availableFilms.length > 0) {
        // Rastgele bir film seç
        const randomFilm =
          availableFilms[Math.floor(Math.random() * availableFilms.length)];

        // Filmi salona ata ve atanmış filmler listesine ekle
        salon.assignedFilm = randomFilm;
        assignedFilms.add(randomFilm.id);

        console.log(
          `Film '${randomFilm.name}' salon '${salon.name}' için rastgele atandı.`
        );
      } else {
        console.warn(
          `Sinema '${cinema.name}' için yeterli sayıda farklı film bulunamadı!`
        );
        salon.assignedFilm = null; // Hiçbir film atanmaz
      }
    });
  });
}


export function assignOptimalFilmsToSalons() {
  // Tüm sinemalar üzerinde gezin
  cinemas.forEach((cinema) => {
    const assignedFilms = new Set(); // Bu sinema içindeki atanmış filmleri takip et

    // Her salon için film ata
    cinema.salons.forEach((salon) => {
      // Salon özelliklerine göre kategori belirle
      let categoryId;
      if (salon.seats > 150) {
        categoryId = 5; // Aksiyon
      } else if (salon.features.is3D) {
        categoryId = 2; // Bilim Kurgu
      } else if (salon.features.isVIP) {
        categoryId = 1; // Drama
      } else {
        categoryId = 6; // Animasyon
      }

      // Uygun filmleri filtrele
      const suitableFilms = films
        .filter((film) => film.categories.includes(categoryId))
        .filter((film) => !assignedFilms.has(film.id)); // Bu sinema içinde daha önce atanmış mı?

      // Eğer uygun film bulunursa süreye göre sıralama yap
      suitableFilms.sort((a, b) => b.duration - a.duration);

      if (suitableFilms.length > 0) {
        // İlk filmi ata
        const selectedFilm = suitableFilms[0];
        salon.assignedFilm = selectedFilm; // Salona filmi ata
        assignedFilms.add(selectedFilm.id); // Sinema içindeki atanmış filmler listesine ekle
        console.log(`Film '${selectedFilm.name}' salon '${salon.name}' için optimal olarak atandı.`);
      } else {
        // Eğer uygun film bulunamazsa salonu boş bırak
        salon.assignedFilm = null;
        console.warn(`Salon '${salon.name}' için uygun film bulunamadı.`);
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


//Sinemaların ve Filmlerin Başlangıçta Gösterimi

export function renderCinemasWithFilms() {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Önceki içeriği temizle

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    cinemaContainer.className = "cinema-container";

    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;
    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const film = salon.assignedFilm;
      if (film) {
        const filmButton = document.createElement("button");
        filmButton.innerText = `${salon.name} - ${film.name}`;
        filmButton.onclick = () => renderFilmDetailsWithSeats(film, salon);
        cinemaContainer.appendChild(filmButton);
      }
    });

    output.appendChild(cinemaContainer);
  });
}

// Film Detaylarının Gösterimi ve Salon Bilgisi
export function renderFilmDetailsWithSeats(film, salon) {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Önceki içeriği temizle

  const filmDetails = document.createElement("div");
  filmDetails.className = "film-details";

  filmDetails.innerHTML = `
    <h4>${film.name}</h4>
    <p><strong>Süre:</strong> ${film.duration} dakika</p>
    <p><strong>Kategoriler:</strong> ${film.categories
      .map((id) => categories.find((cat) => cat.id === id)?.name || "Bilinmeyen")
      .join(", ")}</p>
    <p><strong>Salon:</strong> ${salon.name}</p>
  `;

  const selectButton = document.createElement("button");
  selectButton.innerText = "Koltukları Gör";
  selectButton.onclick = () => renderSeatSelection(salon);

  filmDetails.appendChild(selectButton);
  output.appendChild(filmDetails);
}

// Filmleri Kart Şeklinde Göster
export function renderFilmCards(cinemas) {
  const filmContainer = document.createElement("div");
  filmContainer.id = "film-container";
  filmContainer.style.display = "flex";
  filmContainer.style.flexWrap = "wrap";
  filmContainer.style.justifyContent = "center";
  filmContainer.style.gap = "20px";

  films.forEach((film) => {
    const filmCard = document.createElement("div");
    filmCard.className = "film-card";
    filmCard.style.border = "1px solid #ddd";
    filmCard.style.borderRadius = "10px";
    filmCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    filmCard.style.padding = "15px";
    filmCard.style.width = "300px";
    filmCard.style.backgroundColor = "#fff";

    const filmImage = document.createElement("img");
    filmImage.src = film.image;
    filmImage.alt = film.name;
    filmImage.style.width = "100%";
    filmImage.style.borderRadius = "10px 10px 0 0";

    const filmTitle = document.createElement("h3");
    filmTitle.innerText = film.name;

    const filmDuration = document.createElement("p");
    filmDuration.innerHTML = `<strong>Süre:</strong> ${film.duration} dakika`;

    const relatedSalons = cinemas
      .flatMap((cinema) => cinema.salons)
      .filter((salon) => salon.assignedFilm?.id === film.id);

    const salonInfo = document.createElement("p");
    salonInfo.innerHTML = `<strong>Salonlar:</strong> ${
      relatedSalons.length > 0
        ? relatedSalons.map((salon) => `${salon.name} (${salon.price} €)`).join(", ")
        : "Henüz atanmadı"
    }`;

    const selectButton = document.createElement("button");
    selectButton.innerText = "Koltuk Seç";
    selectButton.style.marginTop = "10px";
    selectButton.style.padding = "10px 15px";
    selectButton.style.backgroundColor = "#007bff";
    selectButton.style.color = "#fff";
    selectButton.style.border = "none";
    selectButton.style.borderRadius = "5px";
    selectButton.style.cursor = "pointer";
    selectButton.onclick = () => renderSeatSelection(film, relatedSalons);

    filmCard.appendChild(filmImage);
    filmCard.appendChild(filmTitle);
    filmCard.appendChild(filmDuration);
    filmCard.appendChild(salonInfo);
    filmCard.appendChild(selectButton);

    filmContainer.appendChild(filmCard);
  });

  document.body.appendChild(filmContainer);
}

// Koltuk Seçim Ekranını Göster  bu gidecek
function renderSeatSelection(film, salons) {
  const output = document.getElementById("output") || document.createElement("div");
  output.id = "output";
  output.innerHTML = ""; // Önceki içeriği temizle

  const filmTitle = document.createElement("h2");
  filmTitle.innerText = `Film: ${film.name}`;
  output.appendChild(filmTitle);

  salons.forEach((salon) => {
    const salonDetails = document.createElement("div");
    salonDetails.className = "salon-details";
    salonDetails.innerHTML = `
      <h3>${salon.name}</h3>
      <p><strong>Doluluk:</strong> ${salon.seatsList.filter((seat) => seat.status === "dolu").length} / ${
      salon.seatsList.length
    }</p>
    `;

    const seatsContainer = generateSeatsLayout(salon);
    salonDetails.appendChild(seatsContainer);

    const confirmButton = document.createElement("button");
    confirmButton.innerText = "Seçimi Onayla";
    confirmButton.style.marginTop = "10px";
    confirmButton.style.padding = "10px 15px";
    confirmButton.style.backgroundColor = "#28a745";
    confirmButton.style.color = "#fff";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "5px";
    confirmButton.style.cursor = "pointer";
    salonDetails.appendChild(confirmButton);

    output.appendChild(salonDetails);
  });

  document.body.appendChild(output);
}


