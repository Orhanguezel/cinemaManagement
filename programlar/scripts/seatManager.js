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
    const seatsToOccupy = Math.floor((occupancyRate / 100) * totalSeats);
  
    console.log(`Salon: ${salon.name}`);
    console.log(`Toplam Koltuk: ${totalSeats}`);
    console.log(`Doluluk Oranı: %${occupancyRate}`);
    console.log(`Dolu Koltuk Sayısı: ${seatsToOccupy}`);
  
    let assignedSeats = 0;
  
    while (assignedSeats < seatsToOccupy) {
      const randomIndex = Math.floor(Math.random() * totalSeats);
      const randomSeat = salon.seatsList[randomIndex];
  
      if (randomSeat.status === "boş") {
        randomSeat.status = "dolu";
        randomSeat.customer = `Müşteri-${assignedSeats + 1}`;
        assignedSeats++;
      }
    }
  
    console.log("Atama tamamlandı!");
    salon.seatsList.forEach((seat) => {
      console.log(`Koltuk ID: ${seat.id}, Durum: ${seat.status}, Müşteri: ${seat.customer || "Yok"}`);
    });
  }
  
  export function assignRandomOccupancy(cinemas, occupancyRate = 30) {
    cinemas.forEach((cinema) => {
      cinema.salons.forEach((salon) => {
        assignSeatsRandomly(salon, occupancyRate);
      });
    });
  }

  export function renderSeatsHTML(salon) {
    const seatsContainer = document.createElement("div");
    seatsContainer.className = "seats";
  
    const rows = {}; // Satırları gruplamak için obje
    salon.seatsList.forEach((seat) => {
      if (!rows[seat.row]) {
        rows[seat.row] = document.createElement("div");
        rows[seat.row].className = "seat-row";
      }
  
      const seatElement = document.createElement("div");
      seatElement.className = `seat ${seat.status}`;
      seatElement.innerText = `${String.fromCharCode(64 + seat.row)}${seat.number}`;
      seatElement.dataset.seatId = seat.id;
      seatElement.dataset.salonId = salon.id;
  
      seatElement.addEventListener("click", () => {
        handleSeatSelection(salon.id, seat.id);
      });
  
      rows[seat.row].appendChild(seatElement);
    });
  
    Object.values(rows).forEach((rowElement) => {
      seatsContainer.appendChild(rowElement);
    });
  
    return seatsContainer;
  }
  
  export function renderSalonDetails(salon) {
    const container = document.createElement("div");
    container.className = "hall";
  
    // Ekranda sinema perdesi
    const screen = document.createElement("div");
    screen.className = "hall__screen";
    screen.innerText = "Leinwand";
    container.appendChild(screen);
  
    // Koltuk düzeni
    const seatsHTML = renderSeatsHTML(salon);
    container.appendChild(seatsHTML);
  
    return container;
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
  function saveSalonDataToLocalStorage(salon) {
    const salonData = {
      id: salon.id,
      seatsList: salon.seatsList,
    };
    localStorage.setItem(`salon-${salon.id}`, JSON.stringify(salonData));
    console.log(`Salon verileri kaydedildi: ${salon.id}`);
  }
  
  // LocalStorage'dan salon verilerini yükleyen fonksiyon
  export function loadSalonDataFromLocalStorage(salonId) {
    const savedData = localStorage.getItem(`salon-${salonId}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const cinema = cinemas.find((cinema) =>
        cinema.salons.some((salon) => salon.id === salonId)
      );
  
      if (cinema) {
        const salon = cinema.salons.find((salon) => salon.id === salonId);
        salon.seatsList = parsedData.seatsList;
        console.log(`Salon verileri yüklendi: ${salon.id}`);
      }
    }
  }
// 1. Koltuk Seçimi
// handleSeatSelection("1-1", "1-1-A1"); // A1 koltuğunu seç
// handleSeatSelection("1-1", "1-1-A1"); // A1 koltuğunun seçimini kaldır
// Verileri LocalStorage'dan Yükleme
// loadSalonDataFromLocalStorage("1-1"); // 1-1 salonunun verilerini yükle
  
