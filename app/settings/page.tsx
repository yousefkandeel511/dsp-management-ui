"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "@/contexts/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Palette,
  Bell,
  Shield,
  Globe,
  Sun,
  Moon,
  Monitor,
  Save,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t("settings.title")}</h1>
            <p className="text-muted-foreground">Manage your application preferences and company settings</p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved!" : t("common.save")}
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="general" className="gap-2">
              <Building2 className="h-4 w-4" />
              {t("settings.general")}
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              {t("settings.appearance")}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              {t("settings.notifications")}
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              {t("settings.security")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t("settings.companyInfo")}
                </CardTitle>
                <CardDescription>Update your company details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="DSP Fleet Management LLC" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tradeLicense">Trade License Number</Label>
                    <Input id="tradeLicense" defaultValue="TL-2024-12345" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline me-2" />
                      Email Address
                    </Label>
                    <Input id="email" type="email" defaultValue="admin@dspfleet.ae" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline me-2" />
                      Phone Number
                    </Label>
                    <Input id="phone" defaultValue="+971 4 123 4567" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">
                      <MapPin className="h-4 w-4 inline me-2" />
                      Address
                    </Label>
                    <Input id="address" defaultValue="Building 15, Industrial Area 3, Dubai, UAE" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>Configure language, timezone, and currency preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>{t("settings.language")}</Label>
                    <Select value={language} onValueChange={(val) => setLanguage(val as "en" | "ar")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings.timezone")}</Label>
                    <Select defaultValue="dubai">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai (GMT+4)</SelectItem>
                        <SelectItem value="riyadh">Riyadh (GMT+3)</SelectItem>
                        <SelectItem value="cairo">Cairo (GMT+2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("settings.currency")}</Label>
                    <Select defaultValue="aed">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aed">AED - UAE Dirham</SelectItem>
                        <SelectItem value="sar">SAR - Saudi Riyal</SelectItem>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  {t("settings.theme")}
                </CardTitle>
                <CardDescription>Customize the appearance of your dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme("light")}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-colors",
                      theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="h-20 w-full rounded-md bg-white border border-border flex items-center justify-center">
                      <Sun className="h-8 w-8 text-amber-500" />
                    </div>
                    <span className="font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-colors",
                      theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="h-20 w-full rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center">
                      <Moon className="h-8 w-8 text-slate-300" />
                    </div>
                    <span className="font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-colors",
                      theme === "system" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    )}
                  >
                    <div className="h-20 w-full rounded-md bg-gradient-to-r from-white to-slate-900 border border-border flex items-center justify-center">
                      <Monitor className="h-8 w-8 text-slate-500" />
                    </div>
                    <span className="font-medium">System</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
                <CardDescription>Configure how data is displayed in tables and lists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing in tables and lists</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Avatars</Label>
                    <p className="text-sm text-muted-foreground">Display profile pictures in lists</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Items per page</Label>
                  <Select defaultValue="25">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Document Expiry Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when driver/vehicle documents are expiring
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payroll Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Reminder notifications before payroll processing dates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Traffic Fine Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new traffic fines are recorded</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Contract Renewals</Label>
                    <p className="text-sm text-muted-foreground">Alerts for upcoming contract renewal dates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
                <CardDescription>Configure when to receive expiry warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Document Expiry Warning (days)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days before</SelectItem>
                        <SelectItem value="14">14 days before</SelectItem>
                        <SelectItem value="30">30 days before</SelectItem>
                        <SelectItem value="60">60 days before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Contract Renewal Warning (days)</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days before</SelectItem>
                        <SelectItem value="60">60 days before</SelectItem>
                        <SelectItem value="90">90 days before</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Password Settings
                </CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="mt-4">Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <Button variant="destructive">Log Out All Devices</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
