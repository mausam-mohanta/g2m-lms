"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, BookOpen, GraduationCap, BarChart3,
  MessageSquarePlus, Award, Shield, Settings, ChevronLeft,
  ChevronRight, Sparkles
} from "lucide-react";
import { useState } from "react";

const studentLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Browse Courses", icon: BookOpen },
  { href: "/dashboard/my-courses", label: "My Courses", icon: GraduationCap },
  { href: "/dashboard/ai-tutor", label: "AI Tutor", icon: MessageSquarePlus, highlight: true },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
];

const instructorLinks = [
  ...studentLinks,
  { href: "/dashboard/admin", label: "Instructor Panel", icon: Shield },
];

const adminLinks = [
  ...studentLinks,
  { href: "/dashboard/admin", label: "Admin Panel", icon: Shield },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const links = user?.role === "admin" ? adminLinks : user?.role === "instructor" ? instructorLinks : studentLinks;

  return (
    <aside className={`hidden lg:flex flex-col ${collapsed ? "w-[72px]" : "w-64"} h-screen bg-white border-r border-surface-100 transition-all duration-300 sticky top-0`}>
      <div className={`flex items-center ${collapsed ? "justify-center" : "px-6"} h-16 border-b border-surface-100`}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900">G2M</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </Link>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-surface-500 hover:text-surface-700 hover:bg-surface-50"
              } ${link.highlight ? "relative" : ""}`}
              title={collapsed ? link.label : undefined}
            >
              <link.icon size={20} className={isActive ? "text-primary-500" : "text-surface-400 group-hover:text-surface-600"} />
              {!collapsed && <span>{link.label}</span>}
              {!collapsed && link.highlight && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-surface-100 text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
