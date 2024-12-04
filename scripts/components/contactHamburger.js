// File: /scripts/components/contactHamburger.js

export function setupContactHamburgerMenu() {
    const menuButton = document.getElementById("menuButton");
    const contactMenu = document.getElementById("contactMenu");

    if (!menuButton || !contactMenu) {
        console.error("MenuButton veya ContactMenu bulunamadı.");
        return;
    }

    menuButton.addEventListener("click", () => {
        contactMenu.classList.toggle("visible");
    });

    document.addEventListener("click", (e) => {
        if (!contactMenu.contains(e.target) && e.target !== menuButton) {
            contactMenu.classList.remove("visible");
        }
    });
}
