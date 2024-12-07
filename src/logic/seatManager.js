// seatManager.js dosyası içerisinde koltuk işlemleri ile ilgili fonksiyonlar bulunmaktadır.

export function assignSeatsRandomly(salon) {
  const randomRate = Math.floor(Math.random() * 101); // 0-100 arasında rastgele oran
  updateSalonOccupancy(salon, randomRate);
  console.log(`Rastgele atama tamamlandı: Salon ${salon.name}, Doluluk Oranı: ${randomRate}%`);
}


export function assignSeatsOptimally(salon) {
  let baseRate = 50; // Varsayılan doluluk oranı
  if (salon.features.isVIP) baseRate += 20; // VIP salonlara ek doluluk
  if (salon.features.is3D) baseRate += 10; // 3D salonlara ek doluluk

  updateSalonOccupancy(salon, baseRate);
  console.log(`Optimal atama tamamlandı: Salon ${salon.name}, Doluluk Oranı: ${baseRate}%`);
}

export function assignSeatsManually(salon, occupancyRate) {
  updateSalonOccupancy(salon, occupancyRate); // Mevcut doluluk oranını uygula
  console.log(`Manuel atama tamamlandı: Salon ${salon.name}, Doluluk Oranı: ${occupancyRate}%`);
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

