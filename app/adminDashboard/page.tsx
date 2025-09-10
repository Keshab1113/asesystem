"use client"

import { useState } from "react"
import { AdminHeader } from "./components/admin-header"
import { AdminSidebar } from "./components/admin-sidebar"
import { DashboardContent } from "./components/dashboard-content"
import { QuizReportPage } from "./components/pages/quiz-report-page"
import { IssueCertificatePage } from "./components/pages/issue-certificate-page"
import { UserGroupPrivilegePage } from "./components/pages/user-group-privilege-page"
import { AddQuestionsPage } from "./components/pages/add-questions-page"
import { SubjectMasterPage } from "./components/pages/subject-master-page"
import { ContractorMasterPage } from "./components/pages/contractor-master-page"
import { MyAccountPage } from "./components/pages/my-account-page"
import { UserLogsPage } from "./components/pages/user-logs-page"
import { ModifyProfilePage } from "./components/pages/modify-profile-page"
import { ChangePasswordPage } from "./components/pages/change-password-page"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    closeSidebar() // Close sidebar on mobile after navigation
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "admin-dashboard":
        return <DashboardContent />
      case "quiz-report":
        return <QuizReportPage />
      case "issue-certificate":
        return <IssueCertificatePage />
      case "user-group-privilege":
        return <UserGroupPrivilegePage />
      case "add-questions":
        return <AddQuestionsPage />
      case "subject-master":
        return <SubjectMasterPage />
      case "contractor-master":
        return <ContractorMasterPage />
      case "my-account":
        return <MyAccountPage />
      case "user-logs":
        return <UserLogsPage />
      case "modify-profile":
        return <ModifyProfilePage />
      case "change-password":
        return <ChangePasswordPage />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onMenuClick={toggleSidebar} />
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Main content */}
      <main className="pt-16 xl:pl-72">
        <div className="p-4 sm:p-6">{renderCurrentPage()}</div>
      </main>
    </div>
  )
}
