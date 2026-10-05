import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { MainMenu } from "@/components/overlays/MainMenu";
import { ProjectDialog } from "@/components/overlays/ProjectDialog";
import { ContactDialog } from "@/components/overlays/ContactDialog";
import { SiteInteractions } from "@/components/motion/SiteInteractions";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import "@/styles/main.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  title: site.title,
  description: site.description,
  icons: {
    icon: [{ url: "/assets/images/symbol.svg", type: "image/svg+xml" }],
  },
};
export const viewport: Viewport = { themeColor: "#eeeeec" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="/#work">
          Skip to work
        </a>
        <div className="progress" aria-hidden="true" />
        <Header />
        <FloatingContact />
        {children}
        <Footer />
        <MainMenu />
        <ProjectDialog />
        <ContactDialog />
        <SiteInteractions />
      </body>
    </html>
  );
}
