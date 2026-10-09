import { db } from "@/lib/db"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
  let settings = await db.siteSettings.findFirst()

  if (!settings) {
    settings = {
      id: "new",
      companyName: "Zirve Akbaş İnşaat",
      email: "insaatzirveakbas@gmail.com",
      phone: "+90 532 000 00 00",
      address: "İstanbul",
      mapEmbedUrl: "",
      schemaJson: null,
      logoUrl: "/logo.png"
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Genel Ayarlar</h1>
        <p className="text-muted-foreground">Sitenizin iletişim ve temel bilgilerini güncelleyin.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  )
}
