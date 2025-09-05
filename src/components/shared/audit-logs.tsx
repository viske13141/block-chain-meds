import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, User, Package, Truck, Shield, AlertTriangle, CheckCircle2, FileText } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: Date
  action: string
  entity: string
  entityId: string
  user: string
  role: string
  status: 'success' | 'warning' | 'error' | 'info'
  details: string
  ipAddress?: string
}

// Dummy audit log data
const auditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    action: 'Batch Created',
    entity: 'Drug Batch',
    entityId: 'PH-2024-001',
    user: 'John Smith',
    role: 'Manufacturer',
    status: 'success',
    details: 'New batch of Paracetamol 500mg created with 10,000 units',
    ipAddress: '192.168.1.10'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    action: 'QR Code Generated',
    entity: 'Drug Batch',
    entityId: 'PH-2024-001',
    user: 'John Smith',
    role: 'Manufacturer',
    status: 'success',
    details: 'QR code generated for batch verification',
    ipAddress: '192.168.1.10'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    action: 'Shipment Created',
    entity: 'Shipment',
    entityId: 'SH-2024-045',
    user: 'Sarah Johnson',
    role: 'Distributor',
    status: 'success',
    details: 'Shipment to MediMart Pharmacy containing 5 batches',
    ipAddress: '192.168.1.25'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    action: 'Temperature Alert',
    entity: 'Shipment',
    entityId: 'SH-2024-042',
    user: 'System Monitor',
    role: 'System',
    status: 'warning',
    details: 'Temperature exceeded threshold: 9.1°C (limit: 8°C)',
    ipAddress: 'System'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    action: 'Drug Verification',
    entity: 'Drug Batch',
    entityId: 'PH-2024-038',
    user: 'Alice Brown',
    role: 'Customer',
    status: 'success',
    details: 'Drug authenticity verified via QR scan',
    ipAddress: '192.168.1.155'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 75),
    action: 'Compliance Report',
    entity: 'Report',
    entityId: 'RPT-2024-003',
    user: 'Dr. Michael Wilson',
    role: 'Regulator',
    status: 'info',
    details: 'Monthly compliance report generated for all manufacturers',
    ipAddress: '192.168.1.200'
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    action: 'Authentication Failed',
    entity: 'User Login',
    entityId: 'user-456',
    user: 'Unknown',
    role: 'Unknown',
    status: 'error',
    details: 'Multiple failed login attempts detected',
    ipAddress: '192.168.1.999'
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    action: 'Branch Added',
    entity: 'Branch',
    entityId: 'BR-001234',
    user: 'John Smith',
    role: 'Manufacturer',
    status: 'success',
    details: 'New branch office established in New York',
    ipAddress: '192.168.1.10'
  }
]

const getStatusIcon = (status: AuditLog['status']) => {
  switch (status) {
    case 'success':
      return <CheckCircle2 className="h-4 w-4 text-success" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />
    case 'error':
      return <AlertTriangle className="h-4 w-4 text-destructive" />
    case 'info':
    default:
      return <FileText className="h-4 w-4 text-accent" />
  }
}

const getEntityIcon = (entity: string) => {
  switch (entity) {
    case 'Drug Batch':
      return <Package className="h-4 w-4" />
    case 'Shipment':
      return <Truck className="h-4 w-4" />
    case 'User Login':
      return <User className="h-4 w-4" />
    case 'Report':
      return <FileText className="h-4 w-4" />
    case 'Branch':
      return <Shield className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const hours = Math.floor(diffInMinutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface AuditLogsProps {
  title?: string
  description?: string
  maxHeight?: string
  showExport?: boolean
}

export function AuditLogs({ 
  title = "Audit Logs", 
  description = "System activity and user actions", 
  maxHeight = "400px",
  showExport = true 
}: AuditLogsProps) {

  return (
    <Card className="blockchain-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showExport && (
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(log.status)}
                  {getEntityIcon(log.entity)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{log.action}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.entityId}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {log.details}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{log.user} ({log.role})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(log.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant={
                    log.status === 'success' ? 'default' :
                    log.status === 'warning' ? 'secondary' :
                    log.status === 'error' ? 'destructive' : 'outline'
                  }
                  className="text-xs"
                >
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}