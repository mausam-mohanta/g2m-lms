"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Eye, EyeOff, CircuitBoard } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const eceTracks = [
  "Analog & Digital Circuits",
  "Communication Systems",
  "VLSI & Embedded",
  "Signal Processing",
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [track, setTrack] = useState(eceTracks[0]);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    register(name, email, password, role);
    setLoading(false);
    router.push("/dashboard/ai-tutor");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary-600 via-primary-500 to-primary-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-12 right-12 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-16 left-16 w-56 h-56 border-2 border-white rounded-full" />
          <div className="absolute top-1/3 left-1/2 w-16 h-16 border border-white rounded-full" />
        </div>
        <div className="text-white max-w-md relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-8">
            <CircuitBoard size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Start Your ECE Journey</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Join thousands of electronics engineers advancing their careers with AI-powered education in circuits, signals, and systems.
          </p>
          <div className="mt-8 space-y-3">
            {eceTracks.map((t) => (
              <div key={t} className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <CircuitBoard size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              G2M <span className="text-sm font-medium text-primary-500">ECE</span>
            </span>
          </Link>

          <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
            Create your account
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8">
            Get started with AI-powered ECE learning in seconds
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full name"
              icon={User}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@g2m.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPass ? "text" : "password"}
                icon={Lock}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 cursor-pointer"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-2">
                I want to join as
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["student", "instructor", "admin"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-3 rounded-xl border text-sm font-medium capitalize transition-all cursor-pointer ${
                      role === r
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-500/15 text-primary-600 dark:text-primary-300"
                        : "border-surface-200 dark:border-surface-600 text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-2">
                ECE Specialization Track
              </label>
              <div className="grid grid-cols-2 gap-2">
                {eceTracks.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTrack(t)}
                    className={`py-3 px-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      track === t
                        ? "border-secondary-500 bg-secondary-50 dark:bg-secondary-500/15 text-secondary-600 dark:text-secondary-300"
                        : "border-surface-200 dark:border-surface-600 text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
