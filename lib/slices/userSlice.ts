import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UserData {
  id: number
  name: string
  email: string
  role: string
  companyId?: number
  createdAt: string
  lastLogin?: string
}

interface UserState {
  users: UserData[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload
      state.loading = false
      state.error = null
    },
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<{ id: number; data: Partial<UserData> }>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.data }
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
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

export const { setUsers, addUser, updateUser, deleteUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
