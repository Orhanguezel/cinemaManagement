import { cinemas } from "../data/Cinemas.js";

export function assignSeatsToSalons(cinemas) {
  if (!cinemas || !Array.isArray(cinemas) || cinemas.length === 0) {
    console.error("Hata: 'cinemas' verisi geçerli değil veya boş!");
    return;
  }

  cinemas.forEach((cinema) => {
    if (!cinema.salons || !Array.isArray(cinema.salons) || cinema.salons.length === 0) {
      console.warn(`Uyarı: ${cinema.name} sinemasında salon verisi bulunamadı.`);
      return;
    }

    cinema.salons.forEach((salon) => {
      if (!salon.seatsList || salon.seatsList.length === 0) {
        salon.seatsList = createSeats(salon); // Koltukları oluştur ve ata
      }
      salon.occupancyRate = salon.occupancyRate || 0; // Başlangıç doluluk oranı
    });
  });

  console.log("Koltuk atamaları ve salon özellikleri tamamlandı!");
}

export function createSeats(salon) {
  const totalSeats = salon.seats || 0;
  if (totalSeats === 0) {
    console.warn(`Uyarı: ${salon.name} salonunda toplam koltuk sayısı 0.`);
    return [];
  }

  const rows = Math.ceil(totalSeats / 10);
  const seats = [];
  let seatIdCounter = 1;

  for (let row = 1; row <= rows; row++) {
    for (let number = 1; number <= 10; number++) {
      if (seatIdCounter > totalSeats) break;

      seats.push({
        id: `${salon.name}-${seatIdCounter}`,
        row: String.fromCharCode(64 + row), // A, B, C...
        number,
        status: "boş",
      });

      seatIdCounter++;
    }
  }
  return seats;
}

// Bir salonun özelliklerini başka bir template salondan kopyalar
export function assignSalonProperties(salon, templateSalon) {
  if (templateSalon) {
    salon.name = templateSalon.name;
    salon.image = templateSalon.image;
    salon.seats = templateSalon.seats;
    salon.price = templateSalon.price;
    salon.features = { ...templateSalon.features }; // Özellikleri kopyalar
  } else {
    // Şablon salon bulunamazsa varsayılan değerler atanır
    salon.seats = salon.seats || 0;
    salon.price = 0;
    salon.features = { is3D: false, isVIP: false, sound: "Standart" };
  }
}

// Test etmek için fonksiyonu çağır
assignSeatsToSalons();

// Test çıktıları
cinemas.forEach((cinema) => {
  console.log(`Sinema: ${cinema.name}`);
  cinema.salons.forEach((salon) => {
    console.log(`  Salon: ${salon.name}`);
    console.log(`    Koltuk Sayısı: ${salon.seatsList ? salon.seatsList.length : 0}`);
    console.log(`    Özellikler:`, salon.features);
    console.log(`    Koltuklar:`, JSON.stringify(salon.seatsList, null, 2));
  });
});
