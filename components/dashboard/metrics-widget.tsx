"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Car, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const metrics = [
  {
    key: "activeDrivers",
    value: 142,
    change: +5,
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    key: "vehiclesOnRoad",
    value: 128,
    change: -2,
    icon: Car,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    key: "monthlyProfit",
    value: "AED 485,230",
    change: +12.5,
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success/10",
  },
]

export function MetricsWidget() {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.change > 0
        const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight

        return (
          <Card key={metric.key} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-success" : "text-destructive"}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{t(`dashboard.${metric.key}`)}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
