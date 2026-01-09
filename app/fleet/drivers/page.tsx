"use client"

import { AppShell } from "@/components/layout/app-shell"
import { DriverList } from "@/components/fleet/driver-list"

export default function DriversPage() {
  return (
    <AppShell>
      <DriverList />
    </AppShell>
  )
}
