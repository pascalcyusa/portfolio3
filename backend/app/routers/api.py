from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.base import Project, Research, Experience, Skill
from app.schemas.base import ProjectCreate, ProjectResponse, ResearchCreate, ResearchResponse, ExperienceCreate, ExperienceResponse, SkillCreate, SkillResponse
from app.core.security import get_api_key

router = APIRouter()

# Projects
@router.get("/projects", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@router.get("/projects/{project_id}", response_model=ProjectResponse)
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/projects", response_model=ProjectResponse, dependencies=[Depends(get_api_key)])
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project.id).first()
    if db_project:
        raise HTTPException(status_code=400, detail="Project already registered")

    # Dump models to dict
    db_project_dict = project.model_dump()
    if db_project_dict.get("images"):
        db_project_dict["images"] = [img for img in db_project_dict["images"]]
    if db_project_dict.get("videos"):
        db_project_dict["videos"] = [vid for vid in db_project_dict["videos"]]

    db_item = Project(**db_project_dict)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/projects/{project_id}", dependencies=[Depends(get_api_key)])
def delete_project(project_id: str, db: Session = Depends(get_db)):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        # Improved error for easier debugging
        raise HTTPException(status_code=404, detail=f"Project with ID '{project_id}' not found in database.")
    db.delete(db_project)
    db.commit()
    return {"message": f"Project '{project_id}' deleted successfully"}


# Research
@router.get("/research", response_model=List[ResearchResponse])
def get_research(db: Session = Depends(get_db)):
    return db.query(Research).all()

@router.post("/research", response_model=ResearchResponse, dependencies=[Depends(get_api_key)])
def create_research(research: ResearchCreate, db: Session = Depends(get_db)):
    db_research = db.query(Research).filter(Research.id == research.id).first()
    if db_research:
        raise HTTPException(status_code=400, detail="Research already registered")

    db_research_dict = research.model_dump()
    if db_research_dict.get("images"):
        db_research_dict["images"] = [img for img in db_research_dict["images"]]
    if db_research_dict.get("videos"):
        db_research_dict["videos"] = [vid for vid in db_research_dict["videos"]]

    db_item = Research(**db_research_dict)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/research/{research_id}", dependencies=[Depends(get_api_key)])
def delete_research(research_id: str, db: Session = Depends(get_db)):
    db_research = db.query(Research).filter(Research.id == research_id).first()
    if not db_research:
        raise HTTPException(status_code=404, detail=f"Research item with ID '{research_id}' not found in database.")
    db.delete(db_research)
    db.commit()
    return {"message": f"Research '{research_id}' deleted successfully"}

# Experiences
@router.get("/experiences", response_model=List[ExperienceResponse])
def get_experiences(db: Session = Depends(get_db)):
    return db.query(Experience).all()

@router.post("/experiences", response_model=ExperienceResponse, dependencies=[Depends(get_api_key)])
def create_experience(experience: ExperienceCreate, db: Session = Depends(get_db)):
    db_item = Experience(**experience.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/experiences/{experience_id}", dependencies=[Depends(get_api_key)])
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    db_experience = db.query(Experience).filter(Experience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(db_experience)
    db.commit()
    return {"message": "Experience deleted successfully"}

# Skills
@router.get("/skills", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()

@router.post("/skills", response_model=SkillResponse, dependencies=[Depends(get_api_key)])
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    db_item = Skill(**skill.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/skills/{skill_id}", dependencies=[Depends(get_api_key)])
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted successfully"}
