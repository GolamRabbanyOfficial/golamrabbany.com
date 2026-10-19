# Editing Guide

A quick manual for changing anything on the site: what to edit, and where.

---

## Quick reference

| I want to change… | Edit this |
|---|---|
| Name, headline, About text, profile photo | `src/data/resume.tsx` → `name`, `description`, `summary`, `avatarUrl` |
| Section headings, intro text, order, show/hide | `src/data/resume.tsx` → `sections` |
| Skills list | `src/data/resume.tsx` → `skills` |
| Email and social links | `src/data/resume.tsx` → `contact` |
| Navbar links (Home, Blog) | `src/data/resume.tsx` → `navbar` |
| Work experience | `src/content/work/*.md` |
| Education | `src/content/education/*.md` |
| Certifications and badges | `src/content/certifications/*.md` |
| Projects | `src/content/projects/*.md` |
| CTF competitions | `src/content/hackathons/*.md` |
| Blog posts | Write them on Substack. They appear on the site automatically (see [Blog](#blog-substack)) |
| Logos, photos, and other images | `public/` (see [Images and logos](#images-and-logos)) |
| Domain, Twitter handle, font size, colors | `src/data/config.ts` |
| Adding a new field to an entry type | `src/content.config.ts` |

To see your changes as you make them:

```bash
pnpm dev
```

Then open http://localhost:4321. Save a file and the page reloads on its own.

---

## How entry files work (work, education, certs, projects, CTFs)

Each entry is **one `.md` file** inside its folder in `src/content/`.

```md
---
key: "value"          ← frontmatter: the entry's details
another: "value"
---

Description text goes here, in plain text or markdown.
```

- **Add an entry:** copy an existing file in the same folder, rename it, and edit it.
- **Remove an entry:** delete its file.
- **Change the order:** files are sorted by filename, so `01-` shows first, then `02-`, and so on. Rename files to reorder them.
- Keep both `---` lines. Put text values in `"quotes"`.
- If you misspell a required field or leave it out, `pnpm dev` and `pnpm build` print an error that names the file.

---

## Work experience: `src/content/work/`

```md
---
company: "Elite Cloud PTE. LTD."
title: "Associate Cloud Engineer"
href: "https://elite.cloud"              # optional: link on the company name
location: "Taipei City 114, Taiwan"      # optional
logoUrl: "/logos/elite-cloud.jpg"        # optional
start: "January 2025"
end: "April 2026"                        # optional: leave out to show "Present"
badges: ["Current"]                      # optional: small tags next to the title
---

What you did in this role.
```

Current files and their logos:

| File | Logo |
|---|---|
| `01-elite-cloud-pte-ltd.md` | `public/logos/elite-cloud.jpg` |
| `02-fbi-ctf.md` | `public/logos/fbi-ctf.png` |
| `03-bowtiedcyber-llc.md` | `public/logos/bowtiedcyber.webp` |
| `04-elitesploit.md` | `public/logos/elitesploit.png` |

---

## Education: `src/content/education/`

```md
---
school: "University of the People"
degree: "Bachelor of Science in Computer Science (BCS)"
href: "https://www.uopeople.edu/"     # optional
logoUrl: "/logos/uopeople.jpg"        # optional
start: "2024"
end: "Present (Currently Paused)"     # required: write any text you like
---
```

---

## Certifications: `src/content/certifications/`

```md
---
name: "Professional Cloud Architect Certification"
issuer: "Google Cloud"
category: "Cloud"                         # sets which tab the badge appears under
verifyUrl: "https://www.credly.com/..."   # optional: opens when the badge is clicked
badgeImage: "https://images.credly.com/..."  # optional: a URL or /logos/... path
---
```

- **Tab order:** `src/data/resume.tsx` → `certificationCategoryOrder` (currently `["Cloud", "Cybersecurity"]`). A category that isn't in that list still gets a tab, placed after the listed ones.
- **Verify link:** `verifyUrl` can be any link, such as a Credly badge or a shared Google Drive file (the ISC2 CC uses a Drive link). For a Drive file, set sharing to "Anyone with the link".

---

## Projects: `src/content/projects/`

```md
---
title: "CloudGuard"
href: "/projects/cloudguard.webp"           # optional: where clicking the card goes
dates: "In Progress"
active: true
technologies:
  - "Security Hub"
  - "Terraform"
image: "/projects/cloudguard.webp"          # optional: preview image
video: "/demo.mp4"                          # optional: preview video (used instead of image)
links:
  - type: "Source"                          # "Source"/"GitHub" shows a GitHub icon, "Website" a globe
    href: "https://github.com/GolamRabbanyOfficial/cloudguard"
---

Project description.
```

### Hiding a project without deleting it

The site only reads files inside `src/content/projects/`. To hide a project but keep it for later, move its file to `drafts/projects/`. To show it again, move the file back. Any section works the same way. For example, `drafts/work/` keeps a hidden job.

Currently shown: `01-cloudguard.md`, `02-threatlens.md`
Currently hidden: none.

**Architecture diagrams:** the cards use `public/projects/cloudguard.webp` and `public/projects/threatlens.webp`. To update a diagram, export it again from the AWS Architecture design canvas and overwrite the file with the same name. `href` also points to the diagram, so clicking a card opens it full size.

When a repo exists, add it under `links:` with `type: "Source"`. You can then point `href` at the repo instead, and change `dates:` from "In Progress" to the real dates.

---

## CTF competitions: `src/content/hackathons/`

The CTF section is built from the `hackathons` folder.

```md
---
title: "Flag Hunt 2023"
dates: "🥇Champion"                 # the small grey line under the title (used here for your placement)
location: "MIST Campus, Dhaka"      # optional
image: "/logos/mist.jpg"            # optional: the round logo
links:                              # optional: buttons under the entry
  - title: "Image"
    href: "https://..."
---

Short description of the event or your result.
```

### Adding a link button to a CTF entry

The `links:` part is optional. Each item becomes a small button under the entry, and the `title` is the button's text. To add buttons (for example, a photo or a write-up), put this block above the closing `---`:

```md
links:
  - title: "Image"
    href: "https://link-to-your-photo"
  - title: "Writeup"
    href: "https://link-to-your-writeup"
```

To remove a button, delete its two lines (`- title` and `href`). If no buttons are left, also delete the `links:` line. Flag Hunt 2023 (`06-flag-hunt-2023.md`) currently has no link button.

Current files and their logos:

| File | Logo |
|---|---|
| `01-phoenix-summit-ctf-2025.md` | `phoenix.png` |
| `02-cyberdrill-2025-btrc.md` | `btrc.jpg` |
| `03-cyberraid-2025.md` | `mist.jpg` |
| `04-iut-national-ctf-2024.md` | `iut.jpg` |
| `05-author-urchinsec-2023.md` | `urchinsec.jpg` |
| `06-flag-hunt-2023.md` | `mist.jpg` |
| `07-diusec-1-ctf.md` | `diu.jpg` |
| `08-altarjal-ctf-2023.md` | `ctfbd.jpg` |
| `09-h4k-it-ctf-2021.md` | `h4k-it.jpg` |
| `10-national-cyber-drill-2020.md` | `bgd-egov-cirt.jpg` |
| `11-flaghunt-ctfbd-2020.md` | `ctfbd.jpg` |

All of these logos are in `public/logos/`.

---

## Blog (Substack)

Posts are written and published on **Substack** (https://learnwithrabbany.substack.com), not in this project. When the site builds, it reads your Substack RSS feed and shows:

- **Home page → "Writing" section:** your latest posts, a **Subscribe on Substack** button, and a **View all posts** button.
- **`/blog` page:** every post, with its summary and date.

Each post links to Substack, so readers subscribe and pay there.

**Publishing a new post:** publish it on Substack, then rebuild the site (`pnpm build`, or redeploy). The site is built ahead of time, so new posts show up only after a rebuild.

Settings in `src/data/resume.tsx`:

| Setting | What it does |
|---|---|
| `blog.substackUrl` | Your Substack address. The feed is read from `<substackUrl>/feed`. |
| `blog.heading`, `blog.text` | Title and intro text on the `/blog` page |
| `blog.hiddenPosts` | Exact post titles to leave off the site. Currently `["Coming soon"]`. |
| `sections.writing` | The home page section: `heading`, `text`, `label`, `order`, `enabled`, and `postsShown` (how many posts to show, currently 3) |

If the feed can't be reached during a build, the build still finishes. The blog then shows a "Read them on Substack" link instead of the posts.

The code is in `src/lib/substack.ts` (reads the feed), `src/components/BlogList.tsx` (the `/blog` page), and `src/components/section/writing-section.tsx` (the home page section). The old template posts were moved to `drafts/blog-template/`.

---

## Images and logos

Everything in `public/` is served from the site root, so in a `.md` file you leave out the `public` part:

| File on disk | Path to write in `.md` / `resume.tsx` |
|---|---|
| `public/logos/mist.jpg` | `"/logos/mist.jpg"` |
| `public/picofme.png` | `"/picofme.png"` |

**To add or replace a logo:**

1. Put the image in `public/logos/`. Use lowercase names with no spaces, e.g. `my-company.png`.
2. In the entry's `.md` file, set `logoUrl:` (work, education), `image:` (CTFs, projects), or `badgeImage:` (certifications) to `"/logos/my-company.png"`.

To swap an image without editing any `.md` file, overwrite the image file and keep its exact name.

A remote URL (`https://...`) works too, but LinkedIn/CDN image links expire after a while. Local files in `public/logos/` don't.

Other images:

- **Profile photo:** `public/picofme.png` (set in `resume.tsx` → `avatarUrl`)
- **Social share preview:** `public/og_image.png`, 1200×630 (set in `resume.tsx` → `ogImage`). This is the card LinkedIn, X and others show when someone shares your site. It shows your name, title, photo and top credentials (Google Cloud Professional Cloud Architect, 4× AWS Certified, National CTF Champion). If you change any of these, ask for it to be regenerated.
- **Favicon:** `public/favicon.svg`

---

## `src/data/resume.tsx`: profile and page layout

### Profile
- `name`: shown in the hero and in browser tab titles
- `description`: the one-line tagline under your name
- `metaDescription`: the text search engines and link previews show for your home page (aim for 150–160 characters)
- `summary`: the About paragraph. Markdown links work, e.g. `[my work](#work)` jumps to the Work section.
- `avatarUrl`, `ogImage`, `location`, `url`

### Sections
Each section under `sections` has:

```ts
work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
```

- `order`: position on the page (lower numbers show first)
- `enabled`: `false` hides the whole section
- `heading`, `label`, `text`: the titles and intro text shown for that section

The Photos section is currently off (`enabled: false`). To turn it on, put images in `public/photos/` that match the names in the `photos` list (`photo1.webp`…`photo9.webp`), then set `enabled: true`.

### Menu under your title
`heroMenu` sets the menu shown under your name and tagline. It currently has **Blog**. To add an item, add a line:

```ts
heroMenu: [
  { href: "/blog", icon: BookOpen, label: "Blog" },
  { href: "#projects", icon: FolderGit2, label: "Projects" },        // jumps to a section on the page
  { href: "https://youtube.com/@LearnWithRabbany", icon: Youtube, label: "YouTube" }, // external links open in a new tab
],
```

**Resume button:** the menu has a **Resume** item. Until you add your CV, it links to your LinkedIn profile (`fallback` in `heroMenu`). To switch it to your CV, save the PDF as `public/resume.pdf` (exactly that name) and rebuild. The button then opens the PDF in a new tab, and you don't need to change any code.

Icons come from [lucide.dev/icons](https://lucide.dev/icons). Add each new icon's name to the `import { ... } from "lucide-react"` line at the top of `resume.tsx`. Section links use the section's id: `#about`, `#work`, `#education`, `#certifications`, `#skills`, `#projects`, `#hackathons` (CTFs), `#writing`, `#contact`.

### Skills
```ts
{ name: "AWS", icon: AWS },
```
Reorder or delete lines to change the list. Adding a skill with a new icon takes two steps:

1. Add an icon component in `src/components/ui/svgs/` (copy one that's already there), or use a ready-made icon from [lucide.dev/icons](https://lucide.dev/icons).
2. Import it at the top of `resume.tsx` and add the line to `skills`.

Splunk, GuardDuty, Security Hub, Wireshark and Ghidra use generic lucide icons (`Activity`, `ShieldAlert`, `ShieldCheck`, `Network`, `Binary`).

### Contact and socials
`contact.email` and `contact.social` set the email address and social profiles. They appear in two places:

- **Under the About text:** as a row of buttons, one per social link, each with its icon and `name`.
- **In the bottom menu:** only links with `navbar: true`.

Current profiles: GitHub `GolamRabbanyOfficial`, LinkedIn `golamrabbany`, X `@_GolamRabbany`, YouTube `@LearnWithRabbany`. If you change your X handle, also update `twitterHandle` in `src/data/config.ts`.

---

## `src/data/config.ts`: site settings

- `site.url`: your domain (also used for the sitemap and SEO)
- `site.twitterHandle`
- `typography.baseFontSize`: `100` is normal size. Raise it to make all text bigger, lower it to make text smaller.
- `theme.light` / `theme.dark`: the site colors
- `header.dotsText`: the word shown in the flickering dots at the top of every page (currently `""`, plain random dots). The dots inside the letters glow brighter while all the dots keep flickering. Keep it short (about 15 characters) so it stays readable on phones. For example, `"CLOUD SECURITY"`.
  - The dots component is `src/components/magicui/flickering-grid.tsx`. Its size and placement are set in `src/layouts/Layout.astro`: `squareSize`, `gridGap`, and the `h-25` band height (100px).

---

## Adding a new field to an entry type

1. Add the field to that collection's schema in `src/content.config.ts`.
2. Add it to the `.md` files that use it.
3. Show it in the matching component in `src/components/section/` (e.g. `work-section.tsx`).

---

## Previewing changes before they go live (staging)

There's a private staging copy of the site at **https://claude.ai/artifact/8eDMycCVAu23edH5cs7fY5**. Only you can open it. It shows an orange **Staging** label in the top-left corner, so it's never mistaken for the live site.

To preview a change:

1. Make the change (or ask Claude to).
2. Ask Claude to **"update staging"**. Claude runs `pnpm staging` and republishes to the same link.
3. Open the link, and if you like it, deploy as usual.

`pnpm staging` builds the site and writes a copy to `.staging/` (not published, ignored by git). The copy is adjusted to work inside an artifact: relative links, Credly badge images saved locally, and `_astro/` renamed to `assets/`. The script is `scripts/build-staging.mjs`.

## Before you publish

```bash
pnpm build
```

If this command finishes without errors, the site is ready. The finished site is written to `dist/`.

## Deploying (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys the site to GitHub Pages:

- on every push to the `main` branch
- **once a day at 00:00 UTC**, so new Substack posts appear on the site automatically
- on demand: GitHub → your repo → **Actions** → "Deploy to GitHub Pages" → **Run workflow**

One-time setup:

1. Push this project to a GitHub repo.
2. In the repo, open **Settings → Pages**, and under **Source** choose **GitHub Actions**.
3. In **Settings → Pages → Custom domain**, enter `golamrabbany.com`. `public/CNAME` already contains the domain.
4. In **Cloudflare → your domain → DNS → Records**, add these records with the proxy turned **off** (grey cloud, "DNS only"):

   | Type | Name | Content |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA | `@` | `2606:50c0:8000::153` |
   | AAAA | `@` | `2606:50c0:8001::153` |
   | AAAA | `@` | `2606:50c0:8002::153` |
   | AAAA | `@` | `2606:50c0:8003::153` |
   | CNAME | `www` | `GolamRabbanyOfficial.github.io` |

   Remove any other A, AAAA or CNAME records for `@` and `www` first.
5. Back in **Settings → Pages**, wait for the DNS check to pass, then tick **Enforce HTTPS**. GitHub can only issue the HTTPS certificate while Cloudflare's proxy is off, which is why the records stay grey. If you later want the orange cloud (Cloudflare's CDN), turn it on only after HTTPS works, and set Cloudflare **SSL/TLS** to **Full (strict)**.
6. Recommended: in your GitHub account, open **Settings → Pages → Add a domain** and verify `golamrabbany.com` with the TXT record GitHub gives you (add it in Cloudflare). This stops anyone else from claiming your domain on GitHub Pages.

## SEO and AI search

These update themselves from your content on every build. Nothing to edit by hand:

- **Structured data** (`src/lib/structured-data.ts`): a schema.org Person description of you in the home page. It covers your job, employer, school, certifications, CTF awards and linked profiles, so Google and AI assistants can tell who you are.
- **`/llms.txt`** (`src/pages/llms.txt.ts`): a plain-text summary of the whole site for AI assistants.
- **`/sitemap-index.xml`**: the list of your pages for search engines.
- **`public/robots.txt`**: allows all search engines and AI crawlers, and points them to the sitemap.

The 404 page is marked `noindex`, so it stays out of search results.

## Files kept out of the site

`drafts/` holds files that aren't published: the AWS project briefs, the old favicon, and unused photos (`drafts/unused-public/photo_bak`). Move a file back into `src/content/` or `public/` to use it again.
