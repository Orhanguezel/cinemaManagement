// app.js
const app = document.getElementById("app");

// Dinamik içerikleri oluşturmak için bir fonksiyon
function createLayout() {
    // Grid container
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // Bölümleri tanımlıyoruz
    const sections = [
        { id: "hamburger-menu", className: "grid-hamburger-menu", content: "Hamburger Menu" },
        { id: "header-logo", className: "header-logo", content: "Logo" },
        { id: "header-nav", className: "header-nav", content: "Header Navigation" },
        { id: "sidebar", className: "grid-sidebar", content: "Sidebar" },
        { id: "main-content", className: "main-content", content: "Main Content" },
        { id: "top-section", className: "top-section", content: "Top Section" },
        { id: "about-section", className: "grid-about", content: "About uns Section" },
        { id: "movie-section", className: "grid-movie", content: "Movie Section" },
        { id: "blog-section", className: "grid-blog", content: "Blog Section" },
        { id: "footer", className: "grid-footer", content: "Footer" }
    ];

    // Bölümleri grid container'a ekliyoruz
    sections.forEach(section => {
        const div = document.createElement("div");
        div.id = section.id; // ID ekleniyor
        div.className = section.className; // Class ekleniyor
        div.textContent = section.content; // İçerik ekleniyor
        gridContainer.appendChild(div); // Grid container'a ekle
    });

    // Grid container'ı app içine ekle
    app.appendChild(gridContainer);
}

// Layout'u oluştur
createLayout();
