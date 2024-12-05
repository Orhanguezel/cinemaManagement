import { salons } from "../data/Salon.js";
import { cinemas } from "../data/Cinemas.js";
import { films } from "../data/Movies.js";

// **Tüm Salonları Listele**
export function listAllSalons() {
  console.log("Tüm Salonlar:");
  salons.forEach((salon) => {
    console.log(
      `${salon.name} - Koltuk: ${salon.seats}, Fiyat: ${salon.price}€, Özellikler: ${salon.features.is3D ? "3D" : "2D"}, ${
        salon.features.isVIP ? "VIP" : "Standart"
      }, Ses: ${salon.features.sound}`
    );
  });
  return salons;
}

// **Salon Bilgilerini Al**
export function getSalonById(salonId) {
  const salon = salons.find((s) => s.id === salonId);
  if (!salon) {
    console.error(`Salon ID ${salonId} bulunamadı.`);
    return null;
  }
  console.log(
    `Salon: ${salon.name}, Koltuk Sayısı: ${salon.seats}, Fiyat: ${salon.price}€, Özellikler: ${
      salon.features.is3D ? "3D" : "2D"
    }, ${salon.features.isVIP ? "VIP" : "Standart"}, Ses: ${salon.features.sound}`
  );
  return salon;
}

// **Belirli Özelliklere Sahip Salonları Al**
export function getSalonsByFeature(featureKey, featureValue) {
  const filteredSalons = salons.filter((salon) => salon.features[featureKey] === featureValue);
  if (filteredSalons.length === 0) {
    console.warn(`Hiçbir salon ${featureKey} = ${featureValue} özelliğine sahip değil.`);
  } else {
    console.log(`"${featureKey}" özelliği "${featureValue}" olan salonlar:`);
    filteredSalons.forEach((salon) => {
      console.log(`${salon.name} - Fiyat: ${salon.price}€, Ses: ${salon.features.sound}`);
    });
  }
  return filteredSalons;
}

// **Bir Salonun Gösterimlerini Al**
export function getSalonShows(salonId, cinemaShows) {
  const salonShows = cinemaShows.filter((show) => show.salon.id === salonId);
  if (salonShows.length === 0) {
    console.warn(`Salon ID ${salonId} için gösterim bulunamadı.`);
  } else {
    console.log(`Salon ID ${salonId} - Gösterimler:`);
    salonShows.forEach((show) => {
      console.log(`  Film: ${show.film.name}, Saat: ${show.time}`);
    });
  }
  return salonShows;
}

// **Bir Salonun Kapasitesini ve Mevcut Koltuk Durumunu Al**
export function getSalonCapacityAndAvailability(salonId, occupiedSeats = 0) {
  const salon = getSalonById(salonId);
  if (!salon) return;

  const availableSeats = salon.seats - occupiedSeats;
  console.log(
    `Salon: ${salon.name}, Toplam Koltuk: ${salon.seats}, Dolu Koltuk: ${occupiedSeats}, Boş Koltuk: ${availableSeats}`
  );
  return { totalSeats: salon.seats, occupiedSeats, availableSeats };
}

// **3D veya VIP Salonları Listele**
export function listSpecialSalons() {
  console.log("3D Salonlar:");
  getSalonsByFeature("is3D", true);

  console.log("VIP Salonlar:");
  getSalonsByFeature("isVIP", true);
}

// **Salon ve Gösterim Detaylarını Konsola Yazdır**
export function displaySalonDetailsWithShows(cinemaShows) {
  console.log("Salon ve Gösterim Detayları:");
  salons.forEach((salon) => {
    console.log(`Salon: ${salon.name}, Koltuk Sayısı: ${salon.seats}, Fiyat: ${salon.price}€`);
    const salonShows = getSalonShows(salon.id, cinemaShows);
    if (salonShows.length === 0) {
      console.log(`  Bu salonda şu an için gösterim yok.`);
    }
  });
}


// **Her Sinemanın Tüm Salonlarını Listele**
export function listAllCinemasAndTheirSalons() {
    console.log("Her Sinemanın Tüm Salonları:");
    cinemas.forEach((cinema) => {
      console.log(`\nSinema: ${cinema.name}`);
      cinema.salons.forEach((salon) => {
        const salonDetails = salons.find((s) => s.id === salon.id);
        if (salonDetails) {
          console.log(
            `  Salon: ${salonDetails.name}, Koltuk Sayısı: ${salonDetails.seats}, Fiyat: ${salonDetails.price}€, Ses: ${salonDetails.features?.sound || "Standart"}`
          );
        } else {
          console.warn(`  Salon ID ${salon.id} bilgisi eksik.`);
        }
      });
    });
  }
  
  // **Her Filmin Hangi Sinema ve Salonlarda Oynatıldığını Listele**
  export function listFilmsAndTheirCinemaSalons() {
    console.log("\nHer Filmin Hangi Sinema ve Salonlarda Oynatıldığını Listele:");
    films.forEach((film) => {
      console.log(`\nFilm: ${film.name}`);
      const cinemaShows = cinemas.flatMap((cinema) =>
        cinema.shows.filter((show) => show.film.id === film.id).map((show) => ({
          cinemaName: cinema.name,
          salon: show.salon.name,
          time: show.time,
        }))
      );
  
      if (cinemaShows.length > 0) {
        cinemaShows.forEach((show) => {
          console.log(
            `  Sinema: ${show.cinemaName}, Salon: ${show.salon}, Saat: ${show.time}`
          );
        });
      } else {
        console.log("  Bu film şu an herhangi bir sinemada oynatılmıyor.");
      }
    });
  }
  
  // **Test için Konsol Çıktıları**
  console.log("\n=== Her Sinemanın Tüm Salonları ===");
  listAllCinemasAndTheirSalons();
  
  console.log("\n=== Her Filmin Hangi Sinema ve Salonlarda Oynatıldığı ===");
  listFilmsAndTheirCinemaSalons();

// **Test için Konsol Çıktıları**
console.log("\nTüm Salonlar:");
listAllSalons();

console.log("\nBelirli Özelliklere Göre Salonlar:");
getSalonsByFeature("is3D", true);

console.log("\nSalon Kapasite ve Mevcut Durum:");
getSalonCapacityAndAvailability(1, 50);

console.log("\nSalon ve Gösterim Detayları:");
displaySalonDetailsWithShows([]);
