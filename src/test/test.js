import { cinemas } from "../scripts/2.iliskilerveAtamalar/data/Cinemas.js";
import { salons } from "../scripts/2.iliskilerveAtamalar/data/Salons.js";
import { assignSalonsToCinemas } from "./salonAssignment.js";
import { assignSeatsToSalons } from "./seatAssignment.js";
import { assignFilmsToSalons } from "./filmAssignment.js";
import { state, checkState } from "./stateManager.js";

try {
    checkState("assignSalons"); // Salon atama kontrolü
    assignSalonsToCinemas(cinemas, salons);
  
    checkState("assignSeats"); // Koltuk atama kontrolü
    assignSeatsToSalons(cinemas);
  } catch (error) {
    console.error(error.message);
  }
  

