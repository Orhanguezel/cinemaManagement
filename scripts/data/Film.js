import { categories } from "./Category.js";

export class Film {
  constructor(id, name, duration, image, categoryIds = [], showtimes = []) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.image = image;
    this.categories = categoryIds; // Kategori ID'leri düz bir şekilde tutuluyor
    this.showtimes = showtimes;
  }
}

export const films = [
  new Film(1, "Avatar: Der Weg des Wassers", 180, "./assets/filmafis/default.jpg", [1, 2], ["12:00", "15:30", "19:00"]),
  new Film(2, "Oppenheimer", 195, "./assets/filmafis/default.jpg", [1, 2], ["10:30", "14:00", "18:00"]),
  new Film(3, "Barbie", 120, "./assets/filmafis/default.jpg", [3, 4], ["11:00", "13:30", "16:00"]),
  new Film(4, "The Marvels", 130, "./assets/filmafis/default.jpg", [5], ["12:45", "17:00", "20:30"]),
  new Film(5, "Dune: Teil 2", 155, "./assets/filmafis/default.jpg", [2, 5], ["14:00", "19:00"]),
  new Film(6, "Mörder des Blumenmondes", 206, "./assets/filmafis/default.jpg", [1], ["12:00", "16:00", "20:00"]),
  new Film(7, "The Dark Knight", 152, "./assets/filmafis/default.jpg", [1, 5], ["14:00", "19:30"]),
  new Film(8, "Inception", 148, "./assets/filmafis/default.jpg", [1, 2], ["13:00", "16:30", "20:00"]),
  new Film(9, "Interstellar", 169, "./assets/filmafis/default.jpg", [2, 5], ["10:00", "14:30", "18:30"]),
  new Film(10, "Titanic", 195, "./assets/filmafis/default.jpg", [1, 3], ["12:00", "17:00"]),
  new Film(11, "Frozen", 102, "./assets/filmafis/default.jpg", [4, 6], ["11:00", "15:30", "18:00"]),
  new Film(12, "Toy Story", 81, "./assets/filmafis/default.jpg", [4, 6], ["10:30", "14:00", "16:00"]),
  new Film(13, "The Lion King", 88, "./assets/filmafis/default.jpg", [4, 6], ["11:00", "13:30", "17:30"]),
  new Film(14, "The Godfather", 175, "./assets/filmafis/default.jpg", [1, 5], ["14:00", "20:00"]),
  new Film(15, "Pulp Fiction", 154, "./assets/filmafis/default.jpg", [1, 3], ["16:00", "21:00"]),
  new Film(16, "The Matrix", 136, "./assets/filmafis/default.jpg", [2, 5], ["12:00", "18:00"]),
  new Film(17, "The Avengers", 143, "./assets/filmafis/default.jpg", [5], ["14:00", "19:30"]),
  new Film(18, "Star Wars: A New Hope", 121, "./assets/filmafis/default.jpg", [2, 5], ["11:00", "15:00", "20:00"]),
  new Film(19, "Harry Potter and the Philosopher's Stone", 152, "./assets/filmafis/default.jpg", [2, 4], ["10:00", "13:30", "18:00"]),
  new Film(20, "Jurassic Park", 127, "./assets/filmafis/default.jpg", [2, 5], ["12:00", "17:00"])
];
