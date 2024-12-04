// File: /scripts/features/blog.js

import { getBlogPosts } from "../modules/blogManagement.js";

export function loadBlogPage() {
    const mainContent = document.getElementById("mainContent");
    if (!mainContent) {
        console.error("Ana içerik alanı bulunamadı!");
        return;
    }

    const blogPosts = getBlogPosts();

    if (!blogPosts.length) {
        mainContent.innerHTML = `
            <section class="blog">
                <h2>Blog</h2>
                <p>Henüz bir blog gönderisi yok.</p>
            </section>
        `;
        return;
    }

    const blogContent = blogPosts
        .map(
            (post) => `
            <article class="blog-post">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="${post.url}" class="btn-primary" target="_blank">Devamını Oku</a>
            </article>
        `
        )
        .join("");

    mainContent.innerHTML = `
        <section class="blog">
            <h2>Blog</h2>
            <div class="blog-posts">
                ${blogContent}
            </div>
        </section>
    `;
}
