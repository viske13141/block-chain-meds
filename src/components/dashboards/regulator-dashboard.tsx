import { FileCheck, AlertTriangle, BarChart3, Shield, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function RegulatorDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Regulator Dashboard</h1>
          <p className="text-muted-foreground">Monitor supply chain compliance and safety</p>
        </div>
        <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
          <FileCheck className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-success" />
              +2.1% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Entities</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audits Completed</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Violations & Compliance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Recent Violations</CardTitle>
            <CardDescription>Non-compliance issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                entity: "PharmaCorp Ltd",
                type: "Temperature Breach",
                severity: "High",
                date: "2 hours ago",
                batch: "PH-2024-089"
              },
              {
                entity: "MediGen Inc",
                type: "Documentation Missing",
                severity: "Medium",
                date: "1 day ago",
                batch: "MG-2024-156"
              },
              {
                entity: "HealthPharma",
                type: "Chain of Custody",
                severity: "Low",
                date: "2 days ago",
                batch: "HP-2024-234"
              },
            ].map((violation, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{violation.entity}</p>
                  <p className="text-xs text-muted-foreground">{violation.type} • {violation.batch}</p>
                  <p className="text-xs text-muted-foreground">{violation.date}</p>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={violation.severity === "High" ? "destructive" : 
                            violation.severity === "Medium" ? "secondary" : "outline"}
                    className="mb-2"
                  >
                    {violation.severity}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>Overall system health and compliance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Manufacturing Compliance</span>
                <span className="font-medium">98.2%</span>
              </div>
              <Progress value={98.2} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Distribution Compliance</span>
                <span className="font-medium">96.8%</span>
              </div>
              <Progress value={96.8} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Retail Compliance</span>
                <span className="font-medium">94.5%</span>
              </div>
              <Progress value={94.5} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Documentation Completeness</span>
                <span className="font-medium">99.1%</span>
              </div>
              <Progress value={99.1} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription>Recent regulatory activities and blockchain transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Batch Verification", entity: "PharmaCorp Ltd", timestamp: "2024-01-15 14:30", txHash: "0x1a2b3c...", status: "Verified" },
              { action: "Compliance Check", entity: "MedChain Logistics", timestamp: "2024-01-15 13:45", txHash: "0x4d5e6f...", status: "Passed" },
              { action: "Violation Report", entity: "HealthPharma", timestamp: "2024-01-15 12:20", txHash: "0x7g8h9i...", status: "Flagged" },
              { action: "License Renewal", entity: "PharmaFlow", timestamp: "2024-01-15 11:10", txHash: "0xaj2bk3...", status: "Approved" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.entity}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp} • TX: {activity.txHash}
                  </p>
                </div>
                <Badge 
                  variant={activity.status === "Verified" || activity.status === "Passed" || activity.status === "Approved" ? "default" : 
                          activity.status === "Flagged" ? "destructive" : "secondary"}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}