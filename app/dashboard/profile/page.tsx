"use client";

import { useCallback, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Building,
  Award as IdCard,
  MonitorCog,
  UsersRound,
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
} from "lucide-react";
import { useToast } from "@/hooks/ToastContext";
import { useLanguage } from "@/lib/language-context";
import { Slider } from "@/components/ui/slider";
import Cropper from "react-easy-crop";

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
];

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}

async function getCroppedImg(imageSrc: string, crop: any) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<string>((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, "image/jpeg");
  });
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    position: user?.position || "",
    employeeId: user?.employeeId || "",
    email: user?.email || "",
    controllingTeam: user?.controllingTeam || "",
    group: user?.group || "",
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(
    localStorage.getItem("profilePicture") || user?.profilePicture || null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // await updateUser({
      //   ...user!,
      //   ...formData,
      // })

      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user?.fullName || "",
      position: user?.position || "",
      employeeId: user?.employeeId || "",
      email: user?.email || "",
      controllingTeam: user?.controllingTeam || "",
      group: user?.group || "",
    });
    setIsEditing(false);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(croppedImageUrl);
    localStorage.setItem("profilePicture", croppedImageUrl);
    setOpen(false);
    toast({
      title: "Profile Picture",
      description: "Profile picture uploaded.",
    });
  };

  // Calculate statistics
  const totalAssessments = mockAssessmentHistory.length;
  const passedAssessments = mockAssessmentHistory.filter(
    (a) => a.passed
  ).length;
  const averageScore = Math.round(
    mockAssessmentHistory.reduce((sum, a) => sum + a.score, 0) /
      totalAssessments
  );
  const passRate = Math.round((passedAssessments / totalAssessments) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("profile.title")}
        </h1>
        <p className="text-muted-foreground">{t("profile.description")}</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">
            {t("profile.personalInfo")}
          </TabsTrigger>
          <TabsTrigger value="history">
            {t("profile.assessmentHistory")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                {t("profile.profilePicture")}
              </CardTitle>
              <CardDescription>{t("profile.updatePicture")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={croppedImage || "/placeholder.svg"}
                    alt={user?.fullName}
                  />
                  <AvatarFallback className="text-lg">
                    {user?.fullName
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Controls */}
                <div className="space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="profileInput"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <Button
                    onClick={() =>
                      document.getElementById("profileInput")?.click()
                    }
                    className="cursor-pointer"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {t("profile.changePicture")}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {t("profile.pictureFormat")}
                  </p>
                </div>
              </div>
            </CardContent>

            {/* Cropper Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Crop Profile Picture</DialogTitle>
                </DialogHeader>
                {imageSrc && (
                  <div className="relative w-full h-64 bg-black">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                )}
                <div className="mt-4">
                  <p className="text-sm mb-1">Zoom</p>
                  <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={[zoom]}
                    onValueChange={(v) => setZoom(v[0])}
                  />
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className=" cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveImage} className=" cursor-pointer">
                    Save
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Card>

          {/* Personal Details Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t("profile.personalDetails")}
                  </CardTitle>
                  <CardDescription>
                    {t("profile.contactDetails")}
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
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
                  <Label htmlFor="fullName">{t("profile.fullName")}</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
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
                  <Label htmlFor="position">{t("profile.position")}</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) =>
                        handleInputChange("position", e.target.value)
                      }
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
                  <Label htmlFor="controllingTeam">{t("profile.controllingTeam")}</Label>
                  {isEditing ? (
                    <Select
                      value={formData.controllingTeam}
                      onValueChange={(value) =>
                        handleInputChange("controllingTeam", value)
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
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <MonitorCog className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.controllingTeam}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group">{t("profile.group")}</Label>
                  {isEditing ? (
                    <Select
                      value={formData.group}
                      onValueChange={(value) =>
                        handleInputChange("group", value)
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
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <UsersRound className="w-4 h-4 text-muted-foreground" />
                      <span>{user?.group}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeId">{t("profile.employeeId")}</Label>
                  {isEditing ? (
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) =>
                        handleInputChange("employeeId", e.target.value)
                      }
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
                  <Label htmlFor="email">{t("auth.emailAddress")}</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {isEditing && (
                    <p className="text-xs text-muted-foreground">
                      {t("profile.emailCannotChange")}
                    </p>
                  )}
                </div>

              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {t("profile.accountInfo")}
                  </span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("profile.memberSince")}
                    </span>
                    <span>
                      {new Date(
                        user?.createdAt || "2023-01-01"
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("profile.lastLogin")}
                    </span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("profile.accountStatus")}
                    </span>
                    <Badge variant="default">{t("profile.active")}</Badge>
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
                <CardTitle className="text-sm font-medium">
                  {t("profile.totalAssessments")}
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAssessments}</div>
                <p className="text-xs text-muted-foreground">
                  {t("profile.completedAssessments")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("profile.passRate")}
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{passRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {passedAssessments} {t("profile.passed")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("dashboard.averageScore")}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">
                  {t("profile.overallPerformance")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("profile.bestScore")}
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(...mockAssessmentHistory.map((a) => a.score))}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("profile.personalBest")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                {t("profile.assessmentHistory")}
              </CardTitle>
              <CardDescription>{t("profile.completeHistory")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessmentHistory.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Left: Info */}
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted shrink-0">
                        {assessment.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">
                          {assessment.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>{assessment.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(
                              assessment.completedDate
                            ).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{assessment.duration} min</span>
                          <span>•</span>
                          <span>
                            {assessment.attempts} attempt
                            {assessment.attempts > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score + Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-right">
                      <div>
                        <div
                          className={`text-lg sm:text-xl font-bold ${
                            assessment.passed
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {assessment.score}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t("profile.required")} {assessment.passingScore}%
                        </div>
                      </div>
                      <Badge
                        variant={assessment.passed ? "default" : "destructive"}
                        className="self-center sm:self-auto"
                      >
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
  );
}
