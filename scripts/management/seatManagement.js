// seatManagement.js
/* generateSeats(totalSeats)
getTotalSeats()
getOccupiedSeats()
getAvailableSeats()
listSeats()
getSalonSeatInfo(salonId)
listAllSalonsSeats()
*/

import { salons } from "../data/Salon.js";

// **Salon Koltuklarını Yönetme Sınıfı**
export class SeatManager {
  constructor(salonId) {
    this.salon = salons.find((s) => s.id === salonId);
    this.seats = this.salon ? this.generateSeats(this.salon.seats) : [];
  }

  // **Koltukları Oluştur**
  generateSeats(totalSeats) {
    const seats = [];
    const rows = Math.ceil(totalSeats / 10); // Her satırda 10 koltuk
    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C şeklinde
      for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
        if (seats.length < totalSeats) {
          seats.push({
            row: rowLetter,
            number: seatNumber,
            occupied: Math.random() < 0.3, // %30 dolu rastgele belirleme
          });
        }
      }
    }
    return seats;
  }

  // **Toplam Koltuk Sayısını Al**
  getTotalSeats() {
    return this.seats.length;
  }

  // **Dolu Koltuk Sayısını Al**
  getOccupiedSeats() {
    return this.seats.filter((seat) => seat.occupied).length;
  }

  // **Boş Koltuk Sayısını Al**
  getAvailableSeats() {
    return this.seats.filter((seat) => !seat.occupied).length;
  }

  // **Tüm Koltukları Listele**
  listSeats() {
    return this.seats.map(
      (seat) => `${seat.row}${seat.number} - ${seat.occupied ? "Dolu" : "Boş"}`
    );
  }
}

// **Salon Koltuk Bilgisi Fonksiyonu**
export function getSalonSeatInfo(salonId) {
  const seatManager = new SeatManager(salonId);
  console.log(`Salon Adı: ${seatManager.salon.name}`);
  console.log(`Toplam Koltuk: ${seatManager.getTotalSeats()}`);
  console.log(`Dolu Koltuklar: ${seatManager.getOccupiedSeats()}`);
  console.log(`Boş Koltuklar: ${seatManager.getAvailableSeats()}`);
  console.log("Tüm Koltuklar:", seatManager.listSeats());
}

// **Tüm Salonlar için Koltuk Bilgisi**
export function listAllSalonsSeats() {
  salons.forEach((salon) => {
    const seatManager = new SeatManager(salon.id);
    console.log(`\n--- ${salon.name} ---`);
    console.log(`Toplam Koltuk: ${seatManager.getTotalSeats()}`);
    console.log(`Dolu Koltuklar: ${seatManager.getOccupiedSeats()}`);
    console.log(`Boş Koltuklar: ${seatManager.getAvailableSeats()}`);
  });
}

// Bir Salondaki Koltuk Durumunu Getir
export function getSeatStatusForSalon(cinemaId, salonId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Sinema ID ${cinemaId} bulunamadı.`);
    return;
  }

  const salon = cinema.salons.find((s) => s.id === salonId);

  if (!salon) {
    console.error(`Salon ID ${salonId} bulunamadı.`);
    return;
  }

  const totalSeats = salon.seats;
  const occupiedSeats = Math.floor(Math.random() * totalSeats); // Rastgele doluluk oranı simüle ediliyor
  const availableSeats = totalSeats - occupiedSeats;

  console.log(
    `Salon: ${salon.name}, Toplam Koltuk: ${totalSeats}, Dolu Koltuklar: ${occupiedSeats}, Boş Koltuklar: ${availableSeats}`
  );
}

// **Test için Konsol Çıktıları**
console.log("\nBir Salon Koltuk Bilgisi:");
getSalonSeatInfo(1); // İlk salon için koltuk bilgisi

console.log("\nTüm Salonların Koltuk Bilgisi:");
listAllSalonsSeats();
