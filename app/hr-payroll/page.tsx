"use client"

import { AppShell } from "@/components/layout/app-shell"
import { PayrollTable } from "@/components/hr/payroll-table"

export default function HRPayrollPage() {
  return (
    <AppShell>
      <PayrollTable />
    </AppShell>
  )
}
