// **Film Sınıfı**
export class Film {
    constructor(id, name, duration, image, showtimes = []) {
      this.id = id;
      this.name = name;
      this.duration = duration;
      this.image = image;
      this.showtimes = showtimes;
    }
  }
  
  // **Salon Sınıfı**
  export class Salon {
    constructor(id, name, image, seats, price) {
      if (!id || !name || !image || !seats || !price) {
        console.error("Eksik veya geçersiz salon verileri:", { id, name, image, seats, price });
      }
      this.id = id;
      this.name = name;
      this.image = image;
      this.seats = seats;
      this.price = price;
    }
  }
  
  // **Film Listesi**
  export const films = [
    new Film(1, "Avatar: Der Weg des Wassers", 180, "./assets/filmafis/avatar.jpg", ["12:00", "15:30", "19:00"]),
    new Film(2, "Oppenheimer", 195, "./assets/filmafis/oppenheimer.jpg", ["10:30", "14:00", "18:00"]),
    // Ek filmleri buraya ekleyebilirsiniz...
  ];
  
  // **Salon Listesi**
  export const salons = [
    new Salon(1, "Saal 1", "./assets/salons/salon1.jpg", 50, 12),
    new Salon(2, "Saal 2", "./assets/salons/salon2.jpg", 30, 10),
    // Ek salonları buraya ekleyebilirsiniz...
  ];
  
  // **Sinema Gösterim Verileri**
  export const cinemaShows = {
    1: [
      { filmId: 1, salonId: 1, time: "12:00" },
      { filmId: 2, salonId: 2, time: "15:30" },
      // Ek gösterim verileri buraya eklenebilir...
    ],
    2: [
      { filmId: 1, salonId: 1, time: "14:00" },
      { filmId: 2, salonId: 2, time: "16:30" },
    ],
  };
  
  // **Sinema Gösterimlerini Al**
  export function getCinemaShows(cinemaId) {
    if (!cinemaId) {
      console.error("Sinema ID tanımlı değil!");
      return [];
    }
  
    if (!cinemaShows[cinemaId]) {
      console.error(`Sinema ID ${cinemaId} için gösterim bulunamadı.`);
      return [];
    }
  
    return cinemaShows[cinemaId]
      .map((show) => {
        const film = films.find((f) => f.id === show.filmId);
        const salon = salons.find((s) => s.id === show.salonId);
  
        if (!film || !salon) {
          console.error("Eksik gösterim verisi bulundu:", { show });
          return null;
        }
  
        return { film, salon, time: show.time };
      })
      .filter((entry) => entry !== null);
  }
  
  // **Sinema Salonlarını Al**
  export function getCinemaSalons(cinemaId) {
    const cinemaShows = getCinemaShows(cinemaId);
  
    if (!cinemaShows || cinemaShows.length === 0) {
      console.error(`Sinema ID ${cinemaId} için salon bulunamadı.`);
      return [];
    }
  
    const uniqueSalons = cinemaShows
      .map((show) => show.salon)
      .filter(
        (salon, index, self) => self.findIndex((s) => s.id === salon.id) === index
      )
      .map((salon) => ({
        ...salon,
        shows: cinemaShows
          .filter((show) => show.salon.id === salon.id)
          .map((show) => ({ time: show.time })),
      }));
  
    return uniqueSalons;
  }
  
  // **Koltuk Seçimi için Gereken Veriler**
  export function getSeatData(salonId) {
    const salon = salons.find((s) => s.id === salonId);
    if (!salon) {
      console.error(`Salon ID ${salonId} için veri bulunamadı.`);
      return null;
    }
  
    return {
      id: salon.id,
      name: salon.name,
      image: salon.image,
      seats: salon.seats,
      price: salon.price,
    };
  }
  