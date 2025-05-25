"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  updateUser: (data: Partial<User>) => Promise<{ success: boolean; message: string }>
}

interface RegisterData {
  email: string
  password: string
  name: string
  role: "customer" | "seller"
  storeName?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        await checkAuth()
      }

      return data
    } catch (error) {
      return { success: false, message: "로그인에 실패했습니다." }
    }
  }

  const register = async (registerData: RegisterData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        await checkAuth()
      }

      return data
    } catch (error) {
      return { success: false, message: "회원가입에 실패했습니다." }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const updateUser = async (data: Partial<User>) => {
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setUser(result.user)
        await checkAuth()
      }

      return result
    } catch (error) {
      return { success: false, message: "프로필 업데이트에 실패했습니다." }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
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
