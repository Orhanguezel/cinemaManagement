import {
  assignManualSalonsToCinemas,
  assignOptimalSalonsToCinemas,
  assignRandomSalonsToCinemas,
} from "../logic/salonLogic.js";
import { renderDynamicContent } from "./panelView.js";

export function renderSalonAssignmentView(cinemas, salons) {
  if (!cinemas || cinemas.length === 0) {
    console.error("Hata: Cinemas verisi geçerli değil!");
    return;
  }

  const contentHTML = `
    <h2>Salon Atama Paneli</h2>
    <p>Salon atamalarını yapmak için aşağıdaki seçeneklerden birini seçebilirsiniz.</p>
    <div>
      <button id="manual-assignment">Manuel Atama</button>
      <button id="optimal-assignment">Optimum Atama</button>
      <button id="random-assignment">Rastgele Atama</button>
    </div>
  `;

  // renderDynamicContent ile içeriği temizleyip yeni içeriği ekle
  renderDynamicContent(contentHTML, "salon-assignment");

  // Butonlar için olay dinleyiciler
  document.getElementById("manual-assignment").onclick = () => {
    assignManualSalonsToCinemas(cinemas, salons);
    alert("Salonlar manuel olarak atandı!");
  };

  document.getElementById("optimal-assignment").onclick = () => {
    assignOptimalSalonsToCinemas(cinemas, salons);
    alert("Salonlar optimum şekilde atandı!");
  };

  document.getElementById("random-assignment").onclick = () => {
    assignRandomSalonsToCinemas(cinemas, salons);
    alert("Salonlar rastgele atandı!");
  };
}
