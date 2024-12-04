// File: /scripts/utils.js

export function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("de-DE", options);
}

export function getDayOfWeek(date) {
    return new Date(date).toLocaleString("de-DE", { weekday: "long" });
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
