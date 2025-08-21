from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    category: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None


class Skill(BaseModel):
    name: str
    level: int
    category: str


class Experience(BaseModel):
    id: int
    company: str
    position: str
    duration: str
    description: str
    technologies: List[str]


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


# Sample data
projects_data = [
    {
        "id": 1,
        "title": "E-commerce Data Pipeline",
        "description": "Built a comprehensive data pipeline for scraping and analyzing e-commerce product data from multiple sources",
        "technologies": ["Python", "Scrapy", "Apache Airflow", "PostgreSQL", "Docker"],
        "category": "Data Engineering",
        "github_url": "https://github.com/mrstarkeg/ecommerce-pipeline",
        "image_url": "/api/placeholder/400/250",
    },
    {
        "id": 2,
        "title": "Real-time Web Scraper",
        "description": "Developed a scalable web scraping system with real-time data processing and anti-bot detection bypass",
        "technologies": ["Python", "Selenium", "BeautifulSoup", "Redis", "FastAPI"],
        "category": "Web Scraping",
        "github_url": "https://github.com/mrstarkeg/realtime-scraper",
        "image_url": "/api/placeholder/400/250",
    },
    {
        "id": 3,
        "title": "Social Media Analytics Dashboard",
        "description": "Full-stack dashboard for analyzing social media trends with automated data collection",
        "technologies": ["React", "Node.js", "MongoDB", "Chart.js", "Twitter API"],
        "category": "Full Stack",
        "demo_url": "https://analytics.mrstarkeg.com",
        "image_url": "/api/placeholder/400/250",
    },
    {
        "id": 4,
        "title": "Financial Data ETL System",
        "description": "Enterprise-grade ETL system for processing financial market data with high availability",
        "technologies": ["Python", "Apache Kafka", "Spark", "AWS", "Kubernetes"],
        "category": "Data Engineering",
        "github_url": "https://github.com/mrstarkeg/financial-etl",
        "image_url": "/api/placeholder/400/250",
    },
]

skills_data = [
    {"name": "Python", "level": 95, "category": "Programming"},
    {"name": "JavaScript", "level": 85, "category": "Programming"},
    {"name": "Web Scraping", "level": 98, "category": "Specialization"},
    {"name": "Data Engineering", "level": 92, "category": "Specialization"},
    {"name": "FastAPI", "level": 88, "category": "Backend"},
    {"name": "React", "level": 82, "category": "Frontend"},
    {"name": "PostgreSQL", "level": 90, "category": "Database"},
    {"name": "Docker", "level": 85, "category": "DevOps"},
    {"name": "AWS", "level": 80, "category": "Cloud"},
    {"name": "Apache Airflow", "level": 87, "category": "Data Engineering"},
]

experience_data = [
    {
        "id": 1,
        "company": "BuGuard",
        "position": "Senior Software Developer",
        "duration": "2022 - Present",
        "description": "Leading web scraping and data engineering initiatives, developing scalable backend systems and contributing to frontend development",
        "technologies": ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "AWS"],
    }
]


@app.get("/")
async def root():
    return {"message": "Portfolio API is running"}


@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    return projects_data


@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    project = next((p for p in projects_data if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.get("/api/skills", response_model=List[Skill])
async def get_skills():
    return skills_data


@app.get("/api/experience", response_model=List[Experience])
async def get_experience():
    return experience_data


@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    # In a real application, you would send an email or save to database
    return {
        "success": True,
        "message": "Thank you for your message! I'll get back to you soon.",
    }


@app.get("/api/stats")
async def get_stats():
    return {
        "projects_completed": len(projects_data),
        "years_experience": 3,
        "technologies_mastered": len(skills_data),
        "clients_satisfied": 15,
    }
