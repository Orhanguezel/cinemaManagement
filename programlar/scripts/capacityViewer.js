import { initializeCinemaData, getCinemaById } from "./cinemaManager.js";
import { assignSeatsRandomly } from "./seatManager.js";
import { calculateCinemaCapacity } from "./seatManager.js";

// Kullanıcı için sinema ve salon kapasitesini göster
export function showCinemaCapacity(cinemaId) {
  const cinema = getCinemaById(cinemaId);
  if (!cinema) {
    console.error("Sinema bulunamadı!");
    return;
  }

  console.log(`Sinema: ${cinema.name}`);
  console.log("Salon Kapasite Detayları:");

  const capacities = calculateCinemaCapacity(cinema);
  capacities.forEach(({ salonName, totalSeats, availableSeats, occupiedSeats }) => {
    console.log(`Salon: ${salonName}`);
    console.log(`- Toplam Koltuk: ${totalSeats}`);
    console.log(`- Boş Koltuk: ${availableSeats}`);
    console.log(`- Dolu Koltuk: ${occupiedSeats}`);
    console.log("-----------------------");
  });
}

// Verileri başlat ve kapasiteyi göster
initializeCinemaData();
showCinemaCapacity(3); // ID'si 1 olan sinemanın kapasitesini göster


// Belirli bir salon için doluluk oranına göre müşteri atama
export function simulateCustomerAssignment(cinemaId, salonId, occupancyRate) {
    const cinema = getCinemaById(cinemaId);
    if (!cinema) {
      console.error("Sinema bulunamadı!");
      return;
    }
  
    const salon = cinema.salons.find((s) => s.id === salonId);
    if (!salon) {
      console.error(`Salon bulunamadı: ID ${salonId}`);
      return;
    }
  
    assignSeatsRandomly(salon, occupancyRate);
  }
  
  // Verileri başlat ve müşteri atamasını simüle et
  initializeCinemaData();
  simulateCustomerAssignment(1, "1-1", 30); // Sinema ID'si 1, Salon ID'si 1-1, %30 doluluk oranı