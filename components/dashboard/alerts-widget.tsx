"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileWarning, Shield, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const alerts = [
  {
    id: 1,
    type: "residence",
    count: 5,
    severity: "high",
    icon: FileWarning,
    href: "/fleet/drivers?filter=expiring",
  },
  {
    id: 2,
    type: "insurance",
    count: 3,
    severity: "medium",
    icon: Shield,
    href: "/fleet/vehicles?filter=expiring",
  },
  {
    id: 3,
    type: "license",
    count: 2,
    severity: "low",
    icon: AlertTriangle,
    href: "/fleet/drivers?filter=license-expiring",
  },
]

export function AlertsWidget() {
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          {t("dashboard.alerts")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon
          return (
            <Link
              key={alert.id}
              href={alert.href}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-accent transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    alert.severity === "high"
                      ? "bg-destructive/20 text-destructive"
                      : alert.severity === "medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {alert.count}{" "}
                    {alert.type === "residence"
                      ? t("dashboard.residenceExpiring")
                      : alert.type === "insurance"
                        ? t("dashboard.insuranceExpiring")
                        : "Driver Licenses Expiring"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"
                  }
                >
                  {alert.severity}
                </Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
