// Genel LocalStorage Kaydetme Fonksiyonu
export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Genel LocalStorage Yükleme Fonksiyonu
export function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// LocalStorage Temizleme Fonksiyonu
export function clearLocalStorage() {
  localStorage.clear();
}

// Gösterim Saatlerini LocalStorage'a Kaydetme
export function saveShowtimesToLocalStorage(cinemas) {
  const showtimesData = cinemas.map((cinema) => ({
    id: cinema.id,
    salons: cinema.salons.map((salon) => ({
      id: salon.id,
      showtimes: salon.showtimes || [],
    })),
  }));
  saveToLocalStorage("showtimes", showtimesData);
  console.log("Gösterim saatleri LocalStorage'a kaydedildi.");
}

// LocalStorage'dan Gösterim Saatlerini Yükleme
export function loadShowtimesFromLocalStorage(cinemas) {
  const showtimesData = loadFromLocalStorage("showtimes");
  if (!showtimesData) {
    console.warn("LocalStorage'da gösterim saati verisi bulunamadı.");
    return;
  }

  showtimesData.forEach((cinemaData) => {
    const cinema = cinemas.find((c) => c.id === cinemaData.id);
    if (cinema) {
      cinemaData.salons.forEach((salonData) => {
        const salon = cinema.salons.find((s) => s.id === salonData.id);
        if (salon) {
          salon.showtimes = salonData.showtimes;
        }
      });
    }
  });

  console.log("Gösterim saatleri LocalStorage'dan yüklendi.");
}

// Salon Verilerini LocalStorage'a Kaydetme
export function saveSalonDataToLocalStorage(cinemas) {
  const minimalData = cinemas.map((cinema) => ({
    name: cinema.name,
    salons: cinema.salons.map((salon) => ({
      name: salon.name,
      occupancyRate: salon.occupancyRate,
      seatsList: salon.seatsList,
    })),
  }));
  saveToLocalStorage("cinemaData", minimalData);
  console.log("Salon verileri LocalStorage'a kaydedildi.");
}

// LocalStorage'dan Salon Verilerini Yükleme
export function loadCinemaDataFromLocalStorage(cinemas) {
  const savedData = loadFromLocalStorage("cinemaData");
  if (!savedData) {
    console.warn("LocalStorage'da sinema verisi bulunamadı.");
    return;
  }

  savedData.forEach((savedCinema) => {
    const cinema = cinemas.find((c) => c.name === savedCinema.name);
    if (cinema) {
      savedCinema.salons.forEach((savedSalon) => {
        const salon = cinema.salons.find((s) => s.name === savedSalon.name);
        if (salon) {
          salon.occupancyRate = savedSalon.occupancyRate;
          salon.seatsList = savedSalon.seatsList;
        }
      });
    }
  });

  console.log("Salon verileri LocalStorage'dan yüklendi.");
}

// Sinema Verilerini LocalStorage'a Kaydetme
export function saveCinemaDataToLocalStorage(cinemas) {
  const dataToSave = cinemas.map((cinema) => ({
    name: cinema.name,
    salons: cinema.salons.map((salon) => ({
      name: salon.name,
      seatsList: salon.seatsList,
      assignedFilm: salon.assignedFilm
        ? {
            id: salon.assignedFilm.id,
            name: salon.assignedFilm.name,
            duration: salon.assignedFilm.duration,
            categories: salon.assignedFilm.categories,
          }
        : null,
      features: salon.features,
      seats: salon.seats,
      price: salon.price,
    })),
  }));

  saveToLocalStorage("cinemaData", dataToSave);
  console.log("Sinema verileri LocalStorage'a kaydedildi!");
}
