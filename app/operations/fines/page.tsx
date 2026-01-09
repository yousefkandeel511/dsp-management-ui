"use client"

import { AppShell } from "@/components/layout/app-shell"
import { FinesLog } from "@/components/operations/fines-log"

export default function FinesPage() {
  return (
    <AppShell>
      <FinesLog />
    </AppShell>
  )
}
