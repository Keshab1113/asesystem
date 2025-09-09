"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, BarChart3 } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (isAuthenticated) {
  //       router.push("/dashboard")
  //     } else {
  //       router.push("/register")
  //     }
  //   }
  // }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Quiz Assessment System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional assessment platform for employee skill evaluation and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Smart Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive quizzes designed to evaluate technical and professional skills
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Organize and track assessment progress across your entire organization</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Certification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Earn certificates and track professional development milestones</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Detailed insights and performance analytics for continuous improvement</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => router.push("/register")} className="mr-4">
            Get Started
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/login")}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}
