// File: /scripts/components/carousel.js

export function createCarousel(items) {
    if (!items || items.length === 0) return `<p>Carousel için öğe yok.</p>`;

    const carouselContent = items
        .map(
            (item, index) => `
            <div class="carousel-item ${index === 0 ? "active" : ""}" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" />
                <div class="carousel-caption">${item.title}</div>
            </div>
        `
        )
        .join("");

    return `
        <div class="carousel">
            <div class="carousel-inner">
                ${carouselContent}
            </div>
            <button class="carousel-control-prev">&lt;</button>
            <button class="carousel-control-next">&gt;</button>
        </div>
    `;
}

export function setupCarousel() {
    const carousel = document.querySelector(".carousel");
    const items = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".carousel-control-prev");
    const nextButton = document.querySelector(".carousel-control-next");

    let currentIndex = 0;

    function updateCarousel(newIndex) {
        items[currentIndex].classList.remove("active");
        currentIndex = (newIndex + items.length) % items.length;
        items[currentIndex].classList.add("active");
    }

    prevButton.addEventListener("click", () => updateCarousel(currentIndex - 1));
    nextButton.addEventListener("click", () => updateCarousel(currentIndex + 1));
}
