"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Download, Fuel, Wrench, Shield, FileText, Wallet, TrendingDown, Calendar } from "lucide-react"

const initialExpenses = [
  {
    id: 1,
    date: "2024-12-15",
    category: "Fuel",
    description: "Fuel for TXY-4521",
    amount: 350,
    vehicle: "TXY-4521",
    driver: "Ahmed Hassan",
    status: "approved",
  },
  {
    id: 2,
    date: "2024-12-14",
    category: "Maintenance",
    description: "Oil change and filter replacement",
    amount: 850,
    vehicle: "TXY-4523",
    driver: null,
    status: "approved",
  },
  {
    id: 3,
    date: "2024-12-13",
    category: "Insurance",
    description: "Vehicle insurance renewal - TXY-4522",
    amount: 2500,
    vehicle: "TXY-4522",
    driver: null,
    status: "pending",
  },
  {
    id: 4,
    date: "2024-12-12",
    category: "Fuel",
    description: "Fuel for TXY-4524",
    amount: 380,
    vehicle: "TXY-4524",
    driver: "Yusuf Ibrahim",
    status: "approved",
  },
  {
    id: 5,
    date: "2024-12-11",
    category: "Other",
    description: "Parking permits renewal",
    amount: 1200,
    vehicle: null,
    driver: null,
    status: "approved",
  },
  {
    id: 6,
    date: "2024-12-10",
    category: "Maintenance",
    description: "Tire replacement",
    amount: 1800,
    vehicle: "TXY-4521",
    driver: null,
    status: "pending",
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  Fuel: <Fuel className="h-4 w-4" />,
  Maintenance: <Wrench className="h-4 w-4" />,
  Insurance: <Shield className="h-4 w-4" />,
  Other: <FileText className="h-4 w-4" />,
}

const categoryColors: Record<string, string> = {
  Fuel: "bg-chart-3/10 text-chart-3",
  Maintenance: "bg-warning/10 text-warning",
  Insurance: "bg-primary/10 text-primary",
  Other: "bg-muted text-muted-foreground",
}

const vehicles = ["TXY-4521", "TXY-4522", "TXY-4523", "TXY-4524", "TXY-4525"]

export function ExpensesList() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [expenses, setExpenses] = useState(initialExpenses)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const [newExpense, setNewExpense] = useState({
    category: "Fuel",
    amount: "",
    vehicle: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vehicle?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const pendingExpenses = expenses.filter((e) => e.status === "pending").reduce((sum, e) => sum + e.amount, 0)
  const thisMonthExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  const handleAddExpense = () => {
    if (!newExpense.amount || !newExpense.description) return

    const expense = {
      id: expenses.length + 1,
      date: newExpense.date,
      category: newExpense.category,
      description: newExpense.description,
      amount: Number.parseFloat(newExpense.amount),
      vehicle: newExpense.vehicle || null,
      driver: null,
      status: "pending",
    }

    setExpenses([expense, ...expenses])
    setNewExpense({
      category: "Fuel",
      amount: "",
      vehicle: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("nav.expenses")}</h1>
          <p className="text-muted-foreground">Track and manage operational expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 me-2" />
            {t("common.export")}
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 me-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new expense for tracking and reporting</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fuel">Fuel</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount (AED) *</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle (Optional)</Label>
                  <Select
                    value={newExpense.vehicle}
                    onValueChange={(value) => setNewExpense({ ...newExpense, vehicle: value })}
                  >
                    <SelectTrigger>
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
                  <Label>Description *</Label>
                  <Textarea
                    placeholder="Enter expense description..."
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  {t("common.cancel")}
                </Button>
                <Button onClick={handleAddExpense} disabled={!newExpense.amount || !newExpense.description}>
                  Add Expense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total This Month</p>
                <p className="text-xl font-bold">AED {thisMonthExpenses.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-xl font-bold">AED {pendingExpenses.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingDown className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
                <p className="text-xl font-bold text-success">-12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Fuel className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fuel Expenses</p>
                <p className="text-xl font-bold">
                  AED{" "}
                  {expenses
                    .filter((e) => e.category === "Fuel")
                    .reduce((sum, e) => sum + e.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Fuel">Fuel</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary">
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead className="text-end">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-secondary/50">
                    <TableCell className="font-mono text-sm">{expense.date}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded-md ${categoryColors[expense.category]}`}
                      >
                        {categoryIcons[expense.category]}
                        <span className="text-sm font-medium">{expense.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="font-mono text-sm">{expense.vehicle || "-"}</TableCell>
                    <TableCell className="text-end font-mono font-medium">
                      AED {expense.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={
                          expense.status === "approved"
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-warning/20 text-warning border-warning/30"
                        }
                      >
                        {expense.status}
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
