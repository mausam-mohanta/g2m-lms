"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Search, Bell, Menu, LogOut, User, Settings, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-surface-100">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-500 cursor-pointer">
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900">G2M</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search courses, topics, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-50 border border-surface-100 text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-100 text-surface-500 cursor-pointer"
          >
            <Search size={20} />
          </button>

          {user && (
            <>
              <Link
                href="/dashboard/ai-tutor"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Sparkles size={14} />
                <span>AI Tutor</span>
              </Link>

              <button className="relative p-2 rounded-lg hover:bg-surface-100 text-surface-500 cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.name?.charAt(0)}
                  </div>
                  <span className="hidden md:block text-sm font-medium text-surface-700">{user.name?.split(" ")[0]}</span>
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-surface-100 shadow-lg py-1 animate-fade-in">
                    <div className="px-4 py-3 border-b border-surface-100">
                      <p className="text-sm font-medium text-surface-900">{user.name}</p>
                      <p className="text-xs text-surface-400 capitalize">{user.role}</p>
                    </div>
                    <Link href="/dashboard" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50">
                      <User size={16} /> Dashboard
                    </Link>
                    <Link href="/dashboard/analytics" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 hover:bg-surface-50">
                      <Settings size={16} /> Settings
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-4 py-2 text-sm font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-50 border border-surface-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
