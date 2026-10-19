import { Icons, type IconProps } from "@/components/icons";

/**
 * Picks an icon based on a plain-text link label written in markdown
 * frontmatter (e.g. "Website", "Source", "GitHub", "Devpost").
 * Add more matches here if you introduce new link types.
 */
export function getLinkIcon(label: string, props?: IconProps) {
  const key = label.toLowerCase();
  if (key.includes("source") || key.includes("github") || key.includes("code")) {
    return <Icons.github {...props} />;
  }
  return <Icons.globe {...props} />;
}
