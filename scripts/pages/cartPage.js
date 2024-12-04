// File: /scripts/pages/cartPage.js

import { getCart, clearCart } from "../modules/cartHandler.js";
import { showModal } from "../components/modal.js";

export function renderCartPage() {
    const mainContent = document.getElementById("mainContent");
    const cart = getCart();

    if (!mainContent) {
        console.error("Main content bulunamadı!");
        return;
    }

    if (cart.length === 0) {
        mainContent.innerHTML = "<p>Sepetiniz şu an boş.</p>";
        return;
    }

    const cartItems = cart
        .map(
            (item, index) => `
        <div class="cart-item">
            <h3>${item.name}</h3>
            <p>Fiyat: ${item.price.toFixed(2)} €</p>
            <button class="btn-secondary remove-item" data-index="${index}">Kaldır</button>
        </div>
    `
        )
        .join("");

    mainContent.innerHTML = `
        <h2>Sepet</h2>
        ${cartItems}
        <button id="clearCartButton" class="btn-danger">Sepeti Temizle</button>
    `;

    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (e) => {
            const itemIndex = parseInt(e.target.dataset.index, 10);
            removeCartItem(itemIndex);
        });
    });

    document.getElementById("clearCartButton").addEventListener("click", () => {
        if (confirm("Sepeti temizlemek istediğinize emin misiniz?")) {
            clearCart();
            renderCartPage();
        }
    });
}

// Sepetten ürün kaldır
function removeCartItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    clearCart();
    setCart(cart);
    renderCartPage();
}
