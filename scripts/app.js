import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { renderMainContent, initializeMainContentEvents } from "./components/main.js";

// Ana container
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM tamamen yüklendi ve uygulama başlatıldı.");

  const app = document.getElementById("app");

  // Header
  const headerHTML = renderHeader();
  app.insertAdjacentHTML("beforeend", headerHTML);

  // Main Content
  const mainContentHTML = renderMainContent();
  app.insertAdjacentHTML("beforeend", mainContentHTML);
  initializeMainContentEvents();

  // Footer
  const footerHTML = renderFooter();
  app.insertAdjacentHTML("beforeend", footerHTML);
});

