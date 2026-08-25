"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Sparkles, Send, Copy, ThumbsUp, ThumbsDown, RotateCcw,
  BookOpen, Code, Brain, HelpCircle, Lightbulb, MessageSquare
} from "lucide-react";

const quickPrompts = [
  { icon: Brain, label: "Explain a concept", prompt: "Explain the concept of neural networks in simple terms" },
  { icon: Code, label: "Help with code", prompt: "Help me write a Python function to sort a list using quicksort" },
  { icon: Lightbulb, label: "Generate quiz", prompt: "Generate a 5-question quiz on machine learning basics" },
  { icon: BookOpen, label: "Summarize topic", prompt: "Summarize the key concepts of web development in 2024" },
];

const aiResponses = {
  "explain": "Neural networks are computing systems inspired by the human brain. They consist of layers of interconnected nodes (neurons) that process information.\n\n**Key Components:**\n1. **Input Layer** - Receives the raw data\n2. **Hidden Layers** - Process information through weighted connections\n3. **Output Layer** - Produces the final result\n\n**How it works:**\nEach connection has a weight that gets adjusted during training. When data flows through the network, neurons apply mathematical functions to transform the input, and the network learns by adjusting weights to minimize errors.\n\nThink of it like this: imagine teaching a child to recognize cats. You show many examples, and eventually the child's brain learns the patterns. Neural networks work similarly, learning from examples to make predictions.",
  "code": "Here's a Python quicksort implementation:\n\n```python\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quicksort(left) + middle + quicksort(right)\n\n# Example usage\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nsorted_numbers = quicksort(numbers)\nprint(sorted_numbers)  # [11, 12, 22, 25, 34, 64, 90]\n```\n\n**Time Complexity:**\n- Best/Average: O(n log n)\n- Worst: O(n²) - when the array is already sorted\n\n**Space Complexity:** O(n) for this implementation due to list comprehensions.",
  "quiz": "Here's your AI-generated quiz on Machine Learning:\n\n**Question 1:** What is supervised learning?\n- A) Learning without labeled data\n- B) Learning with labeled data ✓\n- C) Learning through trial and error\n- D) Learning from unsupervised clusters\n\n**Question 2:** Which metric is used for classification problems?\n- A) Mean Squared Error\n- B) R-squared\n- C) Accuracy ✓\n- D) All of the above\n\n**Question 3:** What does a learning rate control?\n- A) The number of epochs\n- B) The step size during optimization ✓\n- C) The batch size\n- D) The number of layers\n\n**Question 4:** Overfitting occurs when:\n- A) Model is too simple\n- B) Model performs well on all data\n- C) Model memorizes training data but fails on new data ✓\n- D) Model has no parameters\n\n**Question 5:** Which is NOT a type of neural network?\n- A) CNN\n- B) RNN\n- C) LLM\n- D) GAN\n\nAnswer: C) LLM (Large Language Model is a type of AI, not a network architecture)",
  "default": "That's a great question! Let me help you understand this topic.\n\nI can assist you with:\n- **Concept explanations** - Breaking down complex topics into simple terms\n- **Code help** - Writing, debugging, or explaining code\n- **Quiz generation** - Creating practice questions on any topic\n- **Study plans** - Organizing your learning path\n- **Summaries** - Condensing long topics into key points\n\nWhat specific aspect would you like to explore further?",
};

export default function AITutorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: `Hello ${user?.name?.split(" ")[0] || "there"}! I'm your AI Learning Tutor. I can help you understand concepts, generate quizzes, explain code, or create study materials. What would you like to work on today?`, timestamp: "Just now" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    if (lower.includes("explain") || lower.includes("what is") || lower.includes("neural")) return aiResponses.explain;
    if (lower.includes("code") || lower.includes("function") || lower.includes("python") || lower.includes("write")) return aiResponses.code;
    if (lower.includes("quiz") || lower.includes("test") || lower.includes("question")) return aiResponses.quiz;
    return aiResponses.default;
  };

  const handleSend = async (text) => {
    const content = text || input;
    if (!content.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content, timestamp: "Just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1500));

    const aiMsg = { id: Date.now() + 1, role: "assistant", content: getAIResponse(content), timestamp: "Just now" };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-surface-900 flex items-center gap-2">
          <Sparkles size={24} className="text-primary-500" /> AI Tutor
        </h1>
        <p className="text-surface-500 text-sm mt-1">Your personal AI learning assistant powered by advanced AI</p>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden !p-0">
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.length === 1 && (
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {quickPrompts.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qp.prompt)}
                  className="flex items-center gap-3 p-4 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors text-left cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <qp.icon size={18} className="text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-surface-700">{qp.label}</span>
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary-500 text-white rounded-br-md"
                  : "bg-surface-50 text-surface-700 rounded-bl-md"
              }`}>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-surface-200">
                    <button className="p-1 hover:bg-surface-200 rounded cursor-pointer"><Copy size={12} className="text-surface-400" /></button>
                    <button className="p-1 hover:bg-surface-200 rounded cursor-pointer"><ThumbsUp size={12} className="text-surface-400" /></button>
                    <button className="p-1 hover:bg-surface-200 rounded cursor-pointer"><ThumbsDown size={12} className="text-surface-400" /></button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-surface-50 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-surface-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-xl border border-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
            <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="px-4">
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-surface-400 mt-2 text-center">AI responses are generated and may not always be accurate. Always verify important information.</p>
        </div>
      </Card>
    </div>
  );
}
