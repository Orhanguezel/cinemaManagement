// File: /scripts/features/userProfile.js

import { getLoggedInUser, updateUserDetails } from "../modules/membershipSystem.js";

export function loadUserProfile() {
    const user = getLoggedInUser();

    if (!user) {
        alert("Lütfen önce giriş yapın.");
        return;
    }

    const mainContent = document.getElementById("mainContent");
    if (!mainContent) {
        console.error("Ana içerik alanı bulunamadı!");
        return;
    }

    mainContent.innerHTML = `
        <section class="user-profile">
            <h2>Profil Bilgileri</h2>
            <form id="profileForm">
                <label for="username">Kullanıcı Adı:</label>
                <input type="text" id="username" value="${user.username}" required>
                <label for="email">E-Posta:</label>
                <input type="email" id="email" value="${user.email}" disabled>
                <label for="password">Yeni Şifre:</label>
                <input type="password" id="password" placeholder="Yeni şifre">
                <button type="submit" class="btn-primary">Güncelle</button>
            </form>
        </section>
    `;

    document.getElementById("profileForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedDetails = {
            username: document.getElementById("username").value.trim(),
            password: document.getElementById("password").value.trim(),
        };

        if (updateUserDetails(updatedDetails)) {
            alert("Profil bilgileri güncellendi!");
        }
    });
}
