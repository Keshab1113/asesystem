import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  subjectId: number
}

interface Quiz {
  id: number
  title: string
  description: string
  subjectId: number
  questions: Question[]
  timeLimit: number
  passingScore: number
  isActive: boolean
  createdAt: string
}

interface QuizState {
  quizzes: Quiz[]
  questions: Question[]
  loading: boolean
  error: string | null
}

const initialState: QuizState = {
  quizzes: [],
  questions: [],
  loading: false,
  error: null,
}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload
      state.loading = false
      state.error = null
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload)
    },
    updateQuiz: (state, action: PayloadAction<{ id: number; data: Partial<Quiz> }>) => {
      const index = state.quizzes.findIndex((quiz) => quiz.id === action.payload.id)
      if (index !== -1) {
        state.quizzes[index] = { ...state.quizzes[index], ...action.payload.data }
      }
    },
    deleteQuiz: (state, action: PayloadAction<number>) => {
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload)
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload
    },
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setQuizzes, addQuiz, updateQuiz, deleteQuiz, setQuestions, addQuestion, setLoading, setError } =
  quizSlice.actions
export default quizSlice.reducer
