import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  // false = slide only, no opacity fade. Use above the fold: Chrome never
  // counts an element first painted at opacity 0 as the LCP element.
  fade?: boolean;
}

// Entrance fade driven by CSS (see .blur-fade in global.css), so it runs as
// soon as the HTML is parsed instead of waiting for React to hydrate.
// Animates only opacity and transform, which the GPU can composite.
const BlurFade = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  fade = true,
}: BlurFadeProps) => (
  <div
    className={cn(fade ? "blur-fade" : "slide-in", className)}
    style={
      {
        "--bf-delay": `${0.04 + delay}s`,
        "--bf-duration": `${duration}s`,
        "--bf-y": `${-yOffset}px`,
      } as CSSProperties
    }
  >
    {children}
  </div>
);

export default BlurFade;
