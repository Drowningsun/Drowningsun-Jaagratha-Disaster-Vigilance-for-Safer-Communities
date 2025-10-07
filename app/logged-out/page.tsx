"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function LoggedOutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md text-center glass-effect border-border/50 shadow-xl animate-scale-in">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">You have been logged out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">Thank you for using our service. Stay safe!</p>
          <Button asChild className="transition-smooth hover:scale-105 hover:shadow-lg">
            <Link href="/">Return to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
