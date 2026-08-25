"use client";

import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { analyticsData } from "@/data/mockData";
import {
  Clock, BookOpen, Award, Target, TrendingUp, Sparkles,
  Flame, BarChart3, Lightbulb, ArrowUp, ArrowDown
} from "lucide-react";

export default function AnalyticsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Smart Analytics</h1>
        <p className="text-surface-500 mt-1">AI-powered insights into your learning progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Total Hours", value: `${analyticsData.totalHours}h`, change: "+12%", up: true, color: "text-blue-500 bg-blue-50" },
          { icon: Award, label: "Completed", value: analyticsData.coursesCompleted, change: "+1 this month", up: true, color: "text-green-500 bg-green-50" },
          { icon: Target, label: "Avg Score", value: `${analyticsData.averageScore}%`, change: "+3.2%", up: true, color: "text-purple-500 bg-purple-50" },
          { icon: Flame, label: "Streak", value: `${analyticsData.streak} days`, change: "Personal best!", up: true, color: "text-orange-500 bg-orange-50" },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-green-500" : "text-red-500"}`}>
                {stat.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
            <div className="text-xs text-surface-500 mt-0.5">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card>
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-primary-500" /> Weekly Learning Hours
          </h3>
          <div className="flex items-end gap-3 h-48">
            {analyticsData.weeklyHours.map((day, i) => {
              const maxH = Math.max(...analyticsData.weeklyHours.map((d) => d.hours));
              const h = (day.hours / maxH) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-surface-500 font-medium">{day.hours}h</span>
                  <div className="w-full bg-surface-100 rounded-lg overflow-hidden flex-1 flex flex-col justify-end">
                    <div className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-lg transition-all duration-500" style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-xs text-surface-400 font-medium">{day.week}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Subject Performance */}
        <Card>
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Target size={18} className="text-purple-500" /> Subject Performance
          </h3>
          <div className="space-y-4">
            {analyticsData.subjectPerformance.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-surface-700">{s.subject}</span>
                  <span className="text-sm font-semibold text-surface-900">{s.score}%</span>
                </div>
                <div className="h-2.5 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      s.score >= 90 ? "bg-green-500" : s.score >= 80 ? "bg-primary-500" : s.score >= 70 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Progress */}
        <Card>
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-green-500" /> Monthly Progress
          </h3>
          <div className="space-y-3">
            {analyticsData.monthlyProgress.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-50 transition-colors">
                <div className="w-12 text-center">
                  <span className="text-sm font-medium text-surface-700">{m.month}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(m.hours / 30) * 100}%` }} />
                    </div>
                    <span className="text-xs text-surface-500 w-12 text-right">{m.hours}h</span>
                  </div>
                </div>
                <Badge color="blue">{m.courses} courses</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card>
          <h3 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-primary-500" /> AI Learning Insights
          </h3>
          <div className="space-y-3">
            {analyticsData.aiInsights.map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 bg-primary-50/50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={14} className="text-primary-500" />
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
