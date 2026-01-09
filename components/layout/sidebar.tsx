"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import {
  LayoutDashboard,
  FileText,
  Truck,
  Users,
  Car,
  Home,
  Receipt,
  AlertTriangle,
  Wallet,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { key: "nav.dashboard", href: "/", icon: LayoutDashboard },
  { key: "nav.contracts", href: "/contracts", icon: FileText },
  {
    key: "nav.fleet",
    icon: Truck,
    children: [
      { key: "nav.drivers", href: "/fleet/drivers", icon: Users },
      { key: "nav.vehicles", href: "/fleet/vehicles", icon: Car },
      { key: "nav.accommodation", href: "/fleet/accommodation", icon: Home },
    ],
  },
  {
    key: "nav.operations",
    icon: Receipt,
    children: [
      { key: "nav.expenses", href: "/operations/expenses", icon: Wallet },
      { key: "nav.fines", href: "/operations/fines", icon: AlertTriangle },
    ],
  },
  { key: "nav.hr", href: "/hr-payroll", icon: Users },
  { key: "nav.accounting", href: "/accounting", icon: BookOpen },
  { key: "nav.reports", href: "/reports", icon: BarChart3 },
  { key: "nav.settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["nav.fleet", "nav.operations"])
  const pathname = usePathname()
  const { t, direction } = useLanguage()

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const CollapseIcon = direction === "rtl" ? ChevronRight : ChevronLeft
  const ExpandIcon = direction === "rtl" ? ChevronLeft : ChevronRight

  return (
    <aside
      className={cn(
        "fixed top-0 h-screen bg-sidebar border-sidebar-border flex flex-col transition-all duration-300 z-40",
        direction === "rtl" ? "right-0 border-l" : "left-0 border-r",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">DSP Manager</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ExpandIcon className="h-4 w-4" /> : <CollapseIcon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.key)
            const hasChildren = "children" in item && item.children

            if (hasChildren) {
              const isChildActive = item.children.some((child) => pathname.startsWith(child.href))
              return (
                <li key={item.key}>
                  <button
                    onClick={() => toggleExpanded(item.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      collapsed && "justify-center",
                      isChildActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-start text-sm">{t(item.key)}</span>
                        <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                      </>
                    )}
                  </button>
                  {!collapsed && isExpanded && (
                    <ul className="mt-1 space-y-1 ps-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        const isActive = pathname === child.href || pathname.startsWith(child.href + "/")
                        return (
                          <li key={child.key}>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent",
                              )}
                            >
                              <ChildIcon className="h-4 w-4 shrink-0" />
                              <span>{t(child.key)}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            }

            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href!)
            return (
              <li key={item.key}>
                <Link
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    collapsed && "justify-center",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="text-sm">{t(item.key)}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60 text-center">DSP Manager v1.0</p>
        </div>
      )}
    </aside>
  )
}
