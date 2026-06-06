export const students = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    email: "ahmed@gmail.com",
    level: "Level 1",
  },

  {
    id: 2,
    name: "Ali Hassan",
    email: "ali@gmail.com",
    level: "Level 2",
  },
];

export const levels = [
  {
    id: 1,
    name: "Level 1",

    subjects: [
      "Math",
      "Physics",
      "Programming",
    ],
  },

  {
    id: 2,
    name: "Level 2",

    subjects: [
      "Database",
      "Algorithms",
      "OOP",
    ],
  },

  {
    id: 3,
    name: "Level 3",

    departments: [
      {
        id: "cs",
        name: "Computer Science",

        lectures: [
          {
            id: 1,
            title: "AI Lecture 1",
          },

          {
            id: 2,
            title: "Networks Lecture",
          },
        ],
      },

      {
        id: "it",
        name: "Information Technology",

        lectures: [
          {
            id: 1,
            title: "Cloud Computing",
          },
        ],
      },
    ],
  },

  {
    id: 4,
    name: "Level 4",

    departments: [
      {
        id: "cs",
        name: "Computer Science",

        lectures: [
          {
            id: 1,
            title: "Machine Learning",
          },
        ],
      },
    ],
  },
];