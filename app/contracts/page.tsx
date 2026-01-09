"use client"

import { useState, Suspense } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Search, FileText, Eye, Edit, Calendar, Building2 } from "lucide-react"
import { ContractForm } from "@/components/contracts/contract-form"

const contracts = [
  {
    id: 1,
    client: "Talabat",
    type: "Delivery Services",
    zone: "Dubai Central",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    driversAssigned: 45,
    monthlyRevenue: 125000,
  },
  {
    id: 2,
    client: "Noon",
    type: "Logistics",
    zone: "Dubai Marina",
    startDate: "2024-03-15",
    endDate: "2025-03-14",
    status: "active",
    driversAssigned: 28,
    monthlyRevenue: 85000,
  },
  {
    id: 3,
    client: "Careem",
    type: "Courier",
    zone: "Sharjah",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "active",
    driversAssigned: 32,
    monthlyRevenue: 95000,
  },
  {
    id: 4,
    client: "Amazon",
    type: "Delivery Services",
    zone: "Abu Dhabi",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    status: "expired",
    driversAssigned: 0,
    monthlyRevenue: 0,
  },
  {
    id: 5,
    client: "Deliveroo",
    type: "Delivery Services",
    zone: "Dubai Central",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: "pending",
    driversAssigned: 0,
    monthlyRevenue: 0,
  },
]

function ContractsContent() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredContracts = contracts.filter(
    (contract) =>
      contract.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.zone.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeContracts = contracts.filter((c) => c.status === "active").length
  const totalMonthlyRevenue = contracts
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.monthlyRevenue, 0)
  const totalDrivers = contracts.filter((c) => c.status === "active").reduce((sum, c) => sum + c.driversAssigned, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.contracts")}</h1>
          <p className="text-muted-foreground">Manage your 3PL contracts and pricing agreements</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 me-2" />
              New Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("contracts.setup")}</DialogTitle>
              <DialogDescription>Create a new contract with pricing rules</DialogDescription>
            </DialogHeader>
            <ContractForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Contracts</p>
                <p className="text-xl font-bold">{activeContracts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Building2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-xl font-bold">AED {totalMonthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/10">
                <FileText className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drivers Assigned</p>
                <p className="text-xl font-bold">{totalDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("common.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-center">Drivers</TableHead>
                  <TableHead className="text-end">Monthly Revenue</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-end">{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{contract.client}</span>
                      </div>
                    </TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>{contract.zone}</TableCell>
                    <TableCell className="text-sm">
                      <div>{contract.startDate}</div>
                      <div className="text-muted-foreground">to {contract.endDate}</div>
                    </TableCell>
                    <TableCell className="text-center font-mono">{contract.driversAssigned}</TableCell>
                    <TableCell className="text-end font-mono">
                      {contract.monthlyRevenue > 0 ? `AED ${contract.monthlyRevenue.toLocaleString()}` : "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          contract.status === "active"
                            ? "bg-success/20 text-success border-success/30"
                            : contract.status === "pending"
                              ? "bg-warning/20 text-warning border-warning/30"
                              : "bg-muted text-muted-foreground"
                        }
                      >
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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

export default function ContractsPage() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <ContractsContent />
      </Suspense>
    </AppShell>
  )
}
