import { salons } from "./data/Salons.js";
import { cinemas } from "./data/Cinemas.js";

export function assignSeatsToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      // Salon tipine göre koltuk sayısını belirle
      const templateSalon = salons.find((s) => s.type === salon.type);
      const totalSeats = templateSalon ? templateSalon.seats : salon.seats;

      const rows = Math.ceil(totalSeats / 10); // 10 koltukluk sıralar oluşturuluyor
      const seats = [];
      let seatIdCounter = 1;

      for (let row = 1; row <= rows; row++) {
        for (let number = 1; number <= 10; number++) {
          if (seatIdCounter > totalSeats) break; // Kapasiteyi aşmayın
          seats.push({
            id: `${salon.id}-${seatIdCounter}`,
            row: row,
            number: number,
            status: "boş",
          });
          seatIdCounter++;
        }
      }
      salon.seatsList = seats; // Koltuk listesini salon nesnesine ata
    });
  });
  console.log("Koltuk atamaları tamamlandı!");
}

assignSeatsToSalons();

cinemas.forEach((cinema) => {
  console.log(`Sinema: ${cinema.name}`);
  cinema.salons.forEach((salon) => {
    console.log(`  Salon: ${salon.name}`);
    console.log(`    Koltuk Sayısı: ${salon.seatsList.length}`);
    console.log(`    Koltuklar:`, JSON.stringify(salon.seatsList, null, 2));
  });
});





/*

// Belirli bir salonun tüm koltuklarını listele
export function listSeatsBySalon(salonId) {
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
  if (!salon) {
    console.log(`Salon bulunamadı: ID ${salonId}`);
    return;
  }

  console.log(`Salon: ${salon.name} - Koltuklar:`);
  salon.seatsList.forEach((seat) => {
    console.log(`Koltuk ID: ${seat.id}, Sıra: ${seat.row}, Numara: ${seat.number}`);
  });
}
listSeatsBySalon("1-1"); // ID'si 1-1 olan salonun tüm koltuklarını listele


// Belirli bir salonun boş koltuklarını listele
export function listAvailableSeats(salonId) {
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
  if (!salon) {
    console.log(`Salon bulunamadı: ID ${salonId}`);
    return;
  }

  const availableSeats = salon.seatsList.filter((seat) => seat.status === "boş");
  if (availableSeats.length === 0) {
    console.log(`Salon ${salon.name} için boş koltuk bulunmuyor.`);
    return;
  }

  console.log(`Salon: ${salon.name} - Boş Koltuklar:`);
  availableSeats.forEach((seat) => {
    console.log(`Koltuk ID: ${seat.id}, Sıra: ${seat.row}, Numara: ${seat.number}`);
  });
}

listAvailableSeats("1-1"); // ID'si 1-1 olan salonun boş koltuklarını listele

// Belirli bir koltuğun durumunu güncelle
export function updateSeatStatus(salonId, seatId, newStatus) {
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
  if (!salon) {
    console.log(`Salon bulunamadı: ID ${salonId}`);
    return;
  }

  const seat = salon.seatsList.find((seat) => seat.id === seatId);
  if (!seat) {
    console.log(`Koltuk bulunamadı: ID ${seatId}`);
    return;
  }

  seat.status = newStatus;
  console.log(`Koltuk ${seat.id} durumu güncellendi: ${newStatus}`);
}

updateSeatStatus("1-1", "1-1-3", "rezerve"); // 1-1-3 ID'li koltuğu rezerve yap


// Belirli bir koltuğun detaylarını al
export function getSeatDetails(salonId, seatId) {
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
  if (!salon) {
    console.log(`Salon bulunamadı: ID ${salonId}`);
    return;
  }

  const seat = salon.seatsList.find((seat) => seat.id === seatId);
  if (!seat) {
    console.log(`Koltuk bulunamadı: ID ${seatId}`);
    return;
  }

  console.log(`Koltuk Detayları - ID: ${seat.id}`);
  console.log(`Sıra: ${seat.row}, Numara: ${seat.number}, Durum: ${seat.status}`);
}

getSeatDetails("1-1", "1-1-3"); // 1-1-3 ID'li koltuğun detaylarını getir


// Koltuk Tablosu Oluşturma
function renderSeatsTable(salonId) {
  const salon = cinemas.flatMap((cinema) => cinema.salons).find((s) => s.id === salonId);
  if (!salon) {
    console.log(`Salon bulunamadı: ID ${salonId}`);
    return;
  }

  const table = document.createElement("table");
  table.border = 1;

  salon.seatsList.forEach((seat) => {
    const row = document.createElement("tr");
    const cellId = document.createElement("td");
    const cellRow = document.createElement("td");
    const cellNumber = document.createElement("td");
    const cellStatus = document.createElement("td");

    cellId.innerText = seat.id;
    cellRow.innerText = seat.row;
    cellNumber.innerText = seat.number;
    cellStatus.innerText = seat.status;

    row.appendChild(cellId);
    row.appendChild(cellRow);
    row.appendChild(cellNumber);
    row.appendChild(cellStatus);
    table.appendChild(row);
  });

  document.body.appendChild(table);
}

renderSeatsTable("1-1"); // Web sayfasında 1-1 ID'li salonun koltuk tablosunu göster

*/