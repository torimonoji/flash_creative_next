import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsBySlug } from "@/content/projects";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { PortfolioInteractions } from "@/components/motion/PortfolioInteractions";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsBySlug[slug];
  if (!project || !caseStudies[slug]) return {};
  return {
    title: `${project.name} — Flash Creative`,
    description: caseStudies[slug].introduction,
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL ? `/works/${slug}/` : null,
    },
    openGraph: {
      title: `${project.name} — Flash Creative`,
      description: caseStudies[slug].introduction,
      type: "website",
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsBySlug[slug],
    study = caseStudies[slug];
  if (!project || !study) notFound();
  return (
    <>
      <CaseStudyPage project={project} study={study} />
      <PortfolioInteractions />
    </>
  );
}
