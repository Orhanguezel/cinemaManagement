export function initializeStartPage() {
    document.body.innerHTML = ""; // Tüm içerikleri temizle
  
    const container = document.createElement("div");
    container.id = "start-panel";
    container.style.textAlign = "center";
    container.style.marginTop = "50px";
  
    const title = document.createElement("h1");
    title.innerText = "Sinema Yönetim Sistemi";
    title.style.marginBottom = "20px";
    container.appendChild(title);
  
    const description = document.createElement("p");
    description.innerText = "Lütfen bir işlem seçiniz.";
    description.style.marginBottom = "20px";
    container.appendChild(description);
  
    document.body.appendChild(container);
  }
  