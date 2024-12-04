// File: /scripts/components/navbar.js

export function loadNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) {
        console.error("Navbar öğesi bulunamadı!");
        return;
    }

    navbar.innerHTML = `
        <nav class="navbar">
            <ul>
                <li><a href="#home">Anasayfa</a></li>
                <li><a href="#about">Hakkımızda</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">İletişim</a></li>
                <li><a href="#cart">Sepet</a></li>
            </ul>
        </nav>
    `;
}
