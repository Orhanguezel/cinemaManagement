import { getCinemaById, getCinemaSalons } from "../management/cinemaManagement.js";
import { showModal, closeModal } from "./modalHandler.js";
import { setCart, getCart } from "./checkoutHandler.js";
import { showCartModal } from "./paymentProcessing.js";

// İndirim ve özel gün sabitleri
const DISCOUNTS = {
  child: 0.3,
  publicDay: 0.2,
};

const PUBLIC_DAYS = ["Monday", "Wednesday"];

// Koltuk Yönetimi Sınıfı
class SeatManager {
  constructor(container) {
    this.container = container;
    this.seats = [];
  }

  createSeats(totalSeats, seatsPerRow, occupancyRate = 0.3) {
    this.seats = [];
    const rowsCount = Math.ceil(totalSeats / seatsPerRow);
    for (let i = 0; i < rowsCount; i++) {
      const rowLetter = String.fromCharCode(65 + i);
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatIndex = i * seatsPerRow + j;
        if (seatIndex > totalSeats) break;
        const isOccupied = Math.random() < occupancyRate;
        this.seats.push({
          row: rowLetter,
          number: j,
          occupied: isOccupied,
          selected: false,
        });
      }
    }
  }

  renderSeats() {
    this.container.innerHTML = "";
    this.seats.forEach((seat) => {
      const seatElement = document.createElement("div");
      seatElement.classList.add("seat", seat.occupied ? "occupied" : "available");
      seatElement.textContent = `${seat.row}${seat.number}`;
      if (!seat.occupied) {
        seatElement.addEventListener("click", () => this.toggleSelection(seat, seatElement));
      }
      this.container.appendChild(seatElement);
    });
  }

  toggleSelection(seat, seatElement) {
    seat.selected = !seat.selected;
    seatElement.classList.toggle("selected", seat.selected);
  }

  getSelectedSeats() {
    return this.seats.filter((seat) => seat.selected);
  }
}

// Ana Koltuk Seçim İşlevi
export function showSeatSelection(cinemaId, salonId, selectedDate, selectedTime) {
  const cinema = getCinemaById(Number(cinemaId));
  const salon = getCinemaSalons(Number(cinemaId))?.find((s) => s.id === Number(salonId));

  if (!cinema || !salon) {
    alert("Sinema veya salon bilgisi bulunamadı!");
    return;
  }

  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `
    <div class="hall">
      <div class="hall__screen">Leinwand</div>
      <div class="seats"></div>
      <div class="info-box">
        <p class="info-box__price">Ausgewählte Plätze: 0</p>
        <button id="confirmSeats" class="button" disabled>Weiter</button>
      </div>
    </div>
  `;

  const seatContainer = document.querySelector(".seats");
  const seatManager = new SeatManager(seatContainer);
  seatManager.createSeats(salon.seats, 10); // Her satırda 10 koltuk
  seatManager.renderSeats();

  const confirmButton = document.getElementById("confirmSeats");
  const priceInfo = document.querySelector(".info-box__price");

  seatContainer.addEventListener("click", () => {
    const selectedSeats = seatManager.getSelectedSeats();
    priceInfo.textContent = `Ausgewählte Plätze: ${selectedSeats.length}`;
    confirmButton.disabled = selectedSeats.length === 0;
  });

  confirmButton.addEventListener("click", () => {
    const selectedSeats = seatManager.getSelectedSeats();
    showSeatSummary(selectedSeats, cinema, salon, selectedDate, selectedTime);
  });
}

// Koltuk Özeti Gösterir
function showSeatSummary(selectedSeats, cinema, salon, selectedDate, selectedTime) {
  const modalContent = `
    <h3>Ausgewählte Plätze:</h3>
    <ul>
      ${selectedSeats.map((seat) => `<li>${seat.row}${seat.number}</li>`).join("")}
    </ul>
    <button id="enterDetails" class="button">Weiter</button>
  `;

  showModal(modalContent);

  document.getElementById("enterDetails").addEventListener("click", () => {
    enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime);
  });
}

// Müşteri Bilgilerini Alır
function enterDetails(selectedSeats, cinema, salon, selectedDate, selectedTime) {
  const modalContent = `
    <h3>Kundendetails</h3>
    <form id="detailsForm">
      ${selectedSeats
        .map(
          (seat, index) => `
        <div class="customer-details">
          <h4>Sitzplatz: ${seat.row}${seat.number}</h4>
          <input type="text" id="name${index}" placeholder="Vorname" required>
          <input type="text" id="surname${index}" placeholder="Nachname" required>
          <select id="category${index}">
            <option value="adult">Erwachsener</option>
            <option value="child">Kind</option>
          </select>
        </div>
      `
        )
        .join("")}
      <button type="button" id="addToCart" class="btn-primary">In den Warenkorb</button>
    </form>
  `;

  showModal(modalContent);

  document.getElementById("addToCart").addEventListener("click", () => {
    addToCart(selectedSeats, cinema, salon, selectedDate, selectedTime);
  });
}

// Sepete Ekleme İşlemi
function addToCart(selectedSeats, cinema, salon, selectedDate, selectedTime) {
  const details = selectedSeats.map((seat, index) => {
    const name = document.getElementById(`name${index}`).value;
    const surname = document.getElementById(`surname${index}`).value;
    const category = document.getElementById(`category${index}`).value;

    if (!name || !surname) {
      alert("Bitte füllen Sie alle Felder aus.");
      return null;
    }

    let price = salon.price;
    if (category === "child") price *= 1 - DISCOUNTS.child;

    const dayName = new Date(selectedDate).toLocaleString("de-DE", { weekday: "long" });
    if (PUBLIC_DAYS.includes(dayName)) price *= 1 - DISCOUNTS.publicDay;

    return {
      cinema: cinema.name,
      salon: salon.name,
      seat: `${seat.row}${seat.number}`,
      price: parseFloat(price.toFixed(2)),
      name,
      surname,
      category,
      date: selectedDate,
      time: selectedTime,
    };
  });

  if (details.includes(null)) return;

  setCart([...getCart(), ...details]);
  alert("Tickets wurden dem Warenkorb hinzugefügt!");
  closeModal();
  showPaymentModal();
}

// Ödeme Modalını Gösterir
function showPaymentModal() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Ihr Warenkorb ist leer!");
    return;
  }
  showCartModal();
}
