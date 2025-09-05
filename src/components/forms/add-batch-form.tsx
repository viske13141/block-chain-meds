import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BatchData {
  id: string
  drugName: string
  dosage: string
  quantity: number
  manufacturingDate: string
  expiryDate: string
  ingredients: string[]
  batchNumber: string
  status: 'active' | 'distributed' | 'expired'
  manufacturer: string
  storageConditions: string
  createdAt: Date
}

interface AddBatchFormProps {
  onBatchAdded?: (batch: BatchData) => void
  trigger?: React.ReactNode
}

export function AddBatchForm({ onBatchAdded, trigger }: AddBatchFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    drugName: '',
    dosage: '',
    quantity: '',
    manufacturingDate: '',
    expiryDate: '',
    ingredients: '',
    storageConditions: ''
  })
  const { toast } = useToast()

  const drugOptions = [
    'Paracetamol',
    'Ibuprofen', 
    'Aspirin',
    'Amoxicillin',
    'Metformin',
    'Atorvastatin',
    'Omeprazole',
    'Lisinopril'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.drugName || !formData.quantity || !formData.expiryDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const batchId = 'PH-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    
    const newBatch: BatchData = {
      id: batchId,
      drugName: formData.drugName,
      dosage: formData.dosage || '500mg',
      quantity: parseInt(formData.quantity),
      manufacturingDate: formData.manufacturingDate || new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
      batchNumber: batchId,
      status: 'active',
      manufacturer: 'PharmaCorp Ltd',
      storageConditions: formData.storageConditions || 'Store in cool, dry place',
      createdAt: new Date()
    }

    onBatchAdded?.(newBatch)
    
    // Reset form
    setFormData({
      drugName: '',
      dosage: '',
      quantity: '',
      manufacturingDate: '',
      expiryDate: '',
      ingredients: '',
      storageConditions: ''
    })
    
    setIsOpen(false)
    
    toast({
      title: "Success!",
      description: `Drug batch ${batchId} created successfully`,
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
            <Package className="h-4 w-4 mr-2" />
            Add Drug Batch
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Drug Batch</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="drug-name">Drug Name *</Label>
            <Select value={formData.drugName} onValueChange={(value) => handleInputChange('drugName', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select drug" />
              </SelectTrigger>
              <SelectContent>
                {drugOptions.map(drug => (
                  <SelectItem key={drug} value={drug}>{drug}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 500mg"
                value={formData.dosage}
                onChange={(e) => handleInputChange('dosage', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 10000"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="mfg-date">Manufacturing Date</Label>
              <Input
                id="mfg-date"
                type="date"
                value={formData.manufacturingDate}
                onChange={(e) => handleInputChange('manufacturingDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-date">Expiry Date *</Label>
              <Input
                id="exp-date"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              placeholder="Enter ingredients separated by commas"
              value={formData.ingredients}
              onChange={(e) => handleInputChange('ingredients', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storage">Storage Conditions</Label>
            <Select value={formData.storageConditions} onValueChange={(value) => handleInputChange('storageConditions', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Store in cool, dry place">Store in cool, dry place</SelectItem>
                <SelectItem value="Refrigerate (2-8°C)">Refrigerate (2-8°C)</SelectItem>
                <SelectItem value="Store at room temperature">Store at room temperature</SelectItem>
                <SelectItem value="Store in freezer (-18°C)">Store in freezer (-18°C)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-pharma text-primary-foreground">
              Create Batch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}