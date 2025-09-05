import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Store, 
  Users, 
  FileCheck, 
  QrCode,
  BarChart3,
  History,
  Settings,
  Shield,
  Scan,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/types/user"

const menuItems: Record<UserRole, Array<{
  title: string
  url: string
  icon: typeof LayoutDashboard
  badge?: string
}>> = {
  manufacturer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Add Drug Batch", url: "/add-batch", icon: Package },
    { title: "My Batches", url: "/batches", icon: QrCode },
    { title: "Distribution", url: "/distribution", icon: Truck },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Audit Log", url: "/audit", icon: History },
  ],
  distributor: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Receive Drugs", url: "/receive", icon: Package },
    { title: "Inventory", url: "/inventory", icon: Store },
    { title: "Shipments", url: "/shipments", icon: Truck },
    { title: "Track & Trace", url: "/tracking", icon: BarChart3 },
    { title: "Temperature Logs", url: "/temperature", icon: AlertTriangle },
  ],
  retailer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Verify Drugs", url: "/verify", icon: CheckCircle },
    { title: "Inventory", url: "/inventory", icon: Store },
    { title: "Sales", url: "/sales", icon: BarChart3 },
    { title: "QR Generator", url: "/qr-generator", icon: QrCode },
    { title: "Customers", url: "/customers", icon: Users },
  ],
  customer: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Scan Drug", url: "/scan", icon: Scan },
    { title: "My Purchases", url: "/purchases", icon: Package },
    { title: "Verification History", url: "/history", icon: History },
    { title: "Report Issue", url: "/report", icon: AlertTriangle },
  ],
  regulator: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Supply Chain Monitor", url: "/monitor", icon: BarChart3 },
    { title: "Compliance Reports", url: "/compliance", icon: FileCheck },
    { title: "Audit Records", url: "/audit", icon: History },
    { title: "Violations", url: "/violations", icon: AlertTriangle, badge: "4" },
    { title: "Settings", url: "/settings", icon: Settings },
  ]
}

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const { user } = useAuth()
  
  if (!user) return null

  const currentPath = location.pathname
  const userMenuItems = menuItems[user.role] || []
  const isCollapsed = state === "collapsed"
  
  const isActive = (path: string) => currentPath === path
  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-r-2 border-sidebar-primary" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="py-4">
        {/* Branding */}
        {!isCollapsed && (
          <div className="px-6 mb-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-sidebar-primary" />
              <span className="text-lg font-semibold text-sidebar-foreground">
                PharmaChain
              </span>
            </div>
            <p className="text-xs text-sidebar-foreground/60 mt-1">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
            </p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {userMenuItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-11">
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="flex items-center justify-between flex-1">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Info at Bottom */}
        {!isCollapsed && (
          <div className="mt-auto px-6 py-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-pharma flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.company || user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}