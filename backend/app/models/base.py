from app.database import Base
from sqlalchemy import Column, String, Text, JSON, Integer
from sqlalchemy.types import TypeDecorator, TEXT
import json

class ArrayType(TypeDecorator):
    """Sqlite-like string representation of array"""
    impl = TEXT
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is not None:
            return json.dumps(value)
        return value

    def process_result_value(self, value, dialect):
        if value is not None:
            return json.loads(value)
        return value

# Fallback depending on dialect (Neon Postgres -> use ARRAY, SQLite -> use ArrayType)
def get_array_type(dialect_name):
    if dialect_name == "postgresql":
        from sqlalchemy.dialects.postgresql import ARRAY
        return ARRAY(Text)
    return ArrayType()

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(255), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    # Using JSON for ArrayType fallback for sqlite compat in tests
    overview = Column(JSON, nullable=False)
    year = Column(String(50))
    github_url = Column(String(255))
    content = Column(Text)
    images = Column(JSON)
    technical_details = Column(JSON)
    challenges = Column(JSON)
    outcomes = Column(JSON)
    future_improvements = Column(JSON)
    videos = Column(JSON)
    pdf_url = Column(String(255))
    design_process = Column(Text)
    personal_contribution = Column(JSON)

class Research(Base):
    __tablename__ = "research"

    id = Column(String(255), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    lab = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    overview = Column(JSON, nullable=False)
    period = Column(String(100), nullable=False)
    link = Column(String(255))
    content = Column(Text)
    images = Column(JSON)
    videos = Column(JSON)
    achievements = Column(JSON)
    pdf_url = Column(String(255))

class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255))
    period = Column(String(100), nullable=False)
    description = Column(JSON, nullable=False)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    category = Column(String(255), nullable=False)
    items = Column(JSON, nullable=False)
