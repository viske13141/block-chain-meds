import { useState } from "react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QRData {
  batchId: string
  drugName: string
  manufacturer: string
  expiryDate: string
  manufacturingDate: string
  dosage?: string
  ingredients?: string[]
}

interface QRGeneratorProps {
  data: QRData
  trigger?: React.ReactNode
}

export function QRGenerator({ data, trigger }: QRGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const qrValue = JSON.stringify({
    id: data.batchId,
    drug: data.drugName,
    mfg: data.manufacturer,
    exp: data.expiryDate,
    mfd: data.manufacturingDate,
    dosage: data.dosage,
    ingredients: data.ingredients,
    verified: true,
    timestamp: Date.now()
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue)
    toast({
      title: "Copied!",
      description: "QR data copied to clipboard",
    })
  }

  const downloadQR = () => {
    const svg = document.querySelector('#qr-code-svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = `QR-${data.batchId}.png`
        downloadLink.href = pngFile
        downloadLink.click()
      }
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
    
    toast({
      title: "Downloaded!",
      description: "QR code saved as PNG",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="pharma-gradient text-primary-foreground">
            Generate QR
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Drug Batch QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center p-4 bg-white rounded-lg border">
            <QRCode
              id="qr-code-svg"
              value={qrValue}
              size={200}
              level="H"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Batch ID:</span>
              <Badge variant="outline">{data.batchId}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Drug:</span>
              <span>{data.drugName}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Manufacturer:</span>
              <span>{data.manufacturer}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Expiry:</span>
              <span>{data.expiryDate}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} variant="outline" className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              Copy Data
            </Button>
            <Button onClick={downloadQR} variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}