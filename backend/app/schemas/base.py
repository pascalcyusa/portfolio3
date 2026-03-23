from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Any, Dict

class ImageSchema(BaseModel):
    url: str
    caption: Optional[str] = None

class VideoSchema(BaseModel):
    url: str
    caption: str

class ProjectBase(BaseModel):
    id: str
    title: str
    category: str
    image: str
    description: str
    overview: List[str]
    year: Optional[str] = None
    github_url: Optional[str] = None
    content: Optional[str] = None
    images: Optional[List[ImageSchema]] = None
    technical_details: Optional[List[str]] = None
    challenges: Optional[List[str]] = None
    outcomes: Optional[List[str]] = None
    future_improvements: Optional[List[str]] = None
    videos: Optional[List[VideoSchema]] = None
    pdf_url: Optional[str] = None
    design_process: Optional[str] = None
    personal_contribution: Optional[List[str]] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    class Config:
        from_attributes = True

class ResearchBase(BaseModel):
    id: str
    title: str
    category: str
    lab: str
    image: str
    description: str
    overview: List[str]
    period: str
    link: Optional[str] = None
    content: Optional[str] = None
    images: Optional[List[ImageSchema]] = None
    videos: Optional[List[VideoSchema]] = None
    achievements: Optional[List[str]] = None
    pdf_url: Optional[str] = None

class ResearchCreate(ResearchBase):
    pass

class ResearchResponse(ResearchBase):
    class Config:
        from_attributes = True

class ExperienceBase(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    period: str
    description: List[str]

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: int
    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    category: str
    items: List[str]

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int
    class Config:
        from_attributes = True
