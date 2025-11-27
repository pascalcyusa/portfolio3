export interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    overview: string[];
    year?: string;
    githubUrl?: string;
    // Rich details for modal
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

export const projects: Project[] = [
    {
        id: "hip-truss-bridge",
        title: "Hip Truss Bridge",
        category: "ME20 / Mechanics",
        image: "/images/hip-truss-bridge/truss1.png",
        description: "Designed and built a hip truss bridge to understand structural loads. The project involved SolidWorks modeling, acrylic assembly, and internal force analysis through theoretical calculations and FEA.",
        overview: [
            "Truss bridge design using SolidWorks",
            "Acrylic structure assembled with glue",
            "Theoretical load calculations and FEA validation",
            "Load-bearing capacity analysis"
        ],
        year: "Fall 2023",
        content: "Designed and built a hip truss bridge to understand structural loads. The project involved SolidWorks modeling, acrylic assembly, and internal force analysis through theoretical calculations and FEA.",
        images: [
            { url: "/images/hip-truss-bridge/truss1.png", caption: "Bridge Side View" },
            { url: "/images/hip-truss-bridge/truss2.png", caption: "Load Testing Setup" },
            { url: "/images/hip-truss-bridge/truss3.png", caption: "FEA Analysis Result" }
        ],
        technicalDetails: [
            "Material selection: Acrylic for predictable failure mode",
            "Joint design optimization for glue adhesion",
            "Finite Element Analysis (FEA) using SolidWorks Simulation",
            "Theoretical truss analysis using Method of Joints"
        ],
        challenges: [
            "Ensuring precise alignment during assembly",
            "Preventing glue failure at joints",
            "Matching theoretical predictions with experimental results"
        ],
        outcomes: [
            "Successfully withstood predicted load",
            "Validated FEA model with experimental data",
            "Gained practical experience in structural analysis"
        ]
    },
    {
        id: "dog-treat-dispenser",
        title: "Dog Treat Dispenser",
        category: "ME40 / Engineering Design",
        image: "/images/dog-treat-dispenser/dispens1.png",
        description: "Designed a wheelchair-mounted dog treat dispenser for Ryan, a user with a spinal cord injury, ensuring minimal effort in dispensing and preventing unintended access by the dog.",
        overview: [
            "User-friendly design requiring minimal effort",
            "Secure dispensing mechanism for controlled treat release",
            "Affordable and durable materials",
            "Clamp-based attachment for easy wheelchair integration"
        ],
        year: "Spring 2024",
        content: "Designed a wheelchair-mounted dog treat dispenser for Ryan, a user with a spinal cord injury, ensuring minimal effort in dispensing and preventing unintended access by the dog.",
        images: [
            { url: "/images/dog-treat-dispenser/dispens1.png", caption: "Final Assembly" },
            { url: "/images/dog-treat-dispenser/dispens2.png", caption: "Mounting Mechanism" },
            { url: "/images/dog-treat-dispenser/dispens3.png", caption: "User Testing" }
        ],
        technicalDetails: [
            "Mechanism design for low-force activation",
            "3D printing for custom parts",
            "Ergonomic analysis for user comfort",
            "Safety features to prevent accidental dispensing"
        ],
        challenges: [
            "Designing for limited hand dexterity",
            "Ensuring durability against dog interaction",
            "Creating a universal mount for different wheelchairs"
        ],
        outcomes: [
            "Delivered a functional prototype to the client",
            "Received positive feedback on ease of use",
            "Improved client's independence in interacting with his dog"
        ]
    },
    {
        id: "tdk-ch101",
        title: "TDK CH101 Ultrasonic Sensor Automation",
        category: "MEMS / Sensors",
        image: "/images/tdk-ch101/img1.jpeg",
        description: "Data collection automation system for ultrasonic sensors using C and LabVIEW integration.",
        overview: [
            "C and LabVIEW integration",
            "Automated data collection",
            "Streamlined interface",
            "Real-time data processing"
        ],
        year: "Summer 2024",
        content: "Data collection automation system for ultrasonic sensors using C and LabVIEW integration.",
        images: [
            { url: "/images/tdk-ch101/img1.jpeg", caption: "Sensor Mount" },
            { url: "https://invensense.tdk.com/wp-content/uploads/2019/09/rp-mod-ch101.png", caption: "CH101 Sensor © TDK Invensense" },
            { url: "/images/tdk-ch101/img2.jpeg", caption: "Experiment Setup" }
        ],
        technicalDetails: [
            "C-based firmware implementation",
            "LabVIEW 2020 development environment",
            "Custom USB communication protocol",
            "Multi-threaded data acquisition system",
            "Real-time data visualization framework",
            "Automated calibration routines"
        ],
        challenges: [
            "Synchronizing multiple sensor readings",
            "Optimizing data transfer rates",
            "Managing large datasets efficiently",
            "Implementing robust error handling",
            "Ensuring consistent timing accuracy"
        ],
        outcomes: [
            "Reduced testing time by 65%",
            "Improved data accuracy by 30%",
            "Automated testing of up to 8 sensors simultaneously",
            "Generated comprehensive test reports automatically",
            "Created reusable software modules for future projects"
        ]
    },
    {
        id: "lego-arduino",
        title: "LEGO & Arduino Education",
        category: "Education",
        image: "/images/ceeo-outreach/img4.jpg",
        description: "Educational robotics projects using LEGO Mindstorms and Arduino.",
        overview: [
            "LEGO Mindstorms integration",
            "Python and Arduino programming",
            "Sensor-controlled robots",
            "Eco-friendly solutions"
        ],
        year: "Summer 2023",
        content: "An innovative educational initiative combining LEGO Mindstorms with Arduino technology to create engaging STEM learning experiences for students. The project focused on hands-on learning and practical application of programming concepts.",
        images: [
            { url: "/images/ceeo-outreach/img5.jpeg", caption: "Robot car controlled with SPIKE Prime ™️ Hub" },
            { url: "/images/ceeo-outreach/img1.jpeg", caption: "Classroom Setup" }
        ],
        technicalDetails: [
            "Arduino Uno and Nano integration",
            "LEGO Mindstorms EV3 platform",
            "Python programming with ev3dev",
            "Custom sensor integration modules",
            "Interactive learning materials"
        ],
        challenges: [
            "Adapting content for different skill levels",
            "Maintaining student engagement",
            "Troubleshooting hardware issues efficiently",
            "Managing limited resource availability",
            "Balancing theory with practical applications"
        ],
        outcomes: [
            "Successfully trained 50+ students",
            "Created 10 reusable project templates",
            "Developed comprehensive learning materials",
            "Achieved 90% positive feedback from students",
            "Implemented sustainable program structure"
        ],
        futureImprovements: [
            "Online learning platform integration",
            "Advanced project modules development",
            "Virtual simulation capabilities",
            "Extended hardware compatibility"
        ]
    },
    {
        id: "social-networking-app",
        title: "Zina",
        category: "Web Development",
        image: "/images/social-networking-app/img3.png",
        description: "Zina is a social networking application designed to help users manage and visualize their personal and professional connections.",
        overview: [
            "Manage a list of contacts with add, edit, and delete functionality",
            "Visualize connections in a grid or network graph view",
            "Toggle between different views with smooth animations",
            "Support for dark mode interface",
            "Multi-step wizard for adding new contacts",
            "Bidirectional connection management between contacts",
            "Integration with SwiftUI for a modern user interface",
            "Persistent storage of contacts using JSON encoding and decoding"
        ],
        year: undefined,
        githubUrl: "https://github.com/pascalcyusa/Zina",
        content: "Zina is a social networking application designed to help users manage and visualize their personal and professional connections. The app allows users to add, edit, and delete contacts, and provides a graphical representation of their network.",
        images: [
            { url: "/images/social-networking-app/icon.png", caption: "App Icon" },
            { url: "/images/social-networking-app/img1.jpeg", caption: "Main Interface" },
            { url: "/images/social-networking-app/img2.jpeg", caption: "Graph Display" }
        ],
        technicalDetails: [
            "Developed using Swift and SwiftUI",
            "Supports iOS platform",
            "Utilizes Core Data for persistent storage",
            "Includes unit and UI tests for reliability"
        ],
        challenges: [
            "Implementing a smooth and intuitive user interface",
            "Ensuring data consistency across the network graph and list views",
            "Managing bidirectional connections efficiently"
        ],
        outcomes: [
            "Successfully created a user-friendly app for managing connections",
            "Provided a visual representation of the user's network",
            "Enabled easy addition and editing of contacts"
        ],
        futureImprovements: [
            "Enhance the graphical representation with more interactive features",
            "Add support for importing contacts from external sources",
            "Improve performance for large networks"
        ]
    },
    {
        id: "splendor-game",
        title: "Splendor Game",
        category: "C++ Projects",
        image: "/images/splendor-game/img2.png",
        description: "Terminal-based implementation of the Splendor board game in C++.",
        overview: [
            "Object-oriented design",
            "Custom game rule enforcement",
            "File handling system",
            "Terminal-based UI"
        ],
        year: "Spring 2023",
        githubUrl: "https://github.com/pascalcyusa/cs11",
        content: "Terminal-based implementation of the Splendor board game in C++.",
        images: [
            { url: "/images/splendor-game/img2.png", caption: "Mockup of the terminal gameplay interface" }
        ],
        technicalDetails: [
            "C++17 standard implementation",
            "Custom game state management system",
            "JSON-based save/load functionality",
            "Command pattern for game actions",
            "Unit testing framework integration",
            "Memory management optimization"
        ],
        challenges: [
            "Implementing complex game rules accurately",
            "Creating an intuitive terminal interface",
            "Managing game state persistence",
            "Handling edge cases in game logic",
            "Optimizing CPU resource usage"
        ],
        outcomes: [
            "Fully functional game implementation",
            "Robust save/load system",
            "Comprehensive error handling",
            "High test coverage",
            "Positive user feedback"
        ],
        futureImprovements: [
            "Graphical user interface",
            "Network multiplayer support",
            "AI opponent implementation",
            "Additional game modes"
        ]
    },
    {
        id: "personal-website",
        title: "Portfolio",
        category: "Web Development",
        image: "/images/personal-website/img1.png",
        description: "A modern, responsive portfolio website that overview a clean and user-friendly design.",
        overview: [
            "Fully Responsive Design: Optimal viewing experience on desktops, tablets, and mobile devices.",
            "Detailed Project Showcase: overview project descriptions, images, and videos via interactive modals.",
            "Project Filtering: Allows users to easily browse projects by category.",
            "Clean, Modern UI: Built with React, TypeScript, and Tailwind CSS for a polished look and feel.",
            "User-Friendly Interface: Intuitive navigation and a smooth Browse experience.",
        ],
        year: "Sept 2022",
        githubUrl: "https://github.com/pascalcyusa/portfolio2",
        content: "A modern, responsive portfolio website that features a clean and user-friendly design.",
        images: [
            { url: "/images/personal-website/img3.png", caption: "Homepage design" },
            { url: "/images/personal-website/img4.png", caption: "Portfolio section" }
        ],
        technicalDetails: [
            "Frontend Stack: Built with React and TypeScript for a robust, modern foundation.",
            "Styling: Utility-first styling using Tailwind CSS, enhanced with shadcn/ui components.",
            "Architecture: Component-based, Single-Page Application (SPA) using client-side routing for seamless navigation.",
            "Build & Development: Utilizes Vite for optimized builds and a fast development workflow.",
            "Performance: Leverages dynamic imports ('code splitting') to improve initial page load speed.",
            "Version Control: Source code managed with Git and hosted on GitHub.",
        ],
        challenges: [
            "Designing a cohesive and visually appealing UI to effectively present diverse content (projects, research).",
            "Achieving fluid responsiveness across a wide range of screen sizes and devices.",
            "Structuring project and research data in a scalable way for easy updates.",
            "Optimizing the loading of assets, particularly high-resolution images, for fast performance.",
            "Ensuring smooth application state management for interactive elements like modals and filtering.",
        ],
        outcomes: [
            "Successfully launched a professional and polished personal portfolio website.",
            "Effectively showcases technical skills, completed projects, and research experience.",
            "Demonstrates expertise in modern frontend development technologies (React, TypeScript, Tailwind CSS).",
            "Achieved a responsive, performant, and user-friendly design.",
            "Developed a maintainable and extensible codebase suitable for future updates.",
        ],
        futureImprovements: [
            "Adding a Blog/Articles section to share technical insights and updates.",
            "Implementing user-selectable Dark/Light mode theme options.",
            "Integrating backend functionality for features like a dynamic contact form.",
            "Connecting to a Headless CMS for easier content management.",
            "Enhancing the user experience with subtle animations and micro-interactions.",
            "Implementing further Search Engine Optimization (SEO) techniques.",
            "Adding ability to host images through a hosting service instead of within the repo.",
        ]
    }
];
