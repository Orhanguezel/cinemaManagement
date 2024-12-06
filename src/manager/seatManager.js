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
  
  // Bir sinemanın tüm salonlarının kapasitesini hesaplayan fonksiyon
  export function calculateCinemaCapacity(cinema) {
    return cinema.salons.map((salon) => {
      const capacity = calculateSalonCapacity(salon);
      return {
        salonName: salon.name,
        ...capacity,
      };
    });
  }
  

  // Koltuklara doluluk oranına göre rastgele müşteri atama
  export function assignSeatsRandomly(salon, occupancyRate) {
    const totalSeats = salon.seatsList.length;
    const availableSeats = salon.seatsList.filter((seat) => seat.status === "boş");
    const availableCount = availableSeats.length;
  
    // Eğer belirtilen doluluk oranı mevcut koltuklarla uyumlu değilse, maksimum uyumlu doluluk oranı belirlenir
    const adjustedOccupancyRate = Math.min(occupancyRate, (availableCount / totalSeats) * 100);
    const seatsToOccupy = Math.floor((adjustedOccupancyRate / 100) * totalSeats);
  
    console.log(`Salon: ${salon.name}`);
    console.log(`Toplam Koltuk: ${totalSeats}`);
    console.log(`Doluluk Oranı: %${adjustedOccupancyRate.toFixed(2)}`);
    console.log(`Dolu Koltuk Sayısı: ${seatsToOccupy}`);
  
    let assignedSeats = 0;
  
    while (assignedSeats < seatsToOccupy) {
      const randomIndex = Math.floor(Math.random() * availableSeats.length);
      const randomSeat = availableSeats[randomIndex];
  
      if (randomSeat.status === "boş") {
        randomSeat.status = "dolu";
        randomSeat.customer = `Müşteri-${assignedSeats + 1}`;
        assignedSeats++;
  
        // Koltuğu listeden çıkararak tekrar seçilmesini engelliyoruz
        availableSeats.splice(randomIndex, 1);
      }
    }
  
    console.log(`Atama tamamlandı: ${assignedSeats} koltuk dolu olarak işaretlendi.`);
  }
  


  
 // Tüm sinemalar için rastgele doluluk oranı atama
export function assignRandomOccupancy(cinemas) {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      const randomPercentage = Math.floor(Math.random() * 101); // 0-100 arasında rastgele bir oran belirle
      assignSeatsRandomly(salon, randomPercentage);

      // Input alanını güncelle
      const inputField = document.querySelector(`#salon-${salon.id}-occupancy`);
      if (inputField) {
        inputField.value = randomPercentage; // Rastgele oranı input alanına yaz
      }
    });
  });

  alert("Tüm salonlar için rastgele doluluk oranları atandı!");
}


 




  // Koltuk seçimini işleyen fonksiyon
  export function handleSeatSelection(cinemas, salonId, seatId) {
    // Sinema ve salonu bul
    const cinema = cinemas.find((cinema) =>
      cinema.salons.some((salon) => salon.id === salonId)
    );
  
    if (!cinema) {
      console.error("Salon bulunamadı!");
      return;
    }
  
    const salon = cinema.salons.find((salon) => salon.id === salonId);
    const seat = salon.seatsList.find((seat) => seat.id === seatId);
  
    if (!seat) {
      console.error("Koltuk bulunamadı!");
      return;
    }
  
    // Koltuk durumunu değiştir
    if (seat.status === "boş") {
      seat.status = "seçili";
      console.log(`Koltuk seçildi: ${seat.id}`);
    } else if (seat.status === "seçili") {
      seat.status = "boş";
      console.log(`Koltuk seçimi kaldırıldı: ${seat.id}`);
    } else {
      console.error("Bu koltuk seçilemez!");
      return;
    }
  
    // LocalStorage'a kaydet
    saveSalonDataToLocalStorage(salon);
  
    // Geri dönüş yap
    return seat;
  }
  
  
  // Salon verilerini localStorage'a kaydeden fonksiyon


// Alfabetik sıra ve koltuk yerleşimi oluşturma
export function generateSeatsLayout(salon) {
  const seatsContainer = document.createElement("div");
  seatsContainer.className = "seats";

  // Satırları gruplandır
  const rows = salon.seatsList.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Satırları sırayla işleyin
  Object.keys(rows)
    .sort((a, b) => a.localeCompare(b)) // Alfabetik sıralama
    .forEach((rowKey) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "seat-row";

      // Satır başlığı ekle (örneğin "A", "B", "C")
      const rowLabel = document.createElement("div");
      rowLabel.className = "row-label";
      rowLabel.innerText = rowKey; // Satır harfi
      rowDiv.appendChild(rowLabel);

      rows[rowKey]
        .sort((a, b) => a.number - b.number) // Koltukları sırayla yerleştir
        .forEach((seat) => {
          const seatElement = document.createElement("div");
          seatElement.className = `seat ${
            seat.status === "boş"
              ? "available"
              : seat.status === "seçili"
              ? "selected"
              : "occupied"
          }`;
          seatElement.dataset.seatId = seat.id;
          seatElement.dataset.salonId = salon.id;
          seatElement.innerText = `${rowKey}${seat.number}`; // Örneğin: A1, B5
          rowDiv.appendChild(seatElement);
        });

      seatsContainer.appendChild(rowDiv);
    });

  return seatsContainer;
}

export function createCinemaButtons(cinemas) {
  const container = document.createElement("div");
  container.id = "cinema-buttons";

  cinemas.forEach((cinema) => {
    const button = document.createElement("button");
    button.innerText = cinema.name;
    button.onclick = () => renderCinemaDetails(cinema);
    container.appendChild(button);
  });

  return container;
}



// 1. Koltuk Seçimi
// handleSeatSelection("1-1", "1-1-A1"); // A1 koltuğunu seç
// handleSeatSelection("1-1", "1-1-A1"); // A1 koltuğunun seçimini kaldır
// Verileri LocalStorage'dan Yükleme
// loadSalonDataFromLocalStorage("1-1"); // 1-1 salonunun verilerini yükle
  
