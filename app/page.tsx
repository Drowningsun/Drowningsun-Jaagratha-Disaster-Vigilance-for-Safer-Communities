import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, MapPin, Users, Zap, Bell } from "lucide-react"
import { ModeSwitch } from "@/components/mode-switch"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <AlertTriangle className="h-8 w-8 text-accent transition-smooth group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full animate-pulse-subtle"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Jaagratha
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ModeSwitch />
            <Button variant="ghost" asChild className="transition-smooth hover:scale-105">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="transition-smooth hover:scale-105 hover:shadow-lg">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent mb-4 animate-scale-in">
            🚨 Advanced Disaster Management Platform
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
            Disaster Vigilance for
            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Safer Communities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Advanced disaster prediction and emergency response system. Get real-time alerts, coordinate rescue
            operations, and protect your community with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild className="transition-smooth hover:scale-105 hover:shadow-xl group">
              <Link href="/signin" className="flex items-center gap-2">
                Access Dashboard
                <Zap className="w-4 h-4 transition-smooth group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="transition-smooth hover:scale-105 hover:shadow-lg bg-transparent"
            >
              <Link href="/signup">Join as Citizen</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover-lift border-border/50 bg-card/50 backdrop-blur-sm animate-slide-in-left">
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-smooth group-hover:scale-110 group-hover:bg-primary/20">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Live maps with disaster tracking, weather monitoring, and risk assessment for your area.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-smooth group-hover:scale-110 group-hover:bg-accent/20">
                <Bell className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-xl">Smart Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Instant notifications for potential disasters with AI-powered prediction and early warning systems.
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover-lift border-border/50 bg-card/50 backdrop-blur-sm animate-slide-in-right"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 transition-smooth group-hover:scale-110 group-hover:bg-secondary/20">
                <Users className="h-7 w-7 text-secondary" />
              </div>
              <CardTitle className="text-xl">Rescue Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Efficient coordination between rescue teams, relief centers, and emergency services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20 text-center text-primary-foreground">
          <div className="max-w-3xl mx-auto space-y-6 animate-scale-in">
            <h3 className="text-4xl font-bold text-balance">Ready to Protect Your Community?</h3>
            <p className="text-xl opacity-95 leading-relaxed text-pretty">
              Join thousands of users already using Jaagratha for disaster preparedness.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="transition-smooth hover:scale-105 hover:shadow-2xl mt-6"
            >
              <Link href="/signin" className="flex items-center gap-2">
                Start Now
                <Zap className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 group">
            <Shield className="h-6 w-6 text-primary transition-smooth group-hover:scale-110" />
            <span className="text-lg font-semibold">Jaagratha — Disaster Vigilance</span>
          </div>
          <p className="text-muted-foreground text-sm">Protecting communities through technology and preparedness.</p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
            <a href="#" className="transition-smooth hover:text-primary hover:underline">
              Privacy
            </a>
            <a href="#" className="transition-smooth hover:text-primary hover:underline">
              Terms
            </a>
            <a href="#" className="transition-smooth hover:text-primary hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
