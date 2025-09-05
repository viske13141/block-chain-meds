import { Scan, History, Shield, AlertTriangle, CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
          <p className="text-muted-foreground">Verify drug authenticity and track your purchases</p>
        </div>
        <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
          <Scan className="mr-2 h-4 w-4" />
          Scan Drug
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5 text-accent" />
              Drug Verification
            </CardTitle>
            <CardDescription>
              Scan QR code or enter batch ID to verify authenticity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch-id">Batch ID or QR Code</Label>
              <Input 
                id="batch-id"
                placeholder="Enter batch ID (e.g., PH-2024-001)"
                className="h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-gradient-pharma text-primary-foreground">
                Verify Drug
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Scan className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="blockchain-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security Status
            </CardTitle>
            <CardDescription>
              Your account and verification status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Account Verified</span>
              </div>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Verifications Today</span>
              </div>
              <Badge variant="secondary">5</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Verifications */}
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle>Recent Verifications</CardTitle>
          <CardDescription>Your latest drug authenticity checks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: "PH-2024-001", 
                drug: "Paracetamol 500mg", 
                manufacturer: "PharmaCorp Ltd", 
                date: "2 hours ago", 
                status: "verified",
                expiry: "Dec 2025"
              },
              { 
                id: "PH-2024-045", 
                drug: "Ibuprofen 200mg", 
                manufacturer: "MediGen Inc", 
                date: "1 day ago", 
                status: "verified",
                expiry: "Mar 2026"
              },
              { 
                id: "PH-2024-089", 
                drug: "Aspirin 75mg", 
                manufacturer: "HealthPharma", 
                date: "3 days ago", 
                status: "flagged",
                expiry: "Jan 2025"
              },
            ].map((verification) => (
              <div key={verification.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    verification.status === "verified" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {verification.status === "verified" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{verification.drug}</p>
                    <p className="text-xs text-muted-foreground">
                      {verification.id} • {verification.manufacturer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {verification.expiry} • {verification.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={verification.status === "verified" ? "default" : "destructive"}
                    className="mb-2"
                  >
                    {verification.status === "verified" ? "Authentic" : "Flagged"}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="blockchain-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-pharma flex items-center justify-center">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold">47</div>
            <p className="text-sm text-muted-foreground">Drugs Verified</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-sm text-muted-foreground">Authentic Drugs</p>
          </CardContent>
        </Card>

        <Card className="blockchain-card text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Issues Reported</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}