"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  Building,
  Award as IdCard,
  Camera,
  Edit,
  Save,
  X,
  Trophy,
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp,
  FileText,
} from "lucide-react"
import { useToast } from "@/hooks/ToastContext"

// Mock assessment history data
const mockAssessmentHistory = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    category: "Programming",
    completedDate: "2024-01-15",
    score: 92,
    passed: true,
    passingScore: 70,
    duration: 45,
    attempts: 1,
  },
  {
    id: 2,
    title: "React Components & Props",
    category: "Programming",
    completedDate: "2024-01-10",
    score: 78,
    passed: true,
    passingScore: 75,
    duration: 60,
    attempts: 2,
  },
  {
    id: 3,
    title: "Database Design Principles",
    category: "Database",
    completedDate: "2024-01-03",
    score: 85,
    passed: true,
    passingScore: 80,
    duration: 90,
    attempts: 2,
  },
  {
    id: 4,
    title: "API Development Best Practices",
    category: "Backend",
    completedDate: "2023-11-28",
    score: 92,
    passed: true,
    passingScore: 75,
    duration: 75,
    attempts: 1,
  },
  {
    id: 5,
    title: "Security Fundamentals",
    category: "Security",
    completedDate: "2023-10-24",
    score: 72,
    passed: false,
    passingScore: 80,
    duration: 60,
    attempts: 3,
  },
  {
    id: 6,
    title: "CSS Grid and Flexbox",
    category: "Frontend",
    completedDate: "2023-09-15",
    score: 88,
    passed: true,
    passingScore: 70,
    duration: 50,
    attempts: 1,
  },
]

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    position: user?.position || "",
    employeeId: user?.employeeId || "",
    email: user?.email || "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await updateUser({
        ...user!,
        ...formData,
      })

      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      position: user?.position || "",
      employeeId: user?.employeeId || "",
      email: user?.email || "",
    })
    setIsEditing(false)
  }

  const handleProfilePictureChange = () => {
    // Simulate profile picture upload
    toast({
      title: "Feature Coming Soon",
      description: "Profile picture upload will be available soon.",
    })
  }

  // Calculate statistics
  const totalAssessments = mockAssessmentHistory.length
  const passedAssessments = mockAssessmentHistory.filter((a) => a.passed).length
  const averageScore = Math.round(mockAssessmentHistory.reduce((sum, a) => sum + a.score, 0) / totalAssessments)
  const passRate = Math.round((passedAssessments / totalAssessments) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and view your assessment history.</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="history">Assessment History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Profile Picture
              </CardTitle>
              <CardDescription>Update your profile picture to personalize your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.fullName} />
                  <AvatarFallback className="text-lg">
                    {user?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button onClick={handleProfilePictureChange}>
                    <Camera className="w-4 h-4 mr-2" />
                    Change Picture
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Details
                  </CardTitle>
                  <CardDescription>Your personal information and contact details.</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.fullName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position / Designation</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="Enter your position"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.position}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  {isEditing ? (
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => handleInputChange("employeeId", e.target.value)}
                      placeholder="Enter your employee ID"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <IdCard className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.employeeId}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {isEditing && (
                    <p className="text-xs text-muted-foreground">
                      Email address cannot be changed. Contact administrator if needed.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Account Information</span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{new Date(user?.createdAt || "2023-01-01").toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last login:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account status:</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAssessments}</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{passRate}%</div>
                <p className="text-xs text-muted-foreground">{passedAssessments} passed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">Overall performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.max(...mockAssessmentHistory.map((a) => a.score))}%</div>
                <p className="text-xs text-muted-foreground">Personal best</p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Assessment History
              </CardTitle>
              <CardDescription>
                Complete history of all your completed assessments with scores and dates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessmentHistory.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                        {assessment.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{assessment.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{assessment.category}</span>
                          <span>•</span>
                          <span>{new Date(assessment.completedDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{assessment.duration} min</span>
                          <span>•</span>
                          <span>
                            {assessment.attempts} attempt{assessment.attempts > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${assessment.passed ? "text-green-600" : "text-red-600"}`}>
                          {assessment.score}%
                        </div>
                        <div className="text-xs text-muted-foreground">Required: {assessment.passingScore}%</div>
                      </div>
                      <Badge variant={assessment.passed ? "default" : "destructive"}>
                        {assessment.passed ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
