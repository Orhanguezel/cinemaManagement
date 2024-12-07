// storageManager.js

export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function clearLocalStorage() {
  localStorage.clear();
}

// Sadece seatsList ve occupancyRate kaydetmek için
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
}

// LocalStorage'dan minimal veriyi geri yükleme
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

  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      if (savedData[cinema.name] && savedData[cinema.name][salon.name]) {
        const savedSalon = savedData[cinema.name][salon.name];
        salon.seatsList = savedSalon.seats || [];
        salon.occupancyRate = savedSalon.occupancyRate || 0;
        salon.film = savedSalon.film || null;
      }
    });
  });
  


  console.log("LocalStorage'dan minimal veriler yüklendi.");
}

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
  console.log("Sinema verileri localStorage'a kaydedildi!");
}
