// File: /scripts/components/sidebar.js

export function createSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        console.error("Sidebar öğesi bulunamadı!");
        return;
    }

    sidebar.innerHTML = `
        <div class="sidebar">
            <h3>Kategoriler</h3>
            <ul>
                <li><a href="#movies">Filmler</a></li>
                <li><a href="#cinemas">Sinemalar</a></li>
                <li><a href="#blog">Blog</a></li>
            </ul>
            <div class="sidebar-cart">
                <span>Sepet:</span>
                <span id="cartCount">0</span>
            </div>
        </div>
    `;
}
