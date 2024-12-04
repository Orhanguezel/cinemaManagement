import { loadHeader } from "./components/header.js";
import { loadFooter } from "./components/footer.js";
import { loadMainContent } from "./components/main.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM tamamen yüklendi ve uygulama başlatıldı.");

  const app = document.getElementById("app");

  const headerHTML = loadHeader();
  app.insertAdjacentHTML("afterbegin", headerHTML);

  loadMainContent();

  const footerHTML = loadFooter();
  app.insertAdjacentHTML("beforeend", footerHTML);
});

