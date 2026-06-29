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
    title: "Algorithm Basics: Sorting & Big O",
    description: "Learn the fundamentals of sorting algorithms and analyze their runtime complexities using Big O notation.",
    xpReward: 150,
    dueDate: "Tomorrow, 11:59 PM",
    steps: [
      {
        stepNumber: 1,
        title: "Bubble Sort Simulation",
        instruction: "Trace bubble sort on the array [5, 1, 4, 2]. Swap adjacent elements until sorted.",
        hint: "Start from index 0. Compare 5 and 1. Since 5 > 1, swap them to get [1, 5, 4, 2]. Repeat for the rest.",
        expectedOutcome: "[1, 2, 4, 5]"
      },
      {
        stepNumber: 2,
        title: "Analyze Time Complexity",
        instruction: "Write down the worst-case time complexity of Bubble Sort using Big O notation.",
        hint: "Bubble sort uses nested loops to compare elements. Think about the square of the size of the array.",
        expectedOutcome: "O(N^2)"
      }
    ],
    quizQuestions: [
      {
        id: "q1",
        question: "Which sorting algorithm has a worst-case time complexity of O(N log N)?",
        options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
        correctAnswerIndex: 2,
        explanation: "Merge Sort uses a divide-and-conquer strategy which guarantees O(N log N) time complexity in all cases.",
        xpValue: 30
      },
      {
        id: "q2",
        question: "What does Big O notation describe?",
        options: ["Exact execution time in milliseconds", "The upper bound of the growth rate of an algorithm", "The storage limit of the database", "The number of lines of code"],
        correctAnswerIndex: 1,
        explanation: "Big O notation describes the limiting behavior of a function, serving as an asymptotic upper bound for runtime or memory.",
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
