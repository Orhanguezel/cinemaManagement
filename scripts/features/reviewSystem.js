// File: /scripts/features/reviewSystem.js

// Mock Veri: Yorumlar
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Yorumları alma
export function getReviews(filmId) {
    return reviews.filter(review => review.filmId === filmId);
}

// Yeni yorum ekleme
export function addReview(filmId, userName, rating, comment) {
    const newReview = { filmId, userName, rating, comment, date: new Date().toISOString() };
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Yorumları render etme
export function renderReviews(filmId) {
    const reviewContainer = document.getElementById("reviewSection");
    const filmReviews = getReviews(filmId);

    reviewContainer.innerHTML = filmReviews.map(review => `
        <div class="review">
            <p><strong>${review.userName}</strong> (${new Date(review.date).toLocaleDateString()}):</p>
            <p>Bewertung: ${"⭐".repeat(review.rating)}</p>
            <p>${review.comment}</p>
        </div>
    `).join("");

    if (filmReviews.length === 0) {
        reviewContainer.innerHTML = `<p>Keine Bewertungen verfügbar. Seien Sie der Erste, der bewertet!</p>`;
    }
}

// Yeni yorum formu
export function renderReviewForm(filmId) {
    const reviewFormContainer = document.getElementById("reviewForm");

    reviewFormContainer.innerHTML = `
        <h3>Hinterlassen Sie eine Bewertung</h3>
        <form id="addReviewForm">
            <label for="userName">Name:</label>
            <input type="text" id="userName" placeholder="Ihr Name" required>
            <label for="rating">Bewertung:</label>
            <select id="rating">
                <option value="5">5 - Hervorragend</option>
                <option value="4">4 - Sehr gut</option>
                <option value="3">3 - Gut</option>
                <option value="2">2 - Okay</option>
                <option value="1">1 - Schlecht</option>
            </select>
            <label for="comment">Kommentar:</label>
            <textarea id="comment" placeholder="Ihr Kommentar" required></textarea>
            <button type="submit" class="btn-primary">Senden</button>
        </form>
    `;

    document.getElementById("addReviewForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const userName = document.getElementById("userName").value.trim();
        const rating = parseInt(document.getElementById("rating").value, 10);
        const comment = document.getElementById("comment").value.trim();

        if (!userName || !comment) {
            alert("Bitte füllen Sie alle Felder aus.");
            return;
        }

        addReview(filmId, userName, rating, comment);
        renderReviews(filmId); // Yorumları yeniden render et
        e.target.reset(); // Formu sıfırla
    });
}
