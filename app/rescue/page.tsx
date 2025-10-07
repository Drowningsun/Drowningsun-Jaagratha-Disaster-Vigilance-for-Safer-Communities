"use client"

import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"
import { MapClient } from "@/components/map/map-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RescueTabs } from "@/components/rescue/rescue-tabs"
import { Button } from "@/components/ui/button"
import { MapPin, LogOut, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RescueDashboard() {
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const defaultCenter = { lat: 10.068, lng: 76.628 }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    console.log("[Rescue] Page mounted - cleaning up orphaned maps")
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const orphanedMaps = document.querySelectorAll(".leaflet-container")
        orphanedMaps.forEach((mapElement) => {
          const parent = mapElement.parentElement
          if (parent && !parent.closest('[data-map-active="true"]')) {
            try {
              mapElement.remove()
            } catch (e) {
              console.warn("Rescue map cleanup warning:", e)
            }
          }
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Live Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[520px] bg-muted rounded-lg flex items-center justify-center animate-pulse">
                  <div></div>
                </div>
              </CardContent>
            </Card>
          </section>
          <aside className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Rescue Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center animate-pulse">
                  <div className="text-muted-foreground">Loading...</div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    )
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
              <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg">
                <MapClient initial={defaultCenter} height={520} />
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6 animate-slide-in-right">
          <RescueTabs />

          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full transition-smooth hover:scale-[1.02] hover:shadow-lg"
              onClick={async () => {
                try {
                  const res = await fetch("/api/reports/seed", { method: "POST" })
                  const data = await res.json()
                  if (res.ok) {
                    toast({
                      title: "Sample reports created",
                      description: `Added ${data.count} incident reports`,
                    })
                    window.location.reload()
                  } else {
                    toast({
                      title: "Failed to create reports",
                      description: data.error || "Unknown error",
                      variant: "destructive",
                    })
                  }
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to create sample reports",
                    variant: "destructive",
                  })
                }
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Add Sample Reports
            </Button>

            <Button
              variant="outline"
              className="w-full transition-smooth hover:scale-[1.02] bg-transparent"
              onClick={() => signOut({ callbackUrl: "/logged-out" })}
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
