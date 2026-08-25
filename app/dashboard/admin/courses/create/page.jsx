"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input, { Textarea } from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Sparkles, Plus, X, Loader2, CheckCircle } from "lucide-react";

export default function CreateCoursePage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);

  const handleGenerate = async () => {
    if (!form.title || !form.category) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 3000));

    setAiGeneratedContent({
      modules: [
        { title: `Introduction to ${form.title}`, lessons: ["Course Overview", "Key Concepts", "Setting Up Your Environment", "First Project"] },
        { title: `Core Fundamentals`, lessons: ["Fundamental Theory", "Practical Examples", "Hands-on Exercise", "Module Quiz"] },
        { title: `Advanced Topics`, lessons: ["Advanced Concepts", "Real-world Applications", "Best Practices", "Assessment"] },
      ],
      summary: `A comprehensive course on ${form.title} covering beginner to advanced concepts with hands-on projects.`,
      objectives: [`Understand the core principles of ${form.title}`, "Build practical projects", "Apply best practices in real scenarios", "Master advanced techniques"],
    });

    setGenerating(false);
    setGenerated(true);
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-700 cursor-pointer">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-900">AI Course Generator</h1>
          <p className="text-surface-500 text-sm">Let AI help you create a complete course structure</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-surface-900 mb-4">Course Details</h3>
          <div className="space-y-4">
            <Input
              label="Course Title"
              placeholder="e.g., Complete Python Bootcamp"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Textarea
              label="Description"
              placeholder="What will students learn in this course?"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-surface-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer"
                >
                  <option value="">Select category</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Level</label>
                <div className="flex gap-1 bg-surface-100 rounded-lg p-1">
                  {["Beginner", "Intermediate", "Advanced"].map((l) => (
                    <button key={l} onClick={() => setForm({ ...form, level: l })} className={`flex-1 py-2 rounded-md text-xs font-medium transition-all cursor-pointer ${form.level === l ? "bg-white text-surface-900 shadow-sm" : "text-surface-500"}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <Input
              label="Price ($)"
              type="number"
              placeholder="49.99"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Tags</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 rounded-lg border border-surface-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <Button variant="secondary" onClick={addTag} icon={Plus}>Add</Button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((tag) => (
                    <Badge key={tag} color="blue" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })} className="cursor-pointer"><X size={12} /></button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900">AI Generated Content</h3>
            {!generated && (
              <Button onClick={handleGenerate} loading={generating} icon={Sparkles} disabled={!form.title || !form.category}>
                Generate
              </Button>
            )}
          </div>

          {generating && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Loader2 size={40} className="text-primary-500 animate-spin mb-4" />
              <p className="text-sm font-medium text-surface-700">AI is generating your course structure...</p>
              <p className="text-xs text-surface-400 mt-1">This may take a few moments</p>
            </div>
          )}

          {!generating && !generated && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-primary-300" />
              </div>
              <p className="text-sm text-surface-500">Fill in course details and click Generate</p>
              <p className="text-xs text-surface-400 mt-1">AI will create modules, lessons, and learning objectives</p>
            </div>
          )}

          {generated && aiGeneratedContent && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle size={18} className="text-green-500" />
                <span className="text-sm font-medium text-green-700">Course structure generated successfully!</span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-surface-900 mb-2">Course Summary</h4>
                <p className="text-sm text-surface-600 bg-surface-50 rounded-lg p-3">{aiGeneratedContent.summary}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-surface-900 mb-2">Learning Objectives</h4>
                <ul className="space-y-1.5">
                  {aiGeneratedContent.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-surface-900 mb-2">Modules</h4>
                <div className="space-y-3">
                  {aiGeneratedContent.modules.map((mod, i) => (
                    <div key={i} className="bg-surface-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-6 h-6 rounded bg-primary-100 flex items-center justify-center text-xs font-medium text-primary-600">{i + 1}</span>
                        <h5 className="text-sm font-medium text-surface-900">{mod.title}</h5>
                      </div>
                      <ul className="ml-8 space-y-1">
                        {mod.lessons.map((lesson, j) => (
                          <li key={j} className="text-xs text-surface-500 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-surface-300" /> {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleGenerate} variant="outline" icon={Sparkles}>Regenerate</Button>
                <Button icon={CheckCircle}>Publish Course</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
