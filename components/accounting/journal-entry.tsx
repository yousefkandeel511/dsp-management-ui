"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, AlertCircle, CheckCircle } from "lucide-react"

interface EntryLine {
  id: number
  account: string
  description: string
  debit: string
  credit: string
}

const accounts = [
  { code: "1110", name: "Cash in Hand" },
  { code: "1120", name: "Bank Accounts" },
  { code: "1130", name: "Accounts Receivable" },
  { code: "2110", name: "Accounts Payable" },
  { code: "4100", name: "Delivery Revenue" },
  { code: "5100", name: "Salaries & Wages" },
  { code: "5200", name: "Fuel Expenses" },
]

export function JournalEntry() {
  const { t } = useLanguage()
  const [lines, setLines] = useState<EntryLine[]>([
    { id: 1, account: "", description: "", debit: "", credit: "" },
    { id: 2, account: "", description: "", debit: "", credit: "" },
  ])

  const addLine = () => {
    setLines([...lines, { id: Date.now(), account: "", description: "", debit: "", credit: "" }])
  }

  const removeLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter((line) => line.id !== id))
    }
  }

  const updateLine = (id: number, field: keyof EntryLine, value: string) => {
    setLines(lines.map((line) => (line.id === id ? { ...line, [field]: value } : line)))
  }

  const totalDebit = lines.reduce((sum, line) => sum + (Number.parseFloat(line.debit) || 0), 0)
  const totalCredit = lines.reduce((sum, line) => sum + (Number.parseFloat(line.credit) || 0), 0)
  const isBalanced = totalDebit === totalCredit && totalDebit > 0

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>{t("accounting.journalEntry")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Entry Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Entry Date</Label>
            <Input type="date" className="bg-secondary" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="space-y-2">
            <Label>Reference Number</Label>
            <Input className="bg-secondary" placeholder="JE-2024-001" />
          </div>
          <div className="space-y-2">
            <Label>Entry Type</Label>
            <Select>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Entry</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
                <SelectItem value="closing">Closing Entry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description / Memo</Label>
          <Textarea className="bg-secondary resize-none" placeholder="Enter entry description..." rows={2} />
        </div>

        {/* Entry Lines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Entry Lines</Label>
            <Button onClick={addLine} variant="outline" size="sm">
              <Plus className="h-4 w-4 me-2" />
              Add Line
            </Button>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-secondary text-sm font-medium">
              <div className="col-span-3">Account</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2 text-end">{t("accounting.debit")}</div>
              <div className="col-span-2 text-end">{t("accounting.credit")}</div>
              <div className="col-span-1"></div>
            </div>
            {lines.map((line) => (
              <div key={line.id} className="grid grid-cols-12 gap-2 p-3 border-t border-border items-center">
                <div className="col-span-3">
                  <Select value={line.account} onValueChange={(value) => updateLine(line.id, "account", value)}>
                    <SelectTrigger className="bg-secondary">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((acc) => (
                        <SelectItem key={acc.code} value={acc.code}>
                          {acc.code} - {acc.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-4">
                  <Input
                    className="bg-secondary"
                    placeholder="Line description"
                    value={line.description}
                    onChange={(e) => updateLine(line.id, "description", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    className="bg-secondary text-end"
                    placeholder="0.00"
                    value={line.debit}
                    onChange={(e) => updateLine(line.id, "debit", e.target.value)}
                    disabled={!!line.credit}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    className="bg-secondary text-end"
                    placeholder="0.00"
                    value={line.credit}
                    onChange={(e) => updateLine(line.id, "credit", e.target.value)}
                    disabled={!!line.debit}
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 2}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {/* Totals Row */}
            <div className="grid grid-cols-12 gap-2 p-3 border-t border-border bg-secondary font-medium">
              <div className="col-span-7 text-end">Total</div>
              <div className="col-span-2 text-end font-mono">AED {totalDebit.toFixed(2)}</div>
              <div className="col-span-2 text-end font-mono">AED {totalCredit.toFixed(2)}</div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </div>

        {/* Balance Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isBalanced ? (
              <>
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-success">Entry is balanced</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-destructive" />
                <span className="text-destructive">
                  {t("accounting.mustBalance")} (Difference: AED {Math.abs(totalDebit - totalCredit).toFixed(2)})
                </span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline">{t("common.cancel")}</Button>
            <Button className="bg-primary text-primary-foreground" disabled={!isBalanced}>
              <Save className="h-4 w-4 me-2" />
              Post Entry
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
