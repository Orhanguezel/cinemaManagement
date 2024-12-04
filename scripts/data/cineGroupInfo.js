export const cineGroupInfo = {
    title: "CineGrup Kinos",
    description: "Ihr vertrauenswürdiger Begleiter für die besten Kinoerlebnisse.",
    logo: "./assets/logo/cinegrup.png",
    footerLogo: "./assets/logo/footer/cinegrup2.png",
    footer: "© 2024 CineGrup, entwickelt von OG.",
    address: "Deutschlandweit verfügbar.",
    phone: "(+888) 123 456 765",
    email: "cinegrup@cinegrup.com",
    map:  "https://www.google.com/maps/embed?pb=PLACEHOLDER_FOR_BERLIN",
    facebook: "#",
    twitter: "#",
    youtube: "#",
    instagram: "#",
    telegram: "#",
    whatsup: "#",
    design: "OG",
    get footer() {
      return `© 2024 CineGrup, entwickelt von ${this.design}`;
    },
  };