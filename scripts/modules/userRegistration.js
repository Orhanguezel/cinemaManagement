// File: /scripts/modules/userRegistration.js

import { registerUser, loginUser } from "./membershipSystem.js";

// Kullanıcı kaydı
export function handleUserRegistration(formData) {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return false;
    }

    const isRegistered = registerUser({ name, email, password });
    if (isRegistered) {
        alert("Kayıt başarılı! Lütfen giriş yapın.");
        return true;
    } else {
        alert("Bu e-posta zaten kullanılıyor.");
        return false;
    }
}

// Kullanıcı oturum açma
export function handleUserLogin(formData) {
    const { email, password } = formData;

    if (!email || !password) {
        alert("Lütfen tüm alanları doldurun.");
        return false;
    }

    const isLoggedIn = loginUser({ email, password });
    if (isLoggedIn) {
        alert("Giriş başarılı! Hoş geldiniz.");
        return true;
    } else {
        alert("Geçersiz giriş bilgileri.");
        return false;
    }
}
