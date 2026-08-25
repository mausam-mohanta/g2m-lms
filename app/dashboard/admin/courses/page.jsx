"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { courses } from "@/data/mockData";
import { Plus, Edit3, Trash2, Eye, Star, Users, BookOpen, ArrowLeft } from "lucide-react";

export default function AdminCoursesPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-2 cursor-pointer">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-2xl font-bold text-surface-900">Manage Courses</h1>
        </div>
        <Button icon={Plus} onClick={() => router.push("/dashboard/admin/courses/create")}>Create Course</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <BookOpen size={22} className="text-primary-500" />
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Eye size={14} className="text-surface-400" /></button>
                <button className="p-1.5 rounded-lg hover:bg-surface-100 cursor-pointer"><Edit3 size={14} className="text-surface-400" /></button>
                <button className="p-1.5 rounded-lg hover:bg-red-50 cursor-pointer"><Trash2 size={14} className="text-red-400" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-surface-900 mb-1 text-sm">{course.title}</h3>
            <p className="text-xs text-surface-500 mb-3">{course.instructor}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge color="blue">{course.category}</Badge>
              <Badge color="gray">{course.level}</Badge>
            </div>
            <div className="mt-auto grid grid-cols-3 gap-2 pt-3 border-t border-surface-100">
              <div className="text-center">
                <div className="text-sm font-semibold text-surface-900">{course.enrolled.toLocaleString()}</div>
                <div className="text-[10px] text-surface-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-surface-900 flex items-center justify-center gap-0.5">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" /> {course.rating}
                </div>
                <div className="text-[10px] text-surface-400">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-surface-900">${course.price}</div>
                <div className="text-[10px] text-surface-400">Price</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
