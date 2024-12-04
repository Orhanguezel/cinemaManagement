// File: /scripts/modules/membershipSystem.js

import { showModal } from "../components/modal.js";

// Kullanıcı verilerini yerel depoda saklama
const USERS_KEY = "cineGroupUsers";

// Yeni kullanıcı oluşturma
export function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        alert("Bu e-posta adresi zaten kullanılıyor.");
        return false;
    }

    users.push({ username, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    alert("Üyelik başarıyla oluşturuldu!");
    return true;
}

// Kullanıcı giriş yapma
export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
        alert("E-posta veya şifre hatalı.");
        return false;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert(`Hoş geldiniz, ${user.username}!`);
    return true;
}

// Çıkış yapma
export function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Başarıyla çıkış yaptınız!");
}

// Giriş yapmış kullanıcıyı getir
export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
}

// Kullanıcı bilgilerini güncelleme
export function updateUserDetails(newDetails) {
    const loggedInUser = getLoggedInUser();

    if (!loggedInUser) {
        alert("Önce giriş yapmalısınız!");
        return false;
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const userIndex = users.findIndex((user) => user.email === loggedInUser.email);

    if (userIndex === -1) {
        alert("Kullanıcı bulunamadı!");
        return false;
    }

    users[userIndex] = { ...users[userIndex], ...newDetails };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
    alert("Bilgileriniz başarıyla güncellendi!");
    return true;
}

// Üyelik formunu modal olarak gösterme
export function showMembershipForm() {
    const membershipFormContent = `
        <h2>Üyelik Formu</h2>
        <form id="membershipForm">
            <label for="username">Kullanıcı Adı:</label>
            <input type="text" id="username" required>
            <label for="email">E-Posta:</label>
            <input type="email" id="email" required>
            <label for="password">Şifre:</label>
            <input type="password" id="password" required>
            <div class="form-actions">
                <button type="button" id="registerButton" class="btn-primary">Kayıt Ol</button>
                <button type="button" id="loginButton" class="btn-secondary">Giriş Yap</button>
            </div>
        </form>
    `;

    showModal(membershipFormContent);

    document.getElementById("registerButton").addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username && email && password) {
            if (registerUser(username, email, password)) {
                closeModal();
            }
        } else {
            alert("Lütfen tüm alanları doldurun.");
        }
    });

    document.getElementById("loginButton").addEventListener("click", () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (email && password) {
            if (loginUser(email, password)) {
                closeModal();
            }
        } else {
            alert("Lütfen tüm alanları doldurun.");
        }
    });
}
