export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    overview: string[];
    year?: string;
    githubUrl?: string;
    content?: string;
    images?: { url: string; caption?: string }[];
    technicalDetails?: string[];
    challenges?: string[];
    outcomes?: string[];
    futureImprovements?: string[];
    videos?: { url: string; caption: string }[];
    pdfUrl?: string;
    designProcess?: string;
    personalContribution?: string[];
}

export interface ResearchItem {
    id: string;
    title: string;
    category: string;
    lab: string;
    image: string;
    description: string;
    overview: string[];
    period: string;
    link?: string;
    content?: string;
    images?: { url: string; caption?: string }[];
    videos?: { url: string; caption: string }[];
    achievements?: string[];
    pdfUrl?: string;
}
