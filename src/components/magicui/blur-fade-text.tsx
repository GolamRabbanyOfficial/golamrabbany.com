import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  // Wrapper element, e.g. "h1" for the page title.
  as?: "div" | "h1";
}

// CSS-driven entrance fade (see .blur-fade in global.css). Text is visible
// without JavaScript, which keeps it from delaying Largest Contentful Paint.
const BlurFadeText = ({
  text,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 8,
  as: Wrapper = "div",
}: BlurFadeTextProps) => (
  <Wrapper className="flex">
    <span
      className={cn("blur-fade inline-block", className)}
      style={
        {
          "--bf-delay": `${delay}s`,
          "--bf-duration": `${duration}s`,
          "--bf-y": `${-yOffset}px`,
        } as CSSProperties
      }
    >
      {text}
    </span>
  </Wrapper>
);

export default BlurFadeText;
