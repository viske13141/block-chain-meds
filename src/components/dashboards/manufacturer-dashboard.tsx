import { Plus, Package, Truck, BarChart3, TrendingUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ManufacturerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturer Dashboard</h1>
          <p className="text-muted-foreground">Manage your drug production and distribution</p>
        </div>
        <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add New Batch
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Distributions</CardTitle>
            <Truck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +5% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (This Month)</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48.2K</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground mt-1">
              Expiring batches requiring attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Recent Batches</CardTitle>
            <CardDescription>Latest drug batches created</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "PH-2024-001", drug: "Paracetamol", qty: "10,000 tablets", date: "2 hours ago", status: "active" },
              { id: "PH-2024-002", drug: "Ibuprofen", qty: "5,000 tablets", date: "5 hours ago", status: "distributed" },
              { id: "PH-2024-003", drug: "Aspirin", qty: "8,000 tablets", date: "1 day ago", status: "verified" },
            ].map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{batch.drug}</p>
                  <p className="text-xs text-muted-foreground">{batch.id} • {batch.qty}</p>
                  <p className="text-xs text-muted-foreground">{batch.date}</p>
                </div>
                <Badge 
                  variant={batch.status === "active" ? "default" : batch.status === "distributed" ? "secondary" : "outline"}
                  className="capitalize"
                >
                  {batch.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Distribution Status</CardTitle>
            <CardDescription>Real-time tracking of drug distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { distributor: "MedChain Logistics", batches: 12, status: "In Transit", progress: 65 },
              { distributor: "PharmaFlow", batches: 8, status: "Delivered", progress: 100 },
              { distributor: "SupplyLink", batches: 5, status: "Processing", progress: 25 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.distributor}</p>
                    <p className="text-xs text-muted-foreground">{item.batches} batches</p>
                  </div>
                  <Badge variant={item.status === "Delivered" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-pharma transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}