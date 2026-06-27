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
    id: "intro-spreadsheets",
    title: "Introduction to Spreadsheets",
    classLevel: "",
    subjectCode: "",
    contentBlocks: [
      {
        type: "text",
        body: "Core Definitions"
      },
      {
        type: "text",
        body: "A spreadsheet is a digital file made of rows and columns that help sort, organize, and arrange data efficiently, as well as calculate numerical data."
      },
      {
        type: "challenge_callout",
        body: "What makes it unique? Its distinct ability to calculate values using mathematical formulas and the data stored inside cells."
      },
      {
        type: "bullet_point",
        body: "Common Examples: Microsoft Excel, Google Sheets, VisiCalc, iWork Numbers, Lotus 1-2-3, LibreOffice, and OpenOffice."
      },
      {
        type: "text",
        body: "Common Uses"
      },
      {
        type: "bullet_point",
        body: "Finance: Managing financial data like budgets, bank accounts, taxes, invoices, receipts, billing, and financial forecasting."
      },
      {
        type: "bullet_point",
        body: "School and Grades: Track students' scores, calculate grades, and identify missing tests or struggling students."
      },
      {
        type: "bullet_point",
        body: "Sports: Track statistics for individual favorite players or an entire team."
      },
      {
        type: "bullet_point",
        body: "Forms: Templates to handle business inventory, performance evaluations, quizzes, and tracking time."
      },
      {
        type: "bullet_point",
        body: "Figures: Build or draw visual representations like graphs, pie charts, and bar charts."
      },
      {
        type: "text",
        body: "Interface Navigation Tabs"
      },
      {
        type: "text",
        body: "Understanding the workspace is essential to navigating a spreadsheet. Here are the main navigation tabs in MS-Excel:"
      },
      {
        type: "bullet_point",
        body: "Home: Font size, style, color, background color, alignment, cell formatting styles, insertion/deletion tools, editing options."
      },
      {
        type: "bullet_point",
        body: "Insert: Options for adding charts/graphs, sparklines, images, figures, headers, footers, equations/symbols."
      },
      {
        type: "bullet_point",
        body: "Page Layout: Worksheet themes, page orientation, and margins."
      },
      {
        type: "bullet_point",
        body: "Formulas: Complex math formulas for faster calculation results."
      },
      {
        type: "bullet_point",
        body: "Data: Importing external data, filtering columns, validating data."
      },
      {
        type: "bullet_point",
        body: "Review: Proofread sheets, spell-check, leave comments."
      },
      {
        type: "bullet_point",
        body: "View: Window arrangement options, zoom controls."
      },
      {
        type: "text",
        body: "Layout Components"
      },
      {
        type: "bullet_point",
        body: "Workbook: The entire file itself containing one or more individual worksheets."
      },
      {
        type: "bullet_point",
        body: "Worksheet (Spreadsheet): A grid of columns and rows where you enter and calculate data."
      },
      {
        type: "bullet_point",
        body: "Columns: Vertical lines labeled with letters starting from A to Z, continuing to AA, AB up to XFD."
      },
      {
        type: "bullet_point",
        body: "Rows: Horizontal lines numbered sequentially from 1 up to 1,048,576."
      },
      {
        type: "bullet_point",
        body: "Name Box: Displays the exact coordinate (cell address) sits to the left of the formula bar."
      },
      {
        type: "bullet_point",
        body: "Formula Bar: Shows raw contents or formulas allowing direct editing."
      },
      {
        type: "bullet_point",
        body: "Sheet Tab: Found at the bottom to add, delete, move, or rename sheets."
      },
      {
        type: "bullet_point",
        body: "Status Bar: Located at the absolute bottom showing active modes and zoom options."
      },
      {
        type: "text",
        body: "Cell Operations"
      },
      {
        type: "bullet_point",
        body: "Cell: Tiny rectangles formed where a row and column intersect."
      },
      {
        type: "bullet_point",
        body: "Cell Address / Reference: Coordinate name (e.g., column C and row 5 intersect at cell C5)."
      },
      {
        type: "bullet_point",
        body: "Active Cell: Highlighted by a bold border featuring a fill handle in its bottom-right corner."
      },
      {
        type: "bullet_point",
        body: "Cell Range: A group of adjacent cells separated by a colon (e.g., A1:A5)."
      },
      {
        type: "bullet_point",
        body: "Valid Data Types: Text, Formatting, Formulas & Functions."
      },
      {
        type: "text",
        body: "Step-by-Step Worksheet Editing Actions"
      },
      {
        type: "bullet_point",
        body: "Selecting Items: Single cell (Left-click once); Range (Click and drag cursor)."
      },
      {
        type: "challenge_callout",
        body: "Deleting Content vs Deleting Cells: Clearing Content leaves cell empty via Clear Contents; Deleting Cells completely removes the physical space causing surrounding cells to shift."
      },
      {
        type: "bullet_point",
        body: "Copy/Paste vs Cut/Paste: Copy/Paste duplicates data (Ctrl+C to Ctrl+V); Cut/Paste completely relocates information (Ctrl+X to Ctrl+V)."
      }
    ]
  }
];
