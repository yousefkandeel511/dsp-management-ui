"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Search, Plus, CheckCircle, AlertCircle, XCircle, Eye, Users } from "lucide-react"
import Link from "next/link"

const initialDrivers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    status: "active",
    vehicle: "TXY-4521",
    residencyStatus: "valid",
    licenseStatus: "valid",
    phone: "+971 50 123 4567",
    nationality: "Egypt",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Mohammed Ali",
    status: "active",
    vehicle: "TXY-4522",
    residencyStatus: "expiring",
    licenseStatus: "valid",
    phone: "+971 50 234 5678",
    nationality: "Pakistan",
    joinDate: "2023-03-20",
  },
  {
    id: 3,
    name: "Khalid Omar",
    status: "on-leave",
    vehicle: "Unassigned",
    residencyStatus: "valid",
    licenseStatus: "expiring",
    phone: "+971 50 345 6789",
    nationality: "India",
    joinDate: "2023-06-10",
  },
  {
    id: 4,
    name: "Yusuf Ibrahim",
    status: "active",
    vehicle: "TXY-4524",
    residencyStatus: "expired",
    licenseStatus: "valid",
    phone: "+971 50 456 7890",
    nationality: "Bangladesh",
    joinDate: "2022-11-05",
  },
  {
    id: 5,
    name: "Hassan Saeed",
    status: "inactive",
    vehicle: "Unassigned",
    residencyStatus: "valid",
    licenseStatus: "expired",
    phone: "+971 50 567 8901",
    nationality: "Nepal",
    joinDate: "2023-08-22",
  },
]

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "valid") return <CheckCircle className="h-4 w-4 text-success" />
  if (status === "expiring") return <AlertCircle className="h-4 w-4 text-warning" />
  return <XCircle className="h-4 w-4 text-destructive" />
}

export function DriverList() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [drivers, setDrivers] = useState(initialDrivers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    nationality: "",
    status: "active",
  })

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone) return

    const driver = {
      id: drivers.length + 1,
      name: newDriver.name,
      status: newDriver.status,
      vehicle: "Unassigned",
      residencyStatus: "valid",
      licenseStatus: "valid",
      phone: newDriver.phone,
      nationality: newDriver.nationality,
      joinDate: new Date().toISOString().split("T")[0],
    }

    setDrivers([...drivers, driver])
    setNewDriver({ name: "", phone: "", nationality: "", status: "active" })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>{t("fleet.driverList")}</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 me-2" />
                  Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                  <DialogDescription>Enter the driver details to add them to the system</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver-name">Full Name *</Label>
                    <Input
                      id="driver-name"
                      placeholder="Enter full name"
                      value={newDriver.name}
                      onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-phone">Phone Number *</Label>
                    <Input
                      id="driver-phone"
                      placeholder="+971 50 XXX XXXX"
                      value={newDriver.phone}
                      onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-nationality">Nationality</Label>
                    <Select
                      value={newDriver.nationality}
                      onValueChange={(value) => setNewDriver({ ...newDriver, nationality: value })}
                    >
                      <SelectTrigger id="driver-nationality">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Egypt">Egypt</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                        <SelectItem value="India">India</SelectItem>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Nepal">Nepal</SelectItem>
                        <SelectItem value="Philippines">Philippines</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-status">Status</Label>
                    <Select
                      value={newDriver.status}
                      onValueChange={(value) => setNewDriver({ ...newDriver, status: value })}
                    >
                      <SelectTrigger id="driver-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {t("common.cancel")}
                  </Button>
                  <Button onClick={handleAddDriver} disabled={!newDriver.name || !newDriver.phone}>
                    Add Driver
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
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Drivers</p>
                <p className="text-xl font-bold">{drivers.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-xl font-bold">{drivers.filter((d) => d.status === "active").length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-xl font-bold">{drivers.filter((d) => d.status === "on-leave").length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="p-2 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Docs Expiring</p>
                <p className="text-xl font-bold">
                  {drivers.filter((d) => d.residencyStatus === "expiring" || d.licenseStatus === "expiring").length}
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
                <SelectItem value="active">{t("fleet.active")}</SelectItem>
                <SelectItem value="on-leave">{t("fleet.onLeave")}</SelectItem>
                <SelectItem value="inactive">{t("fleet.inactive")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead>Driver</TableHead>
                  <TableHead>{t("fleet.status")}</TableHead>
                  <TableHead>{t("fleet.assignedVehicle")}</TableHead>
                  <TableHead className="text-center">Residency</TableHead>
                  <TableHead className="text-center">License</TableHead>
                  <TableHead className="text-end">{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <TableRow key={driver.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <p className="text-sm text-muted-foreground">{driver.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          driver.status === "active"
                            ? "bg-success/20 text-success border-success/30"
                            : driver.status === "on-leave"
                              ? "bg-warning/20 text-warning border-warning/30"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {driver.status === "active"
                          ? t("fleet.active")
                          : driver.status === "on-leave"
                            ? t("fleet.onLeave")
                            : t("fleet.inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{driver.vehicle}</TableCell>
                    <TableCell className="text-center">
                      <StatusIcon status={driver.residencyStatus} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusIcon status={driver.licenseStatus} />
                    </TableCell>
                    <TableCell className="text-end">
                      <Link href={`/fleet/drivers/${driver.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 me-2" />
                          {t("common.view")}
                        </Button>
                      </Link>
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
