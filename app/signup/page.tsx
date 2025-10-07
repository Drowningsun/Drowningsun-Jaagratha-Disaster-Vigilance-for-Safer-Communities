"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, AlertTriangle, MapPin } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [coords, setCoords] = useState<[number, number] | null>(null)
  const [loadingLoc, setLoadingLoc] = useState(false)

  useEffect(() => {
    setLoadingLoc(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords([pos.coords.longitude, pos.coords.latitude])
          setLoadingLoc(false)
        },
        () => setLoadingLoc(false),
        { enableHighAccuracy: true, timeout: 8000 },
      )
    } else {
      setLoadingLoc(false)
    }
  }, [])

  async function onSubmit(formData: FormData) {
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      password: String(formData.get("password") || ""),
      role: "citizen",
      location: coords ? { type: "Point", coordinates: coords } : undefined,
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      toast({ title: "Account created", description: "You can sign in now." })
      router.replace("/")
    } else {
      const j = await res.json().catch(() => ({}))
      toast({ title: "Sign up failed", description: j?.error || "Please try again", variant: "destructive" })
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="transition-smooth hover:scale-105 hover:-translate-x-1">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Main card */}
        <div className="glass-effect rounded-2xl p-8 shadow-xl border border-border/50">
          {/* Header */}
          <div className="text-center mb-8 space-y-4">
            <div className="flex items-center justify-center space-x-3 mb-4 group">
              <div className="relative">
                <AlertTriangle className="h-10 w-10 text-accent transition-smooth group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse-subtle"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Jaagratha
              </h1>
            </div>
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-muted-foreground">Join our disaster response network</p>
          </div>

          {/* Signup Form with enhanced styling */}
          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input id="name" name="name" required className="transition-smooth focus:scale-[1.02]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input id="email" name="email" type="email" required className="transition-smooth focus:scale-[1.02]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone
              </Label>
              <Input id="phone" name="phone" required className="transition-smooth focus:scale-[1.02]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="transition-smooth focus:scale-[1.02]"
              />
            </div>

            <div className="flex items-center gap-2 text-sm p-3 bg-muted/50 rounded-lg border border-border/50">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">
                {loadingLoc
                  ? "Locating..."
                  : coords
                    ? `${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}`
                    : "Not set (optional)"}
              </span>
            </div>

            <Button type="submit" className="w-full transition-smooth hover:scale-[1.02] hover:shadow-lg">
              Sign Up
            </Button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              href="/signin"
              className="text-primary hover:underline font-medium transition-smooth hover:text-secondary"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
