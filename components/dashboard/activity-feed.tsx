"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Activity } from "lucide-react"

const activities = [
  {
    id: 1,
    user: "Ahmed",
    action: "assigned to",
    target: "Vehicle TXY-4521",
    time: "2 min ago",
    initials: "AH",
  },
  {
    id: 2,
    user: "System",
    action: "recorded traffic fine for",
    target: "Driver Mohammed",
    time: "15 min ago",
    initials: "SY",
  },
  {
    id: 3,
    user: "Sara",
    action: "processed payroll for",
    target: "December 2024",
    time: "1 hour ago",
    initials: "SA",
  },
  {
    id: 4,
    user: "Admin",
    action: "added new contract",
    target: "Talabat - Zone A",
    time: "3 hours ago",
    initials: "AD",
  },
  {
    id: 5,
    user: "Hassan",
    action: "updated documents for",
    target: "Driver Ali",
    time: "5 hours ago",
    initials: "HA",
  },
]

export function ActivityFeed() {
  const { t } = useLanguage()

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          {t("dashboard.activity")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-secondary text-xs">{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium text-primary">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
