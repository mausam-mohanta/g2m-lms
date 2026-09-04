"use client";

import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { instructorStats, popularCourses } from "@/data/mockData";
import {
  Users, BookOpen, Star, DollarSign, TrendingUp, BarChart3,
  Eye, Edit3, CircuitBoard,
} from "lucide-react";
import { useState } from "react";

const users = [
  { id: 1, name: "Alex Johnson", email: "student@g2m.com", role: "student", joined: "2024-06-10", track: "VLSI & Embedded" },
  { id: 2, name: "Emma Wilson", email: "emma@example.com", role: "student", joined: "2024-07-15", track: "Communication Systems" },
  { id: 3, name: "Michael Torres", email: "instructor@g2m.com", role: "instructor", joined: "2024-03-01", track: "Analog & Digital Circuits" },
  { id: 4, name: "Lisa Park", email: "lisa@g2m.com", role: "instructor", joined: "2024-04-20", track: "Signal Processing" },
  { id: 5, name: "James Wilson", email: "james@g2m.com", role: "instructor", joined: "2024-02-15", track: "Embedded Systems" },
];

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const isAdmin = user?.role === "admin";

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
          <CircuitBoard size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            {isAdmin ? "ECE Admin Panel" : "Instructor Dashboard"}
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-0.5">
            {isAdmin ? "Manage the ECE learning platform" : "Manage your ECE students and performance"}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "ECE Students", value: instructorStats.totalStudents.toLocaleString(), color: "text-blue-500 bg-blue-50 dark:bg-blue-500/15" },
          { icon: Star, label: "Avg Rating", value: instructorStats.averageRating, color: "text-amber-500 bg-amber-50 dark:bg-amber-500/15" },
          { icon: BookOpen, label: "Completion Rate", value: `${instructorStats.completionRate}%`, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/15" },
          { icon: DollarSign, label: "Revenue", value: `$${instructorStats.totalRevenue.toLocaleString()}`, color: "text-violet-500 bg-violet-50 dark:bg-violet-500/15" },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                <div className="text-xs text-surface-500 dark:text-surface-400">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 dark:bg-surface-700 rounded-xl p-1 w-fit" role="tablist">
        {["overview", "users", "courses"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "bg-white dark:bg-surface-800 text-surface-900 dark:text-white shadow-sm"
                : "text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" /> Platform Activity
            </h3>
            <div className="space-y-4">
              {[
                { label: "Active ECE learners today", value: 847, max: 1200 },
                { label: "Lessons completed today", value: 2156, max: 3000 },
                { label: "Quiz attempts today", value: 634, max: 1000 },
                { label: "AI tutor conversations", value: 1523, max: 2000 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-surface-600 dark:text-surface-300">{item.label}</span>
                    <span className="text-sm font-semibold text-surface-900 dark:text-white">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-surface-100 dark:bg-surface-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-700"
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary-500" /> Top ECE Courses
            </h3>
            <div className="space-y-3">
              {popularCourses.slice(0, 5).map((course, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={14} className="text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-700 dark:text-surface-200 truncate">{course.title}</p>
                    <p className="text-xs text-surface-400 dark:text-surface-500">{course.students.toLocaleString()} students</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium text-surface-600 dark:text-surface-300">{course.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "users" && isAdmin && (
        <Card padding={false}>
          <div className="p-4 border-b border-surface-100 dark:border-surface-700">
            <h3 className="font-semibold text-surface-900 dark:text-white">All ECE Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-surface-500 dark:text-surface-400 border-b border-surface-100 dark:border-surface-700">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">ECE Track</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-surface-50 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-xs font-medium">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 dark:text-white">{u.name}</p>
                          <p className="text-xs text-surface-400 dark:text-surface-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={u.role === "admin" ? "red" : u.role === "instructor" ? "purple" : "blue"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-300">{u.track}</td>
                    <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-300">
                      {new Date(u.joined).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer transition-colors" aria-label="View user">
                          <Eye size={14} className="text-surface-400 dark:text-surface-500" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer transition-colors" aria-label="Edit user">
                          <Edit3 size={14} className="text-surface-400 dark:text-surface-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "courses" && (
        <Card padding={false}>
          <div className="p-4 border-b border-surface-100 dark:border-surface-700">
            <h3 className="font-semibold text-surface-900 dark:text-white">ECE Course Catalog</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-surface-500 dark:text-surface-400 border-b border-surface-100 dark:border-surface-700">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Domain</th>
                  <th className="px-4 py-3 font-medium">Students</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {popularCourses.map((course, i) => (
                  <tr key={i} className="border-b border-surface-50 dark:border-surface-800 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{course.title}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color="blue">{course.domain}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-600 dark:text-surface-300">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-surface-600 dark:text-surface-300">{course.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
