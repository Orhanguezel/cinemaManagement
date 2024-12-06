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



// Salon Bilgi Paneli Oluşturma Fonksiyonu
export function createSalonInfoPanel(salon) {
  // Salon kapasitesini hesapla
  const { totalSeats, availableSeats, occupiedSeats } = calculateSalonCapacity(salon);

  // Bilgi paneli için ana div oluştur
  const infoPanel = document.createElement("div");
  infoPanel.className = "info-box";
  infoPanel.style.padding = "15px";
  infoPanel.style.marginBottom = "20px";
  infoPanel.style.backgroundColor = "#black";
  infoPanel.style.border = "1px solid #ddd";
  infoPanel.style.borderRadius = "5px";
  infoPanel.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";

  // Panel içeriğini HTML formatında ekle
  infoPanel.innerHTML = `
    <h3 style="margin-bottom: 10px;">${salon.name}</h3>
    <p><strong>Toplam Koltuk:</strong> ${totalSeats}</p>
    <p><strong>Boş Koltuk:</strong> ${availableSeats}</p>
    <p><strong>Dolu Koltuk:</strong> ${occupiedSeats}</p>
    <p><strong>Özellikler:</strong> ${salon.features.is3D ? "3D" : "2D"}, ${
    salon.features.isVIP ? "VIP" : "Standart"
  }, ${salon.features.sound}</p>
    <p><strong>Ücret Tarifesi:</strong> ${salon.price || "Belirtilmedi"} €</p>
  `;

  return infoPanel;
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

