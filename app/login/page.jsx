"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, CircuitBoard } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      router.push("/dashboard/ai-tutor");
    } else {
      setError(result.error);
    }
  };

  const fillDemo = (role) => {
    const demos = {
      student: { email: "student@g2m.com", password: "password123" },
      instructor: { email: "instructor@g2m.com", password: "password123" },
      admin: { email: "admin@g2m.com", password: "password123" },
    };
    setEmail(demos[role].email);
    setPassword(demos[role].password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-32 h-32 border-2 border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full" />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 border border-white rounded-full" />
        </div>
        <div className="text-white max-w-md relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-8">
            <CircuitBoard size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to G2M ECE</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Your AI-powered learning companion for Electronics &amp; Communication Engineering. Master circuits, signals, VLSI, and more.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {["Analog Circuits", "DSP", "VLSI Design", "Embedded Systems"].map((t) => (
              <div key={t} className="px-3 py-2 bg-white/10 rounded-lg text-sm font-medium backdrop-blur-sm">
                {t}
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
            Sign in to your account
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mb-8">
            Enter your credentials to continue learning
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-300">
                <input type="checkbox" className="rounded border-surface-300 dark:border-surface-600" />
                Remember me
              </label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                Forgot password?
              </a>
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-surface-400 dark:text-surface-500 text-center mb-3">
              Quick demo access
            </p>
            <div className="flex gap-2">
              {["student", "instructor", "admin"].map((role) => (
                <button
                  key={role}
                  onClick={() => fillDemo(role)}
                  className="flex-1 py-2 text-xs font-medium capitalize bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-600 dark:text-surface-300 cursor-pointer transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-500 font-medium hover:text-primary-600 transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
