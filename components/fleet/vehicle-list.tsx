"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Label } from "@/components/ui/label"
import { Search, Plus, CheckCircle, AlertCircle, XCircle, Eye, Car, Wrench, Fuel } from "lucide-react"

const initialVehicles = [
  {
    id: 1,
    plateNumber: "TXY-4521",
    make: "Toyota",
    model: "Hiace",
    year: 2023,
    status: "active",
    driver: "Ahmed Hassan",
    insuranceStatus: "valid",
    registrationStatus: "valid",
    lastService: "2024-11-15",
    mileage: 45230,
  },
  {
    id: 2,
    plateNumber: "TXY-4522",
    make: "Toyota",
    model: "Hiace",
    year: 2022,
    status: "active",
    driver: "Mohammed Ali",
    insuranceStatus: "expiring",
    registrationStatus: "valid",
    lastService: "2024-10-20",
    mileage: 67890,
  },
  {
    id: 3,
    plateNumber: "TXY-4523",
    make: "Nissan",
    model: "Urvan",
    year: 2023,
    status: "maintenance",
    driver: "Unassigned",
    insuranceStatus: "valid",
    registrationStatus: "valid",
    lastService: "2024-12-01",
    mileage: 32100,
  },
  {
    id: 4,
    plateNumber: "TXY-4524",
    make: "Toyota",
    model: "Hiace",
    year: 2021,
    status: "active",
    driver: "Yusuf Ibrahim",
    insuranceStatus: "expired",
    registrationStatus: "expiring",
    lastService: "2024-09-10",
    mileage: 89450,
  },
  {
    id: 5,
    plateNumber: "TXY-4525",
    make: "Ford",
    model: "Transit",
    year: 2022,
    status: "inactive",
    driver: "Unassigned",
    insuranceStatus: "valid",
    registrationStatus: "valid",
    lastService: "2024-08-05",
    mileage: 54320,
  },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "valid") return <CheckCircle className="h-4 w-4 text-success" />
  if (status === "expiring") return <AlertCircle className="h-4 w-4 text-warning" />
  return <XCircle className="h-4 w-4 text-destructive" />
}

export function VehicleList() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [vehicles, setVehicles] = useState(initialVehicles)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newVehicle, setNewVehicle] = useState({
    plateNumber: "",
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    status: "active",
  })

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddVehicle = () => {
    if (!newVehicle.plateNumber || !newVehicle.make || !newVehicle.model) return

    const vehicle = {
      id: vehicles.length + 1,
      plateNumber: newVehicle.plateNumber,
      make: newVehicle.make,
      model: newVehicle.model,
      year: Number.parseInt(newVehicle.year),
      status: newVehicle.status,
      driver: "Unassigned",
      insuranceStatus: "valid",
      registrationStatus: "valid",
      lastService: new Date().toISOString().split("T")[0],
      mileage: 0,
    }

    setVehicles([...vehicles, vehicle])
    setNewVehicle({ plateNumber: "", make: "", model: "", year: new Date().getFullYear().toString(), status: "active" })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>{t("fleet.vehicleList")}</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 me-2" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                  <DialogDescription>Enter the vehicle details to add it to the fleet</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="plate-number">Plate Number *</Label>
                    <Input
                      id="plate-number"
                      placeholder="e.g., TXY-4526"
                      value={newVehicle.plateNumber}
                      onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-make">Make *</Label>
                      <Select
                        value={newVehicle.make}
                        onValueChange={(value) => setNewVehicle({ ...newVehicle, make: value })}
                      >
                        <SelectTrigger id="vehicle-make">
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Toyota">Toyota</SelectItem>
                          <SelectItem value="Nissan">Nissan</SelectItem>
                          <SelectItem value="Ford">Ford</SelectItem>
                          <SelectItem value="Mercedes">Mercedes</SelectItem>
                          <SelectItem value="Hyundai">Hyundai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-model">Model *</Label>
                      <Input
                        id="vehicle-model"
                        placeholder="e.g., Hiace"
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-year">Year</Label>
                      <Input
                        id="vehicle-year"
                        type="number"
                        min="2015"
                        max={new Date().getFullYear() + 1}
                        value={newVehicle.year}
                        onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-status">Status</Label>
                      <Select
                        value={newVehicle.status}
                        onValueChange={(value) => setNewVehicle({ ...newVehicle, status: value })}
                      >
                        <SelectTrigger id="vehicle-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="maintenance">In Maintenance</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t("common.cancel")}
                  </Button>
                  <Button
                    onClick={handleAddVehicle}
                    disabled={!newVehicle.plateNumber || !newVehicle.make || !newVehicle.model}
                  >
                    Add Vehicle
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-primary/10">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-xl font-bold">{vehicles.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{vehicles.filter((v) => v.status === "active").length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-warning/10">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-xl font-bold">{vehicles.filter((v) => v.status === "maintenance").length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <Fuel className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Mileage</p>
                <p className="text-xl font-bold">
                  {Math.round(vehicles.reduce((sum, v) => sum + v.mileage, 0) / vehicles.length).toLocaleString()} km
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("common.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead>Vehicle</TableHead>
                  <TableHead>{t("fleet.status")}</TableHead>
                  <TableHead>{t("fleet.assignedDriver")}</TableHead>
                  <TableHead className="text-center">Insurance</TableHead>
                  <TableHead className="text-center">Registration</TableHead>
                  <TableHead className="text-end">Mileage</TableHead>
                  <TableHead className="text-end">{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium font-mono">{vehicle.plateNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          vehicle.status === "active"
                            ? "bg-success/20 text-success border-success/30"
                            : vehicle.status === "maintenance"
                              ? "bg-warning/20 text-warning border-warning/30"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.driver}</TableCell>
                    <TableCell className="text-center">
                      <StatusIcon status={vehicle.insuranceStatus} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusIcon status={vehicle.registrationStatus} />
                    </TableCell>
                    <TableCell className="text-end font-mono text-sm">{vehicle.mileage.toLocaleString()} km</TableCell>
                    <TableCell className="text-end">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 me-2" />
                        {t("common.view")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
