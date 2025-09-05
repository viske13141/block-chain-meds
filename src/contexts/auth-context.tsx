import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, AuthState, LoginCredentials, RegisterCredentials } from "@/types/user"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("pharma-user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        localStorage.removeItem("pharma-user")
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user: User = {
      id: "user-" + Date.now(),
      email: credentials.email,
      name: credentials.email.split("@")[0],
      role: credentials.role,
      verified: true,
      twoFactorEnabled: false,
      company: credentials.role === "customer" ? undefined : "Demo Company"
    }

    localStorage.setItem("pharma-user", JSON.stringify(user))
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const register = async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user: User = {
      id: "user-" + Date.now(),
      email: credentials.email,
      name: credentials.name,
      role: credentials.role,
      verified: false,
      twoFactorEnabled: false,
      company: credentials.company
    }

    localStorage.setItem("pharma-user", JSON.stringify(user))
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    })
  }

  const logout = () => {
    localStorage.removeItem("pharma-user")
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return
    
    const updatedUser = { ...authState.user, ...userData }
    localStorage.setItem("pharma-user", JSON.stringify(updatedUser))
    setAuthState(prev => ({
      ...prev,
      user: updatedUser,
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}