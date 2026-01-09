"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Download } from "lucide-react"
import Link from "next/link"

const initialFines = [
  {
    id: 1,
    date: "2024-12-15",
    driver: { id: 1, name: "Ahmed Hassan" },
    vehicle: "TXY-4521",
    type: "Speeding",
    amount: 500,
    status: "deducted",
  },
  {
    id: 2,
    date: "2024-12-10",
    driver: { id: 2, name: "Mohammed Ali" },
    vehicle: "TXY-4522",
    type: "Parking Violation",
    amount: 200,
    status: "pending",
  },
  {
    id: 3,
    date: "2024-12-08",
    driver: { id: 4, name: "Yusuf Ibrahim" },
    vehicle: "TXY-4524",
    type: "Red Light",
    amount: 1000,
    status: "company-paid",
  },
  {
    id: 4,
    date: "2024-12-05",
    driver: { id: 1, name: "Ahmed Hassan" },
    vehicle: "TXY-4521",
    type: "Lane Violation",
    amount: 400,
    status: "deducted",
  },
]

const drivers = [
  { id: 1, name: "Ahmed Hassan" },
  { id: 2, name: "Mohammed Ali" },
  { id: 3, name: "Khalid Omar" },
  { id: 4, name: "Yusuf Ibrahim" },
  { id: 5, name: "Hassan Saeed" },
]

const vehicles = ["TXY-4521", "TXY-4522", "TXY-4523", "TXY-4524", "TXY-4525"]

export function FinesLog() {
  const { t } = useLanguage()
  const [fines, setFines] = useState(initialFines)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newFine, setNewFine] = useState({
    driverId: "",
    vehicle: "",
    type: "",
    amount: "",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  })

  const totalFines = fines.reduce((sum, f) => sum + f.amount, 0)
  const pendingFines = fines.filter((f) => f.status === "pending").reduce((sum, f) => sum + f.amount, 0)

  const handleAddFine = () => {
    if (!newFine.driverId || !newFine.vehicle || !newFine.type || !newFine.amount) return

    const selectedDriver = drivers.find((d) => d.id.toString() === newFine.driverId)
    if (!selectedDriver) return

    const fine = {
      id: fines.length + 1,
      date: newFine.date,
      driver: { id: selectedDriver.id, name: selectedDriver.name },
      vehicle: newFine.vehicle,
      type: newFine.type,
      amount: Number.parseFloat(newFine.amount),
      status: newFine.status,
    }

    setFines([fine, ...fines])
    setNewFine({
      driverId: "",
      vehicle: "",
      type: "",
      amount: "",
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("nav.fines")}</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 me-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 me-2" />
                Record Fine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record Traffic Fine</DialogTitle>
                <DialogDescription>Enter the fine details to record it in the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fine-driver">Driver *</Label>
                  <Select
                    value={newFine.driverId}
                    onValueChange={(value) => setNewFine({ ...newFine, driverId: value })}
                  >
                    <SelectTrigger id="fine-driver">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine-vehicle">Vehicle *</Label>
                  <Select value={newFine.vehicle} onValueChange={(value) => setNewFine({ ...newFine, vehicle: value })}>
                    <SelectTrigger id="fine-vehicle">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine-type">Violation Type *</Label>
                  <Select value={newFine.type} onValueChange={(value) => setNewFine({ ...newFine, type: value })}>
                    <SelectTrigger id="fine-type">
                      <SelectValue placeholder="Select violation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Speeding">Speeding</SelectItem>
                      <SelectItem value="Parking Violation">Parking Violation</SelectItem>
                      <SelectItem value="Red Light">Red Light</SelectItem>
                      <SelectItem value="Lane Violation">Lane Violation</SelectItem>
                      <SelectItem value="Seatbelt">Seatbelt</SelectItem>
                      <SelectItem value="Mobile Phone">Mobile Phone</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fine-amount">Amount (AED) *</Label>
                    <Input
                      id="fine-amount"
                      type="number"
                      placeholder="0"
                      value={newFine.amount}
                      onChange={(e) => setNewFine({ ...newFine, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fine-date">Date</Label>
                    <Input
                      id="fine-date"
                      type="date"
                      value={newFine.date}
                      onChange={(e) => setNewFine({ ...newFine, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fine-status">Status</Label>
                  <Select value={newFine.status} onValueChange={(value) => setNewFine({ ...newFine, status: value })}>
                    <SelectTrigger id="fine-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="deducted">Deducted from Salary</SelectItem>
                      <SelectItem value="company-paid">Paid by Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t("common.cancel")}
                </Button>
                <Button
                  onClick={handleAddFine}
                  disabled={!newFine.driverId || !newFine.vehicle || !newFine.type || !newFine.amount}
                >
                  Record Fine
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Fines (This Month)</p>
            <p className="text-2xl font-bold mt-1">AED {totalFines.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Collection</p>
            <p className="text-2xl font-bold mt-1 text-warning">AED {pendingFines.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Fines Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary hover:bg-secondary">
                <TableHead>Date</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Violation Type</TableHead>
                <TableHead className="text-end">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fines.map((fine) => (
                <TableRow key={fine.id} className="hover:bg-secondary/50">
                  <TableCell className="text-muted-foreground">{fine.date}</TableCell>
                  <TableCell>
                    <Link href={`/fleet/drivers/${fine.driver.id}`} className="text-primary hover:underline">
                      {fine.driver.name}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono">{fine.vehicle}</TableCell>
                  <TableCell>{fine.type}</TableCell>
                  <TableCell className="text-end font-mono font-medium text-destructive">
                    AED {fine.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        fine.status === "deducted"
                          ? "bg-success/20 text-success border-success/30"
                          : fine.status === "company-paid"
                            ? "bg-chart-2/20 text-chart-2 border-chart-2/30"
                            : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {fine.status === "deducted"
                        ? "Deducted from Salary"
                        : fine.status === "company-paid"
                          ? "Paid by Company"
                          : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
