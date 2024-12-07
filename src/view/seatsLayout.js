// seatsLayout.js dosyası içerisinde koltuk düzeni oluşturmak için gerekli fonksiyonlar bulunmaktadır.
export function generateSeatsLayout(salon) {
  const seatsContainer = document.createElement("div");
  seatsContainer.className = "seats-container";

  // Satırları oluştur
  const rows = salon.seatsList.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  Object.keys(rows)
    .sort()
    .forEach((rowKey) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "seat-row";

      // Satır adı (A, B, C...)
      const rowLabel = document.createElement("div");
      rowLabel.className = "seat-row-label";
      rowLabel.innerText = rowKey;
      rowDiv.appendChild(rowLabel);

      // Koltuklar
      rows[rowKey].forEach((seat) => {
        const seatDiv = document.createElement("div");
        seatDiv.className = `seat ${seat.status === "boş" ? "available" : "occupied"}`;
        seatDiv.innerText = `${seat.row}${seat.number}`; // Koltuk adı (A1, B3, vb.)

        // Event Listener (Seçim için)
        if (seat.status === "boş") {
          seatDiv.addEventListener("click", () => {
            seat.status = "dolu";
            seatDiv.className = "seat occupied";
            console.log(`Koltuk ${seat.row}${seat.number} seçildi.`);
          });
        }

        rowDiv.appendChild(seatDiv);
      });

      seatsContainer.appendChild(rowDiv);
    });

  return seatsContainer;
}

