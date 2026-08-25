"use client";

import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import ProgressRing from "@/components/ui/ProgressRing";
import { courses, analyticsData } from "@/data/mockData";
import Link from "next/link";
import {
  BookOpen, Clock, Award, TrendingUp, Sparkles, ArrowRight,
  Play, Calendar, Flame, Target, Lightbulb
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const enrolledCourses = courses.filter((c) => user?.enrolledCourses?.includes(c.id));
  const totalProgress = enrolledCourses.length > 0 ? Math.round(enrolledCourses.reduce((acc, c) => acc + 65, 0) / enrolledCourses.length) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 lg:p-8 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
            <p className="text-white/80">Continue where you left off. You&apos;ve been learning for {analyticsData.streak} days straight!</p>
          </div>
          <Link href="/dashboard/my-courses" className="inline-flex items-center gap-2 px-5 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-white/90 transition-colors self-start">
            <Play size={16} /> Continue Learning
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Hours Learned", value: analyticsData.totalHours, color: "text-blue-500 bg-blue-50" },
          { icon: BookOpen, label: "In Progress", value: analyticsData.coursesInProgress, color: "text-purple-500 bg-purple-50" },
          { icon: Award, label: "Completed", value: analyticsData.coursesCompleted, color: "text-green-500 bg-green-50" },
          { icon: Flame, label: "Day Streak", value: analyticsData.streak, color: "text-orange-500 bg-orange-50" },
        ].map((stat, i) => (
          <Card key={i} className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
              <div className="text-xs text-surface-500">{stat.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-surface-900">Continue Learning</h2>
            <Link href="/dashboard/my-courses" className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {enrolledCourses.length === 0 ? (
            <Card className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-surface-300 mb-4" />
              <h3 className="font-semibold text-surface-700 mb-2">No courses yet</h3>
              <p className="text-sm text-surface-500 mb-4">Start your learning journey today!</p>
              <Link href="/dashboard/courses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
                Browse Courses <ArrowRight size={14} />
              </Link>
            </Card>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.slice(0, 3).map((course) => {
                const progress = Math.floor(Math.random() * 60) + 30;
                return (
                  <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
                    <Card hover className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={24} className="text-primary-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-surface-900 truncate">{course.title}</h3>
                        <p className="text-xs text-surface-400 mt-0.5">{course.instructor} · {course.duration}</p>
                        <div className="mt-2 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <ProgressRing progress={progress} size={50} />
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-900 flex items-center gap-2">
            <Sparkles size={18} className="text-primary-500" /> AI Insights
          </h2>
          <Card className="space-y-4">
            {analyticsData.aiInsights.slice(0, 3).map((insight, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={14} className="text-primary-500" />
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{insight}</p>
              </div>
            ))}
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-medium text-surface-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: "/dashboard/ai-tutor", label: "Ask AI Tutor", icon: Sparkles, color: "text-purple-500" },
                { href: "/dashboard/courses", label: "Browse Courses", icon: BookOpen, color: "text-blue-500" },
                { href: "/dashboard/analytics", label: "View Analytics", icon: TrendingUp, color: "text-green-500" },
                { href: "/dashboard/certificates", label: "My Certificates", icon: Award, color: "text-orange-500" },
              ].map((action) => (
                <Link key={action.href} href={action.href} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-50 transition-colors">
                  <action.icon size={16} className={action.color} />
                  <span className="text-sm text-surface-600">{action.label}</span>
                  <ArrowRight size={14} className="ml-auto text-surface-300" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Weekly Activity */}
      <Card>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">This Week&apos;s Activity</h2>
        <div className="flex items-end gap-3 h-40">
          {analyticsData.weeklyHours.map((day, i) => {
            const maxHours = Math.max(...analyticsData.weeklyHours.map((d) => d.hours));
            const height = (day.hours / maxHours) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-surface-500 font-medium">{day.hours}h</span>
                <div className="w-full bg-surface-100 rounded-lg overflow-hidden" style={{ height: "100px" }}>
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-lg transition-all duration-500"
                    style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                  />
                </div>
                <span className="text-xs text-surface-400 font-medium">{day.week}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
