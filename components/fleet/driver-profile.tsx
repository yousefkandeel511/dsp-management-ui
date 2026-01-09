"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Phone,
  MapPin,
  Calendar,
  Upload,
  Eye,
  Download,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Package,
} from "lucide-react"

const driverData = {
  id: 1,
  name: "Ahmed Hassan",
  phone: "+971 50 123 4567",
  address: "Building 45, Street 12, Industrial Area, Dubai",
  joinDate: "2022-03-15",
  status: "active",
  vehicle: "TXY-4521",
  photo: null,
}

const documents = [
  { id: 1, name: "Residence Permit", expiry: "2025-06-15", status: "valid" },
  { id: 2, name: "Driving License", expiry: "2025-03-20", status: "expiring" },
  { id: 3, name: "Emirates ID", expiry: "2026-01-10", status: "valid" },
  { id: 4, name: "Passport", expiry: "2028-08-22", status: "valid" },
]

const financials = {
  salaryMode: "Commission-Based",
  baseSalary: 2500,
  currentLoanBalance: 1500,
  totalLoansGiven: 5000,
  lastPayment: "2024-12-01",
}

const performance = {
  ordersThisMonth: 487,
  ordersLastMonth: 423,
  rating: 4.8,
  onTimeDelivery: 96,
  totalOrders: 5842,
}

export function DriverProfile() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {driverData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{driverData.name}</h1>
                  <p className="text-muted-foreground">ID: DRV-{driverData.id.toString().padStart(4, "0")}</p>
                </div>
                <Badge className="w-fit bg-success/20 text-success border-success/30">{t("fleet.active")}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {driverData.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {driverData.vehicle}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined {driverData.joinDate}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="basic">{t("fleet.basicInfo")}</TabsTrigger>
          <TabsTrigger value="documents">{t("fleet.documents")}</TabsTrigger>
          <TabsTrigger value="financials">{t("fleet.financials")}</TabsTrigger>
          <TabsTrigger value="performance">{t("fleet.performance")}</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>{t("fleet.basicInfo")}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-muted-foreground">Full Name</dt>
                  <dd className="font-medium mt-1">{driverData.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Phone Number</dt>
                  <dd className="font-medium mt-1">{driverData.phone}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm text-muted-foreground">Address</dt>
                  <dd className="font-medium mt-1">{driverData.address}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Assigned Vehicle</dt>
                  <dd className="font-medium mt-1 font-mono">{driverData.vehicle}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Join Date</dt>
                  <dd className="font-medium mt-1">{driverData.joinDate}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>{t("fleet.documents")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary hover:bg-secondary">
                    <TableHead>Document</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.expiry}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {doc.status === "valid" ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-warning" />
                          )}
                          <span className={doc.status === "valid" ? "text-success" : "text-warning"}>{doc.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-end">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>{t("fleet.financials")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Salary Mode</p>
                  <p className="font-semibold mt-1">{financials.salaryMode}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Base Salary</p>
                  <p className="font-semibold mt-1">AED {financials.baseSalary}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Loan Balance</p>
                  <p className="font-semibold mt-1 text-warning">AED {financials.currentLoanBalance}</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Loans Given</p>
                  <p className="font-semibold mt-1">AED {financials.totalLoansGiven}</p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Loan Repayment Progress</p>
                <Progress
                  value={
                    ((financials.totalLoansGiven - financials.currentLoanBalance) / financials.totalLoansGiven) * 100
                  }
                  className="mt-2 h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  AED {financials.totalLoansGiven - financials.currentLoanBalance} of AED {financials.totalLoansGiven}{" "}
                  repaid
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>{t("fleet.performance")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Orders This Month</span>
                  </div>
                  <p className="text-2xl font-bold">{performance.ordersThisMonth}</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="h-4 w-4" />+
                    {Math.round(
                      ((performance.ordersThisMonth - performance.ordersLastMonth) / performance.ordersLastMonth) * 100,
                    )}
                    % vs last month
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <p className="text-2xl font-bold">{performance.rating}/5.0</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= Math.floor(performance.rating) ? "text-warning" : "text-muted"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">On-Time Delivery</p>
                  <p className="text-2xl font-bold">{performance.onTimeDelivery}%</p>
                  <Progress value={performance.onTimeDelivery} className="mt-2 h-2" />
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
                  <p className="text-2xl font-bold">{performance.totalOrders.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
