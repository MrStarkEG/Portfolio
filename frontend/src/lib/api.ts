const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
}

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

export const getProjects = (): Promise<Project[]> => apiCall('/api/projects');
export const getProject = (id: number): Promise<Project> => apiCall(`/api/projects/${id}`);
export const getSkills = (): Promise<Skill[]> => apiCall('/api/skills');
export const getExperience = (): Promise<Experience[]> => apiCall('/api/experience');
export const getStats = (): Promise<Stats> => apiCall('/api/stats');

export const sendContactMessage = (message: ContactMessage): Promise<{ success: boolean; message: string }> =>
  apiCall('/api/contact', {
    method: 'POST',
    body: JSON.stringify(message),
  });