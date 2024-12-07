// Salon verilerini LocalStorage'a kaydet
export function saveSalonDataToLocalStorage(salon) {
  const cinemas = JSON.parse(localStorage.getItem("cinemas")) || [];
  const cinemaIndex = cinemas.findIndex((c) =>
    c.salons.some((s) => s.id === salon.id)
  );

  if (cinemaIndex !== -1) {
    const cinema = cinemas[cinemaIndex];
    const salonIndex = cinema.salons.findIndex((s) => s.id === salon.id);
    if (salonIndex !== -1) {
      cinema.salons[salonIndex] = salon;
    } else {
      cinema.salons.push(salon);
    }
    cinemas[cinemaIndex] = cinema;
  } else {
    cinemas.push({ name: salon.cinemaName, salons: [salon] });
  }

  localStorage.setItem("cinemas", JSON.stringify(cinemas));
}

// LocalStorage'dan verileri yükle
export function loadCinemasFromLocalStorage() {
  const cinemas = JSON.parse(localStorage.getItem("cinemas"));
  return cinemas || [];
}
