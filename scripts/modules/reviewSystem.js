// File: /scripts/modules/reviewSystem.js

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Yorum ekle
export function addReview(movieId, review) {
    reviews.push({ movieId, ...review });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    alert("Yorum başarıyla eklendi!");
}

// Filmler için yorumları al
export function getReviews(movieId) {
    return reviews.filter((review) => review.movieId === movieId);
}

// Yorumları render et
export function renderReviews(movieId, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' bulunamadı.`);
        return;
    }

    const movieReviews = getReviews(movieId);

    container.innerHTML = movieReviews.length
        ? movieReviews
              .map(
                  (review) => `
            <div class="review">
                <p><strong>${review.user}</strong>: ${review.comment}</p>
                <p><em>Rating: ${review.rating}/5</em></p>
            </div>
        `
              )
              .join("")
        : "<p>Bu film için henüz yorum yapılmadı.</p>";
}
