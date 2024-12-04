import { salons } from "./Salon.js";
import { films } from "./Film.js";

export class Cinema {
  constructor(id, name, address, logo, description, backgroundImage, phone, email, map) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.logo = logo;
    this.description = description;
    this.backgroundImage = backgroundImage;
    this.phone = phone;
    this.email = email;
    this.map = map;
    this.salons = [];
    this.shows = [];
    this.menu = [];
  }

  addSalon(salon) {
    this.salons.push(salon);
  }

  addShow(show) {
    this.shows.push(show);
  }

  addMenuItem(item) {
    this.menu.push(item);
  }
}

export const cinemas = [
  new Cinema(
    1,
    "Cineplex Berlin",
    "Schloßstraße 4, 12163 Berlin",
    "./assets/logo/cineberlin.png",
    "Erleben Sie die besten Filme bei Cineplex Berlin!",
    "./assets/backgrounds/cineberlin-bg.jpg",
    "030-1234567",
    "berlin@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BERLIN"
  ),
  new Cinema(
    2,
    "Cineplex Köln",
    "Karl-Marx-Straße 66, 12043 Köln",
    "./assets/logo/cinekoln.png",
    "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Köln.",
    "./assets/backgrounds/cinekoln-bg.jpg",
    "0221-9876543",
    "koln@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_KOLN"
  ),
  new Cinema(
    3,
    "Cineplex Hamburg",
    "Mönckebergstraße 10, 20095 Hamburg",
    "./assets/logo/cinehamburg.png",
    "Genießen Sie die besten Filme in Hamburg!",
    "./assets/backgrounds/cinehamburg-bg.jpg",
    "040-4567890",
    "hamburg@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_HAMBURG"
  ),
  new Cinema(
    4,
    "Cineplex München",
    "Leopoldstraße 82, 80802 München",
    "./assets/logo/cinemunich.png",
    "Die besten Filme in der bayerischen Hauptstadt!",
    "./assets/backgrounds/cinemunich-bg.jpg",
    "089-6543210",
    "munich@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_MUNICH"
  ),
  new Cinema(
    5,
    "Cineplex Stuttgart",
    "Königstraße 56, 70173 Stuttgart",
    "./assets/logo/cinestuttgart.png",
    "Filme und Unterhaltung in Stuttgart.",
    "./assets/backgrounds/cinestuttgart-bg.jpg",
    "0711-1234567",
    "stuttgart@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_STUTTGART"
  ),
  new Cinema(
    6,
    "Cineplex Frankfurt",
    "Zeil 101, 60313 Frankfurt am Main",
    "./assets/logo/cinefrankfurt.png",
    "Kino und Spaß im Herzen von Frankfurt.",
    "./assets/backgrounds/cinefrankfurt-bg.jpg",
    "069-9876543",
    "frankfurt@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_FRANKFURT"
  ),
  new Cinema(
    7,
    "Cineplex Düsseldorf",
    "Schadowstraße 50, 40212 Düsseldorf",
    "./assets/logo/cinedusseldorf.png",
    "Ihr Kinoerlebnis in Düsseldorf.",
    "./assets/backgrounds/cinedusseldorf-bg.jpg",
    "0211-1234567",
    "dusseldorf@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_DUSSELDORF"
  ),
  new Cinema(
    8,
    "Cineplex Leipzig",
    "Hainstraße 6, 04109 Leipzig",
    "./assets/logo/cineleipzig.png",
    "Erleben Sie fantastische Filme in Leipzig.",
    "./assets/backgrounds/cineleipzig-bg.jpg",
    "0341-9876543",
    "leipzig@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_LEIPZIG"
  ),
  new Cinema(
    9,
    "Cineplex Bremen",
    "Ostertorsteinweg 1, 28203 Bremen",
    "./assets/logo/cinebremen.png",
    "Kinovergnügen in Bremen.",
    "./assets/backgrounds/cinebremen-bg.jpg",
    "0421-1234567",
    "bremen@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BREMEN"
  ),
  new Cinema(
    10,
    "Cineplex Hannover",
    "Lister Meile 25, 30161 Hannover",
    "./assets/logo/cinehannover.png",
    "Die besten Filme in Hannover.",
    "./assets/backgrounds/cinehannover-bg.jpg",
    "0511-9876543",
    "hannover@cinegrup.com",
    "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_HANNOVER"
  ),
];


// Her sinemaya salon ekle
cinemas.forEach((cinema) => {
  salons.forEach((salon) => {
    cinema.addSalon({ ...salon, id: `${cinema.id}-${salon.id}` });
  });
});

// Gösterimleri ekle
cinemas.forEach((cinema) => {
  if (cinema.salons.length > 0) {
    films.slice(0, 3).forEach((film, idx) => {
      cinema.addShow({
        film,
        salon: cinema.salons[idx % cinema.salons.length],
        time: `${10 + idx}:00`,
      });
    });
  } else {
    console.warn(`Cinema with ID ${cinema.id} does not have any salons to add shows.`);
  }
});

// Salon ve film uyuşmasını kontrol et
cinemas.forEach((cinema) => {
  console.log(`Sinema: ${cinema.name}`);
  if (!cinema.shows || cinema.shows.length === 0) {
    console.warn(`  Bu sinema için gösterim bulunamadı.`);
  } else {
    cinema.shows.forEach((show, idx) => {
      if (!show.film || !show.salon) {
        console.error(`  Gösterim ${idx + 1} için film veya salon bilgisi eksik.`);
      } else {
        console.log(`  Gösterim ${idx + 1}: Film: ${show.film.name}, Salon: ${show.salon.name}, Saat: ${show.time}`);
      }
    });
  }
});



// Menü ekle
cinemas[0].addMenuItem({ name: "Popcorn", price: 5 });
cinemas[0].addMenuItem({ name: "Coca Cola", price: 3 });
cinemas[1].addMenuItem({ name: "Nachos", price: 6 });
cinemas[1].addMenuItem({ name: "Fanta", price: 3 });

export const cineGroupInfo = {
  title: "CineGrup Kinos",
  description: "Ihr vertrauenswürdiger Begleiter für die besten Kinoerlebnisse.",
  logo: "./assets/logo/cinegrup.png",
  footerLogo: "./assets/logo/footer/cinegrup2.png",
  footer: "© 2024 CineGrup, entwickelt von OG.",
  address: "Deutschlandweit verfügbar.",
  phone: "(+888) 123 456 765",
  email: "cinegrup@cinegrup.com",
  map: "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BERLIN",
  facebook: "#",
  twitter: "#",
  youtube: "#",
  instagram: "#",
  telegram: "#",
  whatsup: "#",
  design: "OG",
  get footer() {
    return `© 2024 CineGrup, entwickelt von ${this.design}`;
  },
};
