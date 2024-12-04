// File: /scripts/components/blogCard.js

export function createBlogCard(blog) {
    return `
        <div class="blog-card">
            <h3>${blog.title}</h3>
            <p>${blog.excerpt}</p>
            <a href="${blog.url}" class="btn-primary" target="_blank">Devamını Oku</a>
        </div>
    `;
}
