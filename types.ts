export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

export interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}