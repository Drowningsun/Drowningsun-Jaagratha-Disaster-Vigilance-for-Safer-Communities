"use client"

import { Suspense, useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { MapClient } from "@/components/map/map-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertList } from "@/components/dashboard/alert-list"
import { ReportIncidentDialog } from "@/components/citizen/report-incident-dialog"
import { NearbyEvents } from "@/components/dashboard/nearby-events"
import { MapPin, LocateFixed, LogOut, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const defaultCenter = { lat: 10.068, lng: 76.628 }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    console.log("[Dashboard] Page mounted - cleaning up orphaned maps")
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const orphanedMaps = document.querySelectorAll(".leaflet-container")
        orphanedMaps.forEach((mapElement) => {
          const parent = mapElement.parentElement
          if (parent && !parent.closest('[data-map-active="true"]')) {
            try {
              mapElement.remove()
            } catch (e) {
              console.warn("Dashboard map cleanup warning:", e)
            }
          }
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [mounted])

  async function findNearest() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      const res = await fetch("/api/relief-centers/nearest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      })
      const j = await res.json().catch(() => ({}))
      if (res.ok && j?.center) {
        const c = j.center
        window.dispatchEvent(new CustomEvent("jaagratha:panTo", { detail: { lat: c.lat, lng: c.lng, title: c.name } }))
      } else {
        console.log("[v0] nearest center error:", j?.error)
      }
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        <section className="md:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Live Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="h-[520px] bg-muted rounded-lg animate-pulse"></div>}>
                <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
                  <MapClient initial={defaultCenter} height={520} />
                </div>
              </Suspense>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6 animate-slide-in-right">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle className="text-lg">Local Alerts (150km radius)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Suspense fallback={<div className="h-40 bg-muted rounded-lg animate-pulse"></div>}>
                <AlertList />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover-lift">
            <CardHeader>
              <CardTitle className="text-lg">Nearby Global Events</CardTitle>
            </CardHeader>
            <CardContent>
              <NearbyEvents />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            <ReportIncidentDialog />
            <Button
              onClick={findNearest}
              variant="secondary"
              className="transition-smooth hover:scale-[1.02] hover:shadow-lg"
            >
              <LocateFixed className="w-4 h-4 mr-2" />
              Find Nearest Relief Center
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const res = await fetch("/api/alerts/seed", { method: "POST" })
                  const data = await res.json()
                  if (res.ok) {
                    toast({
                      title: "Sample alerts created",
                      description: `Added ${data.count} local alerts`,
                    })
                    window.location.reload()
                  } else {
                    toast({
                      title: "Failed to create alerts",
                      description: data.error,
                      variant: "destructive",
                    })
                  }
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to create sample alerts",
                    variant: "destructive",
                  })
                }
              }}
              className="transition-smooth hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Add Sample Local Alerts
            </Button>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/logged-out" })}
              className="transition-smooth hover:scale-[1.02]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </aside>
      </div>
    </main>
  )
}
