// File: /scripts/modules/orderManagement.js

import { getCart, clearCart } from "./cartHandler.js";

let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

// Siparişi kaydet
export function saveOrder() {
    const cart = getCart();
    if (cart.length === 0) {
        alert("Sepet boş, sipariş kaydedilemiyor.");
        return;
    }

    const order = {
        id: Date.now(),
        items: cart,
        date: new Date().toISOString(),
    };

    orderHistory.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    clearCart();
    alert("Sipariş başarıyla kaydedildi!");
}

// Sipariş geçmişini al
export function getOrderHistory() {
    return orderHistory;
}
