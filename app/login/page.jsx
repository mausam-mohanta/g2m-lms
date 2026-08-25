"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
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
      router.push("/dashboard");
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center p-12">
        <div className="text-white max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to G2M</h1>
          <p className="text-white/80 text-lg">Your AI-powered learning companion that adapts to your pace and helps you master any skill.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">G2M</span>
          </Link>

          <h2 className="text-2xl font-bold text-surface-900 mb-2">Sign in to your account</h2>
          <p className="text-surface-500 mb-8">Enter your credentials to continue learning</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email address" type="email" icon={Mail} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="relative">
              <Input label="Password" type={showPass ? "text" : "password"} icon={Lock} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-surface-400 hover:text-surface-600 cursor-pointer">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-surface-600">
                <input type="checkbox" className="rounded border-surface-300" /> Remember me
              </label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-600">Forgot password?</a>
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-surface-400 text-center mb-3">Quick demo access</p>
            <div className="flex gap-2">
              {["student", "instructor", "admin"].map((role) => (
                <button key={role} onClick={() => fillDemo(role)} className="flex-1 py-2 text-xs font-medium capitalize bg-surface-50 border border-surface-200 rounded-lg hover:bg-surface-100 text-surface-600 cursor-pointer">
                  {role}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-surface-500 mt-8">
            Don&apos;t have an account? <Link href="/register" className="text-primary-500 font-medium hover:text-primary-600">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
