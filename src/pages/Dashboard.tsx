import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ManufacturerDashboard } from "@/components/dashboards/manufacturer-dashboard"
import { DistributorDashboard } from "@/components/dashboards/distributor-dashboard"
import { RetailerDashboard } from "@/components/dashboards/retailer-dashboard"
import { CustomerDashboard } from "@/components/dashboards/customer-dashboard"
import { RegulatorDashboard } from "@/components/dashboards/regulator-dashboard"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (!user) {
    return null // This should be handled by routing
  }

  const getDashboardComponent = () => {
    switch (user.role) {
      case "manufacturer":
        return <ManufacturerDashboard />
      case "distributor":
        return <DistributorDashboard />
      case "retailer":
        return <RetailerDashboard />
      case "customer":
        return <CustomerDashboard />
      case "regulator":
        return <RegulatorDashboard />
      default:
        return <div>Invalid role</div>
    }
  }

  return (
    <DashboardLayout>
      {getDashboardComponent()}
    </DashboardLayout>
  )
}