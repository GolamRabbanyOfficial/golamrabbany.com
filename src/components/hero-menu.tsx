import { DATA } from "@/data/resume";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

type MenuItem = { href: string; label: string; icon: LucideIcon };

// The menu under your title. Items come from DATA.heroMenu in resume.tsx.
// `missing` lists hrefs whose file isn't in public/ yet (checked at build time).
// Those items link to their `fallback` instead, or are left out if they have none.
export default function HeroMenu({ missing = [] }: { missing?: string[] }) {
  const items = DATA.heroMenu.flatMap((item): MenuItem[] => {
    if (!missing.includes(item.href)) return [item];
    return "fallback" in item ? [{ ...item, href: item.fallback }] : [];
  });
  if (items.length === 0) return null;

  return (
    <nav aria-label="Main" className="mt-3">
      <ul className="flex flex-wrap items-center gap-1 w-fit rounded-full border border-border/70 p-1 backdrop-blur-sm">
        {items.map((item) => {
          const isExternal = item.href.startsWith("http") || item.href.endsWith(".pdf");
          return (
            <li key={item.href}>
              <a
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group h-8 px-3.5 flex items-center gap-1.5 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <item.icon className="size-4 transition-transform group-hover:-translate-y-px" aria-hidden />
                {item.label}
                {isExternal && <ArrowUpRight className="size-3 opacity-60" aria-hidden />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
