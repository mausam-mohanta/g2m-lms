"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Sparkles, Brain, BarChart3, MessageSquare, Zap, Shield,
  BookOpen, Users, Award, ArrowRight, Play, Star, Check,
  GraduationCap, Code, Cloud, ChevronRight
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Tutoring", desc: "Get instant help from our AI tutor that understands your learning context and adapts to your pace." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Track your progress with AI-driven insights, identify strengths, and get personalized improvement tips." },
  { icon: MessageSquare, title: "AI Quiz Generator", desc: "Auto-generated quizzes from course content to test your understanding and reinforce learning." },
  { icon: Zap, title: "Personalized Paths", desc: "AI recommends the next best course and topics based on your goals and learning history." },
  { icon: BookOpen, title: "Rich Course Content", desc: "Video lessons, interactive exercises, and AI-generated summaries and flashcards." },
  { icon: Award, title: "Certificates", desc: "Earn verified certificates upon course completion to showcase your skills." },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "200+", label: "Expert Courses" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "4.8", label: "Average Rating" },
];

const testimonials = [
  { name: "Emily Carter", role: "Software Engineer", text: "G2M's AI tutor helped me master machine learning in half the time. The personalized recommendations were spot-on.", rating: 5 },
  { name: "David Kim", role: "Data Analyst", text: "The smart analytics dashboard showed me exactly where I needed improvement. Completed 3 courses in 2 months!", rating: 5 },
  { name: "Maria Santos", role: "CS Student", text: "The AI quiz generator is a game-changer. It creates the perfect questions to test my understanding.", rating: 5 },
];

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user, router]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">G2M</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">Features</a>
            <a href="#courses" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">Courses</a>
            <a href="#testimonials" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">Sign In</Link>
            <Link href="/register" className="px-5 py-2.5 text-sm font-medium bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">Get Started Free</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles size={14} />
              AI-Powered Learning Experience
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-surface-900 leading-tight mb-6 animate-slide-up">
              Learn Smarter with{" "}
              <span className="text-gradient">AI Guidance</span>
            </h1>
            <p className="text-lg lg:text-xl text-surface-500 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Master new skills with personalized AI tutoring, smart progress tracking, and courses designed to adapt to your learning style.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2">
                Start Learning Free <ArrowRight size={20} />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-surface-700 rounded-xl font-semibold text-lg border border-surface-200 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Play size={18} className="text-primary-500" /> Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-sm text-surface-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">Powered by Artificial Intelligence</h2>
            <p className="text-lg text-surface-500 max-w-2xl mx-auto">Our platform uses cutting-edge AI to personalize your learning journey and accelerate your growth.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-surface-100 hover:card-shadow-hover hover:border-primary-100 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                  <f.icon size={24} className="text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{f.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">How It Works</h2>
            <p className="text-lg text-surface-500">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose a Course", desc: "Browse our catalog of expert-led courses or let AI recommend the perfect path for your goals." },
              { step: "02", title: "Learn with AI Tutor", desc: "Study at your own pace with our AI tutor providing real-time explanations, quizzes, and summaries." },
              { step: "03", title: "Earn Certificates", desc: "Complete courses, pass assessments, and earn verified certificates to share with employers." },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="text-5xl font-bold text-primary-100 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{s.title}</h3>
                <p className="text-surface-500 text-sm">{s.desc}</p>
                {i < 2 && <ChevronRight size={24} className="hidden md:block absolute top-8 -right-4 text-surface-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="courses" className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">Explore Course Categories</h2>
            <p className="text-lg text-surface-500">From AI to Cloud Computing, find courses that match your ambitions</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Brain, name: "Artificial Intelligence", count: "12 courses", color: "from-blue-500 to-blue-600" },
              { icon: Code, name: "Web Development", count: "18 courses", color: "from-green-500 to-green-600" },
              { icon: BarChart3, name: "Data Science", count: "9 courses", color: "from-purple-500 to-purple-600" },
              { icon: Shield, name: "Cybersecurity", count: "7 courses", color: "from-red-500 to-red-600" },
              { icon: Cloud, name: "Cloud Computing", count: "11 courses", color: "from-orange-500 to-orange-600" },
              { icon: GraduationCap, name: "Mobile Development", count: "6 courses", color: "from-teal-500 to-teal-600" },
            ].map((cat, i) => (
              <Link key={i} href="/register" className="flex items-center gap-4 p-5 bg-white rounded-xl border border-surface-100 hover:card-shadow-hover transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0`}>
                  <cat.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-surface-900 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-surface-400">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">Loved by Learners Worldwide</h2>
            <p className="text-lg text-surface-500">See what our students have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-surface-100 card-shadow">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-surface-600 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-surface-900">{t.name}</div>
                    <div className="text-xs text-surface-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-surface-500">Choose the plan that fits your learning goals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Free", price: "$0", period: "forever", features: ["Access to 3 courses", "Basic AI tutor (50 msgs/day)", "Community forums", "Progress tracking"], cta: "Start Free", popular: false },
              { name: "Pro", price: "$29", period: "/month", features: ["Unlimited courses", "Unlimited AI tutor", "AI quiz generator", "Smart analytics", "Certificates", "Priority support"], cta: "Start Pro Trial", popular: true },
              { name: "Enterprise", price: "$99", period: "/month", features: ["Everything in Pro", "Team management", "Custom courses", "API access", "Dedicated support", "SSO integration"], cta: "Contact Sales", popular: false },
            ].map((plan, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border ${plan.popular ? "border-primary-200 ring-2 ring-primary-500/10 relative" : "border-surface-100"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">Most Popular</div>}
                <h3 className="text-lg font-semibold text-surface-900">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-surface-900">{plan.price}</span>
                  <span className="text-surface-400 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-surface-600">
                      <Check size={16} className="text-secondary-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`block text-center py-3 rounded-xl font-medium transition-colors ${plan.popular ? "bg-primary-500 text-white hover:bg-primary-600" : "bg-surface-100 text-surface-700 hover:bg-surface-200"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-12 lg:p-16 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ learners already using G2M to master new skills with AI-powered guidance.</p>
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors">
              Get Started for Free <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold text-surface-900">G2M</span>
              </Link>
              <p className="text-sm text-surface-500">AI-powered learning platform helping you master skills faster.</p>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 mb-3">Platform</h4>
              <ul className="space-y-2">
                {["Browse Courses", "AI Tutor", "Pricing", "For Teams"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-surface-500 hover:text-surface-700">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 mb-3">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Contact"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-surface-500 hover:text-surface-700">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 mb-3">Support</h4>
              <ul className="space-y-2">
                {["Help Center", "Privacy Policy", "Terms of Service", "Status"].map((l) => (
                  <li key={l}><a href="#" className="text-sm text-surface-500 hover:text-surface-700">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-100 mt-10 pt-6 text-center text-sm text-surface-400">
            &copy; 2026 G2M. All rights reserved. Built with AI.
          </div>
        </div>
      </footer>
    </div>
  );
}
