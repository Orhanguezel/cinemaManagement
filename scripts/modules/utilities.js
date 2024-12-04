// File: /scripts/modules/utilities.js

// Tarih formatlama
export function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("de-DE", options);
}

// Para birimini formatlama
export function formatCurrency(amount) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(amount);
}

// Bir öğenin görünürlüğünü değiştirme
export function toggleVisibility(element, isVisible) {
    if (!element) return;
    element.style.display = isVisible ? "block" : "none";
}

// Rastgele bir ID oluşturma
export function generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
}

// Form girişlerini doğrulama
export function validateForm(inputs) {
    for (const input of inputs) {
        if (!input.value.trim()) {
            alert(`${input.name} alanı boş bırakılamaz.`);
            input.focus();
            return false;
        }
    }
    return true;
}

// Yerel depodan veri alma
export function getFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.error(`Yerel depodan veri alınamadı: ${key}`, error);
        return null;
    }
}

// Yerel depoya veri kaydetme
export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Yerel depoya veri kaydedilemedi: ${key}`, error);
    }
}

// Dizi öğelerini eşsiz hale getirme
export function getUniqueArray(arr, key) {
    const uniqueMap = new Map();
    arr.forEach((item) => {
        if (!uniqueMap.has(item[key])) {
            uniqueMap.set(item[key], item);
        }
    });
    return Array.from(uniqueMap.values());
}
