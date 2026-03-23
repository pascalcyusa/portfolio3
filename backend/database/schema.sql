-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    overview TEXT[] NOT NULL,
    year VARCHAR(50),
    github_url VARCHAR(255),
    content TEXT,
    images JSONB,
    technical_details TEXT[],
    challenges TEXT[],
    outcomes TEXT[],
    future_improvements TEXT[],
    videos JSONB,
    pdf_url VARCHAR(255),
    design_process TEXT,
    personal_contribution TEXT[]
);

-- Create research table
CREATE TABLE IF NOT EXISTS research (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    lab VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    overview TEXT[] NOT NULL,
    period VARCHAR(100) NOT NULL,
    link VARCHAR(255),
    content TEXT,
    images JSONB,
    videos JSONB,
    achievements TEXT[],
    pdf_url VARCHAR(255)
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    period VARCHAR(100) NOT NULL,
    description TEXT[] NOT NULL
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    items TEXT[] NOT NULL
);
