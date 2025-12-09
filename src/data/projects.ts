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
        id: "pokemon-cafe",
        title: "Pokémon Cafe (Final Project)",
        category: "ME35 / Simple Robotics",
        image: "/images/pokemon-cafe/img3.jpeg",
        description: "A completely automated system for cooking pancakes",
        overview: [
            "Connects to Airtable to retrieve new pancake orders.",
            "Uses IR sensors to autonomously follow a designated path.",
            "Identifies processing stations using OpenCV to detect green markers.",
            "Visits cooking and topping stations based on the specific requirements of each order.",
            "Reports robot arrival and order completion back to Airtable.",
            "Acts as the transport element within a larger automated pancake production line (including batter, cooking, topping stages)."
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/Pokemon-Cafe",
        content: "A completely automated system for cooking pancakes, featuring autonomous transport.",
        images: [
            { url: "/images/pokemon-cafe/img1.jpeg", caption: "The Create 3 Robot at the whipped cream station" },
            { url: "/images/pokemon-cafe/img2.jpeg", caption: "The Create 3 Robot at the sprinkles station" },
            { url: "/images/pokemon-cafe/img3.jpeg", caption: "Complete setup with the order website" },
            { url: "/images/pokemon-cafe/img4.png", caption: "The orders in airtable" }
        ],
        videos: [
            { url: "https://youtu.be/pDoqdQYS55g", caption: "Pokémon Cafe full run" }
        ],
        technicalDetails: [
            "Software Tools: Used common software for robot control, computer vision (seeing), web communication, and interacting with the hardware.",
            "Navigation Method: Followed a line on the floor using infrared sensors and spotted station locations using a camera looking for colored markers.",
            "Finding Stations: Recognized stations by seeing colored markers and counting them in order along the path.",
            "Getting Orders: Connected to Airtable to receive pancake orders and update the robot's progress.",
            "Task Tracking: Kept track of what the robot was doing (like moving, waiting, or idle) using a simple internal system."
        ],
        personalContribution: [
            "Online Order System: Built the connection to Airtable so the robot could get orders and send back status updates.",
            "Station Spotting: Programmed the robot's camera vision to recognize the colored markers identifying each station.",
            "Line Following: Wrote the main code that allowed the robot to follow the line on the floor using its sensors and steer correctly."
        ],
        challenges: [
            "Reliable Station Identification: Relying only on color and counting made it tricky if the robot missed a marker.",
            "Robust Line Following: Making sure the robot stayed on the line reliably, especially if the path wasn't perfect.",
            "Teamwork Between Systems: Coordinating the transport robot with other automated parts of the pancake maker via the online.",
            "Consistent Color Vision: Ensuring the robot saw colors correctly even if lighting changed.",
            "Real-time Updates: Getting status updates to and from Airtable quickly enough."
        ],
        outcomes: [
            "Built a Working Transport Robot: The robot successfully moved between stations using line following and camera vision.",
            "Connected to Order System: Successfully linked the robot to Airtable for orders and status updates.",
            "Part of a Full Automated System: Showcased how the transport robot worked within the complete automated pancake-making process (as part of a team effort).",
            "Followed Order Steps: The robot visited the necessary stations in the right sequence for each order.",
            "Completed Project Goal: Delivered a functional robot system for the final class presentation."
        ],
        futureImprovements: [
            "Smarter Station Signs: Use QR codes or similar unique markers instead of just colors so the robot always knows exactly which station it's at.",
            "Better Navigation Skills: Give the robot better ways to understand its location (like mapping) to handle complex paths or getting lost.",
            "Smarter Error Handling: Teach the robot better ways to recover if it gets stuck or loses the line.",
            "Faster Communication: Allow the robot to talk directly to stations instead of only through Airtable.",
            "More Robots: Design the system to potentially handle multiple delivery robots at once."
        ]
    },
    {
        id: "navigate-to-pewter-city",
        title: "Navigate Back to Pewter City (Navigation Using Object Recognition)",
        category: "ME35 / Simple Robotics",
        image: "/images/navigate-to-pewter-city/img5.jpeg",
        description: "A iRobot ™️ Create3 programmed to navigate through a maze with 90-degree turns based on object detection.",
        overview: [
            "Object detection system for 6-inch proximity sensing",
            "90-degree turn calibration system",
            "Real-time path adjustment capabilities",
            "Custom navigation algorithm implementation",
            "Sensor fusion for accurate positioning"
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/navigate-to-pewter-city",
        content: "A iRobot ™️ Create3 ™️ programmed to navigate through a maze with 90-degree turns based on object detection.",
        designProcess: "This project focused on navigating a maze using object detection instead of line following or predefined paths. I mounted a camera to the Create 3 robot using a custom CAD design and began writing Python code to detect objects placed in the maze. Each object acted as a directional cue. I developed a routine to turn based on object detection and tuned the turning function using sensor feedback. I tested movement, detection accuracy, and reaction timing extensively to make sure the robot handled real-time decisions reliably without needing visual markers like tape.",
        images: [
            { url: "/images/navigate-to-pewter-city/img1.jpeg", caption: "The Create 3 Robot with a camera mount" },
            { url: "/images/navigate-to-pewter-city/img4.jpeg", caption: "Front view of the Create 3 Robot" },
            { url: "/images/navigate-to-pewter-city/img7.png", caption: "CAD Model of the camera mount" },
            { url: "/images/navigate-to-pewter-city/img9.jpeg", caption: "Objects to be detected" }
        ],
        videos: [
            { url: "https://youtube.com/shorts/U1IJRvnf8W8?feature=share", caption: "Video demonstration of the robot in action" },
            { url: "https://youtube.com/shorts/m2KWtcken6A?feature=share", caption: "Additional demonstration" }
        ],
        technicalDetails: [
            "Create 3 robot platform integration",
            "Object detection system for 6-inch proximity sensing",
            "90-degree turn calibration system",
            "Real-time path adjustment capabilities",
            "Custom navigation algorithm implementation"
        ],
        challenges: [
            "Implementing precise 90-degree turns without prior directional knowledge — I used timing and gyroscope feedback, tested it repeatedly, and adjusted motor power and time until turns became accurate.",
            "Developing reliable object detection at 6-inch distance — I improved the camera angle, added image filters, and resized templates to improve match accuracy.",
            "Creating adaptive navigation system for unknown object orientations — I trained the template matcher on rotated views and partial visibility.",
            "Optimizing response time for real-time decision making — I lowered image resolution and narrowed the field of view to reduce processing lag.",
            "Ensuring consistent performance without tape or hot glue attachments — I used 3D printed brackets and zip ties to securely hold the components."
        ],
        futureImprovements: [
            "Enhance object recognition accuracy for similar-looking objects",
            "Implement machine learning for improved decision making",
            "Add multi-sensor fusion for more precise navigation",
            "Develop advanced path optimization algorithms",
            "Create more interactive end-of-maze celebrations"
        ]
    },
    {
        id: "gym-battle",
        title: "Gym Battle - Learning to Dodge (Airtable Remote Operation)",
        category: "ME35 / Simple Robotics",
        image: "/images/navigate-to-pewter-city/img6.jpeg",
        description: "A iRobot ™️ Create3™️ that can be controlled remotely using Airtable.",
        overview: [
            "Remote control via Airtable with real-time feedback",
            "Live video streaming using phone and Zoom",
            "Obstacle avoidance logic built into robot behavior",
            "Command timing and processing loop in Python",
            "Tested across rooms with no direct line of sight"
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/gym-battle",
        content: "A Create 3 Robot ™️ robot that can be controlled remotely using Airtable.",
        designProcess: "This project aimed at designing a robot remote control system. I used Airtable as a control interface, setting up a polling loop in Python to check for new commands. For remote visibility, I mounted a phone to the robot and streamed live video through Zoom to someone in a different room. That person would enter commands in Airtable to move the robot around obstacles. Since there was no direct line of sight and some network lag, I had to carefully time each command and add logic to ignore repeated inputs. The focus was making the robot easy to control even with limited feedback.",
        images: [
            { url: "/images/navigate-to-pewter-city/img6.jpeg", caption: "The Create 3 Robot" },
            { url: "/images/gym-battle/img1.jpeg", caption: "Airtable Commands" },
            { url: "/images/gym-battle/img2.jpg", caption: "Obstacles in the robot's path" }
        ],
        videos: [
            { url: "https://youtube.com/shorts/04uJjxwYFIk?feature=share", caption: "Video demonstration of the robot in action" }
        ],
        technicalDetails: [
            "Create 3 robot integration",
            "Airtable-based remote control system",
            "Phone-based Zoom video streaming setup",
            "Obstacle detection and avoidance logic",
            "Remote command processing and execution"
        ],
        challenges: [
            "Implementing reliable remote control through Airtable — I added time stamps and cleared commands after execution to prevent duplicates.",
            "Setting up stable video streaming using a phone — I used a phone mounted to the robot and streamed live to a Zoom call for visual feedback.",
            "Coordinating robot movement without direct visual contact — I tuned command durations and spaced them out with buffer times.",
            "Managing network latency and command timing — I tested in different network conditions and adjusted timing to reduce delays."
        ],
        futureImprovements: [
            "Enhance command response time and precision",
            "Implement autonomous obstacle avoidance features",
            "Add multiple camera angles for better navigation",
            "Develop more sophisticated control interface"
        ]
    },
    {
        id: "camera-line-follower",
        title: "Traverse Victory Road (Camera Line Follower)",
        category: "ME35 / Simple Robotics",
        image: "/images/camera-line-follower/img1.jpeg",
        description: "A line-following robot designed to navigate paths using a Pi Camera for line detection.",
        overview: [
            "Uses computer vision (OpenCV) to detect and follow lines from a camera feed.",
            "Controls two motors for autonomous robot movement (forward, backward, turns).",
            "Processes camera input in real-time for navigation decisions.",
            "Interfaces directly with Raspberry Pi hardware (GPIO) for motor control.",
            "Includes visual debugging displays for monitoring performance."
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/camera-line-follower",
        content: "A line-following robot designed to navigate paths using a Pi Camera for line detection. ",
        designProcess: "This project used computer vision to detect a black line on the floor with a Pi Camera. I used OpenCV for image processing and programmed a proportional controller to adjust steering based on the line's center. Early tests showed inconsistent performance due to lighting changes, so I adjusted the camera angle and image resolution. I also tested different thresholding techniques and created a simple line recovery system. Most of the debugging came from trying things over and over — watching the robot fail, and tweaking small parts of the code until it worked better.",
        images: [
            { url: "/images/camera-line-follower/img1.jpeg", caption: "Robot's side view" },
            { url: "/images/camera-line-follower/img3.jpeg", caption: "Robot's top view" }
        ],
        videos: [
            { url: "https://www.youtube.com/watch?v=kxjFOwbjV9U", caption: "Video demonstration of the robot in action" }
        ],
        technicalDetails: [
            "Developed in Python on a Raspberry Pi platform.",
            "Libraries: OpenCV for image processing, RPi.GPIO for hardware control.",
            "Core hardware: Raspberry Pi, PiCamera, motors, motor driver.",
            "Control System: Simple proportional control based on the detected line's center position.",
            "Motor Management: Controls speed via PWM and direction via digital signals."
        ],
        challenges: [
            "Sensitivity to variations in ambient lighting and shadows — I used adaptive thresholding and filtering to stabilize detection.",
            "Difficulty navigating complex line features like sharp turns or breaks — I increased the region of interest and added a recovery routine.",
            "Balancing robot speed against real-time processing limitations — I reduced frame rate and matched motor speed with image processing delay.",
            "Basic error recovery strategy when the line is lost — I added a fallback routine where the robot slowly rotates to search for the line."
        ],
        futureImprovements: [
            "Enhance steering precision and smoothness using PID control.",
            "Develop smarter line recovery strategies (e.g., search patterns).",
            "Improve turn anticipation by analyzing the path further ahead.",
            "Integrate distance sensors for obstacle detection and avoidance."
        ]
    },
    {
        id: "IR-line-follower",
        title: "Scout A Route (IR Line Follower)",
        category: "ME35 / Simple Robotics",
        image: "/images/IR-line-follower/img1.png",
        description: "This robot follows a line using an IR sensor.",
        overview: [
            "Use an IR sensor for real-time line detection",
            "Control two DC motors with PWM-based speed tuning",
            "Selection from 3 predefined paths with varying difficulty levels",
            "Implements basic turning logic based on sensor feedback",
            "Uses GPIO input readings for direct line interaction"
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/IR-line-follower",
        content: "This robot follows a line using an IR sensor.",
        designProcess: "The goal here was to follow a black line using an IR sensor and basic hardware. I started by placing the sensor too high, so readings were bad. I tested different mounting heights and angles until the readings were more stable. Since we were limited to the course kit, I built the chassis using simple parts and focused on getting one thing right — following the line accurately. I attempted two of the three paths, and the robot managed to follow the line without any issues.",
        images: [
            { url: "/images/IR-line-follower/img1.png", caption: "Assembled IR line follower robot" }
        ],
        videos: [
            { url: "https://youtu.be/Y7LEzXW6B6A", caption: "IR line follower in action" },
            { url: "https://youtu.be/IzmCanhjyl0", caption: "Additional demonstration" }
        ],
        technicalDetails: [
            "IR sensors detect black line using GPIO input (active low)",
            "Two DC motors controlled with PWM for variable speed",
            "Differential steering via independent motor control (left/right turn logic)",
            "Implemented using RPi.GPIO in BOARD mode",
            "Control loop with 10ms refresh for smooth navigation response"
        ],
        challenges: [
            "Ensuring accurate line following — I adjusted the sensor height and motor speed after trial runs to improve responsiveness.",
            "Adhering to project constraints — I limited parts to the course kit and built mounts using provided materials."
        ],
        futureImprovements: [
            "Enhancing sensor accuracy",
            "Exploring alternative path algorithms",
            "Improving speed and efficiency"
        ]
    },
    {
        id: "pokemon-ball-sorter",
        title: "Pokémon Ball Sorter",
        category: "ME35 / Simple Robotics",
        image: "/images/pokemon-ball-sorter/ball-sorter-1.jpeg",
        description: "A robot that automatically detects and sorts colored balls using color detection and servo positioning.",
        overview: [
            "Continuous ball feeding using threaded stepper motor control",
            "RGB color detection and classification",
            "Automated servo positioning for ball sorting",
            "Configurable sorting positions for different colors",
            "Returns to rest position after each sort"
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/Pokemon-Ball-Sorter",
        content: "A robot that automatically detects and sorts colored balls using color detection and servo positioning.",
        designProcess: "I designed this robot to sort Poké Balls by color using an RGB sensor and servo motor. My first tests were checking how reliable the color sensor was, especially under classroom lighting conditions. Once I locked in the thresholds, I connected a servo that would rotate to the correct box based on the color detected. The early version dropped balls in the wrong spots, so I reworked the servo timing and adjusted bin positions. It took a bunch of trial runs to get it all working together.",
        images: [
            { url: "/images/pokemon-ball-sorter/cad2.png", caption: "CAD design of the ball sorter mechanism" },
            { url: "/images/pokemon-ball-sorter/ball-sorter-1.jpeg", caption: "Final assembled system" }
        ],
        videos: [
            { url: "https://youtu.be/UhgyvbBYM8Y", caption: "Ball sorter in action" }
        ],
        technicalDetails: [
            "Reads RGB values from color sensor",
            "Classifies colors based on RGB intensity ratios",
            "Currently detects: Red, Green, Blue, Yellow",
            "Stepper motor runs in separate thread for continuous operation",
            "Servo motor moves to specific angles based on detected color",
            "Servo returns to rest position after each sort"
        ],
        challenges: [
            "Calibrating the color sensor to work in most lighting conditions — I tested readings under different lights and set thresholds based on averaged values.",
            "Implementing a very accurate sorting mechanism — I fine-tuned servo angles through trial and error and matched each color to a specific bin.",
            "Making sure all processes are running smoothly and that the ball feeding mechanism doesn't jam — I narrowed the feed ramp and added delays to space out ball entry."
        ],
        futureImprovements: [
            "Currently the robot doesn't accurately place balls to the corresponfing color bin. We plan to calibrate the servo to make sure it moves each ball to the correct slot"
        ]
    },
    {
        id: "pokemon-gripper",
        title: "Pokémon Ball Gripper",
        category: "ME35 / Simple Robotics",
        image: "/images/pokemon-gripper/gripper.jpeg",
        description: "Mechanical gripper system designed to safely handle and transport a Poké Ball using stepper motor actuation.",
        overview: [
            "Custom-designed linkage and gear system",
            "Stepper motor-controlled actuation",
            "2ft transport capability",
            "Pulley system for closing and opening the gripper cups"
        ],
        year: "Spring 2025",
        githubUrl: "https://github.com/pascalcyusa/Pokemon-Gripper",
        content: "Mechanical gripper system designed to safely handle and transport a Poké Ball using stepper motor actuation.",
        designProcess: "I wanted to make a mechanical system that could pick up and move a Poké Ball without dropping it. Our group decided on using a pulley system to control the gripper cups, and I adjusted motor timing in the code. Most of the design choices came down to trial and improvement — watching the robot fail, then changing a part until it got better.",
        images: [
            { url: "/images/pokemon-gripper/cad.png", caption: "CAD design of the gripper mechanism" },
            { url: "/images/pokemon-gripper/gripper.jpeg", caption: "Final assembled gripper system" }
        ],
        technicalDetails: [
            "Custom-designed linkage and gear system",
            "NEMA 17 stepper motors with 1.8° step angle",
            "Pulley system for closing and opening the gripper cups"
        ],
        challenges: [
            "Maintaining consistent grip during horizontal movement — I increased pulley tension and tested the system under motion to keep the grip secure.",
            "Calibrating the stepper motors to make sure they operate correctly — I wrote a script to sync motor start positions and adjusted timing."
        ],
        futureImprovements: [
            "Integration with computer vision for autonomous operation",
            "Wireless control capabilities",
            "Adding wheels to the system to make the robot move on its own"
        ]
    },
    {
        id: "ballon-dor-replica",
        title: "Ballon d’Or Replica",
        category: "ME10 / Materials & Manufacturing",
        image: "/images/ballon-dor-replica/dor2.jpeg",
        description: "Designed and fabricated a replica of the Ballon d’Or using sand casting and lost wax casting, achieving a close resemblance to the real trophy.",
        overview: [
            "SolidWorks design for accurate modeling",
            "Sand casting and lost wax casting techniques",
            "Welding for structural integrity",
            "Polished finishing for a realistic look"
        ],
        year: "Fall 2023",
        content: "Designed and fabricated a replica of the Ballon d’Or trophy using sand casting and lost wax casting techniques, achieving a high-quality final product closely resembling the original.",
        images: [
            { url: "/images/ballon-dor-replica/dor2.jpeg", caption: "Final polished Ballon d’Or replica" },
            { url: "/images/ballon-dor-replica/dor1.jpeg", caption: "Replica view 1" },
            { url: "/images/ballon-dor-replica/dor3.jpeg", caption: "Replica view 2" },
            { url: "/images/ballon-dor-replica/dor4.jpeg", caption: "Replica view 3" },
            { url: "/images/ballon-dor-replica/dor5.jpeg", caption: "Replica view 4" },
            { url: "/images/ballon-dor-replica/dor6.jpeg", caption: "Replica view 5" },
            { url: "/images/ballon-dor-replica/dor7.jpeg", caption: "Replica view 6" },
            { url: "/images/ballon-dor-replica/dor8.jpeg", caption: "Replica view 7" }
        ],
        technicalDetails: [
            "Designed using SolidWorks",
            "Used sand casting for one half of the ball",
            "Applied lost wax casting and welding to join halves",
            "Refined surface finish for authenticity"
        ],
        challenges: [
            "Achieving accurate proportions and details",
            "Ensuring proper fusion of cast parts",
            "Refining the final surface for an authentic look"
        ],
        outcomes: [
            "Successfully created a visually accurate Ballon d’Or replica",
            "Demonstrated advanced casting techniques",
            "Achieved a well-polished final product"
        ],
        futureImprovements: [
            "Enhancing detail precision in casting",
            "Exploring alternative finishing techniques",
            "Experimenting with different metal compositions"
        ]
    },
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
            { url: "/images/hip-truss-bridge/truss3.png", caption: "FEA Analysis Result" },
            { url: "/images/hip-truss-bridge/truss4.png", caption: "Bridge assembly using acrylic and glue" }
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
        ],
        pdfUrl: "https://drive.google.com/file/d/18hf8kmzOOd0wp9jBr4RTQsGvo0u0M9H_/view?usp=sharing"
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
            { url: "/images/dog-treat-dispenser/dispens3.png", caption: "User Testing" },
            { url: "/images/dog-treat-dispenser/blueprint.png", caption: "Blueprint of the dog treat dispenser" }
        ],
        videos: [
            { url: "https://youtube.com/shorts/POaRSqfHcnQ", caption: "Treat Dispenser in action" }
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
        ],
        pdfUrl: "https://tufts.box.com/s/3f1i93cj1kykrx0lybhsyjb9i06axet7",
        futureImprovements: [
            "Adding motorization for automated dispensing",
            "Increasing storage capacity",
            "Enhancing aesthetics for better usability and appearance"
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
         "content": "Evaluation of MEMS ultrasonic sensors for extraterrestrial wind measurement, utilizing Python statistical pipelines and wind tunnel instrumentation.",
        images: [
            { url: "/images/tdk-ch101/img1.jpeg", caption: "Sensor Mount" },
            { url: "https://invensense.tdk.com/wp-content/uploads/2019/09/rp-mod-ch101.png", caption: "CH101 Sensor © TDK Invensense" },
            { url: "/images/tdk-ch101/img2.jpeg", caption: "Experiment Setup" }
        ],
        "technicalDetails": [
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
            "Developed statistical models verifying R²=0.91 correlation",
            "Identified ±15.6 m/s variance floor in standard sensor configurations",
            "Proved necessity for custom signal processing over standard SoC",
            "Actively retrofitting wind tunnel for real-time flow velocity validation"
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
