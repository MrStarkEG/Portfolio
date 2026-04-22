import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experience } from '@/data/experience';
import { fallbackArticles, type Article } from '@/data/articles';
import { openSourceContributions, type OpenSourceContribution } from '@/data/openSource';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  featured?: boolean;
  threatIntel?: boolean;
  confidential?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  tag?: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface Stats {
  projects_completed: number | string;
  years_experience: number | string;
  articles_written: number | string;
  skills_mastered: number | string;
}

export type { Article, OpenSourceContribution };

const MEDIUM_RSS_URL = 'https://medium.com/feed/@mrstarkeg';
const RSS_TO_JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}`;

export const getProjects = async (): Promise<Project[]> => {
  return Promise.resolve(projects);
};

export const getProject = async (id: number): Promise<Project> => {
  const project = projects.find(p => p.id === id);
  if (!project) {
    throw new Error('Project not found');
  }
  return Promise.resolve(project);
};

export const getSkills = async (): Promise<Skill[]> => {
  return Promise.resolve(skills);
};

export const getExperience = async (): Promise<Experience[]> => {
  return Promise.resolve(experience);
};

export const getOpenSource = async (): Promise<OpenSourceContribution[]> => {
  return Promise.resolve(openSourceContributions);
};

export const getStats = async (): Promise<Stats> => {
  const stats: Stats = {
    projects_completed: "15+",
    years_experience: "2+",
    articles_written: fallbackArticles.length,
    skills_mastered: skills.length,
  };
  return Promise.resolve(stats);
};

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  content?: string;
}

interface Rss2JsonResponse {
  status: string;
  items?: Rss2JsonItem[];
}

const estimateReadTime = (html: string | undefined): string => {
  if (!html) return "5 min read";
  const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(wordCount / 220));
  return `${minutes} min read`;
};

const extractSummary = (html: string | undefined, fallback: string): string => {
  if (!html) return fallback;
  const stripped = html
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (!stripped) return fallback;
  return stripped.length > 220 ? stripped.slice(0, 217).trim() + '…' : stripped;
};

const formatPublishDate = (pubDate: string): string => {
  const date = new Date(pubDate.replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return pubDate;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(RSS_TO_JSON_API, { cache: 'no-store' });
    if (!response.ok) throw new Error(`RSS fetch failed: ${response.status}`);
    const data: Rss2JsonResponse = await response.json();
    if (data.status !== 'ok' || !data.items?.length) throw new Error('RSS response not ok');

    return data.items.map((item, index) => {
      const fallback = fallbackArticles[index];
      return {
        id: index + 1,
        title: item.title,
        description: extractSummary(item.description || item.content, fallback?.description || ''),
        url: item.link.split('?')[0],
        readTime: estimateReadTime(item.content || item.description),
        publishDate: formatPublishDate(item.pubDate),
      };
    });
  } catch {
    return fallbackArticles;
  }
};

export const sendContactMessage = async (message: ContactMessage): Promise<{ success: boolean; message: string }> => {
  console.log('Contact message:', message);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
};
