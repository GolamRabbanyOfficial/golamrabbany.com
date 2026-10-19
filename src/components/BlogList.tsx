import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import type { BlogPost } from "@/lib/content-types";
import { ArrowUpRight, Mail } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export function SubscribeButton() {
  return (
    <a
      href={`${DATA.blog.substackUrl}/subscribe`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-9 w-fit px-4 flex items-center gap-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Mail className="size-4" aria-hidden />
      Subscribe on Substack
    </a>
  );
}

export function PostLink({ post, index }: { post: BlogPost; index: number }) {
  return (
    <a
      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
        {String(index).padStart(2, "0")}.
      </span>
      <div className="flex flex-col gap-y-1 flex-1">
        <p className="tracking-tight text-lg font-medium">
          <span className="group-hover:text-foreground transition-colors">
            {post.title}
            <ArrowUpRight
              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
              aria-hidden
            />
          </span>
        </p>
        {post.summary && (
          <p className="text-sm text-muted-foreground">{post.summary}</p>
        )}
        <p className="text-xs text-muted-foreground">{post.date}</p>
      </div>
    </a>
  );
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          {DATA.blog.heading}{" "}
          <span className="ml-1 bg-card border border-border rounded-md px-2 py-1 text-muted-foreground text-sm">
            {posts.length} posts
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-6">{DATA.blog.text}</p>
        <div className="mb-10">
          <SubscribeButton />
        </div>
      </BlurFade>

      {posts.length > 0 ? (
        <div className="flex flex-col gap-6">
          {posts.map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.url}>
              <PostLink post={post} index={id + 1} />
            </BlurFade>
          ))}
        </div>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              Posts couldn't be loaded.{" "}
              <a
                href={DATA.blog.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Read them on Substack
              </a>
              .
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
