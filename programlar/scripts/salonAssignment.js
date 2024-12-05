import { cinemas } from './data/Cinemas.js';
import { salons } from './data/Salons.js';

// Sinemalara salon atama
export function assignSalonsToCinemas() {
  cinemas.forEach((cinema) => {
    const salonCount = Math.floor(Math.random() * 4) + 2;
    cinema.salons = Array.from({ length: salonCount }).map((_, index) => {
      const salonTemplate = salons[index % salons.length];
      return {
        ...salonTemplate,
        id: `${cinema.id}-${index + 1}`,
        cinemaId: cinema.id,
      };
    });
  });
  console.log('Salon atamaları tamamlandı!');
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
      return;
    }
  }
  console.log(`Salon bulunamadı: ID ${salonId}`);
}

assignSalonsToCinemas(cinemas, salons);
console.log("Salon atamaları tamamlandı:", cinemas);


// İş akışını başlat

/*
assignSalonsToCinemas();
listSalonsByCinema(1);
findCinemaBySalon('1-1');
listSalonsByCinema(1); // ID'si 1 olan sinemanın salonlarını listele
findCinemaBySalon("1-1"); // ID'si 1-1 olan salonun hangi sinemaya ait olduğunu bul


*/

