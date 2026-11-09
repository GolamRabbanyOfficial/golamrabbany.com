import { Icons } from "@/components/icons";
import { Activity, Binary, BookOpen, FileText, House, Library, Network, ShieldAlert, ShieldCheck } from "lucide-react";
import { Golang } from "@/components/ui/svgs/golang";
import { Terraform } from "@/components/ui/svgs/terraform";


// Multi-colour skill logos are static files in public/skills/ rather than
// inline SVG: they were most of the home page's HTML weight. Lazy-loaded
// since the skills section is below the fold.
function skillIcon(src: string) {
  const SkillIcon = ({ className }: { className?: string }) => (
    <img src={src} alt="" width={16} height={16} loading="lazy" decoding="async" className={className} />
  );
  return SkillIcon;
}

export const DATA = {
  name: "Golam Rabbany - Cloud Security Engineer",
  initials: "GR",
  url: "https://golamrabbany.com",
  location: "Remote",
  locationLink: "https://www.google.com/maps/place/dhaka",
  description:
    "Cloud Security Engineer with a focus on securing multi-cloud.",
  // Shown in search results and link previews (aim for 150-160 characters).
  metaDescription:
    "Golam Rabbany, Cloud Security Engineer and national CTF champion. Google Cloud Professional Cloud Architect and 4x AWS Certified, securing multi-cloud environments.",
  summary:
    "I started my cybersecurity journey in 2019, during COVID, focusing on hands-on learning, CTF competitions and creating content. Since then I've won [several national CTF championships](#hackathons), competed in 100+ national and international events, and authored challenges for international CTFs. I currently work as an [Associate Cloud Engineer and Cloud Content Engineer at Elite Cloud PTE. LTD.](#work), a multi-cloud CSP partner. Before that, I was a Cybersecurity Content Writer at BowTiedCyber LLC in the USA, writing about both offensive and defensive security. Outside work, I explore AI, cloud and cybersecurity, and share what I learn on my blog and YouTube channel. I also tutor, and have experience teaching international students.",
  avatarUrl: "/picofme.png",
  // Small copy shown on the page (the PNG above stays for search engines).
  avatarThumbUrl: "/picofme-256.webp",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 3, enabled: true, heading: "Education" },
    certifications: {
  	order: 4, enabled: true,
  	label: "Certifications",
  	heading: "Certifications & Badges",
  	text: "A few of the credentials I've earned. Click any badge to verify.",
},
    skills: { order: 5, enabled: true, heading: "Skills" },
    projects: {
      order: 6, enabled: true,
      label: "Projects",
      heading: "Building secure clouds",
      text: "Hands-on AWS security projects covering automated remediation and detection engineering, built entirely as code.",
    },
    hackathons: {
      order: 8, enabled: true,
      label: "CTF Competitions",
      heading: "I like solving challenges.",
      text: "My journey in cybersecurity has taken me through 100+ competitions and 10+ onsite events, together with some of the sharpest, most driven people I've met — all racing to find vulnerabilities, reverse-engineer binaries, and crack the next challenge before the clock ran out.",
    },
    writing: {
      order: 8.5, enabled: true,
      label: "Writing",
      heading: "From my newsletter",
      text: "Hands-on articles on cybersecurity and cloud, published on Substack.",
      postsShown: 3,
    },
    photos: {
      order: 7, enabled: false,
      heading: "My Recent Participations",
    },
    contact: {
      order: 9, enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Have a question, an opportunity, or an idea to collaborate on in cloud security? Send me an email or reach out on LinkedIn, and I'll get back to you.",
    },
  },
  // Blog posts are pulled from this Substack's RSS feed at build time.
  blog: {
    substackUrl: "https://learnwithrabbany.substack.com",
    heading: "Blog",
    text: "Hands-on articles on cybersecurity and cloud. Read them on Substack, and subscribe to get new ones by email.",
    // Feed posts with these exact titles are left off the site.
    hiddenPosts: ["Coming soon"],
  },
  certificationCategoryOrder: ["Cloud", "Cybersecurity"],
  photos: [
    { src: "/photos/photo1.webp", alt: "Photo 1" },
    { src: "/photos/photo2.webp", alt: "Photo 2" },
    { src: "/photos/photo3.webp", alt: "Photo 3" },
    { src: "/photos/photo4.webp", alt: "Photo 4" },
    { src: "/photos/photo5.webp", alt: "Photo 5" },
    { src: "/photos/photo6.webp", alt: "Photo 6" },
    { src: "/photos/photo7.webp", alt: "Photo 7" },
    { src: "/photos/photo8.webp", alt: "Photo 8" },
    { src: "/photos/photo9.webp", alt: "Photo 9" },
  ],
  skills: [
    { name: "AWS", icon: skillIcon("/skills/aws.svg") },
    { name: "Azure", icon: skillIcon("/skills/azure.svg") },
    { name: "GCP", icon: skillIcon("/skills/gcp.svg") },
    { name: "Linux", icon: skillIcon("/skills/linux.svg") },
    { name: "Kubernetes", icon: skillIcon("/skills/kubernetes.svg") },
    { name: "Docker", icon: skillIcon("/skills/docker.svg") },
    { name: "Terraform", icon: Terraform },
    { name: "Github", icon: skillIcon("/skills/github.svg") },
    { name: "Jenkins", icon: skillIcon("/skills/jenkins.svg") },
    { name: "Ansible", icon: skillIcon("/skills/ansible.svg") },
    { name: "Prometheus", icon: skillIcon("/skills/prometheus.svg") },
    { name: "ELK Stack", icon: skillIcon("/skills/elk-stack.svg") },
    { name: "Burp Suite", icon: skillIcon("/skills/burp-suite.svg") },
    { name: "Splunk", icon: Activity },
    { name: "GuardDuty", icon: ShieldAlert },
    { name: "Security Hub", icon: ShieldCheck },
    { name: "Wireshark", icon: Network },
    { name: "Ghidra", icon: Binary },
    { name: "Nginx", icon: skillIcon("/skills/nginx.svg") },
    { name: "Bash", icon: skillIcon("/skills/bash.svg") },
    { name: "Python", icon: skillIcon("/skills/python.svg") },
    { name: "Astro", icon: skillIcon("/skills/astro.svg") },
    { name: "React", icon: skillIcon("/skills/react.svg") },
    { name: "Next.js", icon: skillIcon("/skills/next-js.svg") },
    { name: "Typescript", icon: skillIcon("/skills/typescript.svg") },
    { name: "Node.js", icon: skillIcon("/skills/node-js.svg") },
    { name: "Go", icon: Golang },
    { name: "Postgres", icon: skillIcon("/skills/postgres.svg") },
  ],
  // Menu under your title on the home page. Add items here; each needs
  // href, label and a lucide-react icon (import it at the top of this file).
  heroMenu: [
    { href: "/blog", icon: BookOpen, label: "Blog" },
    // Opens public/resume.pdf. Until that file exists, it links to `fallback`
    // (your LinkedIn profile) so the button never leads to a missing page.
    {
      href: "/resume.pdf",
      icon: FileText,
      label: "Resume",
      file: "resume.pdf",
      fallback: "https://www.linkedin.com/in/golamrabbany/",
    },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/blog", icon: Library, label: "Blog" },
  ],
  contact: {
    email: "contact.golamrabbany@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/GolamRabbanyOfficial",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/golamrabbany/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/_GolamRabbany",
        icon: Icons.x,
        navbar: true,
      },
      Youtube: {
        name: "YouTube",
        url: "https://www.youtube.com/@LearnWithRabbany",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:contact.golamrabbany@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

} as const;
