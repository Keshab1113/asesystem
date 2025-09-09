"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, AuthState } from "./types"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, "id" | "createdAt" | "isVerified">) => Promise<boolean>
  verifyOTP: (email: string, otp: string) => Promise<boolean>
  updateProfile: (userData: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("quiz-user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch (error) {
        localStorage.removeItem("quiz-user")
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const register = async (userData: Omit<User, "id" | "createdAt" | "isVerified">): Promise<boolean> => {
    try {
      // Mock registration - in real app, this would call an API
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        isVerified: false,
      }

      // Store pending user for OTP verification
      localStorage.setItem("pending-user", JSON.stringify(newUser))
      return true
    } catch (error) {
      return false
    }
  }

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
      // Mock OTP verification - in real app, this would verify with backend
      const pendingUser = localStorage.getItem("pending-user")
      if (pendingUser && otp === "123456") {
        // Mock OTP
        const user = JSON.parse(pendingUser)
        user.isVerified = true
        localStorage.setItem("quiz-user", JSON.stringify(user))
        localStorage.removeItem("pending-user")

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in real app, this would authenticate with backend
      const storedUser = localStorage.getItem("quiz-user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        if (user.email === email && user.isVerified) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }
      }
      return false
    } catch (error) {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("quiz-user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (authState.user) {
        const updatedUser = { ...authState.user, ...userData }
        localStorage.setItem("quiz-user", JSON.stringify(updatedUser))
        setAuthState((prev) => ({
          ...prev,
          user: updatedUser,
        }))
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        register,
        verifyOTP,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
