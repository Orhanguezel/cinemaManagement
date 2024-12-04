// File: /scripts/data/Discounts.js

export const DISCOUNTS = {
    child: 0.3, // Çocuk indirimi (%30)
    publicDay: 0.2, // Halk günü indirimi (%20)
};

export const PUBLIC_DAYS = ["Monday", "Wednesday"]; // Halk günleri

export function calculateDiscountedPrice(basePrice, category, day) {
    let price = basePrice;

    if (category === "child") {
        price -= basePrice * DISCOUNTS.child;
    }

    if (PUBLIC_DAYS.includes(day)) {
        price -= basePrice * DISCOUNTS.publicDay;
    }

    return parseFloat(price.toFixed(2));
}
