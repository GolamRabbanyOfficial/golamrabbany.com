import { useState } from "react";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import type { CertificationItem } from "@/lib/content-types";

function BadgeImage({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  if (!src || imageError) {
    return (
      <div className="flex items-center justify-center size-20 md:size-24 rounded-full border bg-muted p-2 text-center text-[10px] font-medium text-muted-foreground">
        {alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="size-20 md:size-24 object-contain"
      onError={() => setImageError(true)}
    />
  );
}

export default function CertificationsSection({ items }: { items: CertificationItem[] }) {
  const categoryOrder = DATA.certificationCategoryOrder ?? [];
  const uniqueCategories = Array.from(new Set(items.map((c) => c.category)));
  const orderedCategories = [
    ...categoryOrder.filter((c) => uniqueCategories.includes(c)),
    ...uniqueCategories.filter((c) => !categoryOrder.includes(c)),
  ];

  const [activeTab, setActiveTab] = useState("All");
  const showTabs = orderedCategories.length > 1;
  const visibleItems =
    activeTab === "All" ? items : items.filter((c) => c.category === activeTab);

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">{DATA.sections.certifications.label}</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{DATA.sections.certifications.heading}</h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            {DATA.sections.certifications.text}
          </p>
        </div>
      </div>

      {showTabs ? (
        <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center">
          <button
            onClick={() => setActiveTab("All")}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeTab === "All"
                ? "bg-primary text-primary-foreground border-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            All ({items.length})
          </button>
          {orderedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeTab === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {cat} ({items.filter((c) => c.category === cat).length})
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-[800px] mx-auto">
        {visibleItems.map((cert) => (
          <a
            key={cert.name}
            href={cert.verifyUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 text-center group"
          >
            <div className="rounded-full transition-transform group-hover:scale-105">
              <BadgeImage src={cert.badgeImage} alt={cert.name} />
            </div>
            <span className="text-xs font-medium text-muted-foreground leading-tight line-clamp-2">
              {cert.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
