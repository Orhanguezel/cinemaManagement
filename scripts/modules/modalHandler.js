export function showModal(content, options = {}) {
    const { modalId = "defaultModal", title = "", closable = true, onClose = null } = options;

    closeModal(modalId); // Önce aynı ID'ye sahip varsa eski modalı kapat

    // Overlay oluştur
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.setAttribute("data-modal-id", modalId);

    // Modal oluştur
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("data-modal-id", modalId);

    // Başlık ve içerik ekle
    modal.innerHTML = `
        ${title ? `<div class="modal-header"><h3>${title}</h3></div>` : ""}
        <div class="modal-body">${content}</div>
        ${
            closable
                ? `<div class="modal-footer">
                    <button class="btn-secondary close-button" data-modal-id="${modalId}">Schließen</button>
                </div>`
                : ""
        }
    `;

    // Kapatma butonuna tıklama işlemi
    if (closable) {
        modal.querySelector(".close-button").addEventListener("click", () => {
            closeModal(modalId);
            if (typeof onClose === "function") onClose();
        });
    }

    // Overlay tıklama ile kapatma
    overlay.addEventListener("click", () => {
        if (closable) {
            closeModal(modalId);
            if (typeof onClose === "function") onClose();
        }
    });

    // Modal ve Overlay'i body'ye ekle
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
}

export function closeModal(modalId = "defaultModal") {
    const overlay = document.querySelector(`.overlay[data-modal-id="${modalId}"]`);
    const modal = document.querySelector(`.modal[data-modal-id="${modalId}"]`);

    if (overlay) overlay.remove();
    if (modal) modal.remove();
}
