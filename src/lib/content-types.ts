// Plain shapes for data that comes from src/content/{work,education,projects,hackathons}/*.md
// These mirror the schemas in src/content.config.ts.

export interface WorkItem {
  company: string;
  title: string;
  href?: string;
  location?: string;
  logoUrl?: string;
  start: string;
  end?: string;
  badges: string[];
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  href?: string;
  logoUrl?: string;
  start: string;
  end: string;
}

export interface CertificationItem {
  name: string;
  category: string;
  issued: string;
  verifyUrl?: string;
  badgeImage?: string;
}

export interface ProjectLink {
  type: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  technologies: string[];
  image?: string;
  video?: string;
  links: ProjectLink[];
  description: string;
}

export interface HackathonLink {
  title: string;
  href: string;
}

export interface HackathonItem {
  title: string;
  dates: string;
  location?: string;
  image?: string;
  win?: string;
  mlh?: string;
  links: HackathonLink[];
  description: string;
}

export interface BlogPost {
  title: string;
  summary: string;
  url: string;
  date: string;
  image?: string;
}
