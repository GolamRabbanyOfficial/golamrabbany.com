import { CONFIG } from "@/data/config";
import { DATA } from "@/data/resume";
import type { CollectionEntry } from "astro:content";
import type { EducationItem, HackathonItem, WorkItem } from "@/lib/content-types";

const site = CONFIG.site.url;
const [personName, jobTitle] = DATA.name.split(" - ");

// Profiles elsewhere that belong to the same person (helps search engines and
// AI assistants connect them).
export const profileLinks = [
  ...Object.values(DATA.contact.social)
    .map((social) => social.url)
    .filter((url) => url.startsWith("http")),
  DATA.blog.substackUrl,
];

// schema.org ProfilePage + Person for the home page. Built from the same
// content as the page, so it stays in sync.
export function buildPersonJsonLd({
  work,
  education,
  certifications,
  hackathons,
}: {
  work: WorkItem[];
  education: EducationItem[];
  certifications: CollectionEntry<"certifications">["data"][];
  hackathons: HackathonItem[];
}) {
  const currentJob = work.find((job) => !job.end);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${site}/`,
    mainEntity: {
      "@type": "Person",
      name: personName,
      jobTitle,
      description: DATA.metaDescription,
      url: `${site}/`,
      image: `${site}${DATA.avatarUrl}`,
      email: `mailto:${DATA.contact.email}`,
      sameAs: profileLinks,
      ...(currentJob && {
        worksFor: {
          "@type": "Organization",
          name: currentJob.company,
          ...(currentJob.href && { url: currentJob.href }),
        },
      }),
      alumniOf: education.map((school) => ({
        "@type": "CollegeOrUniversity",
        name: school.school,
        ...(school.href && { url: school.href }),
      })),
      knowsAbout: [
        "Cloud Security",
        "Detection Engineering",
        "Digital Forensics",
        "Reverse Engineering",
        "Capture The Flag (CTF)",
        ...DATA.skills.map((skill) => skill.name),
      ],
      hasCredential: certifications.map((cert) => ({
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: cert.issuer },
        ...(cert.verifyUrl && { url: cert.verifyUrl }),
      })),
      award: hackathons
        .filter((event) => !/author/i.test(event.dates))
        .map((event) => `${event.dates.replace(/[^\p{L}\p{N}\s-]/gu, "").trim()}, ${event.title}`),
    },
  };
}
