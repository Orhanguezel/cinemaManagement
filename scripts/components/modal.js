// File: /scripts/components/modal.js

export function showModal(content, modalId = "defaultModal") {
    const existingModal = document.querySelector(`.modal[data-id="${modalId}"]`);
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("data-id", modalId);
    modal.innerHTML = `
        <div class="modal-content">
            ${content}
            <button class="btn-secondary close-modal">Kapat</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => closeModal(modalId));
}

export function closeModal(modalId = "defaultModal") {
    const modal = document.querySelector(`.modal[data-id="${modalId}"]`);
    if (modal) modal.remove();
}
