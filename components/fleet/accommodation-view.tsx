"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Building, Users, Bed, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialAccommodations = [
  {
    id: 1,
    name: "Building A - Industrial Area",
    type: "Shared Apartment",
    capacity: 8,
    occupied: 5,
    rooms: 4,
    monthlyRent: 4500,
    status: "available",
  },
  {
    id: 2,
    name: "Building B - Al Quoz",
    type: "Labor Camp",
    capacity: 20,
    occupied: 20,
    rooms: 10,
    monthlyRent: 8000,
    status: "full",
  },
  {
    id: 3,
    name: "Building C - Jebel Ali",
    type: "Shared Apartment",
    capacity: 12,
    occupied: 10,
    rooms: 6,
    monthlyRent: 6000,
    status: "available",
  },
  {
    id: 4,
    name: "Building D - DIP",
    type: "Villa",
    capacity: 15,
    occupied: 8,
    rooms: 8,
    monthlyRent: 12000,
    status: "available",
  },
]

export function AccommodationView() {
  const { t } = useLanguage()
  const [accommodations, setAccommodations] = useState(initialAccommodations)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAccommodation, setNewAccommodation] = useState({
    name: "",
    type: "Shared Apartment",
    capacity: "",
    rooms: "",
    monthlyRent: "",
  })

  const handleAddAccommodation = () => {
    if (
      !newAccommodation.name ||
      !newAccommodation.capacity ||
      !newAccommodation.rooms ||
      !newAccommodation.monthlyRent
    )
      return

    const accommodation = {
      id: accommodations.length + 1,
      name: newAccommodation.name,
      type: newAccommodation.type,
      capacity: Number.parseInt(newAccommodation.capacity),
      occupied: 0,
      rooms: Number.parseInt(newAccommodation.rooms),
      monthlyRent: Number.parseFloat(newAccommodation.monthlyRent),
      status: "available",
    }

    setAccommodations([...accommodations, accommodation])
    setNewAccommodation({ name: "", type: "Shared Apartment", capacity: "", rooms: "", monthlyRent: "" })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("nav.accommodation")}</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 me-2" />
              Add Accommodation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Accommodation</DialogTitle>
              <DialogDescription>Add a new property to manage driver housing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="acc-name">Property Name *</Label>
                <Input
                  id="acc-name"
                  placeholder="e.g., Building E - Al Awir"
                  value={newAccommodation.name}
                  onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-type">Property Type</Label>
                <Select
                  value={newAccommodation.type}
                  onValueChange={(value) => setNewAccommodation({ ...newAccommodation, type: value })}
                >
                  <SelectTrigger id="acc-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shared Apartment">Shared Apartment</SelectItem>
                    <SelectItem value="Labor Camp">Labor Camp</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="acc-capacity">Capacity (beds) *</Label>
                  <Input
                    id="acc-capacity"
                    type="number"
                    placeholder="0"
                    value={newAccommodation.capacity}
                    onChange={(e) => setNewAccommodation({ ...newAccommodation, capacity: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acc-rooms">Number of Rooms *</Label>
                  <Input
                    id="acc-rooms"
                    type="number"
                    placeholder="0"
                    value={newAccommodation.rooms}
                    onChange={(e) => setNewAccommodation({ ...newAccommodation, rooms: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-rent">Monthly Rent (AED) *</Label>
                <Input
                  id="acc-rent"
                  type="number"
                  placeholder="0"
                  value={newAccommodation.monthlyRent}
                  onChange={(e) => setNewAccommodation({ ...newAccommodation, monthlyRent: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddAccommodation}
                disabled={
                  !newAccommodation.name ||
                  !newAccommodation.capacity ||
                  !newAccommodation.rooms ||
                  !newAccommodation.monthlyRent
                }
              >
                Add Accommodation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Properties</p>
                <p className="text-xl font-bold">{accommodations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Bed className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-xl font-bold">{accommodations.reduce((sum, a) => sum + a.capacity, 0)} beds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-xl font-bold">
                  {accommodations.reduce((sum, a) => sum + a.occupied, 0)} /{" "}
                  {accommodations.reduce((sum, a) => sum + a.capacity, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodations.map((acc) => {
          const occupancyPercent = (acc.occupied / acc.capacity) * 100
          return (
            <Card key={acc.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{acc.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{acc.type}</p>
                  </div>
                  <Badge
                    className={
                      acc.status === "full"
                        ? "bg-destructive/20 text-destructive border-destructive/30"
                        : "bg-success/20 text-success border-success/30"
                    }
                  >
                    {acc.status === "full" ? "Full" : "Available"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Occupancy</span>
                      <span className="font-medium">
                        {acc.occupied}/{acc.capacity} beds
                      </span>
                    </div>
                    <Progress
                      value={occupancyPercent}
                      className={`h-2 ${occupancyPercent === 100 ? "[&>div]:bg-destructive" : "[&>div]:bg-primary"}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Rooms</span>
                    <span className="font-medium">{acc.rooms}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-medium">AED {acc.monthlyRent.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
