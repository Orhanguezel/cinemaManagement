// File: /scripts/modules/blogManagement.js

import { renderBlogCard } from "../components/blogCard.js";

let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// Blog yazısı ekle
export function addBlogPost(post) {
    blogPosts.push(post);
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    alert("Blog yazısı başarıyla eklendi!");
}

// Blog yazılarını al
export function getBlogPosts() {
    return blogPosts;
}

// Blog yazılarını görüntüle
export function renderBlogPosts(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' bulunamadı.`);
        return;
    }

    container.innerHTML = blogPosts
        .map((post) => renderBlogCard(post))
        .join("");
}
