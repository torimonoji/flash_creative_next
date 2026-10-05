// Public, non-secret site settings. Never put API keys in this file.
export const site = {
  name: "Flash Creative",
  title: "Flash Creative — Small ideas. Big things.",
  description:
    "Flash Creative is an independent creative studio shaping distinctive brands and digital experiences.",
  copyrightYear: 2026,
  navigation: [
    { label: "Works", href: "/works/" },
    { label: "About", href: "/#studio" },
    { label: "What we do", href: "/#services" },
    { label: "Contact", href: "/#contact" },
  ],
  footerNavigation: [
    { label: "Home", href: "/#home" },
    { label: "Works", href: "/works/" },
    { label: "About", href: "/#studio" },
    { label: "Contact", href: "/#contact" },
  ],
  // Replace these platform landing pages with the studio's real profiles later.
  socials: [
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  contactChannels: [
    { label: "Messenger", href: "https://m.me/lamphong247" },
    { label: "Zalo", href: "https://zalo.me/0769996839" },
  ],
} as const;
