// Category.js'den verileri çekiyoruz
import { categories } from "../data/Category.js";
import { films } from "../data/Movies.js"; // Filmlerle kategori ilişkilendirmesi için

// **Kategori Listesini Getir**
export function getCategoryList() {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));
}

// **Kategori ID'ye Göre Filmleri Getir**
export function getFilmsByCategory(categoryId) {
  return films.filter((film) => film.categories.includes(categoryId));
}

// **HTML Olarak Kategori Listesini Render Et**
export function renderCategoryList() {
  return categories
    .map(
      (category) =>
        `<div class="category-item">
          <h3>${category.name}</h3>
          <p>${category.description}</p>
        </div>`
    )
    .join("");
}

// **Kategoriye Göre Film Listesini Render Et**
export function renderFilmsByCategory(categoryId) {
  const filmsInCategory = getFilmsByCategory(categoryId);
  if (filmsInCategory.length === 0) {
    return `<p>Bu kategoride film bulunmamaktadır.</p>`;
  }

  return filmsInCategory
    .map(
      (film) =>
        `<div class="film-item">
          <h4>${film.name}</h4>
          <p>Süre: ${film.duration} dakika</p>
          <img src="${film.image}" alt="${film.name}" style="width: 100px;">
        </div>`
    )
    .join("");
}

// **Test İçin Örnek Kullanım**
categories.forEach((category) => {
  console.log(`Kategori: ${category.name}`);
  console.log("Filmler:");
  console.log(getFilmsByCategory(category.id).map((film) => film.name));
});

// **HTML Testi**
console.log(renderCategoryList());
categories.forEach((category) => {
  console.log(`Kategori: ${category.name}`);
  console.log(renderFilmsByCategory(category.id));
});
