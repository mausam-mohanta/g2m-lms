"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Sparkles, Brain, BarChart3, MessageSquare, Zap,
  BookOpen, Award, ArrowRight, Play, ChevronRight,
  Cpu, Radio, CircuitBoard, Wifi, Satellite, Activity,
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const features = [
  {
    icon: Brain,
    title: "AI-Powered ECE Tutor",
    desc: "Get instant explanations on circuits, signals, VLSI, embedded systems, and communication theory from an AI that understands engineering context.",
  },
  {
    icon: BarChart3,
    title: "Smart Progress Analytics",
    desc: "Track mastery across ECE sub-domains with AI-driven insights. Identify weak areas in analog, digital, or communication systems.",
  },
  {
    icon: MessageSquare,
    title: "ECE Quiz Generator",
    desc: "Auto-generated quizzes on topics like DSP, control systems, electromagnetic theory, and semiconductor devices.",
  },
  {
    icon: Zap,
    title: "Personalized Study Paths",
    desc: "AI recommends the next topics based on your ECE specialization track, exam goals, and learning history.",
  },
  {
    icon: BookOpen,
    title: "Rich ECE Content",
    desc: "Interactive circuit diagrams, signal flow graphs, block diagrams, and AI-generated summaries for every core ECE topic.",
  },
  {
    icon: Award,
    title: "ECE Certificates",
    desc: "Earn verified certificates in specialized ECE domains to showcase your expertise to employers and institutions.",
  },
];

const stats = [
  { value: "12K+", label: "ECE Students" },
  { value: "96%", label: "Satisfaction Rate" },
  { value: "4.9", label: "Average Rating" },
  { value: "24/7", label: "AI Tutor Access" },
];

const eceDomains = [
  { icon: CircuitBoard, name: "Analog & Digital Circuits" },
  { icon: Radio, name: "Communication Systems" },
  { icon: Cpu, name: "VLSI & Embedded Systems" },
  { icon: Activity, name: "Signal Processing" },
  { icon: Wifi, name: "Wireless & Networking" },
  { icon: Satellite, name: "Satellite & RF Engineering" },
];

const steps = [
  {
    step: "01",
    title: "Choose Your ECE Track",
    desc: "Select from analog circuits, digital design, communication systems, embedded systems, or信号 processing.",
  },
  {
    step: "02",
    title: "Learn with AI Tutor",
    desc: "Get real-time explanations, worked examples, and concept visualizations tailored to ECE topics.",
  },
  {
    step: "03",
    title: "Master & Certify",
    desc: "Track your progress across ECE domains, earn domain-specific certificates, and ace your exams.",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard/ai-tutor");
  }, [user, router]);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="G2M ECE Hub Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <CircuitBoard size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              G2M <span className="text-sm font-medium text-primary-500">ECE</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a href="#features" className="text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#domains" className="text-sm font-medium text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
              Domains
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-5 py-2.5 text-sm font-medium bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/20">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 circuit-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-white dark:from-primary-500/8 dark:via-surface-900 dark:to-surface-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/15 border border-primary-100 dark:border-primary-500/30 text-primary-600 dark:text-primary-300 text-sm font-medium mb-8 animate-fade-in">
              <Cpu size={14} />
              AI-Powered Electronics &amp; Communication Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-surface-900 dark:text-white leading-tight mb-6 animate-slide-up">
              Master ECE with{" "}
              <span className="text-gradient">AI Guidance</span>
            </h1>
            <p className="text-lg lg:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              From circuits to satellites, from signals to VLSI &mdash; get personalized AI tutoring, smart analytics, and study tools built exclusively for Electronics &amp; Communication Engineering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
              >
                Start Learning Free <ArrowRight size={20} />
              </Link>
              <Link
                href="/dashboard/ai-tutor"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 rounded-xl font-semibold text-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play size={18} className="text-secondary-500" /> Try AI Tutor
              </Link>
            </div>
          </div>

          {/* Domain chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-16 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {eceDomains.map((d) => (
              <div
                key={d.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-600 dark:text-surface-300 shadow-sm"
              >
                <d.icon size={16} className="text-primary-500" />
                {d.name}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-surface-500 dark:text-surface-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-surface-50 dark:bg-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Built for Electronics Engineers
            </h2>
            <p className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
              Every feature is designed to help ECE students and professionals understand complex concepts faster.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-surface-800 rounded-2xl p-8 border border-surface-100 dark:border-surface-700 hover:card-shadow-hover hover:border-primary-100 dark:hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/15 flex items-center justify-center mb-5 group-hover:bg-primary-100 dark:group-hover:bg-primary-500/25 transition-colors">
                  <f.icon size={24} className="text-primary-500 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains */}
      <section id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              Covering All ECE Domains
            </h2>
            <p className="text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
              Comprehensive coverage of every core and elective area in Electronics &amp; Communication Engineering.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { title: "Analog Electronics", topics: "Op-amps, MOSFETs, BJT, Filters, Oscillators" },
              { title: "Digital Electronics", topics: "Logic Gates, FSMs, Counters, Shift Registers" },
              { title: "Signals & Systems", topics: "Fourier, Z-Transform, Convolution, LTI Systems" },
              { title: "Communication Systems", topics: "AM/FM, PCM, Modulation, Channel Coding" },
              { title: "Embedded Systems", topics: "ARM, RTOS, Interfacing, IoT Protocols" },
              { title: "VLSI Design", topics: "CMOS Logic, Layout, Verilog, VHDL" },
              { title: "Control Systems", topics: "Bode Plot, Root Locus, PID, State Space" },
              { title: "EMF & Antennas", topics: "Maxwell Equations, Wave Propagation, Antenna Types" },
              { title: "DSP & ML", topics: "FIR/IIR Filters, Adaptive, Neural Networks for ECE" },
            ].map((d) => (
              <div
                key={d.title}
                className="p-5 rounded-xl border border-surface-100 dark:border-surface-700 bg-white dark:bg-surface-800 hover:border-primary-200 dark:hover:border-primary-500/30 transition-colors"
              >
                <h3 className="font-semibold text-surface-900 dark:text-white mb-1">{d.title}</h3>
                <p className="text-xs text-surface-400 dark:text-surface-500 leading-relaxed">{d.topics}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-surface-50 dark:bg-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-surface-500 dark:text-surface-400">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="text-5xl font-bold text-primary-100 dark:text-primary-500/30 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-surface-500 dark:text-surface-400 text-sm">{s.desc}</p>
                {i < 2 && (
                  <ChevronRight size={24} className="hidden md:block absolute top-8 -right-4 text-surface-300 dark:text-surface-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-24 h-24 border border-white/30 rounded-full" />
              <div className="absolute bottom-4 right-8 w-16 h-16 border border-white/30 rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-8 h-8 border border-white/20 rounded-full" />
            </div>
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Ace Your ECE Journey?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join 12,000+ electronics engineers already using G2M to master circuits, signals, and systems with AI-powered guidance.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors shadow-lg"
              >
                Get Started for Free <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-100 dark:border-surface-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <CircuitBoard size={16} className="text-white" />
                </div>
                <span className="text-lg font-bold text-surface-900 dark:text-white">
                  G2M <span className="text-sm font-medium text-primary-500">ECE</span>
                </span>
              </Link>
              <p className="text-sm text-surface-500 dark:text-surface-400">
                AI-powered learning platform built exclusively for Electronics &amp; Communication Engineering students and professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Platform</h4>
              <ul className="space-y-2">
                {["AI ECE Tutor", "Quiz Generator", "Study Paths", "Certificates"].map((l) => (
                  <li key={l}>
                    <Link href="/dashboard/ai-tutor" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">ECE Domains</h4>
              <ul className="space-y-2">
                {["Analog Circuits", "Digital Design", "Communication Systems", "Embedded Systems"].map((l) => (
                  <li key={l}>
                    <span className="text-sm text-surface-500 dark:text-surface-400">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-surface-900 dark:text-white mb-3">Support</h4>
              <ul className="space-y-2">
                {["Help Center", "Privacy Policy", "Terms of Service", "Contact"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-100 dark:border-surface-800 mt-10 pt-6 text-center text-sm text-surface-400 dark:text-surface-500">
            &copy; {new Date().getFullYear()} G2M ECE Hub. All rights reserved. Built with AI for Engineers.
          </div>
        </div>
      </footer>
    </div>
  );
}
