"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Shield } from "lucide-react";
import { useToast } from "@/hooks/ToastContext";
import { useLanguage } from "@/lib/language-context";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { verifyOTP } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { t } = useLanguage();

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/register");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp.trim()) {
      setError("Please enter the OTP code");
      return;
    }

    setIsLoading(true);

    try {
      const success = await verifyOTP(email, otp);

      if (success) {
        toast({
          title: "Verification Successful",
          description: "Your account has been verified successfully.",
        });
        if (email === "keshabdas2003@kockw.com") {
          router.push("/adminDashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Invalid OTP code. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-0">
            <Shield className="h-8 w-8 text-primary mx-2" />
            <CardTitle className="text-2xl">{t("otp.title")}</CardTitle>
          </div>
          <CardDescription>{t("otp.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm font-medium">{email}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">{t("otp.verificationCode")}</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className={error ? "border-destructive" : ""}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? t("otp.verifying") : t("otp.verify")}
            </Button>
          </form>

          <div className="mt-4 text-center flex">
            <p className="text-sm text-muted-foreground mb-0">
              {t("otp.didntReceive")}
            </p>
            <Button variant="link" className="p-0 h-auto mx-1 cursor-pointer">
              {t("otp.resendCode")}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="p-0 h-auto text-sm cursor-pointer"
              onClick={() => router.push("/register")}
            >
              {t("otp.backToRegistration")}
            </Button>
          </div>

          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              <strong>Demo Note:</strong> Use code "123456" for testing
              purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
