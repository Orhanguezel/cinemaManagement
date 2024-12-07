export function assignSeatsRandomly(salon, occupancyRate) {
  const totalSeats = salon.seatsList.length;
  const seatsToOccupy = Math.floor((occupancyRate / 100) * totalSeats);

  salon.seatsList.forEach((seat, index) => {
    seat.status = index < seatsToOccupy ? "dolu" : "boş";
  });
}

export function updateSalonOccupancy(salon, rate) {
  if (!salon || !salon.seatsList || salon.seatsList.length === 0) {
    console.error("Salon veya koltuk verisi eksik!");
    return;
  }
  const totalSeats = salon.seatsList.length;
  const seatsToOccupy = Math.floor((rate / 100) * totalSeats);
  let occupiedCount = 0;

  // Tüm koltukları "boş" yap
  salon.seatsList.forEach((seat) => (seat.status = "boş"));

  // Rastgele koltukları "dolu" yap
  while (occupiedCount < seatsToOccupy) {
    const randomIndex = Math.floor(Math.random() * totalSeats);
    if (salon.seatsList[randomIndex].status === "boş") {
      salon.seatsList[randomIndex].status = "dolu";
      occupiedCount++;
    }
  }

  salon.occupancyRate = ((seatsToOccupy / totalSeats) * 100).toFixed(2);
}

