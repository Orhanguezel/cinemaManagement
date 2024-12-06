import { cinemas } from "./Cinemas.js";
import { films } from "./Films.js";
import { salons } from "./Salons.js";

export function assignCinemasToSalons() {
  cinemas.forEach((cinema) => {
    cinema.salons.forEach((salon) => {
      // Sinema bilgilerini salona ekle
      salon.cinemaId = cinema.id;
      salon.cinemaName = cinema.name;
    });
  });
  console.log("Salonlara sinema bilgisi atandı!");
}
