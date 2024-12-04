// File: /scripts/modules/menuSelection.js

import { setCart, getCart } from "./cartHandler.js";

let menuItems = JSON.parse(localStorage.getItem("menuItems")) || [];

// Menü öğeleri ekle
export function addMenuItem(item) {
    menuItems.push(item);
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
}

// Menü öğelerini al
export function getMenuItems() {
    return menuItems;
}

// Menüden bir öğe seç
export function selectMenuItem(itemId) {
    const selectedItem = menuItems.find((item) => item.id === itemId);
    if (!selectedItem) {
        console.error("Seçilen menü öğesi bulunamadı:", itemId);
        return;
    }

    const cart = getCart();
    cart.push(selectedItem);
    setCart(cart);

    alert("Menü öğesi sepete eklendi!");
}
