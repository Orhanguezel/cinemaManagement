export function assignSeatsRandomly(salon, occupancyRate) {
  const totalSeats = salon.seatsList.length;
  const seatsToOccupy = Math.floor((occupancyRate / 100) * totalSeats);

  salon.seatsList.forEach((seat, index) => {
    seat.status = index < seatsToOccupy ? "dolu" : "boş";
  });
}

export function calculateSalonCapacity(salon) {
  const totalSeats = salon.seatsList.length;
  const occupiedSeats = salon.seatsList.filter((seat) => seat.status === "dolu").length;

  return {
    totalSeats,
    occupiedSeats,
    occupancyRate: (occupiedSeats / totalSeats) * 100,
  };
}
