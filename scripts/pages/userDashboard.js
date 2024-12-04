// File: /scripts/pages/userDashboard.js

import { getUserInfo } from "../modules/membershipSystem.js";
import { getReservations } from "../modules/reservation.js";

// Kullanıcı kontrol panelini render etme
export function renderUserDashboard() {
    const mainContent = document.getElementById("mainContent");
    const user = getUserInfo();

    if (!user) {
        mainContent.innerHTML = `
            <h2>Benutzerprofil</h2>
            <p>Sie sind nicht angemeldet. Bitte melden Sie sich an, um fortzufahren.</p>
        `;
        return;
    }

    const reservations = getReservations(user.id);

    mainContent.innerHTML = `
        <h2>Willkommen, ${user.name}</h2>
        <p>Ihre Benutzer-ID: ${user.id}</p>
        <h3>Vergangene Reservierungen:</h3>
        <ul>
            ${reservations.length > 0 ? reservations.map(res => `
                <li>${res.cinema} - ${res.film} am ${new Date(res.date).toLocaleDateString()}</li>
            `).join("") : "<p>Keine Reservierungen gefunden.</p>"}
        </ul>
    `;
}
