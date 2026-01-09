"use client"

import { AppShell } from "@/components/layout/app-shell"
import { ExpensesList } from "@/components/operations/expenses-list"

export default function ExpensesPage() {
  return (
    <AppShell>
      <ExpensesList />
    </AppShell>
  )
}
