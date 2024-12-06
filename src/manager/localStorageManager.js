
  export function saveSalonDataToLocalStorage(salon) {
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