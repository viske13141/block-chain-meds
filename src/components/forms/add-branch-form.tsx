import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BranchData {
  id: string
  name: string
  location: string
  manager: string
  phone: string
  email: string
  type: string
  capacity: string
  status: 'active' | 'inactive'
  createdAt: Date
}

interface AddBranchFormProps {
  onBranchAdded?: (branch: BranchData) => void
  trigger?: React.ReactNode
}

export function AddBranchForm({ onBranchAdded, trigger }: AddBranchFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    phone: '',
    email: '',
    type: '',
    capacity: ''
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.location || !formData.manager) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const newBranch: BranchData = {
      id: 'BR-' + Date.now().toString().slice(-6),
      ...formData,
      status: 'active',
      createdAt: new Date()
    }

    onBranchAdded?.(newBranch)
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      manager: '',
      phone: '',
      email: '',
      type: '',
      capacity: ''
    })
    
    setIsOpen(false)
    
    toast({
      title: "Success!",
      description: "New branch added successfully",
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
            <MapPin className="h-4 w-4 mr-2" />
            Add New Branch
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Branch</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="branch-name">Branch Name *</Label>
            <Input
              id="branch-name"
              placeholder="Enter branch name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Textarea
              id="location"
              placeholder="Enter full address"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager">Branch Manager *</Label>
            <Input
              id="manager"
              placeholder="Manager name"
              value={formData.manager}
              onChange={(e) => handleInputChange('manager', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Contact number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="branch@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Branch Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production Facility</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="distribution">Distribution Center</SelectItem>
                <SelectItem value="research">Research Lab</SelectItem>
                <SelectItem value="office">Administrative Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Storage Capacity</Label>
            <Input
              id="capacity"
              placeholder="e.g., 10,000 units"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-pharma text-primary-foreground">
              Add Branch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}