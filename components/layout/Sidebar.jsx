"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  MessageSquarePlus, Shield, ChevronLeft,
  ChevronRight, CircuitBoard, BookOpen,
} from "lucide-react";
import { useState } from "react";

const studentLinks = [
  { href: "/dashboard/ai-tutor", label: "AI ECE Tutor", icon: MessageSquarePlus, highlight: true },
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

  const links = user?.role === "admin"
    ? adminLinks
    : user?.role === "instructor"
      ? instructorLinks
      : studentLinks;

  return (
    <aside
      className={`hidden lg:flex flex-col ${collapsed ? "w-[72px]" : "w-64"} h-screen bg-white dark:bg-surface-900 border-r border-surface-100 dark:border-surface-800 transition-all duration-300 sticky top-0`}
      aria-label="Sidebar navigation"
    >
      <div className={`flex items-center ${collapsed ? "justify-center" : "px-6"} h-16 border-b border-surface-100 dark:border-surface-800`}>
        {!collapsed ? (
          <Link href="/" className="flex items-center gap-2.5" aria-label="G2M ECE Hub Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <CircuitBoard size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">
              G2M <span className="text-xs font-medium text-primary-500">ECE</span>
            </span>
          </Link>
        ) : (
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center" aria-label="G2M ECE Hub Home">
            <CircuitBoard size={18} className="text-white" />
          </Link>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide" role="navigation">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
                  : "text-surface-500 hover:text-surface-700 hover:bg-surface-50 dark:text-surface-400 dark:hover:text-surface-200 dark:hover:bg-surface-800"
              }`}
              title={collapsed ? link.label : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <link.icon
                size={20}
                className={isActive
                  ? "text-primary-500 dark:text-primary-300"
                  : "text-surface-400 group-hover:text-surface-600 dark:text-surface-500 dark:group-hover:text-surface-300"
                }
              />
              {!collapsed && <span>{link.label}</span>}
              {!collapsed && link.highlight && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded">
                  AI
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen size={14} className="text-primary-500" />
            <span className="text-xs font-semibold text-surface-700 dark:text-surface-200">ECE Quick Tip</span>
          </div>
          <p className="text-[11px] text-surface-400 dark:text-surface-500 leading-relaxed">
            Ask the AI tutor to explain any ECE concept, generate quizzes, or help with Verilog/VHDL code.
          </p>
        </div>
      )}

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-surface-100 dark:border-surface-800 text-surface-400 hover:text-surface-600 hover:bg-surface-50 dark:hover:text-surface-300 dark:hover:bg-surface-800 transition-colors cursor-pointer"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
