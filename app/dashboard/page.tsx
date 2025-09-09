"use client";

import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  User,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();

  // Mock data for dashboard stats
  const stats = {
    totalAssessments: 12,
    completedAssessments: 8,
    upcomingAssessments: 3,
    averageScore: 85,
  };

  const recentAssessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      date: "2024-01-15",
      status: "completed",
      score: 92,
    },
    {
      id: 2,
      title: "React Components",
      date: "2024-01-10",
      status: "completed",
      score: 78,
    },
    {
      id: 3,
      title: "Database Design",
      date: "2024-01-20",
      status: "upcoming",
      score: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.welcomeBack")}, {user?.fullName?.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.overviewDescription")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.totalAssessments")}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            <p className="text-xs text-muted-foreground">{t("dashboard.assignedToYou")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("dashboard.completed")}</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedAssessments}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (stats.completedAssessments / stats.totalAssessments) * 100
              )}
              % completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.upcomingAssessments}
            </div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/assessments">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                My Assessments
              </CardTitle>
              <CardDescription>
                View assigned quizzes and past results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent mt-2">
                View Assessments
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/upcoming">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Assessments
              </CardTitle>
              <CardDescription>
                Check your scheduled assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent mt-2">
                View Schedule
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                My Profile
              </CardTitle>
              <CardDescription>
                Update your details and view history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent mt-2">
                Manage Profile
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest assessment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {assessment.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <p className="font-medium">{assessment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(assessment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {assessment?.status === "completed" &&
                  assessment.score !== null ? (
                    <Badge
                      variant={assessment.score >= 80 ? "default" : "secondary"}
                    >
                      {assessment.score}%
                    </Badge>
                  ) : (
                    <Badge variant="outline">Upcoming</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
