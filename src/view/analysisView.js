import { renderDynamicContent } from "./panelView.js";

export function renderAnalysisView(cinemas) {
  const contentHTML = `<h2>Sinema Analiz Raporları</h2><div id="analysis-container"></div>`;
  renderDynamicContent(contentHTML, "analysis-reports");

  const container = document.getElementById("analysis-container");
  cinemas.forEach((cinema) => {
    const cinemaDiv = document.createElement("div");
    cinemaDiv.innerHTML = `<h3>${cinema.name}</h3>`;
    cinema.salons.forEach((salon) => {
      cinemaDiv.innerHTML += `
        <div>
          <p>Salon Adı: ${salon.name}</p>
          <p>Doluluk Oranı: ${(salon.occupancyRate || 0).toFixed(2)}%</p>
        </div>
      `;
    });
    container.appendChild(cinemaDiv);
  });
}
