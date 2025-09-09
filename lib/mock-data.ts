import type { Assessment, UserAssessment } from "./types"

export const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and objects.",
    duration: 45,
    totalQuestions: 20,
    passingScore: 70,
    scheduledDate: new Date("2024-01-15T09:00:00"),
    endDate: new Date("2024-01-15T10:00:00"),
    status: "upcoming",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "React Development",
    description: "Advanced React concepts including hooks, context, and performance optimization.",
    duration: 60,
    totalQuestions: 25,
    passingScore: 75,
    scheduledDate: new Date("2024-01-10T14:00:00"),
    endDate: new Date("2024-01-10T15:30:00"),
    status: "completed",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "3",
    title: "Database Design",
    description: "SQL queries, database normalization, and performance optimization.",
    duration: 90,
    totalQuestions: 30,
    passingScore: 80,
    scheduledDate: new Date("2024-01-20T10:00:00"),
    endDate: new Date("2024-01-20T11:30:00"),
    status: "upcoming",
    createdAt: new Date("2024-01-01"),
  },
]

export const mockUserAssessments: UserAssessment[] = [
  {
    id: "1",
    userId: "user1",
    assessmentId: "1",
    status: "assigned",
  },
  {
    id: "2",
    userId: "user1",
    assessmentId: "2",
    score: 85,
    passed: true,
    completedAt: new Date("2024-01-10T15:25:00"),
    status: "completed",
  },
  {
    id: "3",
    userId: "user1",
    assessmentId: "3",
    status: "assigned",
  },
]
