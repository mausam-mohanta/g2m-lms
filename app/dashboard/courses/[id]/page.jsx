"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { courses } from "@/data/mockData";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import {
  ArrowLeft, Play, FileText, CheckCircle, Circle, BookOpen,
  Clock, Users, Star, MessageSquarePlus, Sparkles, ChevronDown,
  ChevronRight, Award, Lock
} from "lucide-react";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const course = courses.find((c) => c.id === parseInt(id));
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(null);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold text-surface-900 mb-4">Course not found</h2>
        <Button onClick={() => router.push("/dashboard/courses")}>Browse Courses</Button>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((acc, m) => acc + m.lessons.filter((l) => l.completed).length, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const currentLesson = activeLesson !== null
    ? course.modules[activeModule]?.lessons[activeLesson]
    : course.modules[0]?.lessons[0];

  const getLessonIcon = (type) => {
    switch (type) {
      case "video": return Play;
      case "text": return FileText;
      case "quiz": return MessageSquarePlus;
      case "practice": return BookOpen;
      default: return Circle;
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <button onClick={() => router.push("/dashboard/courses")} className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 mb-4 cursor-pointer">
        <ArrowLeft size={16} /> Back to Courses
      </button>

      {/* Course Header */}
      <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl p-6 lg:p-8 text-white mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge color="blue" className="bg-white/20 text-white border-white/30">{course.category}</Badge>
              <Badge color="gray" className="bg-white/20 text-white border-white/30">{course.level}</Badge>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-white/80 mb-4">{course.subtitle}</p>
            <p className="text-sm text-white/70 mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span>By {course.instructor}</span>
              <span className="flex items-center gap-1"><Star size={14} className="fill-white" />{course.rating}</span>
              <span className="flex items-center gap-1"><Users size={14} />{course.enrolled.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock size={14} />{course.duration}</span>
              <span className="flex items-center gap-1"><BookOpen size={14} />{totalLessons} lessons</span>
            </div>
          </div>
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <ProgressRing progress={progress} size={80} strokeWidth={6} color="white" />
            <p className="text-sm mt-3 text-white/80">{completedLessons}/{totalLessons} lessons</p>
            <Button className="mt-4 bg-white text-primary-600 hover:bg-white/90">
              {progress > 0 ? "Continue" : "Start Learning"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player Area */}
          <Card padding={false} className="overflow-hidden">
            <div className="aspect-video bg-surface-900 flex items-center justify-center relative">
              {currentLesson?.type === "video" ? (
                <div className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 cursor-pointer hover:bg-white/30 transition-colors">
                    <Play size={24} className="ml-1" />
                  </div>
                  <p className="text-sm text-white/70">{currentLesson.title}</p>
                </div>
              ) : currentLesson?.type === "text" ? (
                <div className="text-center text-white p-8">
                  <FileText size={40} className="mx-auto mb-3 text-white/50" />
                  <p className="text-sm text-white/70">{currentLesson.title}</p>
                  <p className="text-xs text-white/50 mt-2">{currentLesson.content}</p>
                </div>
              ) : currentLesson?.type === "quiz" ? (
                <div className="text-center text-white p-8">
                  <MessageSquarePlus size={40} className="mx-auto mb-3 text-white/50" />
                  <p className="text-sm text-white/70">{currentLesson.title}</p>
                  <Button className="mt-3" variant="secondary">Start Quiz</Button>
                </div>
              ) : (
                <div className="text-center text-white p-8">
                  <BookOpen size={40} className="mx-auto mb-3 text-white/50" />
                  <p className="text-sm text-white/70">{currentLesson?.title || "Select a lesson"}</p>
                  <Button className="mt-3" variant="secondary">Open Exercise</Button>
                </div>
              )}
            </div>
          </Card>

          {/* Lesson Info */}
          {currentLesson && (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-surface-900">{currentLesson.title}</h2>
                  <p className="text-sm text-surface-500">
                    {course.modules[activeModule]?.title} · {currentLesson.duration}
                  </p>
                </div>
                <Badge color={currentLesson.completed ? "green" : "blue"}>
                  {currentLesson.completed ? "Completed" : "In Progress"}
                </Badge>
              </div>

              {/* AI Tutor Quick Ask */}
              <div className="bg-primary-50 rounded-xl p-4 flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-900">Need help with this lesson?</p>
                  <p className="text-xs text-surface-500">Ask the AI Tutor for explanations and examples</p>
                </div>
                <Button size="sm" variant="outline">Ask AI</Button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => {
                  if (activeLesson > 0) setActiveLesson(activeLesson - 1);
                  else if (activeModule > 0) { setActiveModule(activeModule - 1); setActiveLesson(course.modules[activeModule - 1].lessons.length - 1); }
                }}>Previous Lesson</Button>
                <Button onClick={() => {
                  const mod = course.modules[activeModule];
                  if (activeLesson < mod.lessons.length - 1) setActiveLesson(activeLesson + 1);
                  else if (activeModule < course.modules.length - 1) { setActiveModule(activeModule + 1); setActiveLesson(0); }
                }}>Next Lesson</Button>
              </div>
            </Card>
          )}
        </div>

        {/* Module Sidebar */}
        <div className="space-y-3">
          <h3 className="font-semibold text-surface-900">Course Content</h3>
          {course.modules.map((mod, mi) => (
            <div key={mod.id} className="bg-white rounded-xl border border-surface-100 overflow-hidden">
              <button
                onClick={() => setActiveModule(mi)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-sm font-medium text-surface-600">
                    {mi + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-surface-900">{mod.title}</h4>
                    <p className="text-xs text-surface-400">{mod.lessons.length} lessons</p>
                  </div>
                </div>
                <ChevronDown size={16} className={`text-surface-400 transition-transform ${activeModule === mi ? "rotate-180" : ""}`} />
              </button>
              {activeModule === mi && (
                <div className="border-t border-surface-100">
                  {mod.lessons.map((lesson, li) => {
                    const Icon = getLessonIcon(lesson.type);
                    const isActive = activeLesson === li;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(li)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-50 transition-colors cursor-pointer border-b border-surface-50 last:border-0 ${
                          isActive ? "bg-primary-50" : ""
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle size={16} className="text-secondary-500 flex-shrink-0" />
                        ) : (
                          <Icon size={16} className={`flex-shrink-0 ${isActive ? "text-primary-500" : "text-surface-400"}`} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${isActive ? "text-primary-600 font-medium" : "text-surface-700"}`}>{lesson.title}</p>
                          <p className="text-xs text-surface-400">{lesson.duration}</p>
                        </div>
                        <Badge color={lesson.type === "quiz" ? "purple" : lesson.type === "practice" ? "orange" : "gray"} className="text-[10px]">
                          {lesson.type}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
