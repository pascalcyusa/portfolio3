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
    // Rich details for modal
    content?: string;
    images?: { url: string; caption?: string }[];
    videos?: { url: string; caption: string }[];
    achievements?: string[];
    pdfUrl?: string;
}

export const researchData: ResearchItem[] = [
    // ultrasonic-anemometer
    {
        id: "ultrasonic-anemometer",
        title: "Ultrasonic Anemometer",
        category: "MEMS / Sensors",
        lab: "Microscale Sensors and Systems Lab",
        image: "/images/tdk-ch101/img1.jpeg",
        description: "The Microscale Sensors and Systems Lab is a state of the art lab at Tufts that focuses on the design, fabrication, and testing of microscale sensors and systems. My research area has been on the development of a miniature ultrasonic anemometer using the TDK CH101 sensor. This has potential applications in Navy high-altitude UAVs, and low-pressure environments on Mars.",
        overview: [
            "Distance measurements within ± 0.1878 mm error margin",
            "Wind velocity measurements at ± 0.6454 m/s accuracy",
            "Working towards ±0.05 m/s wind velocity accuracy"
        ],
        period: "Jun 2024 - Present",
        link: "https://sites.tufts.edu/senselab/research/#:~:text=Miniaturized%20Ultrasonic%20Anemometer",
        content: "The Microscale Sensors and Systems Lab is a state of the art lab at Tufts that focuses on the design, fabrication, and testing of microscale sensors and systems. My research has area has been on the development of a miniature ultrasonic anemometer using the TDK CH101 sensor. This has potential applications in Navy high-altitude UAVs, and low-pressure environments on Mars.",
        images: [
            {
                url: "/images/tdk-ch101/img1.jpeg",
                caption: "TDK CH101 Sensor used to measure flow. Here, the sensor is measuring flow at standard room conditions."
            }
        ],
        achievements: [
            "Distance measurements within ± 0.1878 mm error margin",
            "Wind velocity measurements at ± 0.6454 m/s accuracy",
            "Working towards ±0.05 m/s wind velocity accuracy"
        ],
        pdfUrl: "https://tuftscloud-my.sharepoint.com/:b:/g/personal/jcyusa01_tufts_edu/EQ3-R-EdM6tPplHGKzaGvvkB7qgCPYrTeh75C466yeMHew?e=L1lMAA"
    },
    // ceeo-outreach
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
        link: "https://sites.tufts.edu/ceeoolf/#:~:text=Computer%20Engineering%2C%202027-,Jean%20Pascal%20Cyusa,-Mechanical%20Engineering%2C%202026",
        content: "As an Outreach Learning Fellow at Tufts University's Center for Engineering Education and Outreach (CEEO), I’ve had the opportunity to engage with students from underrepresented communities and support their learning in STEM. What excites me most about being an outreach learning fellow is the chance to inspire curiosity and build confidence in young learners through hands-on activities and creative problem-solving.",
        images: [
            {
                url: "/images/ceeo-outreach/img1.jpeg",
                caption: undefined
            },
            {
                url: "/images/ceeo-outreach/img5.jpeg",
                caption: undefined
            }
        ],
        videos: [
            {
                url: "https://youtube.com/shorts/coV66ifPdfU",
                caption: "A Robot Grabber made by a 7th grade student at Winter Hill Community School"
            }
        ],
        achievements: [
            "Designed and tested engineering lesson plans for K–12 students",
            "Facilitated hands-on learning activities that introduced core STEM principles",
            "Collaborated with educators and faculty to align outreach goals with DEIJ values"
        ]
    },
    // pebl-curriculum
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
        link: "https://sites.tufts.edu/pebl/2023/10/02/rwandan-tufts-students-return-home-to-inspire-young-makers/",
        content: "Developed comprehensive STEM curricula for K-12 students, focusing on practical engineering applications using LEGO and Arduino projects. Led the implementation of maker spaces across Rwanda, significantly impacting student engagement and learning outcomes.",
        images: [
            {
                url: "/images/ceeo-outreach/img2.jpg",
                caption: "An Arduino robot presented by one of the students in the Makerspace competition at Maranyundo"
            },
            {
                url: "/images/ceeo-outreach/img3.jpg",
                caption: "The team that won first place at the Maranyundo Makerspace competition"
            }
        ],
        achievements: [
            "Established maker spaces in 20+ Rwandan schools",
            "Impacted 769 students directly",
            "Increased engagement by 37%",
            "Created interactive engineering curricula"
        ]
    }
];
