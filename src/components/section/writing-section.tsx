import BlurFade from "@/components/magicui/blur-fade";
import { PostLink, SubscribeButton } from "@/components/BlogList";
import { DATA } from "@/data/resume";
import type { BlogPost } from "@/lib/content-types";

const BLUR_FADE_DELAY = 0.04;

export default function WritingSection({ items }: { items: BlogPost[] }) {
  const posts = items.slice(0, DATA.sections.writing.postsShown);
  if (posts.length === 0) return null;

  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
          <div className="border bg-primary z-10 rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">{DATA.sections.writing.label}</span>
          </div>
          <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
        </div>
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
            {DATA.sections.writing.heading}
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
            {DATA.sections.writing.text}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
        {posts.map((post, id) => (
          <BlurFade key={post.url} delay={BLUR_FADE_DELAY * 14 + id * 0.05}>
            <PostLink post={post} index={id + 1} />
          </BlurFade>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SubscribeButton />
        <a
          href="/blog"
          className="h-9 w-fit px-4 flex items-center text-sm font-medium border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View all posts
        </a>
      </div>
    </div>
  );
}
