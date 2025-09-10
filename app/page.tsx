"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, BarChart3, Sun, Moon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

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
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 cursor-pointer bg-slate-200 transition-all duration-200 hover:scale-105 absolute overflow-hidden md:top-6 top-2 md:left-6 left-2"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
      <div className="space-y-2 absolute md:top-6 top-2 md:right-6 right-2">
        <Select
          value={language}
          onValueChange={(value: "en" | "ar") => setLanguage(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t("register.english")}</SelectItem>
            <SelectItem value="ar">{t("register.arabic")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="container mx-auto px-4 py-16  h-full min-h-screen flex flex-col justify-center items-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t("mainPage.heading")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("mainPage.subHeading")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>{t("mainPage.SmartAssessments")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {t("mainPage.SmartAssessmentsDetails")}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>{t("mainPage.TeamManagement")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("mainPage.TeamManagementDetails")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Award className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>{t("mainPage.Certification")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("mainPage.CertificationDetails")}</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>{t("mainPage.Analytics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{t("mainPage.AnalyticsDetails")}</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center gap-4 flex justify-center items-center">
          <Button size="lg" onClick={() => router.push("/register")} className=" cursor-pointer">
            {t("mainPage.getStarted")}
          </Button>
          <Button variant="outline" size="lg" onClick={() => router.push("/login")} className=" cursor-pointer">
            {t("auth.signIn")}
          </Button>
        </div>
      </div>
    </div>
  )
}
