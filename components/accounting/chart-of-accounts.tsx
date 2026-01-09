"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronRight, ChevronDown, Plus, Folder, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface Account {
  id: string
  code: string
  name: string
  type: "group" | "account"
  balance?: number
  children?: Account[]
}

const initialChartOfAccounts: Account[] = [
  {
    id: "1",
    code: "1000",
    name: "Assets",
    type: "group",
    children: [
      {
        id: "1-1",
        code: "1100",
        name: "Current Assets",
        type: "group",
        children: [
          { id: "1-1-1", code: "1110", name: "Cash in Hand", type: "account", balance: 25000 },
          { id: "1-1-2", code: "1120", name: "Bank Accounts", type: "account", balance: 485000 },
          { id: "1-1-3", code: "1130", name: "Accounts Receivable", type: "account", balance: 125000 },
        ],
      },
      {
        id: "1-2",
        code: "1200",
        name: "Fixed Assets",
        type: "group",
        children: [
          { id: "1-2-1", code: "1210", name: "Vehicles", type: "account", balance: 850000 },
          { id: "1-2-2", code: "1220", name: "Equipment", type: "account", balance: 45000 },
        ],
      },
    ],
  },
  {
    id: "2",
    code: "2000",
    name: "Liabilities",
    type: "group",
    children: [
      {
        id: "2-1",
        code: "2100",
        name: "Current Liabilities",
        type: "group",
        children: [
          { id: "2-1-1", code: "2110", name: "Accounts Payable", type: "account", balance: 78000 },
          { id: "2-1-2", code: "2120", name: "Driver Loans", type: "account", balance: 45000 },
        ],
      },
    ],
  },
  {
    id: "3",
    code: "3000",
    name: "Equity",
    type: "group",
    children: [
      { id: "3-1", code: "3100", name: "Owner Capital", type: "account", balance: 500000 },
      { id: "3-2", code: "3200", name: "Retained Earnings", type: "account", balance: 280000 },
    ],
  },
  {
    id: "4",
    code: "4000",
    name: "Income",
    type: "group",
    children: [
      { id: "4-1", code: "4100", name: "Delivery Revenue", type: "account", balance: 1250000 },
      { id: "4-2", code: "4200", name: "Contract Revenue", type: "account", balance: 350000 },
    ],
  },
  {
    id: "5",
    code: "5000",
    name: "Expenses",
    type: "group",
    children: [
      { id: "5-1", code: "5100", name: "Salaries & Wages", type: "account", balance: 420000 },
      { id: "5-2", code: "5200", name: "Fuel Expenses", type: "account", balance: 185000 },
      { id: "5-3", code: "5300", name: "Vehicle Maintenance", type: "account", balance: 65000 },
      { id: "5-4", code: "5400", name: "Insurance", type: "account", balance: 42000 },
    ],
  },
]

function AccountNode({ account, level = 0 }: { account: Account; level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = account.children && account.children.length > 0

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors",
          level > 0 && "ms-4",
        )}
        style={{ marginInlineStart: level * 16 }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          <button className="p-0.5">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        ) : (
          <span className="w-5" />
        )}
        {account.type === "group" ? (
          <Folder className="h-4 w-4 text-primary" />
        ) : (
          <FileText className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="font-mono text-sm text-muted-foreground">{account.code}</span>
        <span className="flex-1 text-sm font-medium">{account.name}</span>
        {account.balance !== undefined && (
          <span className="font-mono text-sm">AED {account.balance.toLocaleString()}</span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {account.children!.map((child) => (
            <AccountNode key={child.id} account={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ChartOfAccounts() {
  const { t } = useLanguage()
  const [accounts, setAccounts] = useState(initialChartOfAccounts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAccount, setNewAccount] = useState({
    code: "",
    name: "",
    type: "account" as "group" | "account",
    parentGroup: "",
  })

  const parentGroups = [
    { code: "1000", name: "Assets" },
    { code: "1100", name: "Current Assets" },
    { code: "1200", name: "Fixed Assets" },
    { code: "2000", name: "Liabilities" },
    { code: "2100", name: "Current Liabilities" },
    { code: "3000", name: "Equity" },
    { code: "4000", name: "Income" },
    { code: "5000", name: "Expenses" },
  ]

  const handleAddAccount = () => {
    if (!newAccount.code || !newAccount.name) return

    const addToGroup = (items: Account[], parentCode: string): Account[] => {
      return items.map((item) => {
        if (item.code === parentCode) {
          const newChild: Account = {
            id: `${item.id}-${Date.now()}`,
            code: newAccount.code,
            name: newAccount.name,
            type: newAccount.type,
            balance: newAccount.type === "account" ? 0 : undefined,
            children: newAccount.type === "group" ? [] : undefined,
          }
          return {
            ...item,
            children: [...(item.children || []), newChild],
          }
        }
        if (item.children) {
          return { ...item, children: addToGroup(item.children, parentCode) }
        }
        return item
      })
    }

    if (newAccount.parentGroup) {
      setAccounts(addToGroup(accounts, newAccount.parentGroup))
    }

    setNewAccount({ code: "", name: "", type: "account", parentGroup: "" })
    setIsAddDialogOpen(false)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("accounting.chartOfAccounts")}</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground" size="sm">
                <Plus className="h-4 w-4 me-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>Create a new account in the chart of accounts</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="account-code">Account Code *</Label>
                  <Input
                    id="account-code"
                    placeholder="e.g., 1140"
                    value={newAccount.code}
                    onChange={(e) => setNewAccount({ ...newAccount, code: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name *</Label>
                  <Input
                    id="account-name"
                    placeholder="e.g., Petty Cash"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Select
                    value={newAccount.type}
                    onValueChange={(value) => setNewAccount({ ...newAccount, type: value as "group" | "account" })}
                  >
                    <SelectTrigger id="account-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account (Ledger)</SelectItem>
                      <SelectItem value="group">Group (Category)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-group">Parent Group *</Label>
                  <Select
                    value={newAccount.parentGroup}
                    onValueChange={(value) => setNewAccount({ ...newAccount, parentGroup: value })}
                  >
                    <SelectTrigger id="parent-group">
                      <SelectValue placeholder="Select parent group" />
                    </SelectTrigger>
                    <SelectContent>
                      {parentGroups.map((group) => (
                        <SelectItem key={group.code} value={group.code}>
                          {group.code} - {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAccount}
                  disabled={!newAccount.code || !newAccount.name || !newAccount.parentGroup}
                >
                  Add Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {accounts.map((account) => (
            <AccountNode key={account.id} account={account} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
