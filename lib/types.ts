export interface User {
  id: string
  fullName: string
  position: string
  employeeId: string
  email: string
  profilePicture?: string
  language: "en" | "ar"
  createdAt: Date
  isVerified: boolean
  controllingTeam:string
  group:string
}

export interface Assessment {
  id: string
  title: string
  description: string
  duration: number // in minutes
  totalQuestions: number
  passingScore: number
  scheduledDate: Date
  endDate: Date
  status: "upcoming" | "active" | "completed"
  createdAt: Date
}

export interface UserAssessment {
  id: string
  userId: string
  assessmentId: string
  score?: number
  passed?: boolean
  completedAt?: Date
  status: "assigned" | "in-progress" | "completed"
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
