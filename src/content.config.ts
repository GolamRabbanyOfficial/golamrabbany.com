import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// ---------------------------------------------------------------------------
// Work experience — one markdown file per job in src/content/work/
// File body = the job description. Order on the page follows filename order
// (e.g. 01-, 02-, 03-...), most recent job first.
// ---------------------------------------------------------------------------
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    href: z.string().optional(),
    location: z.string().optional(),
    logoUrl: z.string().optional(),
    start: z.string(),
    // Leave "end" out entirely for a job you currently hold — it'll show "Present".
    end: z.string().optional(),
    badges: z.array(z.string()).default([]),
  }),
});

// ---------------------------------------------------------------------------
// Education — one markdown file per school in src/content/education/
// ---------------------------------------------------------------------------
const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    href: z.string().optional(),
    logoUrl: z.string().optional(),
    start: z.string(),
    end: z.string(),
  }),
});

// ---------------------------------------------------------------------------
// Certifications — one markdown file per school in src/content/certifications/
// ---------------------------------------------------------------------------
const certifications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/certifications" }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    category: z.string().default("Other"),
    verifyUrl: z.string().optional(),
    badgeImage: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Projects — one markdown file per project in src/content/projects/
// File body = the project description.
// ---------------------------------------------------------------------------
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    href: z.string().optional(),
    dates: z.string(),
    active: z.boolean().default(true),
    technologies: z.array(z.string()).default([]),
    image: z.string().optional(),
    video: z.string().optional(),
    // type is a label like "Website" or "Source" — the little globe/GitHub
    // icon next to it is picked automatically based on that label.
    links: z
      .array(
        z.object({
          type: z.string(),
          href: z.string(),
        })
      )
      .default([]),
  }),
});

// ---------------------------------------------------------------------------
// Hackathons — one markdown file per event in src/content/hackathons/
// File body = the project description.
// ---------------------------------------------------------------------------
const hackathons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/hackathons" }),
  schema: z.object({
    title: z.string(),
    dates: z.string(),
    location: z.string().optional(),
    image: z.string().optional(),
    win: z.string().optional(),
    mlh: z.string().optional(),
    links: z
      .array(
        z.object({
          title: z.string(),
          href: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { work, education, projects, hackathons, certifications };
