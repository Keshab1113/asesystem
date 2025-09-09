import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/lib/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"
// import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import "./globals.css"
import { ToastProvider } from "@/hooks/ToastContext"

export const metadata: Metadata = {
  title: "Quiz Assessment System",
  description: "Professional quiz and assessment management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
              <Suspense fallback={null}>
                {children}
              </Suspense>
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
