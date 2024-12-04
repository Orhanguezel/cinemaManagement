// File: /scripts/features/aboutUs.js

export function loadAboutUs() {
    const mainContent = document.getElementById("mainContent");
    if (!mainContent) {
        console.error("Ana içerik alanı bulunamadı!");
        return;
    }

    mainContent.innerHTML = `
        <section class="about-us">
            <h2>Hakkımızda</h2>
            <p>CineGrup, sinema deneyiminizi daha özel ve unutulmaz kılmak için var.</p>
            <p>Modern salonlarımız, en yeni filmlerimiz ve keyifli atmosferimizle sizi ağırlamaktan mutluluk duyarız.</p>
            <p>Misafirlerimize sunduğumuz en iyi hizmetlerle, sinema dünyasında bir adım öndeyiz.</p>
        </section>
    `;
}
