"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Sparkles, Send, Copy, ThumbsUp, ThumbsDown,
  BookOpen, Code, Brain, Lightbulb, Search, Globe, Home,
  AlertCircle, CircuitBoard, Cpu, Settings,
} from "lucide-react";

const MODES = [
  {
    key: "concept",
    icon: Brain,
    title: "Explain a Concept",
    desc: "Get a clear explanation of any ECE topic with real sources.",
    placeholder: "Type your question here...",
    starter: "I can explain any ECE concept clearly. What would you like me to explain? Type your topic below, or pick a suggestion.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    key: "quiz",
    icon: Lightbulb,
    title: "ECE Quiz Generator",
    desc: "Study any ECE topic with practice questions and reference links.",
    placeholder: "Type your question here...",
    starter: "I'll help you build a quiz on any ECE topic using reliable study sources. What topic should we quiz you on?",
    color: "from-amber-500 to-orange-500",
  },
  {
    key: "summarize",
    icon: BookOpen,
    title: "Summarize a Topic",
    desc: "Get a concise summary of any ECE concept from real content.",
    placeholder: "Type your question here...",
    starter: "I'll summarize an ECE topic for you using real sources. What would you like me to summarize?",
    color: "from-emerald-500 to-teal-500",
  },
  {
    key: "code",
    icon: Code,
    title: "ECE Coding Help",
    desc: "Get help with Verilog, VHDL, MATLAB, Python for ECE, and more.",
    placeholder: "Type your question here...",
    starter: "I'll help you with ECE-related coding by finding relevant references. What do you need help with?",
    color: "from-violet-500 to-purple-500",
  },
  {
    key: "search",
    icon: Search,
    title: "ECE Research",
    desc: "Search any ECE topic and find the best resources.",
    placeholder: "Type your question here...",
    starter: "I can fetch real ECE research and learning resources for you. Ask me about anything in electronics and communication engineering.",
    color: "from-cyan-500 to-blue-500",
  },
];



function renderMarkdownLine(line, key) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span key={key}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

function parseContent(text) {
  const lines = text.split("\n");
  const blocks = [];
  let list = [];
  const flush = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list });
      list = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*[-*]\s+/.test(line)) {
      list.push(line.replace(/^\s*[-*]\s+/, ""));
    } else if (line.trim() === "") {
      flush();
      blocks.push({ type: "blank" });
    } else {
      flush();
      blocks.push({ type: "text", text: line });
    }
  }
  flush();
  return blocks;
}

function QuizPanel({ quiz, currentIndex, setCurrentIndex, answers, setAnswers, revealed, setRevealed }) {
  const questions = quiz.questions;
  const q = questions[currentIndex];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const allDone = answeredCount === total;

  const selectAnswer = (optIdx) => {
    if (revealed) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: optIdx }));
  };

  const checkAnswer = () => {
    setRevealed(true);
  };

  const nextQuestion = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealed(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRevealed(answers[currentIndex - 1] !== undefined);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setRevealed(false);
  };

  const score = Math.round((correctCount / total) * 100);

  if (allDone && revealed) {
    return (
      <div className="mx-4 mb-4 p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-surface-900 dark:text-white mb-2">{score}%</div>
          <p className="text-surface-500 dark:text-surface-400">
            You got <span className="font-semibold text-emerald-500">{correctCount}</span> out of <span className="font-semibold">{total}</span> correct
          </p>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={restartQuiz}
            className="px-4 py-2 rounded-xl bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const selectedIdx = answers[currentIndex];
  const isRevealed = revealed && selectedIdx !== undefined;

  return (
    <div className="mx-4 mb-4 p-5 bg-white dark:bg-surface-800 rounded-2xl border border-surface-100 dark:border-surface-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          <span className="text-sm font-semibold text-surface-900 dark:text-white">Quiz: {quiz.title}</span>
        </div>
        <span className="text-xs text-surface-400 dark:text-surface-500">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="h-1.5 bg-surface-100 dark:bg-surface-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      <p className="text-sm font-medium text-surface-900 dark:text-white mb-4 leading-relaxed">
        {q.question}
      </p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => {
          let style = "bg-surface-50 dark:bg-surface-700/50 border-surface-200 dark:border-surface-600 hover:border-primary-300 dark:hover:border-primary-500/50";
          if (isRevealed) {
            if (i === q.correctIndex) {
              style = "bg-emerald-50 dark:bg-emerald-500/15 border-emerald-300 dark:border-emerald-500/40";
            } else if (i === selectedIdx) {
              style = "bg-red-50 dark:bg-red-500/15 border-red-300 dark:border-red-500/40";
            } else {
              style = "bg-surface-50 dark:bg-surface-700/50 border-surface-200 dark:border-surface-600 opacity-50";
            }
          } else if (selectedIdx === i) {
            style = "bg-primary-50 dark:bg-primary-500/15 border-primary-300 dark:border-primary-500/40 ring-1 ring-primary-200 dark:ring-primary-500/30";
          }
          return (
            <button
              key={i}
              onClick={() => selectAnswer(i)}
              disabled={isRevealed}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all cursor-pointer disabled:cursor-default ${style}`}
            >
              <span className="font-medium text-surface-500 dark:text-surface-400 mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              <span className="text-surface-700 dark:text-surface-200">{opt}</span>
            </button>
          );
        })}
      </div>

      {isRevealed && q.explanation && (
        <div className="p-3 rounded-xl bg-surface-50 dark:bg-surface-700/30 border border-surface-100 dark:border-surface-700 mb-4">
          <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">
            <span className="font-semibold text-surface-700 dark:text-surface-200">Explanation: </span>
            {q.explanation}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-3 py-1.5 text-xs rounded-lg text-surface-500 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {!isRevealed && selectedIdx !== undefined && (
            <button
              onClick={checkAnswer}
              className="px-4 py-1.5 text-xs rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors cursor-pointer"
            >
              Check Answer
            </button>
          )}
          {isRevealed && currentIndex < total - 1 && (
            <button
              onClick={nextQuestion}
              className="px-4 py-1.5 text-xs rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors cursor-pointer"
            >
              Next Question
            </button>
          )}
        </div>

        <span className="text-xs text-surface-400 dark:text-surface-500">
          {correctCount} correct
        </span>
      </div>
    </div>
  );
}

export default function AITutorPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [provider, setProvider] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizRevealed, setQuizRevealed] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, mode]);

  const startMode = useCallback((m) => {
    setMode(m.key);
    setError("");
    setQuizData(null);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizRevealed(false);
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: m.starter,
      },
    ]);
  }, []);

  const goHome = () => {
    setMode(null);
    setMessages([]);
    setError("");
    setInput("");
    setQuizData(null);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizRevealed(false);
  };

  const copyText = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const handleSend = async (text) => {
    const content = text || input;
    if (!content.trim() || isTyping) return;

    const activeMode = mode || "search";
    const userMsg = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setError("");

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content, mode: activeMode }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Search failed");
      }
      if (data.provider) setProvider(data.provider);
      if (data.quiz && data.quiz.questions && data.quiz.questions.length > 0) {
        setQuizData(data.quiz);
        setQuizIndex(0);
        setQuizAnswers({});
        setQuizRevealed(false);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
          googleUrl: data.googleUrl,
        },
      ]);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "I couldn't fetch results right now. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderAssistantContent = (msg) => {
    const blocks = parseContent(msg.content);
    return (
      <div className="text-sm whitespace-pre-wrap leading-relaxed">
        {blocks.map((b, i) =>
          b.type === "text" ? (
            <p key={i} className={b.text === "" ? "py-1" : "mb-1.5"}>
              {renderMarkdownLine(b.text, i)}
            </p>
          ) : b.type === "list" ? (
            <ul key={i} className="mb-1.5 space-y-0.5 pl-1">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-1.5">
                  <span className="text-primary-500 mt-px">&#x2022;</span>
                  <span>{renderMarkdownLine(item, j)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div key={i} className="h-2" />
          )
        )}
      </div>
    );
  };

  if (!mode) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/15 border border-primary-100 dark:border-primary-500/30 text-primary-600 dark:text-primary-300 text-sm font-medium mb-6">
            <Cpu size={14} /> AI-Powered ECE Learning Assistant
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-3">
            Welcome, {user?.name?.split(" ")[0] || "Engineer"} &#x1F44B;
          </h1>
          <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">
            Pick a mode to get started. The AI tutor searches live sources and returns real answers with citations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => startMode(m)}
              className="group text-left bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-100 dark:border-surface-700 hover:card-shadow-hover hover:border-primary-100 dark:hover:border-primary-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <m.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">{m.title}</h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{m.desc}</p>
            </button>
          ))}

          {/* Quick ECE topic card */}
          <button
            onClick={() => startMode(MODES[0])}
            className="group text-left bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-500/10 dark:to-secondary-500/10 rounded-2xl p-6 border border-primary-100 dark:border-primary-500/20 hover:card-shadow-hover transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
              <CircuitBoard size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-1">Quick Start</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
              Ask me anything about ECE &mdash; circuits, signals, VLSI, communications, or embedded systems.
            </p>
          </button>
        </div>
      </div>
    );
  }

  const activeMode = MODES.find((m) => m.key === mode);

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <activeMode.icon size={24} className="text-primary-500" /> {activeMode.title}
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1 flex items-center gap-2">
            {provider === "google" ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Google Search connected
              </>
            ) : provider === "duckduckgo" ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live DuckDuckGo answers
              </>
            ) : (
              "Powered by DuckDuckGo + Wikipedia (no key needed)"
            )}
          </p>
        </div>
        <Button variant="outline" size="sm" icon={Home} onClick={goHome}>
          Tutor Home
        </Button>
      </div>

      {error && (
        <div className="mb-3 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <Card className="flex-1 flex flex-col overflow-hidden !p-0">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                  <CircuitBoard size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary-500 text-white rounded-br-md"
                  : "bg-surface-50 dark:bg-surface-700/50 text-surface-700 dark:text-surface-200 rounded-bl-md"
              }`}>
                {msg.role === "assistant" ? renderAssistantContent(msg) : (
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                )}

                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={14} className="text-primary-500" />
                      <span className="text-xs font-semibold text-surface-700 dark:text-surface-200">Sources</span>
                    </div>
                    <ul className="space-y-2">
                      {msg.sources.slice(0, 6).map((s, i) => (
                        <li key={i}>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <span className="text-[10px] text-surface-400 dark:text-surface-500 group-hover:text-primary-500 transition-colors">
                              {s.displayLink || new URL(s.url).hostname.replace("www.", "")}
                            </span>
                            <span className="block text-xs text-primary-600 dark:text-primary-300 group-hover:underline truncate">
                              {s.title}
                            </span>
                            {s.snippet && (
                              <span className="block text-[11px] text-surface-500 dark:text-surface-400 line-clamp-2">
                                {s.snippet}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {msg.googleUrl && (
                      <a
                        href={msg.googleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500 text-white text-xs font-medium hover:bg-primary-600 transition-colors"
                      >
                        <Search size={12} /> Search on Google
                      </a>
                    )}
                  </div>
                )}

                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-surface-200 dark:border-surface-600">
                    <button
                      onClick={() => copyText(msg.content)}
                      className="p-1 hover:bg-surface-200 dark:hover:bg-surface-600 rounded transition-colors cursor-pointer"
                      title="Copy response"
                      aria-label="Copy response"
                    >
                      <Copy size={12} className="text-surface-400 dark:text-surface-500" />
                    </button>
                    <button
                      className="p-1 hover:bg-surface-200 dark:hover:bg-surface-600 rounded transition-colors cursor-pointer"
                      title="Helpful"
                      aria-label="Mark as helpful"
                    >
                      <ThumbsUp size={12} className="text-surface-400 dark:text-surface-500" />
                    </button>
                    <button
                      className="p-1 hover:bg-surface-200 dark:hover:bg-surface-600 rounded transition-colors cursor-pointer"
                      title="Not helpful"
                      aria-label="Mark as not helpful"
                    >
                      <ThumbsDown size={12} className="text-surface-400 dark:text-surface-500" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <CircuitBoard size={14} className="text-white" />
              </div>
              <div className="bg-surface-50 dark:bg-surface-700/50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary-400 dark:bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary-400 dark:bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary-400 dark:bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-surface-500 dark:text-surface-400">Searching ECE resources...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {quizData && quizData.questions && quizData.questions.length > 0 && (
          <QuizPanel
            quiz={quizData}
            currentIndex={quizIndex}
            setCurrentIndex={setQuizIndex}
            answers={quizAnswers}
            setAnswers={setQuizAnswers}
            revealed={quizRevealed}
            setRevealed={setQuizRevealed}
          />
        )}

        <div className="p-4 border-t border-surface-100 dark:border-surface-700">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeMode.placeholder}
              className="flex-1 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
            <Button type="submit" disabled={!input.trim() || isTyping} className="px-4">
              <Send size={18} />
            </Button>
          </form>
          <p className="text-xs text-surface-400 dark:text-surface-500 mt-2 text-center">
            Results pulled from the web. Open the sources or tap &quot;Search on Google&quot; for full results.
          </p>
        </div>
      </Card>
    </div>
  );
}
