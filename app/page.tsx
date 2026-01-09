"use client"

import { AppShell } from "@/components/layout/app-shell"
import { AlertsWidget } from "@/components/dashboard/alerts-widget"
import { MetricsWidget } from "@/components/dashboard/metrics-widget"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Car, Receipt } from "lucide-react"
import Link from "next/link"

const quickActions = [
  { label: "Add Driver", href: "/fleet/drivers", icon: Users },
  { label: "Add Vehicle", href: "/fleet/vehicles", icon: Car },
  { label: "New Contract", href: "/contracts", icon: FileText },
  { label: "Record Expense", href: "/operations/expenses", icon: Receipt },
]

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("dashboard.title")}</h1>
          <div className="flex items-center gap-2">
            {quickActions.slice(0, 2).map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.href} href={action.href}>
                  <Button variant="outline" size="sm">
                    <Icon className="h-4 w-4 me-2" />
                    {action.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>

        <MetricsWidget />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsWidget />
          <ActivityFeed />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.href} href={action.href}>
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:bg-secondary bg-transparent"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
