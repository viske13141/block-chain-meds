import { Store, Scan, Users, Package, CheckCircle2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RetailerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retailer Dashboard</h1>
          <p className="text-muted-foreground">Manage pharmacy inventory and customer sales</p>
        </div>
        <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
          <Scan className="mr-2 h-4 w-4" />
          Verify Drug
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Sales</CardTitle>
            <Store className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Drugs</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Authenticated today</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,289</div>
            <p className="text-xs text-muted-foreground">In stock</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Served</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest customer transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                customer: "John Smith", 
                drug: "Paracetamol 500mg", 
                qty: "1 box", 
                amount: "$12.50",
                time: "2 min ago",
                verified: true
              },
              { 
                customer: "Maria Garcia", 
                drug: "Ibuprofen 200mg", 
                qty: "2 boxes", 
                amount: "$18.75",
                time: "15 min ago",
                verified: true
              },
              { 
                customer: "David Johnson", 
                drug: "Aspirin 75mg", 
                qty: "1 box", 
                amount: "$8.99",
                time: "32 min ago",
                verified: true
              },
            ].map((sale, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.drug} • {sale.qty}</p>
                  <p className="text-xs text-muted-foreground">{sale.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{sale.amount}</p>
                  <Badge variant={sale.verified ? "default" : "secondary"} className="text-xs">
                    {sale.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring restock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { drug: "Paracetamol 500mg", current: 5, reorder: 50, supplier: "PharmaCorp" },
              { drug: "Vitamin D3", current: 12, reorder: 100, supplier: "HealthVit" },
              { drug: "Cough Syrup", current: 8, reorder: 25, supplier: "MediGen" },
            ].map((item, index) => (
              <div key={index} className="space-y-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{item.drug}</p>
                  <Badge variant="outline" className="text-warning border-warning">
                    Low Stock
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Current: {item.current} units • Reorder: {item.reorder} units</p>
                  <p>Supplier: {item.supplier}</p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Reorder Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="blockchain-card text-center cursor-pointer hover:shadow-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-pharma flex items-center justify-center">
              <Scan className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-medium mb-2">Verify Drug</h3>
            <p className="text-sm text-muted-foreground">Scan QR code to verify authenticity</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card text-center cursor-pointer hover:shadow-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <Package className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-medium mb-2">Manage Inventory</h3>
            <p className="text-sm text-muted-foreground">Update stock levels and pricing</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card text-center cursor-pointer hover:shadow-glow transition-all duration-300">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-success" />
            </div>
            <h3 className="font-medium mb-2">Customer Records</h3>
            <p className="text-sm text-muted-foreground">View purchase history and preferences</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}