#!/usr/bin/env python3
"""
One-time seed script that populates the database directly with all project and
research data from the original portfolio, with image URLs pointing to GCS.

Usage:
  cd /Users/pascal/Downloads/portfolio3
  backend/venv/bin/python seed_from_old.py

No auth needed — writes directly to the SQLite database.
"""

import os

from sqlalchemy import create_engine, Column, String, Text, JSON, Integer
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"
    id = Column(String(255), primary_key=True)
    title = Column(String(255), nullable=False)
    category = Column(String(255), nullable=False)
    image = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
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
    id = Column(String(255), primary_key=True)
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

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend", "test.db")
GCS_BASE = "https://storage.googleapis.com/portfolio3-images-bucket"


def to_gcs_url(path: str) -> str:
    """Convert a local /images/... path to a GCS public URL."""
    if not path:
        return path
    if path.startswith("http://") or path.startswith("https://"):
        return path  # Already absolute
    if path.startswith("/"):
        return f"{GCS_BASE}{path}"
    return f"{GCS_BASE}/{path}"


# ── Project data ──────────────────────────────────────────────────────────────
PROJECTS = [
    {
        "id": "ml-hand-gesture-app",
        "title": "ML Hand Gesture App",
        "category": "Full-Stack / ML",
        "image": "/images/artefacts/5.webp",
        "description": "Privacy-first web app that lets users train custom hand-gesture models in-browser and control connected devices in real time.",
        "overview": [
            "Architected a full-stack TypeScript/Python experience where users train gesture models entirely in the browser via webcam.",
            "Added an interactive piano player and Bluetooth control for LEGO Spike Prime motors driven by real-time gesture recognition.",
            "Deployed with serverless PostgreSQL (Neon), a Dockerized FastAPI backend on Google Cloud Run, and a responsive React frontend on Netlify.",
            "Maintained a CI/CD pipeline with GitHub Actions and Google Cloud Build while keeping all camera data and model training client-side for privacy."
        ],
        "year": "Jun 2025 - Present",
        "content": "A full-stack application that prioritizes user privacy by keeping all gesture data and model training on-device while still providing rich device control through Bluetooth and an interactive piano feature.",
        "technical_details": [
            "Client-side model training with TensorFlow.js",
            "FastAPI backend (Docker) on Google Cloud Run",
            "Serverless PostgreSQL (Neon) for metadata",
            "React + TypeScript frontend deployed on Netlify",
            "Bluetooth control for LEGO Spike Prime motors"
        ],
        "outcomes": [
            "Delivered a privacy-first gesture training workflow without server-side image handling.",
            "Enabled real-time gesture-driven interactions for both web UI and Bluetooth-connected devices."
        ]
    },
    {
        "id": "drone-payload-reduction",
        "title": "Drone Payload Reduction (BAE Systems)",
        "category": "Senior Capstone",
        "image": "/images/artefacts/6.webp",
        "description": "Designed integrated PCB drone arms with BAE Systems to reduce wiring mass and extend flight time.",
        "overview": [
            "Designed integrated PCB drone arms in SolidWorks and Onshape with BAE Systems, reducing wiring mass and increasing flight time by ~135%.",
            "Created PCB layouts in KiCad, hand-soldered prototypes, and performed COMSOL FEA plus thermal analysis to satisfy ISO 24352 requirements.",
            "Fabricated modular prototypes with TPU overmolding for vibration damping, achieving a ~10% reduction in total drone mass."
        ],
        "year": "Fall 2025",
        "technical_details": [
            "SolidWorks and Onshape CAD for PCB arm integration",
            "KiCad PCB layout and hand-soldered prototypes",
            "COMSOL FEA and thermal analysis for ISO 24352 compliance",
            "TPU overmolding for vibration damping and modularity"
        ],
        "outcomes": [
            "Demonstrated lighter integrated arms that reduced wiring mass and extended flight time.",
            "Validated structural and thermal performance against ISO 24352 criteria."
        ]
    },
    {
        "id": "pokemon-cafe",
        "title": "Pokémon Cafe",
        "category": "Robotics",
        "image": "/images/pokemon-cafe/img3.webp",
        "description": "Fully autonomous pancake delivery system on an iRobot Create3 using ROS 2, Airtable orders, IR sensors, and OpenCV station detection.",
        "overview": [
            "Built a ROS 2 state machine on an iRobot Create3 to shuttle pancake orders between production stations.",
            "Implemented IR line-following with OpenCV color marker detection and sequential counting to identify stations.",
            "Integrated Airtable API for real-time order intake and status updates, coordinating robot modes (moving, waiting, idle)."
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/Pokemon-Cafe",
        "content": "A fully autonomous transport robot that moves pancake orders through production stations, leveraging ROS 2, Airtable order syncing, and onboard sensing for reliable station detection.",
        "images": [
            {"url": "/images/pokemon-cafe/img1.webp", "caption": "The Create 3 Robot at the whipped cream station"},
            {"url": "/images/pokemon-cafe/img2.webp", "caption": "The Create 3 Robot at the sprinkles station"},
            {"url": "/images/pokemon-cafe/img3.webp", "caption": "Complete setup with the order website"},
            {"url": "/images/pokemon-cafe/img4.webp", "caption": "The orders in airtable"}
        ],
        "videos": [
            {"url": "https://youtu.be/pDoqdQYS55g", "caption": "Pokémon Cafe full run"}
        ],
        "technical_details": [
            "ROS 2 state machine managing robot modes and routing between stations",
            "IR sensors for line following paired with OpenCV color marker detection and sequential counting",
            "Airtable API integration for order intake and status updates",
            "Create 3 robot platform with camera vision for station identification",
            "Real-time status synchronization between the robot and online order system"
        ],
        "personal_contribution": [
            "Built the Airtable integration for retrieving orders and sending back status updates.",
            "Programmed camera vision to recognize colored station markers and count them for routing.",
            "Developed line-following and navigation logic on the Create 3 platform."
        ],
        "challenges": [
            "Reliable Station Identification: Relying only on color and counting made it tricky if the robot missed a marker.",
            "Robust Line Following: Making sure the robot stayed on the line reliably, especially if the path wasn't perfect.",
            "Teamwork Between Systems: Coordinating the transport robot with other automated parts of the pancake maker via the online.",
            "Consistent Color Vision: Ensuring the robot saw colors correctly even if lighting changed.",
            "Real-time Updates: Getting status updates to and from Airtable quickly enough."
        ],
        "outcomes": [
            "Built a Working Transport Robot: The robot successfully moved between stations using line following and camera vision.",
            "Connected to Order System: Successfully linked the robot to Airtable for orders and status updates.",
            "Part of a Full Automated System: Showcased how the transport robot worked within the complete automated pancake-making process (as part of a team effort).",
            "Followed Order Steps: The robot visited the necessary stations in the right sequence for each order.",
            "Completed Project Goal: Delivered a functional robot system for the final class presentation."
        ],
        "future_improvements": [
            "Smarter Station Signs: Use QR codes or similar unique markers instead of just colors so the robot always knows exactly which station it's at.",
            "Better Navigation Skills: Give the robot better ways to understand its location (like mapping) to handle complex paths or getting lost.",
            "Smarter Error Handling: Teach the robot better ways to recover if it gets stuck or loses the line.",
            "Faster Communication: Allow the robot to talk directly to stations instead of only through Airtable.",
            "More Robots: Design the system to potentially handle multiple delivery robots at once."
        ]
    },
    {
        "id": "navigate-to-pewter-city",
        "title": "Navigate Back to Pewter City",
        "category": "ME35 / Simple Robotics",
        "image": "/images/navigate-to-pewter-city/img5.webp",
        "description": "A iRobot ™️ Create3 programmed to navigate through a maze with 90-degree turns based on object detection.",
        "overview": [
            "Object detection system for 6-inch proximity sensing",
            "90-degree turn calibration system",
            "Real-time path adjustment capabilities",
            "Custom navigation algorithm implementation",
            "Sensor fusion for accurate positioning"
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/navigate-to-pewter-city",
        "content": "A iRobot ™️ Create3 ™️ programmed to navigate through a maze with 90-degree turns based on object detection.",
        "design_process": "This project focused on navigating a maze using object detection instead of line following or predefined paths. I mounted a camera to the Create 3 robot using a custom CAD design and began writing Python code to detect objects placed in the maze. Each object acted as a directional cue. I developed a routine to turn based on object detection and tuned the turning function using sensor feedback. I tested movement, detection accuracy, and reaction timing extensively to make sure the robot handled real-time decisions reliably without needing visual markers like tape.",
        "images": [
            {"url": "/images/navigate-to-pewter-city/img1.webp", "caption": "The Create 3 Robot with a camera mount"},
            {"url": "/images/navigate-to-pewter-city/img4.webp", "caption": "Front view of the Create 3 Robot"},
            {"url": "/images/navigate-to-pewter-city/img7.webp", "caption": "CAD Model of the camera mount"},
            {"url": "/images/navigate-to-pewter-city/img9.webp", "caption": "Objects to be detected"}
        ],
        "videos": [
            {"url": "https://youtube.com/shorts/U1IJRvnf8W8?feature=share", "caption": "Video demonstration of the robot in action"},
            {"url": "https://youtube.com/shorts/m2KWtcken6A?feature=share", "caption": "Additional demonstration"}
        ],
        "technical_details": [
            "Create 3 robot platform integration",
            "Object detection system for 6-inch proximity sensing",
            "90-degree turn calibration system",
            "Real-time path adjustment capabilities",
            "Custom navigation algorithm implementation"
        ],
        "challenges": [
            "Implementing precise 90-degree turns without prior directional knowledge — I used timing and gyroscope feedback, tested it repeatedly, and adjusted motor power and time until turns became accurate.",
            "Developing reliable object detection at 6-inch distance — I improved the camera angle, added image filters, and resized templates to improve match accuracy.",
            "Creating adaptive navigation system for unknown object orientations — I trained the template matcher on rotated views and partial visibility.",
            "Optimizing response time for real-time decision making — I lowered image resolution and narrowed the field of view to reduce processing lag.",
            "Ensuring consistent performance without tape or hot glue attachments — I used 3D printed brackets and zip ties to securely hold the components."
        ],
        "future_improvements": [
            "Enhance object recognition accuracy for similar-looking objects",
            "Implement machine learning for improved decision making",
            "Add multi-sensor fusion for more precise navigation",
            "Develop advanced path optimization algorithms",
            "Create more interactive end-of-maze celebrations"
        ]
    },
    {
        "id": "gym-battle",
        "title": "Gym Battle",
        "category": "ME35 / Simple Robotics",
        "image": "/images/navigate-to-pewter-city/img6.webp",
        "description": "A iRobot ™️ Create3™️ that can be controlled remotely using Airtable.",
        "overview": [
            "Remote control via Airtable with real-time feedback",
            "Live video streaming using phone and Zoom",
            "Obstacle avoidance logic built into robot behavior",
            "Command timing and processing loop in Python",
            "Tested across rooms with no direct line of sight"
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/gym-battle",
        "content": "A Create 3 Robot ™️ robot that can be controlled remotely using Airtable.",
        "design_process": "This project aimed at designing a robot remote control system. I used Airtable as a control interface, setting up a polling loop in Python to check for new commands. For remote visibility, I mounted a phone to the robot and streamed live video through Zoom to someone in a different room. That person would enter commands in Airtable to move the robot around obstacles. Since there was no direct line of sight and some network lag, I had to carefully time each command and add logic to ignore repeated inputs. The focus was making the robot easy to control even with limited feedback.",
        "images": [
            {"url": "/images/navigate-to-pewter-city/img6.webp", "caption": "The Create 3 Robot"},
            {"url": "/images/gym-battle/img1.webp", "caption": "Airtable Commands"},
            {"url": "/images/gym-battle/img2.webp", "caption": "Obstacles in the robot's path"}
        ],
        "videos": [
            {"url": "https://youtube.com/shorts/04uJjxwYFIk?feature=share", "caption": "Video demonstration of the robot in action"}
        ],
        "technical_details": [
            "Create 3 robot integration",
            "Airtable-based remote control system",
            "Phone-based Zoom video streaming setup",
            "Obstacle detection and avoidance logic",
            "Remote command processing and execution"
        ],
        "challenges": [
            "Implementing reliable remote control through Airtable — I added time stamps and cleared commands after execution to prevent duplicates.",
            "Setting up stable video streaming using a phone — I used a phone mounted to the robot and streamed live to a Zoom call for visual feedback.",
            "Coordinating robot movement without direct visual contact — I tuned command durations and spaced them out with buffer times.",
            "Managing network latency and command timing — I tested in different network conditions and adjusted timing to reduce delays."
        ],
        "future_improvements": [
            "Enhance command response time and precision",
            "Implement autonomous obstacle avoidance features",
            "Add multiple camera angles for better navigation",
            "Develop more sophisticated control interface"
        ]
    },
    {
        "id": "camera-line-follower",
        "title": "Camera Line Follower Robot",
        "category": "Robotics",
        "image": "/images/camera-line-follower/img1.webp",
        "description": "An autonomous Raspberry Pi robot that follows a line using OpenCV, with a Flask web server for remote control and PID-tuned motor response.",
        "overview": [
            "Designed an autonomous Raspberry Pi robot that follows a line using OpenCV image processing.",
            "Built a Flask web server to add remote control capabilities for user-friendly operation.",
            "Implemented PWM control and PID algorithms in C/C++ on a Linux-based Raspberry Pi, improving response time by 30%."
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/camera-line-follower",
        "content": "An OpenCV-powered line follower on Raspberry Pi with a Flask web layer for remote control and PID-tuned motor response.",
        "design_process": "This project used computer vision to detect a black line on the floor with a Pi Camera. I used OpenCV for image processing and programmed a proportional controller to adjust steering based on the line's center. Early tests showed inconsistent performance due to lighting changes, so I adjusted the camera angle and image resolution. I also tested different thresholding techniques and created a simple line recovery system. Most of the debugging came from trying things over and over — watching the robot fail, and tweaking small parts of the code until it worked better.",
        "images": [
            {"url": "/images/camera-line-follower/img1.webp", "caption": "Robot's side view"},
            {"url": "/images/camera-line-follower/img3.webp", "caption": "Robot's top view"}
        ],
        "videos": [
            {"url": "https://www.youtube.com/watch?v=kxjFOwbjV9U", "caption": "Video demonstration of the robot in action"}
        ],
        "technical_details": [
            "OpenCV-based line detection on Raspberry Pi",
            "PWM motor control with PID tuning in C/C++",
            "Flask web server enabling remote commands",
            "GPIO-based motor driver integration",
            "Real-time navigation loop for responsive corrections"
        ],
        "challenges": [
            "Sensitivity to variations in ambient lighting and shadows — I used adaptive thresholding and filtering to stabilize detection.",
            "Difficulty navigating complex line features like sharp turns or breaks — I increased the region of interest and added a recovery routine.",
            "Balancing robot speed against real-time processing limitations — I reduced frame rate and matched motor speed with image processing delay.",
            "Basic error recovery strategy when the line is lost — I added a fallback routine where the robot slowly rotates to search for the line."
        ],
        "future_improvements": [
            "Enhance steering precision and smoothness using PID control.",
            "Develop smarter line recovery strategies (e.g., search patterns).",
            "Improve turn anticipation by analyzing the path further ahead.",
            "Integrate distance sensors for obstacle detection and avoidance."
        ]
    },
    {
        "id": "IR-line-follower",
        "title": "Scout A Route",
        "category": "ME35 / Simple Robotics",
        "image": "/images/IR-line-follower/img1.webp",
        "description": "This robot follows a line using an IR sensor.",
        "overview": [
            "Use an IR sensor for real-time line detection",
            "Control two DC motors with PWM-based speed tuning",
            "Selection from 3 predefined paths with varying difficulty levels",
            "Implements basic turning logic based on sensor feedback",
            "Uses GPIO input readings for direct line interaction"
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/IR-line-follower",
        "content": "This robot follows a line using an IR sensor.",
        "design_process": "The goal here was to follow a black line using an IR sensor and basic hardware. I started by placing the sensor too high, so readings were bad. I tested different mounting heights and angles until the readings were more stable. Since we were limited to the course kit, I built the chassis using simple parts and focused on getting one thing right — following the line accurately. I attempted two of the three paths, and the robot managed to follow the line without any issues.",
        "images": [
            {"url": "/images/IR-line-follower/img1.webp", "caption": "Assembled IR line follower robot"}
        ],
        "videos": [
            {"url": "https://youtu.be/Y7LEzXW6B6A", "caption": "IR line follower in action"},
            {"url": "https://youtu.be/IzmCanhjyl0", "caption": "Additional demonstration"}
        ],
        "technical_details": [
            "IR sensors detect black line using GPIO input (active low)",
            "Two DC motors controlled with PWM for variable speed",
            "Differential steering via independent motor control (left/right turn logic)",
            "Implemented using RPi.GPIO in BOARD mode",
            "Control loop with 10ms refresh for smooth navigation response"
        ],
        "challenges": [
            "Ensuring accurate line following — I adjusted the sensor height and motor speed after trial runs to improve responsiveness.",
            "Adhering to project constraints — I limited parts to the course kit and built mounts using provided materials."
        ],
        "future_improvements": [
            "Enhancing sensor accuracy",
            "Exploring alternative path algorithms",
            "Improving speed and efficiency"
        ]
    },
    {
        "id": "pokemon-ball-sorter",
        "title": "Pokémon Ball Sorter",
        "category": "ME35 / Simple Robotics",
        "image": "/images/pokemon-ball-sorter/ball-sorter-1.webp",
        "description": "A robot that automatically detects and sorts colored balls using color detection and servo positioning.",
        "overview": [
            "Continuous ball feeding using threaded stepper motor control",
            "RGB color detection and classification",
            "Automated servo positioning for ball sorting",
            "Configurable sorting positions for different colors",
            "Returns to rest position after each sort"
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/Pokemon-Ball-Sorter",
        "content": "A robot that automatically detects and sorts colored balls using color detection and servo positioning.",
        "design_process": "I designed this robot to sort Poké Balls by color using an RGB sensor and servo motor. My first tests were checking how reliable the color sensor was, especially under classroom lighting conditions. Once I locked in the thresholds, I connected a servo that would rotate to the correct box based on the color detected. The early version dropped balls in the wrong spots, so I reworked the servo timing and adjusted bin positions. It took a bunch of trial runs to get it all working together.",
        "images": [
            {"url": "/images/pokemon-ball-sorter/cad2.webp", "caption": "CAD design of the ball sorter mechanism"},
            {"url": "/images/pokemon-ball-sorter/ball-sorter-1.webp", "caption": "Final assembled system"}
        ],
        "videos": [
            {"url": "https://youtu.be/UhgyvbBYM8Y", "caption": "Ball sorter in action"}
        ],
        "technical_details": [
            "Reads RGB values from color sensor",
            "Classifies colors based on RGB intensity ratios",
            "Currently detects: Red, Green, Blue, Yellow",
            "Stepper motor runs in separate thread for continuous operation",
            "Servo motor moves to specific angles based on detected color",
            "Servo returns to rest position after each sort"
        ],
        "challenges": [
            "Calibrating the color sensor to work in most lighting conditions — I tested readings under different lights and set thresholds based on averaged values.",
            "Implementing a very accurate sorting mechanism — I fine-tuned servo angles through trial and error and matched each color to a specific bin.",
            "Making sure all processes are running smoothly and that the ball feeding mechanism doesn't jam — I narrowed the feed ramp and added delays to space out ball entry."
        ],
        "future_improvements": [
            "Currently the robot doesn't accurately place balls to the corresponding color bin. We plan to calibrate the servo to make sure it moves each ball to the correct slot"
        ]
    },
    {
        "id": "pokemon-gripper",
        "title": "Pokémon Ball Gripper",
        "category": "ME35 / Simple Robotics",
        "image": "/images/pokemon-gripper/gripper.webp",
        "description": "Mechanical gripper system designed to safely handle and transport a Poké Ball using stepper motor actuation.",
        "overview": [
            "Custom-designed linkage and gear system",
            "Stepper motor-controlled actuation",
            "2ft transport capability",
            "Pulley system for closing and opening the gripper cups"
        ],
        "year": "Spring 2025",
        "github_url": "https://github.com/pascalcyusa/Pokemon-Gripper",
        "content": "Mechanical gripper system designed to safely handle and transport a Poké Ball using stepper motor actuation.",
        "design_process": "I wanted to make a mechanical system that could pick up and move a Poké Ball without dropping it. Our group decided on using a pulley system to control the gripper cups, and I adjusted motor timing in the code. Most of the design choices came down to trial and improvement — watching the robot fail, then changing a part until it got better.",
        "images": [
            {"url": "/images/pokemon-gripper/cad.webp", "caption": "CAD design of the gripper mechanism"},
            {"url": "/images/pokemon-gripper/gripper.webp", "caption": "Final assembled gripper system"}
        ],
        "technical_details": [
            "Custom-designed linkage and gear system",
            "NEMA 17 stepper motors with 1.8° step angle",
            "Pulley system for closing and opening the gripper cups"
        ],
        "challenges": [
            "Maintaining consistent grip during horizontal movement — I increased pulley tension and tested the system under motion to keep the grip secure.",
            "Calibrating the stepper motors to make sure they operate correctly — I wrote a script to sync motor start positions and adjusted timing."
        ],
        "future_improvements": [
            "Integration with computer vision for autonomous operation",
            "Wireless control capabilities",
            "Adding wheels to the system to make the robot move on its own"
        ]
    },
    {
        "id": "ballon-dor-replica",
        "title": "Ballon d'Or Replica",
        "category": "ME10 / Materials & Manufacturing",
        "image": "/images/ballon-dor-replica/dor2.webp",
        "description": "Designed and fabricated a replica of the Ballon d'Or using sand casting and lost wax casting, achieving a close resemblance to the real trophy.",
        "overview": [
            "SolidWorks design for accurate modeling",
            "Sand casting and lost wax casting techniques",
            "Welding for structural integrity",
            "Polished finishing for a realistic look"
        ],
        "year": "Fall 2023",
        "content": "Designed and fabricated a replica of the Ballon d'Or trophy using sand casting and lost wax casting techniques, achieving a high-quality final product closely resembling the original.",
        "images": [
            {"url": "/images/ballon-dor-replica/dor2.webp", "caption": "Final polished Ballon d'Or replica"},
            {"url": "/images/ballon-dor-replica/dor1.webp", "caption": "Replica view 1"},
            {"url": "/images/ballon-dor-replica/dor3.webp", "caption": "Replica view 2"},
            {"url": "/images/ballon-dor-replica/dor4.webp", "caption": "Replica view 3"},
            {"url": "/images/ballon-dor-replica/dor5.webp", "caption": "Replica view 4"},
            {"url": "/images/ballon-dor-replica/dor6.webp", "caption": "Replica view 5"},
            {"url": "/images/ballon-dor-replica/dor7.webp", "caption": "Replica view 6"},
            {"url": "/images/ballon-dor-replica/dor8.webp", "caption": "Replica view 7"}
        ],
        "technical_details": [
            "Designed using SolidWorks",
            "Used sand casting for one half of the ball",
            "Applied lost wax casting and welding to join halves",
            "Refined surface finish for authenticity"
        ],
        "challenges": [
            "Achieving accurate proportions and details",
            "Ensuring proper fusion of cast parts",
            "Refining the final surface for an authentic look"
        ],
        "outcomes": [
            "Successfully created a visually accurate Ballon d'Or replica",
            "Demonstrated advanced casting techniques",
            "Achieved a well-polished final product"
        ],
        "future_improvements": [
            "Enhancing detail precision in casting",
            "Exploring alternative finishing techniques",
            "Experimenting with different metal compositions"
        ]
    },
    {
        "id": "hip-truss-bridge",
        "title": "Hip Truss Bridge",
        "category": "ME20 / Mechanics",
        "image": "/images/hip-truss-bridge/truss1.webp",
        "description": "Designed and built a hip truss bridge to understand structural loads. The project involved SolidWorks modeling, acrylic assembly, and internal force analysis through theoretical calculations and FEA.",
        "overview": [
            "Truss bridge design using SolidWorks",
            "Acrylic structure assembled with glue",
            "Theoretical load calculations and FEA validation",
            "Load-bearing capacity analysis"
        ],
        "year": "Fall 2023",
        "content": "Designed and built a hip truss bridge to understand structural loads. The project involved SolidWorks modeling, acrylic assembly, and internal force analysis through theoretical calculations and FEA.",
        "images": [
            {"url": "/images/hip-truss-bridge/truss1.webp", "caption": "Bridge Side View"},
            {"url": "/images/hip-truss-bridge/truss2.webp", "caption": "Load Testing Setup"},
            {"url": "/images/hip-truss-bridge/truss3.webp", "caption": "FEA Analysis Result"},
            {"url": "/images/hip-truss-bridge/truss4.webp", "caption": "Bridge assembly using acrylic and glue"}
        ],
        "technical_details": [
            "Material selection: Acrylic for predictable failure mode",
            "Joint design optimization for glue adhesion",
            "Finite Element Analysis (FEA) using SolidWorks Simulation",
            "Theoretical truss analysis using Method of Joints"
        ],
        "challenges": [
            "Ensuring precise alignment during assembly",
            "Preventing glue failure at joints",
            "Matching theoretical predictions with experimental results"
        ],
        "outcomes": [
            "Successfully withstood predicted load",
            "Validated FEA model with experimental data",
            "Gained practical experience in structural analysis"
        ],
        "pdf_url": "https://drive.google.com/file/d/18hf8kmzOOd0wp9jBr4RTQsGvo0u0M9H_/view?usp=sharing"
    },
    {
        "id": "dog-treat-dispenser",
        "title": "Dog Treat Dispenser",
        "category": "ME40 / Engineering Design",
        "image": "/images/dog-treat-dispenser/dispens1.webp",
        "description": "Led the mechanical design of a wheelchair-integrated dog treat dispenser with DFM-driven reliability for a client with limited hand mobility.",
        "overview": [
            "Led mechanical design of a wheelchair-integrated dispenser applying DFM principles for reliability.",
            "Developed SolidWorks 3D models and GD&T drawings to ensure precise manufacturing and easy wheelchair integration.",
            "Optimized cost and usability through iterative 3D-printed and laser-cut prototypes."
        ],
        "year": "Spring 2024",
        "content": "Designed and delivered a wheelchair-mounted dog treat dispenser focused on low-effort activation, safe dispensing, and manufacturability.",
        "images": [
            {"url": "/images/dog-treat-dispenser/dispens1.webp", "caption": "Final Assembly"},
            {"url": "/images/dog-treat-dispenser/blueprint.webp", "caption": "Blueprint of the dog treat dispenser"}
        ],
        "videos": [
            {"url": "https://youtube.com/shorts/POaRSqfHcnQ", "caption": "Treat Dispenser in action"}
        ],
        "technical_details": [
            "SolidWorks modeling with GD&T drawings",
            "Mechanism design for low-force activation",
            "3D printing and laser cutting for rapid prototyping",
            "DFM-driven material selection and assembly approach"
        ],
        "challenges": [
            "Designing for limited hand dexterity",
            "Ensuring durability against dog interaction",
            "Creating a universal mount for different wheelchairs"
        ],
        "outcomes": [
            "Delivered a functional prototype to the client",
            "Received positive feedback on ease of use",
            "Improved client's independence in interacting with his dog"
        ],
        "pdf_url": "https://tufts.box.com/s/3f1i93cj1kykrx0lybhsyjb9i06axet7",
        "future_improvements": [
            "Adding motorization for automated dispensing",
            "Increasing storage capacity",
            "Enhancing aesthetics for better usability and appearance"
        ]
    },
    {
        "id": "tdk-ch101",
        "title": "TDK CH101 Ultrasonic Sensor Automation",
        "category": "MEMS / Sensors",
        "image": "/images/tdk-ch101/img1.webp",
        "description": "Data collection automation system for ultrasonic sensors using C and LabVIEW integration.",
        "overview": [
            "C and LabVIEW integration",
            "Automated data collection",
            "Streamlined interface",
            "Real-time data processing"
        ],
        "year": "Summer 2024",
        "content": "This project focused on developing an automated data collection system for TDK's CH101 ultrasonic sensors, streamlining the testing and validation process through sophisticated software integration.",
        "images": [
            {"url": "/images/tdk-ch101/img1.webp", "caption": "Sensor Mount"},
            {"url": "https://invensense.tdk.com/wp-content/uploads/2019/09/rp-mod-ch101.png", "caption": "CH101 Sensor © TDK Invensense"},
            {"url": "/images/tdk-ch101/img2.webp", "caption": "Experiment Setup"}
        ],
        "technical_details": [
            "Python Data Analysis Scripts",
            "Statistical Modeling & Error Analysis",
            "Wind Tunnel Instrumentation",
            "Differential Pressure Monitoring",
            "Pitot-Static Tube Integration",
            "C & LabVIEW Data Acquisition"
        ],
        "challenges": [
            "Correlating acoustic Time-of-Flight with physical distance",
            "Isolating hardware bias from environmental noise",
            "Meeting 5 cm/s precision targets with commercial off-the-shelf sensors",
            "Retrofitting existing wind tunnel infrastructure"
        ],
        "outcomes": [
            "Reduced testing time by 65%",
            "Improved data accuracy by 30%"
        ]
    },
    {
        "id": "lego-arduino",
        "title": "LEGO & Arduino Education",
        "category": "Education",
        "image": "/images/ceeo-outreach/img4.webp",
        "description": "Educational robotics projects using LEGO Mindstorms and Arduino.",
        "overview": [
            "LEGO Mindstorms integration",
            "Python and Arduino programming",
            "Sensor-controlled robots",
            "Eco-friendly solutions"
        ],
        "year": "Summer 2023",
        "content": "An innovative educational initiative combining LEGO Mindstorms with Arduino technology to create engaging STEM learning experiences for students. The project focused on hands-on learning and practical application of programming concepts.",
        "images": [
            {"url": "/images/ceeo-outreach/img5.webp", "caption": "Robot car controlled with SPIKE Prime ™️ Hub"},
            {"url": "/images/ceeo-outreach/img1.webp", "caption": "Classroom Setup"}
        ],
        "technical_details": [
            "Arduino Uno and Nano integration",
            "LEGO Mindstorms EV3 platform",
            "Python programming with ev3dev",
            "Custom sensor integration modules",
            "Interactive learning materials"
        ],
        "challenges": [
            "Adapting content for different skill levels",
            "Maintaining student engagement",
            "Troubleshooting hardware issues efficiently",
            "Managing limited resource availability",
            "Balancing theory with practical applications"
        ],
        "outcomes": [
            "Successfully trained 50+ students",
            "Created 10 reusable project templates",
            "Developed comprehensive learning materials",
            "Achieved 90% positive feedback from students",
            "Implemented sustainable program structure"
        ],
        "future_improvements": [
            "Online learning platform integration",
            "Advanced project modules development",
            "Virtual simulation capabilities",
            "Extended hardware compatibility"
        ]
    },
    {
        "id": "social-networking-app",
        "title": "Zina",
        "category": "Web & Mobile Apps",
        "image": "/images/social-networking-app/img3.webp",
        "description": "Zina is a social networking application designed to help users manage and visualize their personal and professional connections.",
        "overview": [
            "Manage a list of contacts with add, edit, and delete functionality",
            "Visualize connections in a grid or network graph view",
            "Toggle between different views with smooth animations",
            "Support for dark mode interface",
            "Multi-step wizard for adding new contacts",
            "Bidirectional connection management between contacts",
            "Integration with SwiftUI for a modern user interface",
            "Persistent storage of contacts using JSON encoding and decoding"
        ],
        "year": "Dec 2024",
        "github_url": "https://github.com/pascalcyusa/Zina",
        "content": "Zina is a social networking application designed to help users manage and visualize their personal and professional connections. The app allows users to add, edit, and delete contacts, and provides a graphical representation of their network.",
        "images": [
            {"url": "/images/social-networking-app/icon.webp", "caption": "App Icon"},
            {"url": "/images/social-networking-app/img1.webp", "caption": "Main Interface"},
            {"url": "/images/social-networking-app/img2.webp", "caption": "Graph Display"}
        ],
        "technical_details": [
            "Developed using Swift and SwiftUI",
            "Supports iOS platform",
            "Utilizes Core Data for persistent storage",
            "Includes unit and UI tests for reliability"
        ],
        "challenges": [
            "Implementing a smooth and intuitive user interface",
            "Ensuring data consistency across the network graph and list views",
            "Managing bidirectional connections efficiently"
        ],
        "outcomes": [
            "Successfully created a user-friendly app for managing connections",
            "Provided a visual representation of the user's network",
            "Enabled easy addition and editing of contacts"
        ],
        "future_improvements": [
            "Enhance the graphical representation with more interactive features",
            "Add support for importing contacts from external sources",
            "Improve performance for large networks"
        ]
    },
    {
        "id": "splendor-game",
        "title": "Splendor Game",
        "category": "C++ Projects",
        "image": "/images/splendor-game/img2.webp",
        "description": "Terminal-based implementation of the Splendor board game in C++.",
        "overview": [
            "Object-oriented design",
            "Custom game rule enforcement",
            "File handling system",
            "Terminal-based UI"
        ],
        "year": "Spring 2023",
        "content": "Terminal-based implementation of the Splendor board game in C++.",
        "images": [
            {"url": "/images/splendor-game/img2.webp", "caption": "Mockup of the terminal gameplay interface"}
        ],
        "technical_details": [
            "C++17 standard implementation",
            "Custom game state management system",
            "JSON-based save/load functionality",
            "Command pattern for game actions",
            "Unit testing framework integration",
            "Memory management optimization"
        ],
        "challenges": [
            "Implementing complex game rules accurately",
            "Creating an intuitive terminal interface",
            "Managing game state persistence",
            "Handling edge cases in game logic",
            "Optimizing CPU resource usage"
        ],
        "outcomes": [
            "Fully functional game implementation",
            "Robust save/load system",
            "Comprehensive error handling",
            "High test coverage",
            "Positive user feedback"
        ],
        "future_improvements": [
            "Graphical user interface",
            "Network multiplayer support",
            "AI opponent implementation",
            "Additional game modes"
        ]
    },
    {
        "id": "personal-website",
        "title": "Portfolio",
        "category": "Web & Mobile Apps",
        "image": "/images/personal-website/img1.webp",
        "description": "A modern, responsive portfolio website that overview a clean and user-friendly design.",
        "overview": [
            "Fully Responsive Design: Optimal viewing experience on desktops, tablets, and mobile devices.",
            "Detailed Project Showcase: overview project descriptions, images, and videos via interactive modals.",
            "Project Filtering: Allows users to easily browse projects by category.",
            "Clean, Modern UI: Built with React, TypeScript, and Tailwind CSS for a polished look and feel.",
            "User-Friendly Interface: Intuitive navigation and a smooth Browse experience."
        ],
        "year": "Sept 2022",
        "github_url": "https://github.com/pascalcyusa/portfolio3",
        "content": "A modern, responsive portfolio website that features a clean and user-friendly design.",
        "images": [
            {"url": "/images/personal-website/img3.webp", "caption": "Homepage design"},
            {"url": "/images/personal-website/img4.webp", "caption": "Portfolio section"}
        ],
        "technical_details": [
            "Frontend Stack: Built with React and TypeScript for a robust, modern foundation.",
            "Styling: Utility-first styling using Tailwind CSS, enhanced with shadcn/ui components.",
            "Architecture: Component-based, Single-Page Application (SPA) using client-side routing for seamless navigation.",
            "Build & Development: Utilizes Vite for optimized builds and a fast development workflow.",
            "Performance: Leverages dynamic imports ('code splitting') to improve initial page load speed.",
            "Version Control: Source code managed with Git and hosted on GitHub."
        ],
        "challenges": [
            "Designing a cohesive and visually appealing UI to effectively present diverse content (projects, research).",
            "Achieving fluid responsiveness across a wide range of screen sizes and devices.",
            "Structuring project and research data in a scalable way for easy updates.",
            "Optimizing the loading of assets, particularly high-resolution images, for fast performance.",
            "Ensuring smooth application state management for interactive elements like modals and filtering."
        ],
        "outcomes": [
            "Successfully launched a professional and polished personal portfolio website.",
            "Effectively showcases technical skills, completed projects, and research experience.",
            "Demonstrates expertise in modern frontend development technologies (React, TypeScript, Tailwind CSS).",
            "Achieved a responsive, performant, and user-friendly design.",
            "Developed a maintainable and extensible codebase suitable for future updates."
        ],
        "future_improvements": [
            "Adding a Blog/Articles section to share technical insights and updates.",
            "Implementing user-selectable Dark/Light mode theme options.",
            "Integrating backend functionality for features like a dynamic contact form.",
            "Connecting to a Headless CMS for easier content management.",
            "Enhancing the user experience with subtle animations and micro-interactions.",
            "Implementing further Search Engine Optimization (SEO) techniques.",
            "Adding ability to host images through a hosting service instead of within the repo."
        ]
    }
]

# ── Research data ─────────────────────────────────────────────────────────────
RESEARCH = [
    {
        "id": "ultrasonic-anemometer",
        "title": "Ultrasonic Anemometer",
        "category": "MEMS / Sensors",
        "lab": "Microscale Sensors and Systems Lab",
        "image": "/images/tdk-ch101/img1.webp",
        "description": "Retrofitting the wind tunnel test section with pressure taps and a pitot-static tube to unlock real-time flow velocity/total pressure data while advancing a miniature ultrasonic anemometer for UAV and Mars applications.",
        "overview": [
            "Retrofitting the wind tunnel test section with differential pressure taps and a pitot-static tube for precise, real-time flow monitoring.",
            "Developing experimental protocols to push wind velocity accuracy beyond the ±0.05 m/s target set in prior work.",
            "Tested TDK CH101 ultrasonic sensor anemometer achieving ±0.19 mm distance error and ±0.65 m/s wind velocity error, informing next-phase calibration."
        ],
        "period": "Sep 2025 - Present; Jun 2024 - Aug 2024",
        "link": "https://sites.tufts.edu/senselab/research/#:~:text=Miniaturized%20Ultrasonic%20Anemometer",
        "content": "The Microscale Sensors and Systems Lab is a state of the art lab at Tufts that focuses on the design, fabrication, and testing of microscale sensors and systems. My research has area has been on the development of a miniature ultrasonic anemometer using the TDK CH101 sensor. This has potential applications in Navy high-altitude UAVs, and low-pressure environments on Mars.",
        "images": [
            {"url": "/images/tdk-ch101/img1.webp", "caption": "TDK CH101 Sensor used to measure flow. Here, the sensor is measuring flow at standard room conditions."}
        ],
        "achievements": [
            "Wind tunnel instrumentation upgrade with differential pressure taps and pitot-static tube for higher-fidelity measurements.",
            "Established path to surpass ±0.05 m/s velocity accuracy through improved protocols and calibration routines.",
            "Built C/LabVIEW data collection and MATLAB/Python analysis pipeline validating ±0.19 mm distance and ±0.65 m/s wind velocity error on TDK CH101 anemometer tests."
        ],
        "pdf_url": "https://tuftscloud-my.sharepoint.com/:b:/g/personal/jcyusa01_tufts_edu/EQ3-R-EdM6tPplHGKzaGvvkB7qgCPYrTeh75C466yeMHew?e=L1lMAA"
    },
    {
        "id": "ceeo-outreach",
        "title": "Engineering Education Outreach",
        "category": "Education",
        "lab": "Tufts Center for Engineering Education and Outreach",
        "image": "/images/ceeo-outreach/img4.webp",
        "description": "As an Outreach Learning Fellow at Tufts University's Center for Engineering Education and Outreach (CEEO), I've had the opportunity to engage with students from underrepresented communities and support their learning in STEM. What excites me most about being an outreach learning fellow is the chance to inspire curiosity and build confidence in young learners through hands-on activities and creative problem-solving.",
        "overview": [
            "Designed and tested interactive engineering lessons for outreach programs",
            "Collaborated with local schools to deliver accessible, hands-on STEM education",
            "Advanced DEIJ goals by supporting students from underrepresented communities"
        ],
        "period": "Mar 2023 - Present",
        "link": "https://sites.tufts.edu/ceeoolf/#:~:text=Computer%20Engineering%2C%202027-,Jean%20Pascal%20Cyusa,-Mechanical%20Engineering%2C%202026",
        "content": "As an Outreach Learning Fellow at Tufts University's Center for Engineering Education and Outreach (CEEO), I've had the opportunity to engage with students from underrepresented communities and support their learning in STEM. What excites me most about being an outreach learning fellow is the chance to inspire curiosity and build confidence in young learners through hands-on activities and creative problem-solving.",
        "images": [
            {"url": "/images/ceeo-outreach/img1.webp"},
            {"url": "/images/ceeo-outreach/img5.webp"}
        ],
        "videos": [
            {"url": "https://youtube.com/shorts/coV66ifPdfU", "caption": "A Robot Grabber made by a 7th grade student at Winter Hill Community School"}
        ],
        "achievements": [
            "Designed and tested engineering lesson plans for K–12 students",
            "Facilitated hands-on learning activities that introduced core STEM principles",
            "Collaborated with educators and faculty to align outreach goals with DEIJ values"
        ]
    },
    {
        "id": "pebl-curriculum",
        "title": "Playful Engineering Based Learning (PEBL) Curriculum",
        "category": "Education",
        "lab": "Tufts Center for Engineering Education and Outreach",
        "image": "/images/ceeo-outreach/img2.webp",
        "description": "Developed comprehensive STEM curricula for K-12 students, focusing on practical engineering applications using LEGO and Arduino projects. Led the implementation of maker spaces across Rwanda, significantly impacting student engagement and learning outcomes.",
        "overview": [
            "Established maker spaces in 20+ Rwandan schools",
            "Impacted 769 students directly",
            "Increased engagement by 37%",
            "Created interactive engineering curricula"
        ],
        "period": "May 2023 - Jul 2023",
        "link": "https://sites.tufts.edu/pebl/2023/10/02/rwandan-tufts-students-return-home-to-inspire-young-makers/",
        "content": "Developed comprehensive STEM curricula for K-12 students, focusing on practical engineering applications using LEGO and Arduino projects. Led the implementation of maker spaces across Rwanda, significantly impacting student engagement and learning outcomes.",
        "images": [
            {"url": "/images/ceeo-outreach/img2.webp", "caption": "An Arduino robot presented by one of the students in the Makerspace competition at Maranyundo"},
            {"url": "/images/ceeo-outreach/img3.webp", "caption": "The team that won first place at the Maranyundo Makerspace competition"}
        ],
        "achievements": [
            "Established maker spaces in 20+ Rwandan schools",
            "Impacted 769 students directly",
            "Increased engagement by 37%",
            "Created interactive engineering curricula"
        ]
    }
]


def convert_urls(obj):
    """Recursively convert all /images/... paths in a dict/list to GCS URLs."""
    if isinstance(obj, str):
        return to_gcs_url(obj)
    elif isinstance(obj, list):
        return [convert_urls(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_urls(v) if k in ("url", "image", "pdf_url") else v for k, v in obj.items()}
    return obj


def seed():
    db_url = f"sqlite:///{DB_PATH}"
    engine = create_engine(db_url)
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    print(f"\nUsing database: {DB_PATH}")

    print("\n=== Seeding Projects ===")
    for p in PROJECTS:
        p = convert_urls(p)
        # Delete if exists
        existing = session.query(Project).filter(Project.id == p["id"]).first()
        if existing:
            session.delete(existing)
            session.commit()
        project = Project(**p)
        session.add(project)
        session.commit()
        print(f"  ✅ {p['title']}")

    print("\n=== Seeding Research ===")
    for r in RESEARCH:
        r = convert_urls(r)
        existing = session.query(Research).filter(Research.id == r["id"]).first()
        if existing:
            session.delete(existing)
            session.commit()
        research = Research(**r)
        session.add(research)
        session.commit()
        print(f"  ✅ {r['title']}")

    session.close()
    print("\n✨ Done! Database seeded with all projects and research.")


if __name__ == "__main__":
    seed()
