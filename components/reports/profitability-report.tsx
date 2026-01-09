"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { vehicle: "TXY-4521", income: 12500, expenses: 8200 },
  { vehicle: "TXY-4522", income: 11800, expenses: 7900 },
  { vehicle: "TXY-4523", income: 10200, expenses: 9100 },
  { vehicle: "TXY-4524", income: 13200, expenses: 8500 },
  { vehicle: "TXY-4525", income: 9800, expenses: 8800 },
  { vehicle: "TXY-4526", income: 14100, expenses: 9200 },
]

const vehicleProfitData = [
  {
    id: 1,
    vehicle: "TXY-4521",
    driver: "Ahmed Hassan",
    income: 12500,
    expenses: 8200,
    netProfit: 4300,
    margin: 34.4,
  },
  {
    id: 2,
    vehicle: "TXY-4522",
    driver: "Mohammed Ali",
    income: 11800,
    expenses: 7900,
    netProfit: 3900,
    margin: 33.1,
  },
  {
    id: 3,
    vehicle: "TXY-4523",
    driver: "Khalid Omar",
    income: 10200,
    expenses: 9100,
    netProfit: 1100,
    margin: 10.8,
  },
  {
    id: 4,
    vehicle: "TXY-4524",
    driver: "Yusuf Ibrahim",
    income: 13200,
    expenses: 8500,
    netProfit: 4700,
    margin: 35.6,
  },
  {
    id: 5,
    vehicle: "TXY-4525",
    driver: "Hassan Saeed",
    income: 9800,
    expenses: 8800,
    netProfit: 1000,
    margin: 10.2,
  },
  {
    id: 6,
    vehicle: "TXY-4526",
    driver: "Ali Mahmoud",
    income: 14100,
    expenses: 9200,
    netProfit: 4900,
    margin: 34.8,
  },
]

export function ProfitabilityReport() {
  const { t } = useLanguage()

  const totalIncome = vehicleProfitData.reduce((sum, v) => sum + v.income, 0)
  const totalExpenses = vehicleProfitData.reduce((sum, v) => sum + v.expenses, 0)
  const totalProfit = totalIncome - totalExpenses
  const avgMargin = (totalProfit / totalIncome) * 100

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("reports.profitability")}</h2>
        <div className="flex items-center gap-4">
          <Select defaultValue="2024-12">
            <SelectTrigger className="w-48 bg-secondary">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12">December 2024</SelectItem>
              <SelectItem value="2024-11">November 2024</SelectItem>
              <SelectItem value="2024-q4">Q4 2024</SelectItem>
              <SelectItem value="2024">Full Year 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 me-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Income</p>
            <p className="text-2xl font-bold mt-1 text-success">AED {totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Expenses</p>
            <p className="text-2xl font-bold mt-1 text-destructive">AED {totalExpenses.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className="text-2xl font-bold mt-1 text-primary">AED {totalProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Profit Margin</p>
            <p className="text-2xl font-bold mt-1">{avgMargin.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{t("reports.incomeVsExpenses")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="vehicle" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Profit Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{t("reports.vehicleProfit")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary hover:bg-secondary">
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead className="text-end">Income</TableHead>
                <TableHead className="text-end">Expenses</TableHead>
                <TableHead className="text-end">Net Profit</TableHead>
                <TableHead className="text-end">Margin</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleProfitData.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-secondary/50">
                  <TableCell className="font-mono font-medium">{vehicle.vehicle}</TableCell>
                  <TableCell>{vehicle.driver}</TableCell>
                  <TableCell className="text-end font-mono text-success">
                    AED {vehicle.income.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end font-mono text-destructive">
                    AED {vehicle.expenses.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end font-mono font-bold">
                    AED {vehicle.netProfit.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-end font-mono">{vehicle.margin.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">
                    {vehicle.margin > 30 ? (
                      <TrendingUp className="h-5 w-5 text-success mx-auto" />
                    ) : vehicle.margin > 15 ? (
                      <Minus className="h-5 w-5 text-warning mx-auto" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive mx-auto" />
                    )}
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
