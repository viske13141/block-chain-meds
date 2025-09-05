import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Scan, Camera, Type, CheckCircle2, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ScannedData {
  id: string
  drug: string
  mfg: string
  exp: string
  mfd: string
  dosage?: string
  ingredients?: string[]
  verified: boolean
  timestamp: number
}

interface QRScannerProps {
  onScanResult?: (data: ScannedData | null) => void
  trigger?: React.ReactNode
}

export function QRScanner({ onScanResult, trigger }: QRScannerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual')
  const [manualInput, setManualInput] = useState("")
  const [scannedData, setScannedData] = useState<ScannedData | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  // Dummy verification function
  const verifyBatch = (input: string): ScannedData | null => {
    try {
      // Try to parse as JSON (QR code data)
      const parsed = JSON.parse(input)
      return parsed as ScannedData
    } catch {
      // Treat as batch ID and return dummy data
      if (input.length > 3) {
        return {
          id: input,
          drug: "Paracetamol 500mg",
          mfg: "PharmaCorp Ltd",
          exp: "2025-12-31",
          mfd: "2024-01-15",
          dosage: "500mg",
          ingredients: ["Paracetamol", "Microcrystalline Cellulose", "Starch"],
          verified: Math.random() > 0.2, // 80% success rate
          timestamp: Date.now()
        }
      }
      return null
    }
  }

  const handleManualVerify = () => {
    if (!manualInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a batch ID or QR data",
        variant: "destructive"
      })
      return
    }

    const result = verifyBatch(manualInput)
    setScannedData(result)
    onScanResult?.(result)

    if (result) {
      toast({
        title: result.verified ? "Verification Successful" : "Verification Failed",
        description: result.verified ? "Drug batch is authentic" : "Potential counterfeit detected",
        variant: result.verified ? "default" : "destructive"
      })
    } else {
      toast({
        title: "Invalid Input",
        description: "Unable to verify the provided data",
        variant: "destructive"
      })
    }
  }

  const startCamera = async () => {
    setIsScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please use manual input.",
        variant: "destructive"
      })
      setScanMode('manual')
      setIsScanning(false)
    }
  }

  const stopCamera = () => {
    setIsScanning(false)
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const simulateScan = () => {
    // Simulate successful scan with dummy data
    const dummyData: ScannedData = {
      id: "PH-2024-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      drug: "Ibuprofen 200mg",
      mfg: "MediGen Inc",
      exp: "2026-03-15",
      mfd: "2024-02-10",
      dosage: "200mg",
      ingredients: ["Ibuprofen", "Lactose", "Corn Starch"],
      verified: true,
      timestamp: Date.now()
    }
    
    setScannedData(dummyData)
    onScanResult?.(dummyData)
    stopCamera()
    
    toast({
      title: "QR Code Scanned!",
      description: "Drug verification successful",
    })
  }

  useEffect(() => {
    if (scanMode === 'camera' && isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => stopCamera()
  }, [scanMode, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="pharma-gradient text-primary-foreground">
            <Scan className="h-4 w-4 mr-2" />
            Scan QR Code
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Drug Authenticity</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant={scanMode === 'manual' ? 'default' : 'outline'}
              onClick={() => setScanMode('manual')}
              className="flex-1"
            >
              <Type className="h-4 w-4 mr-2" />
              Manual Input
            </Button>
            <Button 
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              onClick={() => setScanMode('camera')}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Camera Scan
            </Button>
          </div>

          {scanMode === 'manual' ? (
            <div className="space-y-3">
              <div>
                <Label htmlFor="batch-input">Batch ID or QR Data</Label>
                <Input 
                  id="batch-input"
                  placeholder="Enter batch ID (e.g., PH-2024-001)"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleManualVerify} className="w-full">
                Verify Batch
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative bg-black rounded-lg aspect-square overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-primary/50 rounded-lg">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-accent rounded-lg"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={simulateScan} className="flex-1">
                  Simulate Scan
                </Button>
                <Button onClick={() => setScanMode('manual')} variant="outline">
                  Use Manual Input
                </Button>
              </div>
            </div>
          )}

          {scannedData && (
            <div className={`p-4 rounded-lg border-2 ${
              scannedData.verified 
                ? 'bg-success/10 border-success/20' 
                : 'bg-destructive/10 border-destructive/20'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {scannedData.verified ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">
                  {scannedData.verified ? 'Authentic Drug' : 'Verification Failed'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Batch ID:</span>
                  <Badge variant="outline">{scannedData.id}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Drug:</span>
                  <span>{scannedData.drug}</span>
                </div>
                <div className="flex justify-between">
                  <span>Manufacturer:</span>
                  <span>{scannedData.mfg}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expiry Date:</span>
                  <span>{scannedData.exp}</span>
                </div>
                {scannedData.dosage && (
                  <div className="flex justify-between">
                    <span>Dosage:</span>
                    <span>{scannedData.dosage}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}