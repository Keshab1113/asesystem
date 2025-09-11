"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Globe,
  User,
  Mail,
  Award as IdCard,
  Briefcase,
  Sun,
  Moon,
  UsersRound,
  MonitorCog,
} from "lucide-react";
import { useToast } from "@/hooks/ToastContext";
import { useTheme } from "next-themes";

export default function RegisterPage() {
  const { language, setLanguage, t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    employeeId: "",
    email: "",
    password: "",
    group: "",
    controllingTeam: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {}, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("register.fullName") + " is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = t("register.position") + " is required";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = t("register.employeeId") + " is required";
    }
    if (!formData.controllingTeam.trim()) {
      newErrors.controllingTeam = t("profile.controllingTeam") + " is required";
    }
    if (!formData.group.trim()) {
      newErrors.group = t("profile.group") + " is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = t("auth.emailAddress") + " is required";
    } else if (!formData.email.endsWith("@kockw.com")) {
      newErrors.email = t("auth.emailDomainError");
    }

    if (!formData.password) {
      newErrors.password = t("auth.password") + " is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        t("auth.password") + " must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const success = await register({
        fullName: formData.fullName,
        position: formData.position,
        employeeId: formData.employeeId,
        email: formData.email,
        language: language,
        controllingTeam: formData.controllingTeam,
        group: formData.group,
      });

      if (success) {
        toast({
          title: "Registration Successful",
          description: "Please check your email for OTP verification code.",
        });
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        toast({
          title: "Registration Failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 pt-10 md:pt-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-10 w-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-800 cursor-pointer bg-slate-200 transition-all duration-200 hover:scale-105 absolute overflow-hidden md:top-6 top-2 md:left-6 left-2"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-0">
            <Globe className="h-8 w-8 text-primary mx-2" />
            <CardTitle className="text-2xl">{t("register.title")}</CardTitle>
          </div>
          <CardDescription>{t("register.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="fullName">
                <User className="h-4 w-4 inline mr-2" />
                {t("register.fullName")}
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.fullName}</AlertDescription>
                </Alert>
              )}
            </div>
            <div className=" grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="space-y-2">
                <Label htmlFor="position">
                  <Briefcase className="h-4 w-4 inline mr-1" />
                  {t("register.position")}
                </Label>
                <Input
                  id="position"
                  type="text"
                  placeholder="Enter your position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  className={errors.position ? "border-destructive" : ""}
                />
                {errors.position && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.position}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">
                  <IdCard className="h-4 w-4 inline mr-1" />
                  {t("register.employeeId")}
                </Label>
                <Input
                  id="employeeId"
                  type="text"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                  className={errors.employeeId ? "border-destructive" : ""}
                />
                {errors.employeeId && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.employeeId}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            <div className=" grid md:grid-cols-2 grid-cols-1 gap-2">
              <div className="space-y-2">
                <Label htmlFor="group">
                  <UsersRound className="h-4 w-4 inline mr-2" />
                  {t("profile.group")}
                </Label>
                <Select
                  value={formData.group}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      group: value,
                    }))
                  }
                >
                  <SelectTrigger id="group" className=" w-full">
                    <SelectValue placeholder="Select your group" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Example items - replace with dynamic IDs */}
                    <SelectItem value="group1">Group 1</SelectItem>
                    <SelectItem value="group2">Group 2</SelectItem>
                    <SelectItem value="group3">Group 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="controllingTeam">
                  <MonitorCog className="h-4 w-4 inline mr-2" />
                  {t("profile.controllingTeam")}
                </Label>
                <Select
                  value={formData.controllingTeam}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      controllingTeam: value,
                    }))
                  }
                >
                  <SelectTrigger id="controllingTeam" className=" w-full">
                    <SelectValue placeholder="Select your Controlling Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Example items - replace with dynamic IDs */}
                    <SelectItem value="EMP001">EMP001</SelectItem>
                    <SelectItem value="EMP002">EMP002</SelectItem>
                    <SelectItem value="EMP003">EMP003</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="h-4 w-4 inline mr-2" />
                {t("auth.emailAddress")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your work email (@kockw.com)"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? t("register.creating") : t("register.createAccount")}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {t("register.alreadyHaveAccount")}{" "}
              <Button
                variant="link"
                className="p-0 h-auto cursor-pointer"
                onClick={() => router.push("/login")}
              >
                {t("register.loginHere")}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
