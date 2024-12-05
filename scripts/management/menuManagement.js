import { cinemas } from "../data/Cinemas.js";
import { menuItems } from "../data/Menu.js";

// Menü öğelerini bir sinemaya ekler
export function addMenuToCinema(cinemaId, itemIds) {
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Sinema ID ${cinemaId} bulunamadı.`);
    return;
  }

  const itemsToAdd = menuItems.filter((item) => itemIds.includes(item.id));
  cinema.menu = [...cinema.menu, ...itemsToAdd];

  console.log(`Sinema: ${cinema.name} için menü güncellendi.`);
}

// Tüm sinemalara menü öğelerini ekler
export function addMenuToAllCinemas(itemIds) {
  cinemas.forEach((cinema) => {
    addMenuToCinema(cinema.id, itemIds);
  });

  console.log("Tüm sinemalar için menü güncellendi.");
}

// Bir sinemanın menüsünü görüntüler
export function viewCinemaMenu(cinemaId) {
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    console.error(`Sinema ID ${cinemaId} bulunamadı.`);
    return;
  }

  console.log(`Sinema: ${cinema.name} Menüsü:`);
  cinema.menu.forEach((item) => {
    console.log(`  ${item.name} - ${item.price}€`);
  });
}

// Test İşlemleri
addMenuToCinema(1, [1, 2]); // Berlin sinemasına Popcorn ve Coca Cola ekle
addMenuToCinema(2, [3, 4]); // Köln sinemasına Nachos ve Fanta ekle

console.log("\nTüm Sinemalara Menü Ekliyoruz:");
addMenuToAllCinemas([5, 6]); // Tüm sinemalara Hotdog ve Sprite ekle

console.log("\nBerlin Sinemasının Menüsü:");
viewCinemaMenu(1); // Berlin sinemasının menüsünü görüntüle
