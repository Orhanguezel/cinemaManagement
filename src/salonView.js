import { salons } from "./data/Salons.js";
import { cinemas } from "./data/Cinemas.js";

export function renderSalonView() {
  const container = document.getElementById("main-content");
  if (!container) {
    console.error("Ana içerik bölgesi bulunamadı!");
    return;
  }

  container.innerHTML = `
    <h2>Salonlar</h2>
    <div class="salon-cards">
      ${salons.map(salon => `
        <div class="salon-card">
          <img src="${salon.image}" alt="${salon.name}" class="salon-image">
          <div class="salon-info">
            <h3>${salon.name}</h3>
            <p>Kapasite: ${salon.seats}</p>
            <p>Genişlik: ${salon.aisleWidth} m</p>
            <p>Fiyat: ${salon.price} €</p>
            <p>Özellikler: 
              ${salon.features.is3D ? "3D" : ""} 
              ${salon.features.isVIP ? "VIP" : ""} 
              ${salon.features.sound}
            </p>
            <p>Gösterim Saatleri: ${salon.showTimes.join(", ")}</p>
            <button onclick="editSalon(${salon.type})">Düzenle</button>
            <button onclick="deleteSalon(${salon.type})">Sil</button>
          </div>
        </div>
      `).join("")}
    </div>
    <button class="add-salon-button" onclick="addSalon()">Yeni Salon Ekle</button>
  `;

  // Salonların düzenleme olaylarını ayarla
  cinemas.forEach(cinema => {
    if (Array.isArray(cinema.salons)) {
      cinema.salons.forEach(salon => {
        const editButton = document.querySelector(`button[onclick="editSalon(${salon.type})"]`);
        if (editButton) {
          editButton.onclick = () => showSalonEditForm(cinema, salon);
        }
      });
    } else {
      console.warn(`Cinema ID ${cinema.id} için salons bir dizi değil.`);
    }
  });
}


export function editSalon(type) {
  const salon = salons.find(salon => salon.type === type);
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>${salon.name} Düzenleme</h2>
    <form>
      <label for="name">Salon Adı:</label>
      <input type="text" id="name" value="${salon.name}" required>
      
      <label for="seats">Kapasite:</label>
      <input type="number" id="seats" value="${salon.seats}" required>
      
      <label for="aisleWidth">Koltuk Genişliği:</label>
      <input type="number" id="aisleWidth" value="${salon.aisleWidth}" required>
      
      <label for="price">Fiyat:</label>
      <input type="number" id="price" value="${salon.price}" required>
      
      <button type="button" onclick="saveSalonChanges(${type})">Kaydet</button>
    </form>
    <button onclick="renderSalonView()">Geri</button>
  `;
}

export function saveSalonChanges(type) {
  const name = document.getElementById("name").value;
  const seats = parseInt(document.getElementById("seats").value, 10);
  const aisleWidth = parseInt(document.getElementById("aisleWidth").value, 10);
  const price = parseFloat(document.getElementById("price").value);

  const salonIndex = salons.findIndex(salon => salon.type === type);
  if (salonIndex !== -1) {
    salons[salonIndex].name = name;
    salons[salonIndex].seats = seats;
    salons[salonIndex].aisleWidth = aisleWidth;
    salons[salonIndex].price = price;

    alert("Değişiklikler kaydedildi!");
    renderSalonView();
  }
}


export function deleteSalon(type) {
  const confirmation = confirm("Bu salonu silmek istediğinizden emin misiniz?");
  if (confirmation) {
    const index = salons.findIndex(salon => salon.type === type);
    if (index !== -1) {
      salons.splice(index, 1);
      alert("Salon başarıyla silindi!");
      renderSalonView();
    }
  }
}


export function addSalon() {
  const container = document.getElementById("main-content");
  container.innerHTML = `
    <h2>Yeni Salon Ekle</h2>
    <form id="add-salon-form">
      <label for="name">Salon Adı:</label>
      <input type="text" id="name" placeholder="Salon Adı" required>
      
      <label for="image">Salon Görseli:</label>
      <input type="file" id="image" accept="image/*">
      
      <label for="seats">Kapasite:</label>
      <input type="number" id="seats" placeholder="Koltuk Sayısı" required>
      
      <label for="aisleWidth">Koltuk Genişliği:</label>
      <input type="number" id="aisleWidth" placeholder="Koltuk Genişliği (m)" required>
      
      <label for="features">Özellikler:</label>
      <div>
        <input type="checkbox" id="is3D"> 3D
        <input type="checkbox" id="isVIP"> VIP
      </div>
      
      <label for="sound">Ses Sistemi:</label>
      <input type="text" id="sound" placeholder="Ses Sistemi (örn. Dolby Atmos)" required>
      
      <label for="price">Fiyat:</label>
      <input type="number" id="price" placeholder="Bilet Fiyatı (€)" required>
      
      <label for="showTimes">Gösterim Saatleri:</label>
      <input type="text" id="showTimes" placeholder="Gösterim Saatleri (virgülle ayrılmış)">
      
      <button type="button" onclick="saveNewSalon()">Kaydet</button>
    </form>
    <button onclick="renderSalonView()">Geri</button>
  `;
}

export function saveNewSalon() {
  const name = document.getElementById("name").value;
  const imageInput = document.getElementById("image");
  const seats = parseInt(document.getElementById("seats").value, 10);
  const aisleWidth = parseInt(document.getElementById("aisleWidth").value, 10);
  const is3D = document.getElementById("is3D").checked;
  const isVIP = document.getElementById("isVIP").checked;
  const sound = document.getElementById("sound").value;
  const price = parseFloat(document.getElementById("price").value);
  const showTimes = document.getElementById("showTimes").value.split(",").map(time => time.trim());

  let image = "./assets/default-salon.png";
  if (imageInput.files && imageInput.files[0]) {
    const file = imageInput.files[0];
    image = URL.createObjectURL(file);
  }

  const newSalon = new Salon(
    salons.length + 1,
    name,
    image,
    seats,
    aisleWidth,
    { is3D, isVIP, sound },
    price,
    showTimes
  );

  salons.push(newSalon);

  // İlk sinemaya salonu ekleyin (örnek amaçlı)
  if (cinemas[0] && Array.isArray(cinemas[0].salons)) {
    cinemas[0].salons.push(newSalon);
  } else {
    console.warn("Sinemaya salon eklenemedi.");
  }

  alert("Yeni salon başarıyla eklendi!");
  renderSalonView();
}



window.renderSalonView = renderSalonView;
window.addSalon = addSalon;
window.saveNewSalon = saveNewSalon;
window.editSalon = editSalon;
window.saveSalonChanges = saveSalonChanges;
window.deleteSalon = deleteSalon;


