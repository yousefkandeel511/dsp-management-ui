"use client"

import type React from "react"

import { useLanguage } from "@/contexts/language-context"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { direction } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn("transition-all duration-300", direction === "rtl" ? "mr-64" : "ml-64")}>
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
