"use client";

import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { courses, instructorStats } from "@/data/mockData";
import { useRouter } from "next/navigation";
import {
  Users, BookOpen, Star, DollarSign, TrendingUp, Plus,
  Edit3, Trash2, Eye, BarChart3, Settings, Upload,
  Sparkles, ChevronRight
} from "lucide-react";
import { useState } from "react";

const users = [
  { id: 1, name: "Alex Johnson", email: "student@g2m.com", role: "student", joined: "2024-06-10", courses: 4 },
  { id: 2, name: "Emma Wilson", email: "emma@example.com", role: "student", joined: "2024-07-15", courses: 2 },
  { id: 3, name: "Michael Torres", email: "instructor@g2m.com", role: "instructor", joined: "2024-03-01", courses: 5 },
  { id: 4, name: "Lisa Park", email: "lisa@g2m.com", role: "instructor", joined: "2024-04-20", courses: 3 },
  { id: 5, name: "James Wilson", email: "james@g2m.com", role: "instructor", joined: "2024-02-15", courses: 4 },
];

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const isAdmin = user?.role === "admin";
  const isInstructor = user?.role === "instructor";

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">
            {isAdmin ? "Admin Panel" : "Instructor Dashboard"}
          </h1>
          <p className="text-surface-500 mt-1">
            {isAdmin ? "Manage the entire platform" : "Manage your courses and students"}
          </p>
        </div>
        <Button icon={Plus} onClick={() => router.push("/dashboard/admin/courses/create")}>
          Create Course
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Students", value: instructorStats.totalStudents.toLocaleString(), color: "text-blue-500 bg-blue-50" },
          { icon: BookOpen, label: "Total Courses", value: instructorStats.totalCourses, color: "text-green-500 bg-green-50" },
          { icon: Star, label: "Avg Rating", value: instructorStats.averageRating, color: "text-yellow-500 bg-yellow-50" },
          { icon: DollarSign, label: "Revenue", value: `$${instructorStats.totalRevenue.toLocaleString()}`, color: "text-purple-500 bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div>
                <div className="text-xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-xs text-surface-500">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 rounded-xl p-1 w-fit">
        {["overview", "courses", "users"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer ${activeTab === tab ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-500" /> Recent Enrollments
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-700">New student enrolled</p>
                    <p className="text-xs text-surface-400">2 hours ago</p>
                  </div>
                  <Badge color="green">+1</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-500" /> Platform Activity
            </h3>
            <div className="space-y-4">
              {[
                { label: "Active learners today", value: 1247, max: 2000 },
                { label: "Lessons completed today", value: 3842, max: 5000 },
                { label: "Quiz attempts today", value: 856, max: 1500 },
                { label: "AI tutor conversations", value: 2134, max: 3000 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-surface-600">{item.label}</span>
                    <span className="text-sm font-semibold text-surface-900">{item.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(item.value / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "courses" && (
        <Card padding={false}>
          <div className="p-4 border-b border-surface-100 flex items-center justify-between">
            <h3 className="font-semibold text-surface-900">All Courses</h3>
            <Button size="sm" icon={Plus} onClick={() => router.push("/dashboard/admin/courses/create")}>New Course</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-surface-500 border-b border-surface-100">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Instructor</th>
                  <th className="px-4 py-3 font-medium">Enrolled</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen size={16} className="text-primary-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900 max-w-[200px] truncate">{course.title}</p>
                          <p className="text-xs text-surface-400">{course.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-600">{course.instructor}</td>
                    <td className="px-4 py-3 text-sm text-surface-600">{course.enrolled.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-surface-900">${course.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Eye size={14} className="text-surface-400" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Edit3 size={14} className="text-surface-400" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"><Trash2 size={14} className="text-red-400" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === "users" && isAdmin && (
        <Card padding={false}>
          <div className="p-4 border-b border-surface-100">
            <h3 className="font-semibold text-surface-900">All Users</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-surface-500 border-b border-surface-100">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Courses</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-surface-900">{u.name}</p>
                          <p className="text-xs text-surface-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={u.role === "admin" ? "red" : u.role === "instructor" ? "purple" : "blue"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-600">{new Date(u.joined).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm text-surface-600">{u.courses}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Eye size={14} className="text-surface-400" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Edit3 size={14} className="text-surface-400" /></button>
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
