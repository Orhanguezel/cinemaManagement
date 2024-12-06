// Salon Sınıfı
export class Salon {
  constructor(type, name, image, seats, aisleWidth, features, price) {
    this.type = type;
    this.name = name;
    this.image = image;
    this.seats = seats;
    this.aisleWidth = aisleWidth;
    this.features = features; // Örn: { is3D: true, isVIP: false, sound: "Dolby Atmos" }
    this.price = price;
    this.filmId = this.filmId || null; 
  }
}

// **Salon Listesi**
export const salons = [
  new Salon(1, "Saal 1", "./assets/salons/salon1.jpg", 120, 15, { is3D: true, isVIP: false, sound: "Dolby Atmos" }, 10),
  new Salon(2, "Saal 2", "./assets/salons/salon2.jpg", 80, 12, { is3D: false, isVIP: true, sound: "Standard" }, 15),
  new Salon(3, "Saal 3", "./assets/salons/salon3.jpg", 100, 18, { is3D: true, isVIP: true, sound: "Dolby Atmos" }, 20),
  new Salon(4, "Saal 4", "./assets/salons/salon4.jpg", 150, 20, { is3D: false, isVIP: false, sound: "Standard" }, 8),
  new Salon(5, "Saal 5", "./assets/salons/salon5.jpg", 200, 25, { is3D: true, isVIP: true, sound: "Dolby Atmos" }, 25),
  new Salon(6, "Saal 6", "./assets/salons/salon6.jpg", 50, 10, { is3D: false, isVIP: false, sound: "Standard" }, 5)
];
  