export interface QuestStep {
  stepNumber: number;
  title: string;
  instruction: string;
  hint: string;
  expectedOutcome: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  xpValue: number;
}

export interface QuestBlueprint {
  title: string;
  description: string;
  xpReward: number;
  dueDate: string;
  steps: QuestStep[];
  quizQuestions: QuizQuestion[];
}

export const questRegistry: Record<string, QuestBlueprint> = {
  "algorithm-basics": {
    title: "Introduction to Algorithms Quest",
    description: "Test your understanding of basic algorithmic constructs: sequence, selection, iteration, and abstraction.",
    xpReward: 150,
    dueDate: "Tomorrow, 11:59 PM",
    steps: [
      {
        stepNumber: 1,
        title: "Identify Construct Flow",
        instruction: "Trace this flowchart process: 1. Put tea in cup. 2. If water is hot, pour water. Else, heat water. Identify which constructs are used.",
        hint: "We are doing steps in order (Sequence), and making a choice based on water temperature (Selection).",
        expectedOutcome: "SEQUENCE AND SELECTION"
      },
      {
        stepNumber: 2,
        title: "Define Loop Bounds (Iteration)",
        instruction: "Write down the condition to repeat a stir action 5 times using a loop counter initialized to 0.",
        hint: "To stir 5 times starting at 0, repeat WHILE counter < 5, incrementing by 1 each time.",
        expectedOutcome: "WHILE COUNTER < 5"
      }
    ],
    quizQuestions: [
      {
        id: "alg_q1",
        question: "Which characteristic states that an algorithm must end after a limited number of steps?",
        options: ["Unambiguity", "Finiteness", "Effectiveness", "Language Independence"],
        correctAnswerIndex: 1,
        explanation: "Finiteness dictates that the algorithm must terminate after a countable number of instructions.",
        xpValue: 30
      },
      {
        id: "alg_q2",
        question: "Which programming construct is implemented using 'IF-THEN-ELSE' statements?",
        options: ["Sequence", "Selection", "Iteration", "Abstraction"],
        correctAnswerIndex: 1,
        explanation: "Selection determines which path a program takes depending on whether a specific condition is met.",
        xpValue: 30
      },
      {
        id: "alg_q3",
        question: "What is abstraction?",
        options: [
          "Breaking a problem down into smaller parts",
          "Hiding unnecessary implementation details to show only essentials",
          "Repeating a block of instructions indefinitely",
          "Translating code to machine language"
        ],
        correctAnswerIndex: 1,
        explanation: "Abstraction is the process of hiding background details or unnecessary complexities so users only see the required information.",
        xpValue: 40
      }
    ]
  },
  "sql-queries": {
    title: "SQL Mastery: Joins & Aggregations",
    description: "Write advanced SQL queries to combine tables and aggregate student metrics.",
    xpReward: 200,
    dueDate: "In 2 days, 11:59 PM",
    steps: [
      {
        stepNumber: 1,
        title: "Perform INNER JOIN",
        instruction: "Write an SQL query to join the students table with the submissions table on student_id.",
        hint: "Use SELECT * FROM students INNER JOIN submissions ON students.id = submissions.student_id",
        expectedOutcome: "SELECT * FROM students INNER JOIN submissions ON students.id = submissions.student_id"
      }
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Which join returns all records from the left table and matched records from the right table?",
        options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "FULL OUTER JOIN"],
        correctAnswerIndex: 2,
        explanation: "A LEFT JOIN returns all rows from the left table, along with matching rows from the right table. Non-matching right table values will be NULL.",
        xpValue: 50
      }
    ]
  }
};
