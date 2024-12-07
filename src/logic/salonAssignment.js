import { cinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";

// Sinemalara salon atama
export function assignSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const uniqueSalons = salons.slice(); // Salonların kopyası
    const maxSalonsPerCinema = Math.min(4, uniqueSalons.length); // Her sinemaya max 4 salon atanabilir

    cinema.salons = Array.from({ length: maxSalonsPerCinema }).map((_, index) => {
      const randomIndex = Math.floor(Math.random() * uniqueSalons.length);
      const salonTemplate = uniqueSalons.splice(randomIndex, 1)[0]; // Benzersiz salon seçimi
      return {
        ...salonTemplate,
        id: `${cinema.id}-${index + 1}`,
        cinemaId: cinema.id,
        seatsList: generateSeats(salonTemplate.seats), // Koltuk listesi oluştur
      };
    });
  });
  console.log("Salon atamaları tamamlandı:", cinemas);
}

// Koltuk listesi oluşturma fonksiyonu
function generateSeats(seatCount) {
  const rows = Math.ceil(seatCount / 10); // 10 koltuk bir sıra
  const seats = [];
  for (let row = 0; row < rows; row++) {
    for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
      if (seats.length >= seatCount) break;
      seats.push({
        id: `${row + 1}-${seatNumber}`,
        row: String.fromCharCode(65 + row), // A, B, C... şeklinde
        number: seatNumber,
        status: "boş", // Başlangıç durumu
        price: 15, // Varsayılan fiyat
      });
    }
  }
  return seats;
}

// Belirli bir sinemanın salonlarını listele
export function listSalonsByCinema(cinemaId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);
  if (!cinema) {
    console.log(`Sinema bulunamadı: ID ${cinemaId}`);
    return;
  }

  console.log(`Sinemadaki Salonlar - ${cinema.name}:`);
  cinema.salons.forEach((salon) => {
    console.log(`Salon ID: ${salon.id}, Adı: ${salon.name}`);
  });
}

// Bir salonun hangi sinemaya ait olduğunu bul
export function findCinemaBySalon(salonId) {
  for (const cinema of cinemas) {
    const salon = cinema.salons.find((s) => s.id === salonId);
    if (salon) {
      console.log(`Salon ${salon.name} şu sinemaya ait: ${cinema.name}`);
      return cinema;
    }
  }
  console.log(`Salon bulunamadı: ID ${salonId}`);
}

// Her salonun kapasitesini hesaplayan fonksiyon
export function calculateSalonCapacity(salon) {
  const totalSeats = salon.seatsList.length;
  const availableSeats = salon.seatsList.filter((seat) => seat.status === "boş").length;
  const occupiedSeats = totalSeats - availableSeats;

  return {
    totalSeats,
    availableSeats,
    occupiedSeats,
  };
}
