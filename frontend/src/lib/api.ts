import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experience } from '@/data/experience';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
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
  technologies: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface Stats {
  projects_completed: number;
  years_experience: number;
  technologies_mastered: number;
  clients_satisfied: number;
}

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

export const getStats = async (): Promise<Stats> => {
  const stats: Stats = {
    projects_completed: projects.length,
    years_experience: 3,
    technologies_mastered: 20,
    clients_satisfied: 5,
  };
  return Promise.resolve(stats);
};

export const sendContactMessage = async (message: ContactMessage): Promise<{ success: boolean; message: string }> => {
  console.log('Contact message:', message);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
};