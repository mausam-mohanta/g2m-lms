"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Search, Bell, Menu, LogOut, User, CircuitBoard, Shield } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 h-16 glass border-b border-surface-100 dark:border-surface-800">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-300 cursor-pointer transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center gap-2 lg:hidden" aria-label="G2M ECE Hub Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <CircuitBoard size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">
              G2M <span className="text-xs font-medium text-primary-500">ECE</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
            <input
              type="search"
              placeholder="Search ECE topics, courses, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 placeholder:text-surface-400 dark:placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              aria-label="Search ECE topics"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-500 dark:text-surface-300 cursor-pointer transition-colors"
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>

          <ThemeToggle />

          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
                aria-expanded={showProfile}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm font-medium">
                  {user.name?.charAt(0)}
                </div>
                <span className="hidden md:block text-sm font-medium text-surface-700 dark:text-surface-200">
                  {user.name?.split(" ")[0]}
                </span>
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-900 rounded-xl border border-surface-100 dark:border-surface-700 shadow-lg py-1 animate-fade-in" role="menu">
                  <div className="px-4 py-3 border-b border-surface-100 dark:border-surface-800">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-surface-400 dark:text-surface-500 capitalize">{user.role}</p>
                  </div>
                  <Link
                    href="/dashboard/ai-tutor"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                    role="menuitem"
                  >
                    <User size={16} /> AI ECE Tutor
                  </Link>
                  {(user.role === "admin" || user.role === "instructor") && (
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                      role="menuitem"
                    >
                      <Shield size={16} /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer transition-colors"
                    role="menuitem"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden px-4 pb-3 animate-fade-in">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500" />
            <input
              type="search"
              placeholder="Search ECE topics..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-100 dark:border-surface-700 text-sm text-surface-900 dark:text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              autoFocus
              aria-label="Search ECE topics"
            />
          </div>
        </div>
      )}
    </header>
  );
}
