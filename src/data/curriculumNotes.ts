export interface StaticNote {
  id: string;
  title: string;
  classLevel: string;
  subjectCode: string;
  contentBlocks: Array<{
    type: "text" | "challenge_callout" | "bullet_point";
    body: string;
  }>;
}

export const staticCurriculumNotes: StaticNote[] = [
  {
    id: "algorithm-basics",
    title: "Introduction to Algorithms",
    classLevel: "Basic 9",
    subjectCode: "COMP-B9",
    contentBlocks: [
      {
        type: "text",
        body: "An algorithm is a finite set of instructions, commands, or a step-by-step procedure carried out in a specific order to solve logical, mathematical, or real-world problems."
      },
      {
        type: "challenge_callout",
        body: "EXAM INTEL: A recipe is a classic real-world analogy of an algorithm. It outlines step-by-step instructions, taking inputs (ingredients) to produce an output (the finished meal)."
      },
      {
        type: "text",
        body: "Core Components of an Algorithm:"
      },
      {
        type: "bullet_point",
        body: "Problem: A real-world instance or issue requiring a program or set of instructions."
      },
      {
        type: "bullet_point",
        body: "Input: The necessary and desired values provided to the algorithm."
      },
      {
        type: "bullet_point",
        body: "Processing Unit: The component (like the CPU) that processes the input to create the desired output."
      },
      {
        type: "bullet_point",
        body: "Output: The final outcome or result produced by the program."
      },
      {
        type: "text",
        body: "To be effective, an algorithm must possess specific characteristics:"
      },
      {
        type: "bullet_point",
        body: "Input: Requires some input values (which can be given a value other than 0)."
      },
      {
        type: "bullet_point",
        body: "Output: Will result in one or more outcomes at the end."
      },
      {
        type: "bullet_point",
        body: "Unambiguity: Instructions must be perfectly clear, straightforward, and unambiguous."
      },
      {
        type: "challenge_callout",
        body: "CRITICAL DEFINITION: Finiteness means the algorithm must have a limited, countable number of instructions (it must end)."
      },
      {
        type: "bullet_point",
        body: "Effectiveness: Every instruction affects the overall process and must be adequate."
      },
      {
        type: "bullet_point",
        body: "Language Independence: Instructions must be generic enough to be implemented in any programming language and still produce the exact same results."
      },
      {
        type: "text",
        body: "Programming Constructs (The 3 Basic Building Blocks) dictate how code executes:"
      },
      {
        type: "challenge_callout",
        body: "I. Sequence: The most basic construct where instructions occur and execute one after another in order. The computer runs code line-by-line, from top to bottom, until it reaches the end. Example: A school child's daily schedule."
      },
      {
        type: "challenge_callout",
        body: "II. Selection: Determines which path a program takes depending on whether a specific condition is met. If a condition is true, certain lines of code execute. If false, the computer ignores/skips those lines and jumps ahead. Implementation: Achieved using IF statements."
      },
      {
        type: "challenge_callout",
        body: "III. Iteration (Looping): The repeated execution of a specific section of code while a program is running. Instead of rewriting the same lines of code multiple times, a loop forces the program to repeat a set of steps as many times as required."
      },
      {
        type: "text",
        body: "Key Computational Concepts:"
      },
      {
        type: "bullet_point",
        body: "Abstraction: The process of hiding background details or unnecessary implementation complexities so users only see the required information. (Example: When using a washing machine, you simply put in clothes and wait without needing to understand the internal mechanisms)."
      },
      {
        type: "bullet_point",
        body: "Decomposition: The process of breaking down a large, complex problem into smaller, manageable parts. Smaller parts are easier to examine, design, and solve individually."
      },
      {
        type: "text",
        body: "Practical Algorithm Examples:"
      },
      {
        type: "challenge_callout",
        body: "A. Simple Multiplication Algorithm:\nStep 1 – Start\nStep 2 – Declare three integers: x, y, and z\nStep 3 – Define the values of x and y\nStep 4 – Multiply the values of x and y\nStep 5 – Store the result of Step 4 into z\nStep 6 – Print z\nStep 7 – End"
      },
      {
        type: "challenge_callout",
        body: "B. Linear Search Algorithm:\nDefinition: The simplest sequential searching method, where you start at one end of a list and check every single element one by one until the desired item (the 'key') is found.\nHow it works:\n1. Every element in an array is treated as a potential match.\n2. If an element equals the key, the search is successful and its index location is returned.\n3. If the loop checks every item and finds nothing, it returns 'No match found'."
      },
      {
        type: "text",
        body: "Linear Search Visual Walkthrough:\nGiven array: arr[] = {10, 50, 30, 70, 80, 20, 90, 40} and target Key = 30\n- Step 1: Compare Key (30) with arr[0] (10) -> Not equal. Move to next element.\n- Step 2: Compare Key (30) with arr[1] (50) -> Not equal. Move to next element.\n- Step 3: Compare Key (30) with arr[2] (30) -> Match found! Algorithm yields success and returns index 2."
      }
    ]
  },
  {
    id: "robotics-basics",
    title: "Introduction to Robotics",
    classLevel: "Basic 9",
    subjectCode: "COMP-B9",
    contentBlocks: [
      {
        type: "text",
        body: "Robotics is an interdisciplinary branch of computer science and engineering focused on creating automated machines that can assist and substitute for humans in diverse environments."
      },
      {
        type: "challenge_callout",
        body: "DEFINITIONS:\n• Robot: An automated machine designed to execute specific tasks with speed, precision, and little to no human intervention.\n• Robotics: The technical field that deals directly with the design, engineering, and operation of robots."
      },
      {
        type: "text",
        body: "Robots are deployed across countless industries in modern society to optimize productivity and reduce human exposure to hazards:"
      },
      {
        type: "bullet_point",
        body: "Manufacturing: Used to automate repetitive tasks on assembly lines, such as welding and painting, to increase productivity and quality."
      },
      {
        type: "bullet_point",
        body: "Transportation: Implemented in self-driving cars, drones, and autonomous vehicles to reduce traffic congestion and improve overall safety."
      },
      {
        type: "bullet_point",
        body: "Healthcare: Assists medical professionals with surgical procedures, patient rehabilitation, monitoring vital signs, and administering medication."
      },
      {
        type: "bullet_point",
        body: "Agriculture: Deployed to handle crop planting, harvesting, growth monitoring, and lowering labor expenses."
      },
      {
        type: "bullet_point",
        body: "Construction: Automates physically demanding, labor-intensive tasks like bricklaying and concrete pouring."
      },
      {
        type: "bullet_point",
        body: "Space Exploration: Used to safely explore hostile environments such as other planets, moons, and asteroids."
      },
      {
        type: "bullet_point",
        body: "Service Industry: Utilized in banks, hotels, and malls to guide customers, provide information, and answer general queries."
      },
      {
        type: "bullet_point",
        body: "Military and Defense: Deployed for high-risk operations including surveillance, reconnaissance, and bomb disposal."
      },
      {
        type: "text",
        body: "While robotics presents massive opportunities, their implementation also brings distinct hurdles and risks, especially in education:"
      },
      {
        type: "bullet_point",
        body: "Training Demands: Tutors require proper training to use robots as teaching aids, and untrained learners may struggle to interact with the technology effectively."
      },
      {
        type: "bullet_point",
        body: "Ongoing Costs & Maintenance: Industrial setups face continuing maintenance, operational, and cybersecurity protection expenses. Similarly, high maintenance costs limit the widespread deployment of educational robots."
      },
      {
        type: "bullet_point",
        body: "Technology Reliability: As mechanical devices, robots are prone to failures at any time, making their long-term integrity a constant challenge."
      },
      {
        type: "challenge_callout",
        body: "THE UNCANNY VALLEY: Educational robots built with human-like appearances can evoke fear or discomfort in students, which can actively impede the learning process."
      },
      {
        type: "bullet_point",
        body: "Safety Risks: Physical hazards, such as robots built with sharp edges, can cause severe harm or lacerations to young children, discouraging them from using the technology."
      }
    ]
  },
  {
    id: "spreadsheet-basics",
    title: "Introduction to Spreadsheets",
    classLevel: "Basic 9",
    subjectCode: "COMP-B9",
    contentBlocks: [
      {
        type: "text",
        body: "A spreadsheet is a digital file made of rows and columns that help sort, organize, and arrange data efficiently, as well as calculate numerical data."
      },
      {
        type: "challenge_callout",
        body: "UNIQUE FEATURE: What makes it unique is its distinct ability to calculate values using mathematical formulas and the data stored inside cells."
      },
      {
        type: "text",
        body: "Common Examples: Microsoft Excel, Google Sheets, VisiCalc, iWork Numbers, Lotus 1-2-3, LibreOffice, and OpenOffice."
      },
      {
        type: "text",
        body: "Common Uses of Spreadsheet Applications:"
      },
      {
        type: "bullet_point",
        body: "Finance: Ideal for managing financial data like budgets, bank accounts, taxes, invoices, receipts, billing, and financial forecasting."
      },
      {
        type: "bullet_point",
        body: "School and Grades: Teachers use them to track students' scores, calculate grades, and identify missing tests or students who are struggling."
      },
      {
        type: "bullet_point",
        body: "Sports: Used to track statistics for individual favorite players or an entire team."
      },
      {
        type: "bullet_point",
        body: "Forms: Templates can be created to handle business inventory, performance evaluations, quizzes, and tracking time."
      },
      {
        type: "bullet_point",
        body: "Figures: Used to build or draw visual representations like graphs, pie charts, and bar charts."
      },
      {
        type: "text",
        body: "Features of the MS-Excel Interface:\nUnderstanding the workspace is essential to navigating a spreadsheet. Here are the key interface terminologies and components:"
      },
      {
        type: "challenge_callout",
        body: "MAIN NAVIGATION TABS:\n• Home: Text options, alignment, cell formatting, cell insertion/deletion, editing.\n• Insert: Adding charts/graphs, images, headers/footers, symbols.\n• Page Layout: Worksheet themes, orientation, margins.\n• Formulas: Complex math formulas for calculation results.\n• Data: Importing data, filtering, validation.\n• Review: Proofreading, spell-checking, comments.\n• View: Zoom controls, window arrangement, display options."
      },
      {
        type: "text",
        body: "Essential Layout Components:"
      },
      {
        type: "bullet_point",
        body: "Workbook: The entire file itself, which contains one or more individual worksheets."
      },
      {
        type: "bullet_point",
        body: "Worksheet (Spreadsheet): A grid of columns and rows where you enter and calculate data."
      },
      {
        type: "bullet_point",
        body: "Columns: The vertical lines of cells, labeled with letters starting from A to Z, up to XFD."
      },
      {
        type: "bullet_point",
        body: "Rows: The horizontal lines of cells, numbered sequentially from 1 up to 1,048,576."
      },
      {
        type: "bullet_point",
        body: "Name Box: Displays the exact coordinate (cell address) of the cell you currently have selected (sits to the left of the formula bar)."
      },
      {
        type: "bullet_point",
        body: "Formula Bar: A text bar that shows the raw contents or formulas of the current cell."
      },
      {
        type: "bullet_point",
        body: "Sheet Tab: Found at the bottom of the window to add, delete, move, or rename sheets."
      },
      {
        type: "bullet_point",
        body: "Status Bar: Located at the absolute bottom of the Excel window, it displays current mode or active special keys."
      },
      {
        type: "text",
        body: "Understanding Cells & Cell Operations:"
      },
      {
        type: "bullet_point",
        body: "Cell: The tiny individual rectangles formed where a row and column intersect."
      },
      {
        type: "bullet_point",
        body: "Cell Address / Reference: The coordinate name of a cell, written as Column Letter followed by Row Number (e.g., C5)."
      },
      {
        type: "bullet_point",
        body: "Active Cell: Highlighted by a bold black border (cell pointer). Features a tiny square in its bottom-right corner called the fill handle."
      },
      {
        type: "bullet_point",
        body: "Cell Range: A group of multiple adjacent cells (e.g., A1:A5)."
      },
      {
        type: "challenge_callout",
        body: "VALID DATA TYPES:\n• Text: Letters, simple words, numbers, and dates.\n• Formatting: Custom look, fonts, and colors applied to the data.\n• Formulas & Functions: Math commands inserted into cells to actively compute numerical values."
      },
      {
        type: "text",
        body: "Step-by-Step Worksheet Editing Actions:"
      },
      {
        type: "bullet_point",
        body: "Selecting Items: Click once for a single cell. Click and drag for a range."
      },
      {
        type: "bullet_point",
        body: "Inserting & Overwriting Content: Click cell to activate, type, and press Enter (or type directly in Formula Bar)."
      },
      {
        type: "challenge_callout",
        body: "DELETING VS. CLEARING:\n• Clearing Content: Home tab -> Clear -> Clear Contents. The cell remains, but the data is gone.\n• Deleting Cells: Home tab -> Delete. The physical cell disappears, causing surrounding cells to shift up or left."
      },
      {
        type: "challenge_callout",
        body: "COPY/PASTE VS. CUT/PASTE:\n• Copy and Paste (Ctrl + C & Ctrl + V): Duplicates the data, leaving the original intact.\n• Cut and Paste (Ctrl + X & Ctrl + V): Moves the data, removing it from its original location."
      }
    ]
  },
  {
    id: "web-technologies-basics",
    title: "Introduction to Web Technologies",
    classLevel: "Basic 9",
    subjectCode: "COMP-B9",
    contentBlocks: [
      {
        type: "text",
        body: "A Virtual Learning Environment (VLE) is a collaborative platform that enables better learning delivery. It helps educators work more efficiently and allows students to complete schoolwork from anywhere."
      },
      {
        type: "challenge_callout",
        body: "DEFINITION: A Virtual Learning Environment (VLE) is a collaborative web-based platform that facilitates digital learning, course management, and teacher-student interaction from anywhere."
      },
      {
        type: "text",
        body: "Typical Features of a VLE:"
      },
      {
        type: "bullet_point",
        body: "Web and mobile applications: Allow learners to access courses from anywhere at any time."
      },
      {
        type: "bullet_point",
        body: "Highly collaborative features: Includes virtual classrooms, email applications, chat forums, wikis, blogs, and leaderboards."
      },
      {
        type: "bullet_point",
        body: "Innovative lesson delivery: Utilizes gamified instruction and flipped classrooms (reversing the traditional homework-first format)."
      },
      {
        type: "bullet_point",
        body: "Synchronous and asynchronous learning: Combines real-time interaction (e.g., meeting for the first 15 minutes) with independent study."
      },
      {
        type: "bullet_point",
        body: "Offline learning capabilities: Allows creation of electronic records offline when internet access is poor, which synchronize once a connection is available."
      },
      {
        type: "text",
        body: "Importance of a VLE in modern education:"
      },
      {
        type: "bullet_point",
        body: "Track learner performance easily: Electronic records and assessments allow teachers to track student progress and submissions."
      },
      {
        type: "bullet_point",
        body: "Deliver content consistently: The same materials are accessible to all learners and can be easily updated."
      },
      {
        type: "bullet_point",
        body: "Save cost and time: Content is created once and shared digitally without printing costs."
      },
      {
        type: "bullet_point",
        body: "Encourage communication and collaboration: Forums and message boards foster a sense of community."
      },
      {
        type: "bullet_point",
        body: "Promote flexible learning: Students can learn on their own time and review unclear topics."
      },
      {
        type: "bullet_point",
        body: "Provide a way to explore and experiment: Instructors can innovate new teaching techniques."
      },
      {
        type: "challenge_callout",
        body: "OPEN LEARNING WEBSITES:\nOpen learning websites offer online courses at a fraction of the cost of traditional institutions. Examples include:\n• Khan Academy: A non-profit providing free, world-class education for anyone.\n• edX: Founded by Harvard and MIT; global non-profit offering free/fee-based courses.\n• Coursera: Features university partners offering courses, specializations, and degrees.\n• Udemy: A global education marketplace driven by content creators.\n• TED-Ed: TED's youth and education arm using original animated videos.\n• Codecademy: Interactive platform focusing on coding and programming."
      },
      {
        type: "text",
        body: "Evaluating Web Pages (The 5 Core Criteria):\nUnlike print materials, information on the web does not always have strict quality control standards. It is crucial to evaluate web pages using five core criteria:"
      },
      {
        type: "challenge_callout",
        body: "I. Accuracy: Who wrote the page? Is the person qualified? Can you contact them via email or address?"
      },
      {
        type: "challenge_callout",
        body: "II. Authority: Which institution published the document? What are their credentials? Check the URL domain: preferred domains include .edu, .gov, and .org."
      },
      {
        type: "challenge_callout",
        body: "III. Objectivity / Credibility: What goals or objectives does the site meet? Is the page a mask for advertising? (If so, it might be biased)."
      },
      {
        type: "challenge_callout",
        body: "IV. Currency / Current: When was the site produced and last updated? Are there dead links on the page?"
      },
      {
        type: "challenge_callout",
        body: "V. Coverage / Functionality: Can you view the information properly without being restricted by fees, browser technology, or software requirements?"
      }
    ]
  }
];

