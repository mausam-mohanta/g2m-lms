"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { courses, categories } from "@/data/mockData";
import Link from "next/link";
import { Search, Filter, Star, Clock, Users, BookOpen, Sparkles } from "lucide-react";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Browse Courses</h1>
        <p className="text-surface-500 mt-1">Discover courses crafted by experts and enhanced with AI</p>
      </div>

      {/* AI Recommended */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-primary-500" />
          <h2 className="font-semibold text-surface-900">AI Recommended for You</h2>
        </div>
        <p className="text-sm text-surface-500 mb-4">Based on your interests and learning history</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {courses.slice(0, 3).map((c) => (
            <Link key={c.id} href={`/dashboard/courses/${c.id}`} className="flex-shrink-0 w-64 bg-white rounded-xl p-4 border border-surface-100 hover:card-shadow-hover transition-all">
              <h3 className="font-medium text-sm text-surface-900 mb-1 truncate">{c.title}</h3>
              <p className="text-xs text-surface-400">{c.instructor}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{c.rating}</span>
                <Badge color="blue" className="text-[10px]">{c.level}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <div className="flex gap-1 bg-surface-100 rounded-xl p-1">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                selectedLevel === level ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
            <Card hover padding={false} className="overflow-hidden group">
              <div className="h-44 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 flex items-center justify-center relative">
                <BookOpen size={40} className="text-primary-300 group-hover:text-primary-400 transition-colors" />
                <Badge color="blue" className="absolute top-3 right-3">{course.level}</Badge>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge color="gray">{course.category}</Badge>
                </div>
                <h3 className="font-semibold text-surface-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">{course.title}</h3>
                <p className="text-sm text-surface-500 mb-3 line-clamp-1">{course.subtitle}</p>
                <div className="flex items-center gap-2 text-xs text-surface-400 mb-3">
                  <span>{course.instructor}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><BookOpen size={12} />{course.lessons} lessons</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-surface-700">{course.rating}</span>
                    <span className="text-xs text-surface-400">({course.reviews.toLocaleString()})</span>
                  </div>
                  <span className="text-lg font-bold text-surface-900">${course.price}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-surface-300 mb-4" />
          <h3 className="font-semibold text-surface-700 mb-2">No courses found</h3>
          <p className="text-sm text-surface-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
