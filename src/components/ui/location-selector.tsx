"use client"

import { useState, useEffect } from "react"
import citiesData from "@/lib/cities.json"

interface LocationSelectorProps {
  defaultValue?: string; // e.g. "Kağıthane, İstanbul"
}

export function LocationSelector({ defaultValue = "" }: LocationSelectorProps) {
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  
  useEffect(() => {
    if (defaultValue) {
      const parts = defaultValue.split(", ")
      if (parts.length === 2) {
        setDistrict(parts[0])
        setCity(parts[1])
      } else {
        setCity(defaultValue)
      }
    }
  }, [defaultValue])

  const selectedCity = citiesData.find(c => c.name === city)
  const districts = selectedCity ? selectedCity.districts : []

  // Derived combined location string
  const combinedLocation = district ? `${district}, ${city}` : city

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Hidden input to pass the data to the server action */}
      <input type="hidden" name="location" value={combinedLocation} />

      <div className="flex-1">
        <label className="text-sm font-medium text-foreground block mb-2">İl</label>
        <select 
          value={city} 
          onChange={(e) => {
            setCity(e.target.value)
            setDistrict("") // Reset district when city changes
          }} 
          className="w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
          required
        >
          <option value="" disabled>İl Seçiniz</option>
          {citiesData.map((c) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="text-sm font-medium text-foreground block mb-2">İlçe</label>
        <select 
          value={district} 
          onChange={(e) => setDistrict(e.target.value)} 
          className="w-full px-4 py-2.5 rounded-lg border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none disabled:opacity-50 disabled:bg-zinc-100"
          disabled={!city}
          required={!!city}
        >
          <option value="" disabled>İlçe Seçiniz</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
