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

  console.log("LocalStorage'dan minimal veriler yüklendi.");
}
