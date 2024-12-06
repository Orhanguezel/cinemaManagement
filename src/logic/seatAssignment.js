import { cinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";


export function assignSeatsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      // Salon özelliklerini ata
      const templateSalon = salons.find((s) => s.type === salon.type);
      assignSalonProperties(salon, templateSalon);

      // Koltukları oluştur ve ata
      salon.seatsList = createSeats(salon);
    });
  });
  console.log("Koltuk atamaları ve salon özellikleri tamamlandı!");
}

export function createSeats(salon) {
  const totalSeats = salon.seats;
  const rows = Math.ceil(totalSeats / 10); // Her satırda 10 koltuk
  const seats = [];
  let seatIdCounter = 1;

  for (let row = 1; row <= rows; row++) {
    for (let number = 1; number <= 10; number++) {
      if (seatIdCounter > totalSeats) break;

      // Koltuk adlandırması: A1, A2, B1, B2...
      const seatLabel = `${String.fromCharCode(64 + row)}${number}`;

      seats.push({
        id: `${salon.id}-${seatIdCounter}`,
        row: String.fromCharCode(64 + row), // Harf sırası (A, B, C...)
        number: number, // Koltuk numarası
        label: seatLabel, // Tam ad: A1, B2 gibi
        status: "boş",
        price: salon.price,
      });

      seatIdCounter++;
    }
  }
  return seats;
}



export function assignSalonProperties(salon, templateSalon) {
  if (templateSalon) {
    salon.name = templateSalon.name;
    salon.image = templateSalon.image;
    salon.seats = templateSalon.seats;
    salon.price = templateSalon.price;
    salon.features = { ...templateSalon.features }; // Özellikleri kopyalar
  } else {
    // Template salon bulunamazsa varsayılan değerler atanır
    salon.seats = salon.seats || 0;
    salon.price = 0;
    salon.features = { is3D: false, isVIP: false, sound: "Standart" };
  }
}

// Test etmek için varsayılan export
assignSeatsToSalons();

// Test Çıktıları
cinemas.forEach((cinema) => {
  console.log(`Sinema: ${cinema.name}`);
  cinema.salons.forEach((salon) => {
    console.log(`  Salon: ${salon.name}`);
    console.log(`    Koltuk Sayısı: ${salon.seatsList.length}`);
    console.log(`    Özellikler:`, salon.features);
    console.log(`    Koltuklar:`, JSON.stringify(salon.seatsList, null, 2));
  });
});

