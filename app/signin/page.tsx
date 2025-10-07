import Link from "next/link"
import { LoginTabs } from "@/components/auth/login-tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle } from "lucide-react"

export default function SignInPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Back button with hover effect */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="transition-smooth hover:scale-105 hover:-translate-x-1">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Main card with glass effect */}
        <div className="glass-effect rounded-2xl p-8 shadow-xl border border-border/50">
          {/* Header with enhanced styling */}
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
            <h2 className="text-2xl font-semibold text-balance">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">Access your disaster monitoring dashboard</p>
          </div>

          {/* Login Form */}
          <LoginTabs />

          {/* Additional Links with hover effect */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium transition-smooth hover:text-secondary"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
