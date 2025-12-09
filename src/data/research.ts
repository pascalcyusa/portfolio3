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
}

export const researchData: ResearchItem[] = [
    {
        "id": "ultrasonic-anemometer",
        "title": "Ultrasonic Anemometer",
        "category": "MEMS / Sensors",
        "lab": "Microscale Sensors and Systems Lab",
        "image": "/images/tdk-ch101/img1.jpeg",
        "description": "The Microscale Sensors and Systems Lab focuses on microscale sensor systems. My research evaluates the TDK CH101 ultrasonic sensor for wind velocity measurement on Mars rovers and high-altitude UAVs. I utilize Python-based statistical pipelines to analyze acoustic Time-of-Flight data against physical ground truths, identifying hardware biases and defining precision limits for off-the-shelf components.",
        "overview": [
            "Validated sensor performance with R²=0.91 correlation analysis",
            "Discovered ±15.6 m/s variance, establishing benchmarks for future creation",
            "Actively retrofitting wind tunnel with differential pressure taps for precision ground-truth monitoring"
        ],
        "period": "Jun 2024 - Present",
        "link": "https://sites.tufts.edu/senselab/research/#:~:text=Miniaturized%20Ultrasonic%20Anemometer"
    },
    {
        id: "ceeo-outreach",
        title: "Engineering Education Outreach",
        category: "Education",
        lab: "Tufts Center for Engineering Education and Outreach",
        image: "/images/ceeo-outreach/img4.jpg",
        description: "As an Outreach Learning Fellow at Tufts University's Center for Engineering Education and Outreach (CEEO), I’ve had the opportunity to engage with students from underrepresented communities and support their learning in STEM. What excites me most about being an outreach learning fellow is the chance to inspire curiosity and build confidence in young learners through hands-on activities and creative problem-solving.",
        overview: [
            "Designed and tested interactive engineering lessons for outreach programs",
            "Collaborated with local schools to deliver accessible, hands-on STEM education",
            "Advanced DEIJ goals by supporting students from underrepresented communities",
        ],
        period: "Mar 2023 - Present",
        link: "https://sites.tufts.edu/ceeoolf/who-we-are/"
    },
    {
        id: "pebl-curriculum",
        title: "Playful Engineering Based Learning (PEBL) Curriculum",
        category: "Education",
        lab: "Tufts Center for Engineering Education and Outreach",
        image: "/images/ceeo-outreach/img2.jpg",
        description: "Developed comprehensive STEM curricula for K-12 students, focusing on practical engineering applications using LEGO and Arduino projects. Led the implementation of maker spaces across Rwanda, significantly impacting student engagement and learning outcomes.",
        overview: [
            "Established maker spaces in 20+ Rwandan schools",
            "Impacted 769 students directly",
            "Increased engagement by 37%",
            "Created interactive engineering curricula"
        ],
        period: "May 2023 - Jul 2023",
        link: "https://sites.tufts.edu/pebl/2023/10/02/rwandan-tufts-students-return-home-to-inspire-young-makers/"
    }
];
