// File: /scripts/features/notifications.js

export function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Bildirim türleri: info, success, warning, error
export function notifySuccess(message) {
    showNotification(message, "success");
}

export function notifyError(message) {
    showNotification(message, "error");
}

export function notifyWarning(message) {
    showNotification(message, "warning");
}

export function notifyInfo(message) {
    showNotification(message, "info");
}
