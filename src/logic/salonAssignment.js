// salonAssignment.js
import { cinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";

// Sinemalara salon atama (dinamik ID oluşturma)
export function assignSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const uniqueSalons = salons.slice(); // Salon tiplerini kopyala
    const maxSalonsPerCinema = Math.min(4, uniqueSalons.length); // Max 4 salon

    cinema.salons = Array.from({ length: maxSalonsPerCinema }).map((_, index) => {
      const randomIndex = Math.floor(Math.random() * uniqueSalons.length);
      const salonTemplate = uniqueSalons.splice(randomIndex, 1)[0]; // Rastgele bir salon tipi seç
      return createSalonFromTemplate(cinema.id, salonTemplate, index + 1); // Dinamik salon oluştur
    });
  });
  console.log("Salon atamaları tamamlandı:", cinemas);
}

// Salon tipi şablonundan dinamik salon oluşturma
function createSalonFromTemplate(cinemaId, salonTemplate, index) {
  return {
    ...salonTemplate,
    id: `${cinemaId}-${salonTemplate.type}-${index}`, // Benzersiz ID
    cinemaId: cinemaId,
    seatsList: generateSeats(salonTemplate.seats), // Koltuk listesi oluştur
  };
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
    console.error(`Sinema bulunamadı: ID ${cinemaId}`);
    return;
  }

  console.log(`Sinemadaki Salonlar - ${cinema.name}:`);
  cinema.salons.forEach((salon) => {
    console.log(`Salon ID: ${salon.id}, Adı: ${salon.name}, Kapasite: ${salon.seats}`);
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
  console.error(`Salon bulunamadı: ID ${salonId}`);
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
