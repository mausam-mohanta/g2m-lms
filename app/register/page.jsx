"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
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
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center p-12">
        <div className="text-white max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Start Your Journey</h1>
          <p className="text-white/80 text-lg">Join thousands of learners advancing their careers with AI-powered education.</p>
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

          <h2 className="text-2xl font-bold text-surface-900 mb-2">Create your account</h2>
          <p className="text-surface-500 mb-8">Get started with AI-powered learning in seconds</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full name" icon={User} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email address" type="email" icon={Mail} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="relative">
              <Input label="Password" type={showPass ? "text" : "password"} icon={Lock} placeholder="Min. 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-surface-400 hover:text-surface-600 cursor-pointer">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">I want to join as</label>
              <div className="grid grid-cols-3 gap-2">
                {["student", "instructor", "admin"].map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)} className={`py-3 rounded-xl border text-sm font-medium capitalize transition-all cursor-pointer ${role === r ? "border-primary-500 bg-primary-50 text-primary-600" : "border-surface-200 text-surface-500 hover:bg-surface-50"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">Create Account</Button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-8">
            Already have an account? <Link href="/login" className="text-primary-500 font-medium hover:text-primary-600">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
