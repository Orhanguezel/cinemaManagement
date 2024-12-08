import { initializeCampaigns, saveCampaignsToLocalStorage, loadCampaignsFromLocalStorage } from "./stateManager.js";
import { defaultCampaigns } from "./data/Campaigns.js"; // Varsayılan kampanyalar dosyası

// Kampanyaları yükleme veya başlatma
let campaigns = loadCampaignsFromLocalStorage();
if (campaigns.length === 0) {
  campaigns = [...defaultCampaigns]; // Eğer localStorage boşsa varsayılan kampanyaları kullan
  initializeCampaigns(campaigns); // Kampanyaları başlat ve kaydet
}

// Kampanya Görünümü Render Fonksiyonu
export function renderCampaignView() {
  const container = document.getElementById("main-content");

  // Kampanya Listesi ve Form
  container.innerHTML = `
    <h2>İndirimler ve Kampanyalar</h2>
    <div class="campaign-section">
      <div class="campaign-list">
        <h3>Mevcut Kampanyalar</h3>
        <div id="campaign-table">
          ${renderCampaignTable()}
        </div>
      </div>
      <div class="campaign-form">
        <h3>Yeni Kampanya Ekle</h3>
        <form id="campaign-form">
          <label for="campaign-name">Kampanya Adı:</label>
          <input type="text" id="campaign-name" required>
          
          <label for="campaign-audience">Hedef Kitle:</label>
          <select id="campaign-audience" multiple>
            <option value="Öğrenci">Öğrenci</option>
            <option value="Çocuk">Çocuk</option>
            <option value="Halk Günü">Halk Günü</option>
          </select>
          
          <label for="discount-type">İndirim Türü:</label>
          <select id="discount-type">
            <option value="percentage">% İndirim</option>
            <option value="fixed">Sabit İndirim</option>
          </select>
          
          <label for="discount-value">İndirim Değeri:</label>
          <input type="number" id="discount-value" required>
          
          <label for="start-date">Başlangıç Tarihi:</label>
          <input type="date" id="start-date" required>
          
          <label for="end-date">Bitiş Tarihi:</label>
          <input type="date" id="end-date" required>
          
          <button type="button" onclick="addCampaign()">Kaydet</button>
        </form>
      </div>
    </div>
  `;

  // Kampanya tablo güncellemesi
  document.getElementById("campaign-table").innerHTML = renderCampaignTable();
}

// Kampanya Tablosu
function renderCampaignTable() {
    return `
      <table>
        <thead>
          <tr>
            <th>Adı</th>
            <th>Hedef Kitle</th>
            <th>İndirim</th>
            <th>Geçerlilik</th>
            <th>Durum</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          ${campaigns
            .map(
              (campaign) => `
            <tr>
              <td>${campaign.name || "Bilinmiyor"}</td>
              <td>${(campaign.targetAudience || []).join(", ")}</td>
              <td>${campaign.discountValue || 0} ${
                campaign.discountType === "percentage" ? "%" : "€"
              }</td>
              <td>${campaign.startDate || "Belirtilmemiş"} - ${campaign.endDate || "Belirtilmemiş"}</td>
              <td>${campaign.status || "Aktif"}</td>
              <td>
                <button onclick="editCampaign(${campaign.id})">Düzenle</button>
                <button onclick="deleteCampaign(${campaign.id})">Sil</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
  

// Kampanya Ekleme Fonksiyonu
export function addCampaign() {
  const name = document.getElementById("campaign-name").value;
  const audience = Array.from(document.getElementById("campaign-audience").selectedOptions).map(
    (option) => option.value
  );
  const discountType = document.getElementById("discount-type").value;
  const discountValue = parseFloat(document.getElementById("discount-value").value);
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  const newCampaign = {
    id: campaigns.length + 1,
    name,
    targetAudience: audience,
    discountType,
    discountValue,
    startDate,
    endDate,
    status: "active",
  };

  campaigns.push(newCampaign);
  saveCampaignsToLocalStorage(campaigns);

  alert("Kampanya başarıyla eklendi!");
  renderCampaignView();
}

// Kampanya Silme Fonksiyonu
export function deleteCampaign(id) {
  campaigns = campaigns.filter((campaign) => campaign.id !== id);
  saveCampaignsToLocalStorage(campaigns);

  alert("Kampanya başarıyla silindi!");
  renderCampaignView();
}
