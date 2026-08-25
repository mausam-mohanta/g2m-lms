"use client";

import { useAuth } from "@/context/AuthContext";
import { courses } from "@/data/mockData";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const enrolledCourses = courses.filter((c) => user?.enrolledCourses?.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Courses</h1>
        <p className="text-surface-500 mt-1">Track your progress across all enrolled courses</p>
      </div>

      <div className="flex gap-2">
        {["all", "in-progress", "completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all cursor-pointer ${filter === f ? "bg-primary-500 text-white" : "bg-surface-100 text-surface-500 hover:bg-surface-200"}`}>
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      {enrolledCourses.length === 0 ? (
        <Card className="text-center py-16">
          <BookOpen size={48} className="mx-auto text-surface-300 mb-4" />
          <h3 className="font-semibold text-surface-700 mb-2">No courses yet</h3>
          <p className="text-sm text-surface-500 mb-4">Start your learning journey today!</p>
          <Link href="/dashboard/courses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600">
            Browse Courses <ArrowRight size={14} />
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {enrolledCourses.map((course) => {
            const progress = Math.floor(Math.random() * 70) + 20;
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);

            return (
              <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
                <Card hover className="group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <BookOpen size={22} className="text-primary-500" />
                    </div>
                    <ProgressRing progress={progress} size={50} />
                  </div>
                  <h3 className="font-semibold text-surface-900 mb-1 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                  <p className="text-sm text-surface-500 mb-3">{course.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-surface-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                    <span>·</span>
                    <span>{completedLessons}/{totalLessons} lessons</span>
                  </div>
                  <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
