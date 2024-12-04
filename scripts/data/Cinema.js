import { salons } from "./Salon.js";
import { films } from "./Film.js";

export class Cinema {
  constructor(id, name, address, logo, description) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.logo = logo;
    this.description = description;
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
    "Erleben Sie die besten Filme bei Cineplex Berlin!"
  ),
  new Cinema(
    2,
    "Cineplex Köln",
    "Karl-Marx-Straße 66, 12043 Köln",
    "./assets/logo/cinekoln.png",
    "Genießen Sie ein einmaliges Kinoerlebnis bei Cineplex Köln."
  ),
  new Cinema(
    3,
    "Cineplex Hamburg",
    "Mönckebergstraße 10, 20095 Hamburg",
    "./assets/logo/cinehamburg.png",
    "Genießen Sie die besten Filme in Hamburg!"
  ),
  new Cinema(
    4,
    "Cineplex München",
    "Leopoldstraße 82, 80802 München",
    "./assets/logo/cinemunich.png",
    "Die besten Filme in der bayerischen Hauptstadt!"
  ),
  new Cinema(
    5,
    "Cineplex Stuttgart",
    "Königstraße 56, 70173 Stuttgart",
    "./assets/logo/cinestuttgart.png",
    "Filme und Unterhaltung in Stuttgart."
  ),
  new Cinema(
    6,
    "Cineplex Frankfurt",
    "Zeil 101, 60313 Frankfurt am Main",
    "./assets/logo/cinefrankfurt.png",
    "Kino und Spaß im Herzen von Frankfurt."
  ),
  new Cinema(
    7,
    "Cineplex Düsseldorf",
    "Schadowstraße 50, 40212 Düsseldorf",
    "./assets/logo/cinedusseldorf.png",
    "Ihr Kinoerlebnis in Düsseldorf."
  ),
  new Cinema(
    8,
    "Cineplex Leipzig",
    "Hainstraße 6, 04109 Leipzig",
    "./assets/logo/cineleipzig.png",
    "Erleben Sie fantastische Filme in Leipzig."
  ),
  new Cinema(
    9,
    "Cineplex Bremen",
    "Ostertorsteinweg 1, 28203 Bremen",
    "./assets/logo/cinebremen.png",
    "Kinovergnügen in Bremen."
  ),
  new Cinema(
    10,
    "Cineplex Hannover",
    "Lister Meile 25, 30161 Hannover",
    "./assets/logo/cinehannover.png",
    "Die besten Filme in Hannover."
  )
];

// Her sinemaya salon ekle
cinemas.forEach((cinema) => {
  salons.forEach((salon) => {
    cinema.addSalon({ ...salon, id: `${cinema.id}-${salon.id}` });
  });
});

// Gösterimleri ekle
cinemas.forEach((cinema) => {
  films.slice(0, 3).forEach((film, idx) => {
    cinema.addShow({
      film,
      salon: cinema.salons[idx % cinema.salons.length],
      time: `1${idx + 2}:00`,
    });
  });
});

// Menü ekle
cinemas[0].addMenuItem({ name: "Popcorn", price: 5 });
cinemas[0].addMenuItem({ name: "Coca Cola", price: 3 });
cinemas[1].addMenuItem({ name: "Nachos", price: 6 });
cinemas[1].addMenuItem({ name: "Fanta", price: 3 });
