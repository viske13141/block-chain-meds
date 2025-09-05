import { Truck, Package, Thermometer, MapPin, BarChart3, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function DistributorDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Distributor Dashboard</h1>
          <p className="text-muted-foreground">Manage drug distribution and shipment tracking</p>
        </div>
        <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
          <Truck className="mr-2 h-4 w-4" />
          New Shipment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Received Batches</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Pending verification</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature Alerts</CardTitle>
            <Thermometer className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">On-time deliveries</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Shipments */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Active Shipments</CardTitle>
            <CardDescription>Real-time tracking of drug shipments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                id: "SH-2024-001", 
                destination: "MediMart Pharmacy", 
                eta: "2 hours", 
                progress: 75,
                temp: "2-8°C",
                status: "In Transit"
              },
              { 
                id: "SH-2024-002", 
                destination: "HealthPlus Store", 
                eta: "Tomorrow", 
                progress: 30,
                temp: "Room Temp",
                status: "Processing"
              },
              { 
                id: "SH-2024-003", 
                destination: "City Hospital", 
                eta: "Delivered", 
                progress: 100,
                temp: "2-8°C",
                status: "Delivered"
              },
            ].map((shipment) => (
              <div key={shipment.id} className="space-y-3 p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{shipment.destination}</p>
                    <p className="text-xs text-muted-foreground">{shipment.id}</p>
                  </div>
                  <Badge variant={shipment.status === "Delivered" ? "default" : "secondary"}>
                    {shipment.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>ETA: {shipment.eta}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-3 w-3" />
                    <span>{shipment.temp}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{shipment.progress}%</span>
                  </div>
                  <Progress value={shipment.progress} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Temperature Monitoring</CardTitle>
            <CardDescription>Cold chain integrity tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { truck: "Truck A-001", temp: "3.2°C", status: "normal", location: "Highway 101" },
              { truck: "Truck B-002", temp: "9.1°C", status: "warning", location: "City Center" },
              { truck: "Truck C-003", temp: "2.8°C", status: "normal", location: "Loading Bay" },
            ].map((monitor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{monitor.truck}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{monitor.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    monitor.status === "warning" ? "text-warning" : "text-success"
                  }`}>
                    {monitor.temp}
                  </div>
                  <Badge variant={monitor.status === "warning" ? "destructive" : "secondary"} className="text-xs">
                    {monitor.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}