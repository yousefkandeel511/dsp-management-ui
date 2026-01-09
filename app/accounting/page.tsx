"use client"

import { AppShell } from "@/components/layout/app-shell"
import { ChartOfAccounts } from "@/components/accounting/chart-of-accounts"
import { JournalEntry } from "@/components/accounting/journal-entry"

export default function AccountingPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <ChartOfAccounts />
        <JournalEntry />
      </div>
    </AppShell>
  )
}
