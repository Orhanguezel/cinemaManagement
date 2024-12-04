// File: /scripts/pages/aboutPage.js

import { getAboutUsContent } from "../features/aboutUs.js";

export function renderAboutPage() {
    const mainContent = document.getElementById("mainContent");
    const aboutUsContent = getAboutUsContent();

    mainContent.innerHTML = `
        <h2>Über uns</h2>
        <p>${aboutUsContent.description}</p>
        <ul>
            ${aboutUsContent.highlights.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
}
