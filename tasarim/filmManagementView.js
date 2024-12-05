export function renderFilmManagementView(cinemas) {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Önceki içeriği temizle

  const title = document.createElement("h2");
  title.innerText = "Gösterim Yönetimi";
  app.appendChild(title);

  cinemas.forEach((cinema) => {
    const cinemaContainer = document.createElement("div");
    const cinemaTitle = document.createElement("h3");
    cinemaTitle.innerText = cinema.name;

    cinemaContainer.appendChild(cinemaTitle);

    cinema.salons.forEach((salon) => {
      const salonInfo = document.createElement("p");
      salonInfo.innerText = `Salon: ${salon.name} | Kapasite: ${salon.seatsList.length}`;
      cinemaContainer.appendChild(salonInfo);

      const addShowtimeButton = document.createElement("button");
      addShowtimeButton.innerText = "Gösterim Ekle";
      addShowtimeButton.onclick = () => addShowtime(salon);
      cinemaContainer.appendChild(addShowtimeButton);
    });

    app.appendChild(cinemaContainer);
  });
}

function addShowtime(salon) {
  const showtime = prompt("Gösterim zamanı giriniz (örnek: 20:00):");
  if (showtime) {
    if (!salon.showtimes) salon.showtimes = [];
    salon.showtimes.push(showtime);
    alert(`Gösterim zamanı eklendi: ${showtime}`);
  }
}
