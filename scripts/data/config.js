// config.js

export const config = {
    // Genel indirim oranları
    discounts: {
      student: 20, // Öğrenci indirimi (%20)
      senior: 15, // Emekli indirimi (%15)
      child: 10, // Çocuk indirimi (%10)
      special: 25 // Özel kampanya indirimi (%25)
    },
  
    // Halk günleri (Haftanın belirli günleri indirim)
    publicDays: [
      {
        day: "Wednesday", // Çarşamba
        discount: 30 // %30 indirim
      },
      {
        day: "Monday", // Pazartesi
        discount: 20 // %20 indirim
      }
    ],
  
    // Özel kampanyalar
    campaigns: [
      {
        name: "2 for 1",
        description: "2 bilet alana 1 bilet bedava!",
        startDate: "2024-01-01",
        endDate: "2024-01-31"
      },
      {
        name: "Summer Special",
        description: "%50 indirim tüm yaz boyunca!",
        startDate: "2024-06-01",
        endDate: "2024-08-31"
      }
    ],
  
    // Vergi oranı
    taxRate: 0.19, // %19 vergi
  
    // Varsayılan dil
    defaultLanguage: "de",
  
    // Zaman formatı
    timeFormat: "HH:mm", // Saat formatı (örn. 14:00)
    
    // Para birimi
    currency: "€",
  
    // Tüm fiyatları yuvarlama
    roundPrices: true
  };
  