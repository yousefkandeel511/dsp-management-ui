"use client"

import { AppShell } from "@/components/layout/app-shell"
import { VehicleList } from "@/components/fleet/vehicle-list"

export default function VehiclesPage() {
  return (
    <AppShell>
      <VehicleList />
    </AppShell>
  )
}
