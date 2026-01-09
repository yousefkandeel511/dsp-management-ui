"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calculator } from "lucide-react"

const payrollData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    baseSalary: 2500,
    orders: 487,
    commission: 1461,
    loanDeduction: 200,
    fineDeduction: 150,
    netSalary: 3611,
    status: "pending",
  },
  {
    id: 2,
    name: "Mohammed Ali",
    baseSalary: 2500,
    orders: 423,
    commission: 1269,
    loanDeduction: 0,
    fineDeduction: 0,
    netSalary: 3769,
    status: "pending",
  },
  {
    id: 3,
    name: "Khalid Omar",
    baseSalary: 2500,
    orders: 0,
    commission: 0,
    loanDeduction: 100,
    fineDeduction: 0,
    netSalary: 2400,
    status: "on-leave",
  },
  {
    id: 4,
    name: "Yusuf Ibrahim",
    baseSalary: 2500,
    orders: 512,
    commission: 1536,
    loanDeduction: 300,
    fineDeduction: 200,
    netSalary: 3536,
    status: "pending",
  },
  {
    id: 5,
    name: "Hassan Saeed",
    baseSalary: 3000,
    orders: 398,
    commission: 1194,
    loanDeduction: 0,
    fineDeduction: 100,
    netSalary: 4094,
    status: "processed",
  },
]

export function PayrollTable() {
  const { t } = useLanguage()
  const [selectedMonth, setSelectedMonth] = useState("2024-12")
  const [selectedDrivers, setSelectedDrivers] = useState<number[]>([])

  const toggleDriver = (id: number) => {
    setSelectedDrivers((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedDrivers.length === payrollData.length) {
      setSelectedDrivers([])
    } else {
      setSelectedDrivers(payrollData.map((d) => d.id))
    }
  }

  const totalNetSalary = payrollData.reduce((sum, d) => sum + d.netSalary, 0)
  const pendingCount = payrollData.filter((d) => d.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("hr.payroll")}</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48 bg-secondary">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12">December 2024</SelectItem>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-10">October 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 me-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payable</p>
                <p className="text-xl font-bold">AED {totalNetSalary.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <CreditCard className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold">{pendingCount} drivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <Button className="w-full bg-primary text-primary-foreground" disabled={selectedDrivers.length === 0}>
              <CreditCard className="h-4 w-4 me-2" />
              {t("hr.processPayment")} ({selectedDrivers.length})
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead className="w-12">
                    <Checkbox checked={selectedDrivers.length === payrollData.length} onCheckedChange={toggleAll} />
                  </TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead className="text-end">{t("hr.baseSalary")}</TableHead>
                  <TableHead className="text-end">Orders</TableHead>
                  <TableHead className="text-end">{t("hr.commission")}</TableHead>
                  <TableHead className="text-end">{t("hr.deductions")}</TableHead>
                  <TableHead className="text-end">{t("hr.netSalary")}</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((driver) => (
                  <TableRow key={driver.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedDrivers.includes(driver.id)}
                        onCheckedChange={() => toggleDriver(driver.id)}
                        disabled={driver.status === "processed"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell className="text-end font-mono">AED {driver.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-end font-mono">{driver.orders}</TableCell>
                    <TableCell className="text-end font-mono text-success">
                      +AED {driver.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-end">
                      <div className="text-destructive font-mono">
                        -AED {(driver.loanDeduction + driver.fineDeduction).toLocaleString()}
                      </div>
                      {(driver.loanDeduction > 0 || driver.fineDeduction > 0) && (
                        <div className="text-xs text-muted-foreground">
                          {driver.loanDeduction > 0 && `Loan: ${driver.loanDeduction}`}
                          {driver.loanDeduction > 0 && driver.fineDeduction > 0 && " | "}
                          {driver.fineDeduction > 0 && `Fines: ${driver.fineDeduction}`}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-end font-mono font-bold">
                      AED {driver.netSalary.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          driver.status === "processed"
                            ? "bg-success/20 text-success border-success/30"
                            : driver.status === "on-leave"
                              ? "bg-muted text-muted-foreground"
                              : "bg-warning/20 text-warning border-warning/30"
                        }
                      >
                        {driver.status}
                      </Badge>
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
