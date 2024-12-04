// File: /scripts/modules/checkout.js

import { getCart, clearCart } from "./cartHandler.js";
import { showModal, closeModal } from "../components/modal.js";
import { processPayment } from "./paymentProcessing.js";

// Ödeme ekranını başlat
export function startCheckout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Sepetiniz boş. Önce bir ürün ekleyin.");
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const modalContent = `
        <h2>Ödeme</h2>
        <p>Toplam Tutar: ${totalPrice} €</p>
        <button id="confirmCheckout" class="btn-primary">Ödemeye Geç</button>
        <button id="cancelCheckout" class="btn-secondary">İptal</button>
    `;

    showModal(modalContent, "checkoutModal");

    document.getElementById("confirmCheckout").addEventListener("click", () => {
        closeModal("checkoutModal");
        processPayment(cart, totalPrice);
    });

    document.getElementById("cancelCheckout").addEventListener("click", () => {
        closeModal("checkoutModal");
    });
}

// Sipariş tamamlandı mesajı
export function completeCheckout() {
    clearCart();
    showModal("<p>Ödemeniz başarılı bir şekilde tamamlandı. Teşekkür ederiz!</p>");
}
