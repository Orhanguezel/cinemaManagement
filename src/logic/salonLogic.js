// salonLogic.js
import { cinemas } from "../data/Cinemas.js";
import { salons } from "../data/Salons.js";
import { cityData } from "../data/cityData.js";

// Manuel Salon Atama
export function assignManualSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    cinema.salons = salons.slice(0, 2).map((salon, index) => ({
      ...salon,
      id: `${cinema.id}-${index + 1}`,
      cinemaId: cinema.id,
    }));
  });
  console.log("Manuel salon ataması tamamlandı:", cinemas);
}

// Optimum Salon Atama


export function assignOptimalSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const city = cityData.find((city) => cinema.name.includes(city.name));
    if (!city) {
      console.error(`Şehir verisi bulunamadı: ${cinema.name}`);
      return;
    }

    // Şehir skorunu hesapla
    const cityScore =
      (city.population / 100000) + // Nüfus puanı
      city.youthRate * 10 + // Genç nüfus oranı
      city.economicLevel * 20; // Ekonomik düzey

    console.log(`Şehir Skoru (${cinema.name}): ${cityScore}`);

    // Şehir skoruna göre salon sayısını belirle
    let numSalonsToAssign;
    if (cityScore >= 50) {
      numSalonsToAssign = 5 + Math.floor(Math.random() * 2); // 5-6 salon
    } else if (cityScore >= 30) {
      numSalonsToAssign = 3 + Math.floor(Math.random() * 2); // 3-4 salon
    } else {
      numSalonsToAssign = 2 + Math.floor(Math.random() * 2); // 2-3 salon
    }

    console.log(
      `Sinema: ${cinema.name}, Şehir Skoru: ${cityScore}, Atanacak Salon Sayısı: ${numSalonsToAssign}`
    );

    // Uygun salonları sırala
    const sortedSalons = salons
      .filter(
        (salon) =>
          !cinema.salons.some(
            (assignedSalon) => assignedSalon.name === salon.name
          )
      ) // Aynı salon tekrar atanmasın
      .map((salon) => ({
        salon,
        score: calculateSalonScore(salon), // Salon özelliklerinden gelen puan
      }))
      .sort((a, b) => b.score - a.score); // Skora göre sırala

    // Seçilen salonları sinemaya ata
    cinema.salons = sortedSalons.slice(0, numSalonsToAssign).map((item, index) => ({
      ...item.salon,
      id: `${cinema.id}-${index + 1}`,
      cinemaId: cinema.id,
      seatsList: generateSeats(item.salon.seats),
    }));
  });

  console.log("Optimum salon ataması tamamlandı:", cinemas);
}




// Salon Skor Hesaplama
function calculateSalonScore(salon) {
  let score = 0;

  if (salon.features.isVIP) score += 30; // VIP salonlara öncelik
  if (salon.features.is3D) score += 20; // 3D özellikli salonlara öncelik
  score += salon.seats / 10; // Koltuk sayısına göre puan

  return score;
}



// Koltuk Listesi Oluşturma
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
        status: "boş",
        price: 15,
      });
    }
  }
  return seats;
}


// Rastgele Salon Atama
export function assignRandomSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const shuffledSalons = salons.slice().sort(() => 0.5 - Math.random()); // Rastgele sırala
    cinema.salons = shuffledSalons.slice(0, 3).map((salon, index) => ({
      ...salon,
      id: `${cinema.id}-${index + 1}`,
      cinemaId: cinema.id,
    }));
  });
  console.log("Rastgele salon ataması tamamlandı:", cinemas);
}
