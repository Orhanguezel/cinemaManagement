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
          salon.showtimes = salonData.showtimes || [];
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
      seatsList: salon.seatsList, // Koltuk listesi
      occupancyRate: salon.occupancyRate || 0, // Doluluk oranı
      showtimes: salon.showtimes || [], // Gösterim saatleri
    })),
  }));
  localStorage.setItem("cinemaData", JSON.stringify(minimalData));
  console.log("Salon verileri LocalStorage'a kaydedildi.");
}

// LocalStorage'dan Salon Verilerini Yükleme
export function loadCinemaDataFromLocalStorage(cinemas) {
  const savedData = JSON.parse(localStorage.getItem("cinemaData"));
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
          salon.seatsList = savedSalon.seatsList || [];
          salon.occupancyRate = savedSalon.occupancyRate || 0;
          salon.showtimes = savedSalon.showtimes || [];
        }
      });
    }
  });
  console.log("Sinema verileri LocalStorage'dan yüklendi.");
}


// Sinema Verilerini LocalStorage'a Kaydetme
export function saveCinemaDataToLocalStorage(cinemas) {
  const dataToSave = cinemas.map((cinema) => ({
    name: cinema.name,
    salons: cinema.salons.map((salon) => ({
      name: salon.name,
      seatsList: salon.seatsList,
      showtimes: salon.showtimes || [],
      price: salon.price,
      features: salon.features,
    })),
  }));

  localStorage.setItem("cinemaData", JSON.stringify(dataToSave));
  console.log("Sinema verileri LocalStorage'a kaydedildi.");
}

// LocalStorage'dan Sinema Verilerini Yükleme
export function loadCinemaData(cinemas) {
  const savedData = loadFromLocalStorage("cinemaData");
  if (!savedData) {
    console.warn("LocalStorage'da sinema verisi bulunamadı.");
    return;
  }

  savedData.forEach((savedCinema) => {
    const cinema = cinemas.find((c) => c.id === savedCinema.id);
    if (cinema) {
      savedCinema.salons.forEach((savedSalon) => {
        const salon = cinema.salons.find((s) => s.id === savedSalon.id);
        if (salon) {
          salon.seatsList = savedSalon.seatsList || [];
          salon.assignedFilm = savedSalon.assignedFilm || null;
          salon.features = savedSalon.features || {};
          salon.seats = savedSalon.seats || 0;
          salon.price = savedSalon.price || 0;
          salon.showtimes = savedSalon.showtimes || [];
        }
      });
    }
  });

  console.log("Sinema verileri LocalStorage'dan yüklendi.");
}

// Koltuk Verilerini Local Storage'a Kaydet
export function saveSeatsToLocalStorage(cinemas) {
  const seatData = cinemas.map((cinema) => ({
    id: cinema.id,
    salons: cinema.salons.map((salon) => ({
      id: salon.id,
      seatsList: salon.seatsList.map((seat) => ({
        id: seat.id,
        row: seat.row,
        number: seat.number,
        status: seat.status,
        price: seat.price,
      })),
    })),
  }));
  saveToLocalStorage("seats", seatData);
  console.log("Koltuk verileri LocalStorage'a kaydedildi.");
}


// Local Storage'dan Koltuk Verilerini Yükle
export function loadSeatsFromLocalStorage(cinemas) {
  const seatData = loadFromLocalStorage("seats");
  if (!seatData) {
    console.warn("LocalStorage'da koltuk verisi bulunamadı.");
    return;
  }

  seatData.forEach((cinemaData) => {
    const cinema = cinemas.find((c) => c.id === cinemaData.id);
    if (cinema) {
      cinemaData.salons.forEach((salonData) => {
        const salon = cinema.salons.find((s) => s.id === salonData.id);
        if (salon) {
          salon.seatsList = salonData.seatsList.map((seat) => ({
            id: seat.id,
            row: seat.row,
            number: seat.number,
            status: seat.status,
            price: seat.price,
          }));
        }
      });
    }
  });

  console.log("Koltuk verileri LocalStorage'dan yüklendi.");
}

