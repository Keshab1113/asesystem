"use client";

import type React from "react";

import { useAuth } from "@/lib/auth-context";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/custom-component/dashboard-nav";
import NavItems from "@/components/custom-component/navItems";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading, token } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login");
    }
  }, [user, isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background w-full relative hide-scrollbar">
      <DashboardNav />
      <div className=" flex">
        <NavItems />
        <main className=" p-6 lg:ml-[20rem] w-full">{children}</main>
      </div>
    </div>
  );
}
