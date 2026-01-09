"use client"

import { AppShell } from "@/components/layout/app-shell"
import { ProfitabilityReport } from "@/components/reports/profitability-report"

export default function ReportsPage() {
  return (
    <AppShell>
      <ProfitabilityReport />
    </AppShell>
  )
}
