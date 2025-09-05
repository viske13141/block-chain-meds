import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShipmentData {
  id: string
  destination: string
  address: string
  batches: string[]
  carrier: string
  vehicleId: string
  driverName: string
  driverPhone: string
  estimatedDelivery: string
  priority: 'low' | 'medium' | 'high'
  specialInstructions: string
  status: 'pending' | 'in-transit' | 'delivered'
  createdAt: Date
}

interface ShipmentFormProps {
  onShipmentAdded?: (shipment: ShipmentData) => void
  trigger?: React.ReactNode
}

export function ShipmentForm({ onShipmentAdded, trigger }: ShipmentFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    address: '',
    batches: '',
    carrier: '',
    vehicleId: '',
    driverName: '',
    driverPhone: '',
    estimatedDelivery: '',
    priority: '',
    specialInstructions: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.destination || !formData.address || !formData.batches) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const shipmentId = 'SH-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    const newShipment: ShipmentData = {
      id: shipmentId,
      destination: formData.destination,
      address: formData.address,
      batches: formData.batches.split(',').map(b => b.trim()).filter(Boolean),
      carrier: formData.carrier || 'PharmaLogistics Inc',
      vehicleId: formData.vehicleId || 'PL-' + Math.floor(Math.random() * 1000),
      driverName: formData.driverName || 'John Doe',
      driverPhone: formData.driverPhone || '+1-555-0123',
      estimatedDelivery: formData.estimatedDelivery,
      priority: (formData.priority as any) || 'medium',
      specialInstructions: formData.specialInstructions,
      status: 'pending',
      createdAt: new Date()
    }

    onShipmentAdded?.(newShipment)
    
    // Reset form
    setFormData({
      destination: '',
      address: '',
      batches: '',
      carrier: '',
      vehicleId: '',
      driverName: '',
      driverPhone: '',
      estimatedDelivery: '',
      priority: '',
      specialInstructions: ''
    })
    
    setIsOpen(false)
    
    toast({
      title: "Success!",
      description: `Shipment ${shipmentId} created successfully`,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="pharma-gradient text-primary-foreground">
            <Truck className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              placeholder="Enter destination name"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter full delivery address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batches">Batch IDs *</Label>
            <Textarea
              id="batches"
              placeholder="Enter batch IDs separated by commas"
              value={formData.batches}
              onChange={(e) => handleInputChange('batches', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Select value={formData.carrier} onValueChange={(value) => handleInputChange('carrier', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PharmaLogistics Inc">PharmaLogistics Inc</SelectItem>
                  <SelectItem value="MedTransport Ltd">MedTransport Ltd</SelectItem>
                  <SelectItem value="ColdChain Express">ColdChain Express</SelectItem>
                  <SelectItem value="SecureMed Delivery">SecureMed Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="vehicle-id">Vehicle ID</Label>
              <Input
                id="vehicle-id"
                placeholder="e.g., PL-001"
                value={formData.vehicleId}
                onChange={(e) => handleInputChange('vehicleId', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-date">Est. Delivery</Label>
              <Input
                id="delivery-date"
                type="date"
                value={formData.estimatedDelivery}
                onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="driver-name">Driver Name</Label>
              <Input
                id="driver-name"
                placeholder="Driver name"
                value={formData.driverName}
                onChange={(e) => handleInputChange('driverName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver-phone">Driver Phone</Label>
              <Input
                id="driver-phone"
                placeholder="Contact number"
                value={formData.driverPhone}
                onChange={(e) => handleInputChange('driverPhone', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any special handling instructions"
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-pharma text-primary-foreground">
              Create Shipment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}