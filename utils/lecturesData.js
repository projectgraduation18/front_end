// // lecturesData.js - ملف منفصل للبيانات
// export const lecturesData = {
//   // Level 1 - ملهوش category (محاضرات عامة)
//   1: {
//     title: "Level 1: Introduction to Computer Science",
//     lectures: [
//       {
//         id: 1,
//         title: "What is Computer Science?",
//         duration: "15:30",
//         videoUrl: "https://example.com/vid1",
//       },
//       {
//         id: 2,
//         title: "Introduction to Algorithms",
//         duration: "22:15",
//         videoUrl: "https://example.com/vid2",
//       },
//       {
//         id: 3,
//         title: "Programming Basics",
//         duration: "35:20",
//         videoUrl: "https://example.com/vid3",
//       },
//       {
//         id: 4,
//         title: "Data Types and Variables",
//         duration: "28:45",
//         videoUrl: "https://example.com/vid4",
//       },
//       {
//         id: 5,
//         title: "Control Flow (If-Else, Loops)",
//         duration: "42:10",
//         videoUrl: "https://example.com/vid5",
//       },
//     ],
//   },

//   // Level 2 - ملهوش category (محاضرات عامة)
//   2: {
//     title: "Level 2: Data Structures and Algorithms",
//     lectures: [
//       {
//         id: 1,
//         title: "Arrays and Lists",
//         duration: "30:20",
//         videoUrl: "https://example.com/vid6",
//       },
//       {
//         id: 2,
//         title: "Stacks and Queues",
//         duration: "25:15",
//         videoUrl: "https://example.com/vid7",
//       },
//       {
//         id: 3,
//         title: "Trees and Graphs",
//         duration: "45:30",
//         videoUrl: "https://example.com/vid8",
//       },
//       {
//         id: 4,
//         title: "Sorting Algorithms",
//         duration: "38:45",
//         videoUrl: "https://example.com/vid9",
//       },
//       {
//         id: 5,
//         title: "Searching Algorithms",
//         duration: "32:20",
//         videoUrl: "https://example.com/vid10",
//       },
//     ],
//   },

//   // Level 3 - ليه category (cs و is)
//   3: {
//     title: "Level 3: Software Development",
//     categories: {
//       cs: {
//         name: "Computer Science Track",
//         lectures: [
//           {
//             id: 1,
//             title: "Advanced Programming Concepts",
//             duration: "40:15",
//             videoUrl: "https://example.com/vid11",
//           },
//           {
//             id: 2,
//             title: "Object-Oriented Programming (OOP)",
//             duration: "55:30",
//             videoUrl: "https://example.com/vid12",
//           },
//           {
//             id: 3,
//             title: "Design Patterns",
//             duration: "48:20",
//             videoUrl: "https://example.com/vid13",
//           },
//           {
//             id: 4,
//             title: "Software Architecture",
//             duration: "52:45",
//             videoUrl: "https://example.com/vid14",
//           },
//           {
//             id: 5,
//             title: "Code Optimization Techniques",
//             duration: "35:10",
//             videoUrl: "https://example.com/vid15",
//           },
//         ],
//       },
//       is: {
//         name: "Information Systems Track",
//         lectures: [
//           {
//             id: 1,
//             title: "Database Management Systems",
//             duration: "42:30",
//             videoUrl: "https://example.com/vid16",
//           },
//           {
//             id: 2,
//             title: "System Analysis and Design",
//             duration: "38:15",
//             videoUrl: "https://example.com/vid17",
//           },
//           {
//             id: 3,
//             title: "IT Project Management",
//             duration: "45:20",
//             videoUrl: "https://example.com/vid18",
//           },
//           {
//             id: 4,
//             title: "Business Intelligence",
//             duration: "50:45",
//             videoUrl: "https://example.com/vid19",
//           },
//           {
//             id: 5,
//             title: "ERP Systems",
//             duration: "44:10",
//             videoUrl: "https://example.com/vid20",
//           },
//         ],
//       },
//     },
//   },

//   // Level 4 - ليه category (cs و is)
//   4: {
//     title: "Level 4: Advanced Computer Science",
//     categories: {
//       cs: {
//         name: "Advanced CS Track",
//         lectures: [
//           {
//             id: 1,
//             title: "Machine Learning Fundamentals",
//             duration: "60:00",
//             videoUrl: "https://example.com/vid21",
//           },
//           {
//             id: 2,
//             title: "Neural Networks and Deep Learning",
//             duration: "55:30",
//             videoUrl: "https://example.com/vid22",
//           },
//           {
//             id: 3,
//             title: "Artificial Intelligence",
//             duration: "58:45",
//             videoUrl: "https://example.com/vid23",
//           },
//           {
//             id: 4,
//             title: "Distributed Systems",
//             duration: "52:20",
//             videoUrl: "https://example.com/vid24",
//           },
//           {
//             id: 5,
//             title: "Cloud Computing",
//             duration: "48:15",
//             videoUrl: "https://example.com/vid25",
//           },
//         ],
//       },
//       is: {
//         name: "Advanced IS Track",
//         lectures: [
//           {
//             id: 1,
//             title: "Data Science and Analytics",
//             duration: "56:30",
//             videoUrl: "https://example.com/vid26",
//           },
//           {
//             id: 2,
//             title: "Cybersecurity Fundamentals",
//             duration: "52:15",
//             videoUrl: "https://example.com/vid27",
//           },
//           {
//             id: 3,
//             title: "IT Strategy and Governance",
//             duration: "48:20",
//             videoUrl: "https://example.com/vid28",
//           },
//           {
//             id: 4,
//             title: "Digital Transformation",
//             duration: "45:45",
//             videoUrl: "https://example.com/vid29",
//           },
//           {
//             id: 5,
//             title: "Blockchain Technology",
//             duration: "54:10",
//             videoUrl: "https://example.com/vid30",
//           },
//         ],
//       },
//     },
//   },
// };
 
// utils/lecturesData.js
export const lecturesData = {
  // Level 1 - ملهوش category (مواد عامة)
  1: {
    title: "Level 1",
    subjects: [
      {
        id: 1,
        name: "Introduction to Programming",
        description: "Learn the basics of programming concepts",
        icon: "💻",
        lectures: [
          {
            id: 1,
            title: "What is Programming?",
            duration: "15:30",
            videoUrl: "https://example.com/vid1",
          },
          {
            id: 2,
            title: "Setting Up Your Environment",
            duration: "22:15",
            videoUrl: "https://example.com/vid2",
          },
          {
            id: 3,
            title: "Your First Program",
            duration: "35:20",
            videoUrl: "https://example.com/vid3",
          },
        ],
      },
      {
        id: 2,
        name: "Algorithms Basics",
        description: "Understanding algorithms and problem solving",
        icon: "🧠",
        lectures: [
          {
            id: 4,
            title: "What are Algorithms?",
            duration: "28:45",
            videoUrl: "https://example.com/vid4",
          },
          {
            id: 5,
            title: "Flowcharts and Pseudocode",
            duration: "42:10",
            videoUrl: "https://example.com/vid5",
          },
          {
            id: 6,
            title: "Basic Algorithm Examples",
            duration: "38:30",
            videoUrl: "https://example.com/vid6",
          },
        ],
      },
      {
        id: 3,
        name: "Data Types & Variables",
        description: "Understanding different data types",
        icon: "📊",
        lectures: [
          {
            id: 7,
            title: "Numbers and Strings",
            duration: "25:20",
            videoUrl: "https://example.com/vid7",
          },
          {
            id: 8,
            title: "Boolean and Arrays",
            duration: "32:15",
            videoUrl: "https://example.com/vid8",
          },
        ],
      },
    ],
  },

  // Level 2 - ملهوش category (مواد عامة)
  2: {
    title: "Level 2",
    subjects: [
      {
        id: 1,
        name: "Arrays & Lists",
        description: "Understanding dynamic and static arrays",
        icon: "📚",
        lectures: [
          {
            id: 1,
            title: "Introduction to Arrays",
            duration: "30:20",
            videoUrl: "https://example.com/vid9",
          },
          {
            id: 2,
            title: "Linked Lists",
            duration: "45:30",
            videoUrl: "https://example.com/vid10",
          },
        ],
      },
      {
        id: 2,
        name: "Stacks & Queues",
        description: "LIFO and FIFO data structures",
        icon: "📦",
        lectures: [
          {
            id: 3,
            title: "Stack Implementation",
            duration: "25:15",
            videoUrl: "https://example.com/vid11",
          },
          {
            id: 4,
            title: "Queue Implementation",
            duration: "28:45",
            videoUrl: "https://example.com/vid12",
          },
        ],
      },
      {
        id: 3,
        name: "Trees & Graphs",
        description: "Hierarchical data structures",
        icon: "🌳",
        lectures: [
          {
            id: 5,
            title: "Binary Trees",
            duration: "55:30",
            videoUrl: "https://example.com/vid13",
          },
          {
            id: 6,
            title: "Graph Traversal",
            duration: "48:20",
            videoUrl: "https://example.com/vid14",
          },
        ],
      },
    ],
  },

  // Level 3 - CS Track
  3: {
    title: "Level 3",
    categories: {
      cs: {
        name: "Computer Science Department",
        subjects: [
          {
            id: 1,
            name: "Object-Oriented Programming",
            description: "Master OOP concepts and principles",
            icon: "🎯",
            lectures: [
              {
                id: 1,
                title: "Classes and Objects",
                duration: "40:15",
                videoUrl: "https://example.com/vid15",
              },
              {
                id: 2,
                title: "Inheritance and Polymorphism",
                duration: "55:30",
                videoUrl: "https://example.com/vid16",
              },
              {
                id: 3,
                title: "Encapsulation and Abstraction",
                duration: "35:20",
                videoUrl: "https://example.com/vid17",
              },
            ],
          },
          {
            id: 2,
            name: "Design Patterns",
            description: "Common software design patterns",
            icon: "🔧",
            lectures: [
              {
                id: 4,
                title: "Creational Patterns",
                duration: "48:20",
                videoUrl: "https://example.com/vid18",
              },
              {
                id: 5,
                title: "Structural Patterns",
                duration: "52:45",
                videoUrl: "https://example.com/vid19",
              },
              {
                id: 6,
                title: "Behavioral Patterns",
                duration: "45:10",
                videoUrl: "https://example.com/vid20",
              },
            ],
          },
          {
            id: 3,
            name: "Software Architecture",
            description: "Building scalable applications",
            icon: "🏗️",
            lectures: [
              {
                id: 7,
                title: "MVC Architecture",
                duration: "42:30",
                videoUrl: "https://example.com/vid21",
              },
              {
                id: 8,
                title: "Microservices",
                duration: "50:15",
                videoUrl: "https://example.com/vid22",
              },
            ],
          },
        ],
      },
      is: {
        name: "Information Systems Department",
        subjects: [
          {
            id: 1,
            name: "Database Management",
            description: "Learn SQL and database design",
            icon: "🗄️",
            lectures: [
              {
                id: 1,
                title: "Database Design Basics",
                duration: "42:30",
                videoUrl: "https://example.com/vid23",
              },
              {
                id: 2,
                title: "SQL Fundamentals",
                duration: "55:20",
                videoUrl: "https://example.com/vid24",
              },
              {
                id: 3,
                title: "Normalization",
                duration: "38:15",
                videoUrl: "https://example.com/vid25",
              },
            ],
          },
          {
            id: 2,
            name: "System Analysis",
            description: "Analyzing business requirements",
            icon: "📈",
            lectures: [
              {
                id: 4,
                title: "Requirements Gathering",
                duration: "45:20",
                videoUrl: "https://example.com/vid26",
              },
              {
                id: 5,
                title: "UML Diagrams",
                duration: "50:45",
                videoUrl: "https://example.com/vid27",
              },
            ],
          },
          {
            id: 3,
            name: "IT Project Management",
            description: "Managing IT projects effectively",
            icon: "📋",
            lectures: [
              {
                id: 6,
                title: "Agile Methodology",
                duration: "44:10",
                videoUrl: "https://example.com/vid28",
              },
              {
                id: 7,
                title: "Scrum Framework",
                duration: "48:30",
                videoUrl: "https://example.com/vid29",
              },
            ],
          },
        ],
      },
    },
  },

  // Level 4 - CS Track
  4: {
    title: "Level 4",
    categories: {
      cs: {
        name: "Advanced CS Department",
        subjects: [
          {
            id: 1,
            name: "Machine Learning",
            description: "Introduction to ML algorithms",
            icon: "🤖",
            lectures: [
              {
                id: 1,
                title: "Supervised Learning",
                duration: "60:00",
                videoUrl: "https://example.com/vid30",
              },
              {
                id: 2,
                title: "Unsupervised Learning",
                duration: "55:30",
                videoUrl: "https://example.com/vid31",
              },
              {
                id: 3,
                title: "Regression Models",
                duration: "58:45",
                videoUrl: "https://example.com/vid32",
              },
            ],
          },
          {
            id: 2,
            name: "Deep Learning",
            description: "Neural networks and deep learning",
            icon: "🧠",
            lectures: [
              {
                id: 4,
                title: "Neural Networks Basics",
                duration: "65:20",
                videoUrl: "https://example.com/vid33",
              },
              {
                id: 5,
                title: "CNN and RNN",
                duration: "70:15",
                videoUrl: "https://example.com/vid34",
              },
            ],
          },
          {
            id: 3,
            name: "Artificial Intelligence",
            description: "AI concepts and applications",
            icon: "🎯",
            lectures: [
              {
                id: 6,
                title: "Search Algorithms",
                duration: "52:20",
                videoUrl: "https://example.com/vid35",
              },
              {
                id: 7,
                title: "Natural Language Processing",
                duration: "58:10",
                videoUrl: "https://example.com/vid36",
              },
            ],
          },
        ],
      },
      is: {
        name: "Information Systems Department",
        subjects: [
          {
            id: 1,
            name: "Data Science",
            description: "Data analysis and visualization",
            icon: "📊",
            lectures: [
              {
                id: 1,
                title: "Data Cleaning",
                duration: "56:30",
                videoUrl: "https://example.com/vid37",
              },
              {
                id: 2,
                title: "Data Visualization",
                duration: "52:15",
                videoUrl: "https://example.com/vid38",
              },
              {
                id: 3,
                title: "Statistical Analysis",
                duration: "48:20",
                videoUrl: "https://example.com/vid39",
              },
            ],
          },
          {
            id: 2,
            name: "Cybersecurity",
            description: "Protecting information systems",
            icon: "🔒",
            lectures: [
              {
                id: 4,
                title: "Network Security",
                duration: "55:45",
                videoUrl: "https://example.com/vid40",
              },
              {
                id: 5,
                title: "Cryptography",
                duration: "60:30",
                videoUrl: "https://example.com/vid41",
              },
            ],
          },
          {
            id: 3,
            name: "Digital Transformation",
            description: "Modernizing business processes",
            icon: "🔄",
            lectures: [
              {
                id: 6,
                title: "Digital Strategy",
                duration: "45:45",
                videoUrl: "https://example.com/vid42",
              },
              {
                id: 7,
                title: "Cloud Migration",
                duration: "54:10",
                videoUrl: "https://example.com/vid43",
              },
            ],
          },
        ],
      },
    },
  },
};
