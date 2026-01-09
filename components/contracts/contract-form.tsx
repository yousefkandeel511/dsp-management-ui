"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save } from "lucide-react"

interface PriceTier {
  id: number
  minOrders: string
  maxOrders: string
  pricePerOrder: string
}

export function ContractForm() {
  const { t } = useLanguage()
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([
    { id: 1, minOrders: "0", maxOrders: "100", pricePerOrder: "5.00" },
    { id: 2, minOrders: "101", maxOrders: "300", pricePerOrder: "4.50" },
  ])

  const addTier = () => {
    const lastTier = priceTiers[priceTiers.length - 1]
    setPriceTiers([
      ...priceTiers,
      {
        id: Date.now(),
        minOrders: lastTier ? String(Number(lastTier.maxOrders) + 1) : "0",
        maxOrders: "",
        pricePerOrder: "",
      },
    ])
  }

  const removeTier = (id: number) => {
    if (priceTiers.length > 1) {
      setPriceTiers(priceTiers.filter((tier) => tier.id !== id))
    }
  }

  const updateTier = (id: number, field: keyof PriceTier, value: string) => {
    setPriceTiers(priceTiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)))
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="font-semibold">Contract Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client / 3PL Name</Label>
              <Input id="clientName" placeholder="e.g., Talabat, Noon, Careem" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery Services</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="courier">Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone">Service Zone</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai-central">Dubai Central</SelectItem>
                  <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                  <SelectItem value="sharjah">Sharjah</SelectItem>
                  <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing Rules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{t("contracts.pricingRules")}</h3>
            <Button onClick={addTier} variant="outline" size="sm">
              <Plus className="h-4 w-4 me-2" />
              {t("contracts.addTier")}
            </Button>
          </div>
          <div className="space-y-3">
            {priceTiers.map((tier, index) => (
              <div key={tier.id} className="p-4 bg-secondary rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tier {index + 1}</span>
                  {priceTiers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTier(tier.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Min Orders</Label>
                    <Input
                      type="number"
                      value={tier.minOrders}
                      onChange={(e) => updateTier(tier.id, "minOrders", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Max Orders</Label>
                    <Input
                      type="number"
                      value={tier.maxOrders}
                      onChange={(e) => updateTier(tier.id, "maxOrders", e.target.value)}
                      placeholder="Unlimited"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Price/Order (AED)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={tier.pricePerOrder}
                      onChange={(e) => updateTier(tier.id, "pricePerOrder", e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button variant="outline">{t("common.cancel")}</Button>
        <Button>
          <Save className="h-4 w-4 me-2" />
          {t("common.save")}
        </Button>
      </div>
    </div>
  )
}
