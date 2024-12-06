export function renderSeatsView(cinemas) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Önceki içeriği temizle
  
    cinemas.forEach((cinema) => {
      const cinemaTitle = document.createElement("h2");
      cinemaTitle.innerText = cinema.name;
      app.appendChild(cinemaTitle);
  
      cinema.salons.forEach((salon) => {
        const salonContainer = document.createElement("div");
        salonContainer.className = "hall";
  
        const screen = document.createElement("div");
        screen.className = "hall__screen";
        screen.innerText = "Leinwand";
  
        const seatsContainer = document.createElement("div");
        seatsContainer.className = "seats";
  
        salon.seatsList.forEach((seat, index) => {
          if (index % 10 === 0) {
            const seatRow = document.createElement("div");
            seatRow.className = "seat-row";
            seatsContainer.appendChild(seatRow);
          }
  
          const seatDiv = document.createElement("div");
          seatDiv.className = `seat ${seat.status === "dolu" ? "occupied" : "available"}`;
          seatDiv.innerText = seat.number;
          seatsContainer.lastChild.appendChild(seatDiv);
        });
  
        salonContainer.appendChild(screen);
        salonContainer.appendChild(seatsContainer);
        app.appendChild(salonContainer);
      });
    });
  }
  