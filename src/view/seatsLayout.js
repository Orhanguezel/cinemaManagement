// seatsLayout.js
export function generateSeatsLayout(salon) {
    const seatsContainer = document.createElement("div");
    seatsContainer.className = "seats-container";
  
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
  
        const rowLabel = document.createElement("div");
        rowLabel.className = "seat-row-label";
        rowLabel.innerText = rowKey; // Satır ismi (A, B, C...)
        rowDiv.appendChild(rowLabel);
  
        rows[rowKey].forEach((seat) => {
          const seatDiv = document.createElement("div");
          seatDiv.className = `seat ${seat.status === "boş" ? "available" : "occupied"}`;
          seatDiv.innerText = seat.number;
  
          // Event Listener (Boş koltuk seçilebilir)
          if (seat.status === "boş") {
            seatDiv.addEventListener("click", () => {
              seat.status = "dolu";
              seatDiv.className = "seat occupied";
              console.log(`Koltuk ${seat.label} seçildi.`);
            });
          }
  
          rowDiv.appendChild(seatDiv);
        });
  
        seatsContainer.appendChild(rowDiv);
      });
  
    return seatsContainer;
  }
  
