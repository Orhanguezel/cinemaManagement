export function renderNavbar(root, actions) {
  // Navbar container oluştur
  const navbar = document.createElement("div");
  navbar.style.display = "flex";
  navbar.style.justifyContent = "space-around";
  navbar.style.padding = "10px";
  navbar.style.backgroundColor = "#333";
  navbar.style.color = "#fff";

  // Her aksiyon için düğme ekle
  for (const [label, action] of Object.entries(actions)) {
    const button = document.createElement("button");
    button.innerText = label;
    button.style.padding = "10px 20px";
    button.style.margin = "5px";
    button.style.backgroundColor = "#007bff";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    button.onclick = action;

    navbar.appendChild(button);
  }

  root.appendChild(navbar);
}
