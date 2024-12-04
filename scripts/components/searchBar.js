// File: /scripts/components/searchBar.js

export function createSearchBar(placeholder = "Arama yap...") {
    return `
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="${placeholder}" />
            <button id="searchButton" class="btn-primary">Ara</button>
        </div>
    `;
}

export function setupSearch(callback) {
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    if (!searchButton || !searchInput) {
        console.error("Arama çubuğu öğeleri bulunamadı!");
        return;
    }

    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        callback(query);
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value.trim();
            callback(query);
        }
    });
}
