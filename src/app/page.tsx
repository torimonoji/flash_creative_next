import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TypographyInterlude } from "@/components/home/TypographyInterlude";
import { Studio } from "@/components/home/Studio";
import { Services } from "@/components/home/Services";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { ServicePreview } from "@/components/motion/ServicePreview";
import { HomeInteractions } from "@/components/motion/HomeInteractions";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <SelectedWork />
        <TypographyInterlude />
        <Studio />
        <Services />
        <Contact />
        <Faq />
      </main>
      <ServicePreview />
      <HomeInteractions />
    </>
  );
}
