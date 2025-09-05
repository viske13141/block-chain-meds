import { useState } from "react"
import { Eye, EyeOff, Shield, Building, Store, User, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/types/user"
import { useToast } from "@/hooks/use-toast"

const roleConfig = {
  manufacturer: {
    icon: Building,
    label: "Manufacturer",
    description: "Pharmaceutical companies and drug producers"
  },
  distributor: {
    icon: Shield,
    label: "Distributor",
    description: "Supply chain and logistics partners"
  },
  retailer: {
    icon: Store,
    label: "Retailer / Pharmacy",
    description: "Pharmacies and retail medicine outlets"
  },
  customer: {
    icon: User,
    label: "Customer / Patient",
    description: "End consumers and patients"
  },
  regulator: {
    icon: FileCheck,
    label: "Regulator / Authority",
    description: "Government and regulatory bodies"
  }
}

interface LoginFormProps {
  onToggleMode: () => void
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "" as UserRole | "",
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.role) {
      toast({
        title: "Role Required",
        description: "Please select your role to continue",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      await login({
        email: formData.email,
        password: formData.password,
        role: formData.role as UserRole,
        rememberMe: formData.rememberMe
      })
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in."
      })
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="blockchain-card w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold bg-gradient-pharma bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your pharma supply chain account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Your Role</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose your role..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <SelectItem key={key} value={key} className="h-16 py-3">
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-accent" />
                        <div className="flex flex-col">
                          <span className="font-medium">{config.label}</span>
                          <span className="text-xs text-muted-foreground">{config.description}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="h-12 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rememberMe: !!checked }))}
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me for 30 days
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 pharma-gradient text-primary-foreground font-medium hover:shadow-glow transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <Button variant="link" className="text-sm text-accent hover:text-accent-glow">
            Forgot your password?
          </Button>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-accent hover:text-accent-glow font-medium"
              onClick={onToggleMode}
            >
              Sign up here
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}