import { Plus, Package, Truck, BarChart3, TrendingUp, AlertCircle, Building, FileText, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddBranchForm } from "@/components/forms/add-branch-form"
import { AddBatchForm } from "@/components/forms/add-batch-form"
import { QRGenerator } from "@/components/shared/qr-generator"
import { ProductionChart, DistributionChart } from "@/components/shared/analytics-charts"
import { AuditLogs } from "@/components/shared/audit-logs"
import { useState } from "react"

interface Branch {
  id: string
  name: string
  location: string
  manager: string
  status: 'active' | 'inactive'
}

interface DrugBatch {
  id: string
  drugName: string
  dosage: string
  quantity: number
  expiryDate: string
  manufacturingDate: string
  status: 'active' | 'distributed' | 'expired'
  manufacturer: string
}

export function ManufacturerDashboard() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: 'BR-001', name: 'Main Production', location: 'New York, NY', manager: 'John Smith', status: 'active' },
    { id: 'BR-002', name: 'Quality Control Lab', location: 'Boston, MA', manager: 'Sarah Johnson', status: 'active' }
  ])

  const [drugBatches, setDrugBatches] = useState<DrugBatch[]>([
    {
      id: 'PH-2024-001',
      drugName: 'Paracetamol',
      dosage: '500mg',
      quantity: 10000,
      expiryDate: '2025-12-31',
      manufacturingDate: '2024-01-15',
      status: 'active',
      manufacturer: 'PharmaCorp Ltd'
    },
    {
      id: 'PH-2024-002',
      drugName: 'Ibuprofen',
      dosage: '200mg',
      quantity: 5000,
      expiryDate: '2026-03-15',
      manufacturingDate: '2024-02-10',
      status: 'distributed',
      manufacturer: 'PharmaCorp Ltd'
    }
  ])

  // Distribution data
  const distributionData = [
    { id: 'DIST-001', product: 'Paracetamol 500mg', distributor: 'MedChain Logistics', quantity: 2500, status: 'In Transit', date: '2024-12-15' },
    { id: 'DIST-002', product: 'Ibuprofen 200mg', distributor: 'PharmaFlow', quantity: 1200, status: 'Delivered', date: '2024-12-14' },
    { id: 'DIST-003', product: 'Aspirin 75mg', distributor: 'SupplyLink', quantity: 800, status: 'Processing', date: '2024-12-13' }
  ]

  const handleBranchAdded = (newBranch: any) => {
    setBranches(prev => [...prev, {
      id: newBranch.id,
      name: newBranch.name,
      location: newBranch.location,
      manager: newBranch.manager,
      status: newBranch.status
    }])
  }

  const handleBatchAdded = (newBatch: any) => {
    setDrugBatches(prev => [...prev, {
      id: newBatch.id,
      drugName: newBatch.drugName,
      dosage: newBatch.dosage,
      quantity: newBatch.quantity,
      expiryDate: newBatch.expiryDate,
      manufacturingDate: newBatch.manufacturingDate,
      status: newBatch.status,
      manufacturer: newBatch.manufacturer
    }])
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturer Dashboard</h1>
          <p className="text-muted-foreground">Manage your drug production and distribution</p>
        </div>
        <div className="flex gap-2">
          <AddBranchForm onBranchAdded={handleBranchAdded} />
          <AddBatchForm 
            onBatchAdded={handleBatchAdded}
            trigger={
              <Button className="pharma-gradient text-primary-foreground hover:shadow-glow">
                <Plus className="mr-2 h-4 w-4" />
                Add New Batch
              </Button>
            }
          />
        </div>
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
            {drugBatches.slice(-3).map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{batch.drugName} {batch.dosage}</p>
                  <p className="text-xs text-muted-foreground">{batch.id} • {batch.quantity.toLocaleString()} units</p>
                  <p className="text-xs text-muted-foreground">Expires: {batch.expiryDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={batch.status === "active" ? "default" : batch.status === "distributed" ? "secondary" : "outline"}
                    className="capitalize"
                  >
                    {batch.status}
                  </Badge>
                  <QRGenerator 
                    data={{
                      batchId: batch.id,
                      drugName: `${batch.drugName} ${batch.dosage}`,
                      manufacturer: batch.manufacturer,
                      expiryDate: batch.expiryDate,
                      manufacturingDate: batch.manufacturingDate
                    }}
                    trigger={
                      <Button variant="outline" size="sm">
                        Generate QR
                      </Button>
                    }
                  />
                </div>
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

      {/* Branches Section */}
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Branches
          </CardTitle>
          <CardDescription>Manage production facilities and offices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{branch.id}</Badge>
                  <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                    {branch.status}
                  </Badge>
                </div>
                <h3 className="font-medium">{branch.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{branch.location}</p>
                <p className="text-xs text-muted-foreground mt-2">Manager: {branch.manager}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drug Batches Table */}
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Drug Batches
          </CardTitle>
          <CardDescription>Complete inventory of manufactured drug batches</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Drug Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drugBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.id}</TableCell>
                  <TableCell>{batch.drugName} {batch.dosage}</TableCell>
                  <TableCell>{batch.quantity.toLocaleString()} units</TableCell>
                  <TableCell>{batch.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={batch.status === "active" ? "default" : batch.status === "distributed" ? "secondary" : "outline"}>
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <QRGenerator 
                      data={{
                        batchId: batch.id,
                        drugName: `${batch.drugName} ${batch.dosage}`,
                        manufacturer: batch.manufacturer,
                        expiryDate: batch.expiryDate,
                        manufacturingDate: batch.manufacturingDate
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Distribution Table */}
      <Card className="blockchain-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Distribution Records
          </CardTitle>
          <CardDescription>Track distributed products and shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distribution ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Distributor</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionData.map((dist) => (
                <TableRow key={dist.id}>
                  <TableCell className="font-medium">{dist.id}</TableCell>
                  <TableCell>{dist.product}</TableCell>
                  <TableCell>{dist.distributor}</TableCell>
                  <TableCell>{dist.quantity.toLocaleString()} units</TableCell>
                  <TableCell>
                    <Badge variant={dist.status === "Delivered" ? "default" : dist.status === "In Transit" ? "secondary" : "outline"}>
                      {dist.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dist.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProductionChart />
        <DistributionChart />
      </div>

      {/* Audit Logs */}
      <AuditLogs />
    </div>
  )
}