export type UserRole = 
  | "manufacturer" 
  | "distributor" 
  | "retailer" 
  | "customer" 
  | "regulator"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  company?: string
  verified: boolean
  twoFactorEnabled: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  role: UserRole
  rememberMe?: boolean
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  company?: string
  confirmPassword: string
}