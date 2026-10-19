import { DATA } from "@/data/resume";
import type { BlogPost } from "@/lib/content-types";

// Posts come from the Substack RSS feed, fetched once at build time.
// The site is static, so new posts appear after the next rebuild.
let cache: Promise<BlogPost[]> | undefined;

export function getSubstackPosts(): Promise<BlogPost[]> {
  cache ??= fetchPosts();
  return cache;
}

async function fetchPosts(): Promise<BlogPost[]> {
  const feedUrl = `${DATA.blog.substackUrl}/feed`;
  const hidden: readonly string[] = DATA.blog.hiddenPosts;
  try {
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => parseItem(item))
      .filter((post) => !hidden.includes(post.title));
  } catch (err) {
    // A failed fetch shouldn't break the whole build; the blog just shows empty.
    console.warn(`[substack] Could not load ${feedUrl}: ${err}`);
    return [];
  }
}

function parseItem(item: string): BlogPost {
  const pubDate = tag(item, "pubDate");
  return {
    title: tag(item, "title"),
    summary: tag(item, "description"),
    url: tag(item, "link"),
    image: item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1],
    date: new Date(pubDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }),
  };
}

function tag(item: string, name: string): string {
  const raw = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? "";
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  return (cdata ? cdata[1] : decodeEntities(raw)).trim();
}

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&");
}
