"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Mail, Phone, Calendar, Edit, Save, X } from "lucide-react"

const mockUserData = {
  id: 1,
  name: "John Administrator",
  email: "john.admin@company.com",
  phone: "+1-555-0123",
  role: "Super Admin",
  department: "IT Department",
  joinedDate: "2023-06-15",
  lastLogin: "2024-01-30 14:30:00",
  avatar: "/admin-avatar.png",
}

export function MyAccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState(mockUserData)
  const [editData, setEditData] = useState(mockUserData)

  const handleSave = () => {
    setUserData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(userData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">My Account</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="h-5 w-5 mr-2" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/admin-avatar.png"} alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-semibold text-lg">{userData.name}</h3>
                <Badge variant="default" className="mt-1">
                  {userData.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Joined {userData.joinedDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{userData.name}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{userData.email}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{userData.phone}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                {isEditing ? (
                  <Input
                    id="department"
                    value={editData.department}
                    onChange={(e) => setEditData({ ...editData, department: e.target.value })}
                  />
                ) : (
                  <div className="p-2 bg-muted rounded-md">{userData.department}</div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <div className="p-2 bg-muted rounded-md">{userData.role}</div>
              </div>

              <div className="space-y-2">
                <Label>Last Login</Label>
                <div className="p-2 bg-muted rounded-md">{userData.lastLogin}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Quizzes Created</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2,340</div>
            <div className="text-sm text-muted-foreground">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Certificates Issued</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-muted-foreground">Active Subjects</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
