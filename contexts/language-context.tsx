"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.contracts": "Contracts",
    "nav.fleet": "Fleet Management",
    "nav.drivers": "Drivers",
    "nav.vehicles": "Vehicles",
    "nav.accommodation": "Accommodation",
    "nav.operations": "Operations",
    "nav.expenses": "Expenses",
    "nav.fines": "Traffic Fines",
    "nav.hr": "HR & Payroll",
    "nav.accounting": "Accounting",
    "nav.reports": "Reports",
    "nav.settings": "Settings",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.alerts": "Action Required",
    "dashboard.metrics": "Key Metrics",
    "dashboard.activity": "Recent Activity",
    "dashboard.activeDrivers": "Active Drivers",
    "dashboard.vehiclesOnRoad": "Vehicles on Road",
    "dashboard.monthlyProfit": "Monthly Profit",
    "dashboard.residenceExpiring": "Driver Residences Expiring Soon",
    "dashboard.insuranceExpiring": "Vehicle Insurances Expiring",

    // Fleet
    "fleet.driverList": "Driver List",
    "fleet.driverProfile": "Driver Profile",
    "fleet.vehicleList": "Vehicle List",
    "fleet.vehicleProfile": "Vehicle Profile",
    "fleet.basicInfo": "Basic Info",
    "fleet.documents": "Documents",
    "fleet.financials": "Financials",
    "fleet.performance": "Performance",
    "fleet.maintenance": "Maintenance",
    "fleet.status": "Status",
    "fleet.active": "Active",
    "fleet.onLeave": "On Leave",
    "fleet.inactive": "Inactive",
    "fleet.assignedVehicle": "Assigned Vehicle",
    "fleet.assignedDriver": "Assigned Driver",
    "fleet.documentStatus": "Document Status",

    // HR & Payroll
    "hr.payroll": "Payroll Processing",
    "hr.baseSalary": "Base Salary",
    "hr.commission": "Commission",
    "hr.deductions": "Deductions",
    "hr.netSalary": "Net Salary",
    "hr.processPayment": "Process Payment",

    // Contracts
    "contracts.setup": "Contract Setup",
    "contracts.pricingRules": "Pricing Rules",
    "contracts.addTier": "Add Price Tier",
    "contracts.list": "Contract List",

    // Accounting
    "accounting.chartOfAccounts": "Chart of Accounts",
    "accounting.journalEntry": "Journal Entry",
    "accounting.debit": "Debit",
    "accounting.credit": "Credit",
    "accounting.mustBalance": "Entries must balance",

    // Reports
    "reports.profitability": "Profitability Report",
    "reports.incomeVsExpenses": "Income vs Expenses",
    "reports.vehicleProfit": "Vehicle Net Profit",

    // Settings
    "settings.title": "Settings",
    "settings.general": "General",
    "settings.appearance": "Appearance",
    "settings.notifications": "Notifications",
    "settings.security": "Security",
    "settings.companyInfo": "Company Information",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "settings.timezone": "Timezone",
    "settings.currency": "Currency",

    // Common
    "common.search": "Search...",
    "common.notifications": "Notifications",
    "common.profile": "Profile",
    "common.logout": "Logout",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.add": "Add",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.upload": "Upload",
    "common.download": "Download",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.all": "All",
    "common.actions": "Actions",
  },
  ar: {
    // Navigation
    "nav.dashboard": "لوحة التحكم",
    "nav.contracts": "العقود",
    "nav.fleet": "إدارة الأسطول",
    "nav.drivers": "السائقين",
    "nav.vehicles": "المركبات",
    "nav.accommodation": "السكن",
    "nav.operations": "العمليات",
    "nav.expenses": "المصروفات",
    "nav.fines": "المخالفات المرورية",
    "nav.hr": "الموارد البشرية والرواتب",
    "nav.accounting": "المحاسبة",
    "nav.reports": "التقارير",
    "nav.settings": "الإعدادات",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.alerts": "إجراء مطلوب",
    "dashboard.metrics": "المقاييس الرئيسية",
    "dashboard.activity": "النشاط الأخير",
    "dashboard.activeDrivers": "السائقين النشطين",
    "dashboard.vehiclesOnRoad": "المركبات على الطريق",
    "dashboard.monthlyProfit": "الربح الشهري",
    "dashboard.residenceExpiring": "إقامات السائقين تنتهي قريباً",
    "dashboard.insuranceExpiring": "تأمينات المركبات تنتهي",

    // Fleet
    "fleet.driverList": "قائمة السائقين",
    "fleet.driverProfile": "ملف السائق",
    "fleet.vehicleList": "قائمة المركبات",
    "fleet.vehicleProfile": "ملف المركبة",
    "fleet.basicInfo": "المعلومات الأساسية",
    "fleet.documents": "المستندات",
    "fleet.financials": "الماليات",
    "fleet.performance": "الأداء",
    "fleet.maintenance": "الصيانة",
    "fleet.status": "الحالة",
    "fleet.active": "نشط",
    "fleet.onLeave": "في إجازة",
    "fleet.inactive": "غير نشط",
    "fleet.assignedVehicle": "المركبة المخصصة",
    "fleet.assignedDriver": "السائق المخصص",
    "fleet.documentStatus": "حالة المستندات",

    // HR & Payroll
    "hr.payroll": "معالجة الرواتب",
    "hr.baseSalary": "الراتب الأساسي",
    "hr.commission": "العمولة",
    "hr.deductions": "الخصومات",
    "hr.netSalary": "صافي الراتب",
    "hr.processPayment": "معالجة الدفع",

    // Contracts
    "contracts.setup": "إعداد العقد",
    "contracts.pricingRules": "قواعد التسعير",
    "contracts.addTier": "إضافة مستوى سعر",
    "contracts.list": "قائمة العقود",

    // Accounting
    "accounting.chartOfAccounts": "شجرة الحسابات",
    "accounting.journalEntry": "قيد يومية",
    "accounting.debit": "مدين",
    "accounting.credit": "دائن",
    "accounting.mustBalance": "يجب أن تتوازن القيود",

    // Reports
    "reports.profitability": "تقرير الربحية",
    "reports.incomeVsExpenses": "الإيرادات مقابل المصروفات",
    "reports.vehicleProfit": "صافي ربح المركبة",

    // Settings
    "settings.title": "الإعدادات",
    "settings.general": "عام",
    "settings.appearance": "المظهر",
    "settings.notifications": "الإشعارات",
    "settings.security": "الأمان",
    "settings.companyInfo": "معلومات الشركة",
    "settings.theme": "السمة",
    "settings.language": "اللغة",
    "settings.timezone": "المنطقة الزمنية",
    "settings.currency": "العملة",

    // Common
    "common.search": "بحث...",
    "common.notifications": "الإشعارات",
    "common.profile": "الملف الشخصي",
    "common.logout": "تسجيل الخروج",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.add": "إضافة",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.view": "عرض",
    "common.upload": "رفع",
    "common.download": "تحميل",
    "common.filter": "تصفية",
    "common.export": "تصدير",
    "common.all": "الكل",
    "common.actions": "الإجراءات",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const direction: Direction = language === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language, direction])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
