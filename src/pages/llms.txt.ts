import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { CONFIG } from "@/data/config";
import { DATA } from "@/data/resume";
import { getSubstackPosts } from "@/lib/substack";
import { profileLinks } from "@/lib/structured-data";

// /llms.txt: a plain-text summary of the site for AI assistants and AI search
// (see llmstxt.org). Generated from the same content as the pages.
const byId = <T extends { id: string }>(a: T, b: T) => a.id.localeCompare(b.id);
// Markdown links in the About text become plain text.
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

export const GET: APIRoute = async () => {
  const site = CONFIG.site.url;
  const [name, jobTitle] = DATA.name.split(" - ");
  const work = (await getCollection("work")).sort(byId);
  const education = (await getCollection("education")).sort(byId);
  const certs = (await getCollection("certifications")).sort(byId);
  const projects = (await getCollection("projects")).sort(byId);
  const ctfs = (await getCollection("hackathons")).sort(byId);
  const posts = await getSubstackPosts();

  const lines = [
    `# ${name}`,
    "",
    `> ${DATA.metaDescription}`,
    "",
    "## About",
    "",
    plain(DATA.summary),
    "",
    "## Work experience",
    "",
    ...work.map(
      ({ data, body }) =>
        `- ${data.title}, ${data.company} (${data.start} to ${data.end ?? "present"}): ${body?.trim() ?? ""}`
    ),
    "",
    "## Education",
    "",
    ...education.map(({ data }) => `- ${data.degree}, ${data.school} (${data.start} to ${data.end})`),
    "",
    "## Certifications",
    "",
    ...certs.map(({ data }) =>
      data.verifyUrl
        ? `- [${data.name}](${data.verifyUrl}), ${data.issuer}`
        : `- ${data.name}, ${data.issuer}`
    ),
    "",
    "## Projects",
    "",
    ...projects.map(({ data, body }) => `- ${data.title} (${data.dates}): ${body?.trim() ?? ""}`),
    "",
    "## CTF competitions",
    "",
    ...ctfs.map(({ data, body }) => `- ${data.title}, ${data.dates}: ${body?.trim() ?? ""}`),
    "",
    "## Writing",
    "",
    ...posts.map((post) => `- [${post.title}](${post.url}) (${post.date})`),
    "",
    "## Links",
    "",
    `- [Website](${site}/)`,
    `- [Blog](${site}/blog/)`,
    ...profileLinks.map((url) => `- ${url}`),
    `- Email: ${DATA.contact.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
