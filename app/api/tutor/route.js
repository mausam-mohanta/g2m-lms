import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY || "";
const GOOGLE_CX = process.env.GOOGLE_SEARCH_CX || "";

function cleanHTML(text = "") {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text || "";
  return text.slice(0, maxLen).trimEnd() + "...";
}

// ─── Provider 1: DuckDuckGo Instant Answer (free, no API key) ───────────────

async function duckDuckGoSearch(query) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const data = await res.json();

    const sources = [];
    const topics = [];

    if (data.Abstract && data.AbstractURL) {
      sources.push({
        title: data.Heading || query,
        snippet: cleanHTML(data.Abstract),
        url: data.AbstractURL,
        displayLink: new URL(data.AbstractURL).hostname.replace("www.", ""),
      });
    }

    for (const topic of data.RelatedTopics || []) {
      if (!topic) continue;
      if (topic.Topics) {
        for (const sub of topic.Topics) {
          if (sub.FirstURL && sub.Text) {
            sources.push({
              title: cleanHTML(sub.Text).split(" - ")[0],
              snippet: cleanHTML(sub.Text),
              url: sub.FirstURL,
              displayLink: new URL(sub.FirstURL).hostname.replace("www.", ""),
            });
          }
        }
      } else if (topic.FirstURL && topic.Text) {
        sources.push({
          title: cleanHTML(topic.Text).split(" - ")[0],
          snippet: cleanHTML(topic.Text),
          url: topic.FirstURL,
          displayLink: new URL(topic.FirstURL).hostname.replace("www.", ""),
        });
      }
    }

    return { sources, topics };
  } catch (e) {
    console.error("DuckDuckGo search failed:", e.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Provider 2: Google Custom Search (optional, requires key) ───────────────

async function googleSearch(query, numResults = 8) {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) return null;

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", GOOGLE_API_KEY);
  url.searchParams.set("cx", GOOGLE_CX);
  url.searchParams.set("q", query);
  url.searchParams.set("num", String(Math.min(numResults, 10)));
  url.searchParams.set("safe", "active");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url.toString(), { signal: controller.signal });
    if (!res.ok) {
      console.error("Google Search API error:", res.status);
      return null;
    }
    const data = await res.json();
    const items = data?.items || [];
    return items.map((item) => ({
      title: item.title || "",
      snippet: cleanHTML(item.snippet || ""),
      url: item.link || "",
      displayLink: item.displayLink || "",
    }));
  } catch (e) {
    console.error("Google Search failed:", e.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Provider 3: Wikipedia fallback ─────────────────────────────────────────

async function wikipediaSearch(query) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&format=json&origin=*`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const hits = json?.query?.search || [];
    if (!hits.length) return null;
    return hits.map((h) => ({ title: h.title, snippet: cleanHTML(h.snippet) }));
  } catch (e) {
    console.error("Wikipedia search failed:", e.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWikipediaExtract(title, full = false) {
  let url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&redirects=1&format=json&origin=*&titles=${encodeURIComponent(title)}`;
  if (!full) url += "&exintro=1";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    const pages = json?.query?.pages || {};
    const page = Object.values(pages)[0];
    if (!page || !page.extract) return null;
    return {
      title: page.title,
      extract: page.extract,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
    };
  } catch (e) {
    console.error("Wikipedia extract failed:", e.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function getWikipediaBest(query) {
  const search = await wikipediaSearch(query);
  if (!search) return null;
  for (const hit of search.slice(0, 2)) {
    const page = await fetchWikipediaExtract(hit.title);
    if (page && page.extract) return page;
  }
  return null;
}

async function getWikipediaFull(query) {
  const search = await wikipediaSearch(query);
  if (!search) return null;
  for (const hit of search.slice(0, 2)) {
    const page = await fetchWikipediaExtract(hit.title, true);
    if (page && page.extract) return page;
  }
  return null;
}

// ─── ECE topic mapping ──────────────────────────────────────────────────────

const eceTopicMap = {
  mosfet: "MOSFET",
  "bipolar junction transistor": "Bipolar junction transistor",
  "op-amp": "Operational amplifier",
  "operational amplifier": "Operational amplifier",
  "fourier transform": "Fourier transform",
  "z-transform": "Z-transform",
  "laplace transform": "Laplace transform",
  nyquist: "Nyquist-Shannon sampling theorem",
  shannon: "Shannon-Hartley theorem",
  fft: "Fast Fourier transform",
  "bode plot": "Bode plot",
  "root locus": "Root locus",
  pid: "PID controller",
  cmos: "CMOS",
  verilog: "Verilog",
  vhdl: "VHDL",
  vlsi: "Very-large-scale integration",
  "embedded system": "Embedded system",
  microcontroller: "Microcontroller",
  "arm processor": "ARM architecture",
  "amplitude modulation": "Amplitude modulation",
  "frequency modulation": "Frequency modulation",
  pcm: "Pulse-code modulation",
  antenna: "Antenna (radio)",
  maxwell: "Maxwell's equations",
  electromagnetic: "Electromagnetic radiation",
  "digital signal processing": "Digital signal processing",
  "analog signal": "Analog signal",
  "digital signal": "Digital signal",
  "filter design": "Electronic filter",
  "fir filter": "Finite impulse response",
  "iir filter": "Infinite impulse response",
  pll: "Phase-locked loop",
  adc: "Analog-to-digital converter",
  dac: "Digital-to-analog converter",
  "printed circuit board": "Printed circuit board",
  pcb: "PCB",
  transistor: "Transistor",
  diode: "Diode",
  "logic gate": "Logic gate",
  "flip flop": "Flip-flop",
  "karnaugh map": "Karnaugh map",
  "boolean algebra": "Boolean algebra",
  "frequency response": "Frequency response",
  "gain margin": "Gain margin",
  "phase margin": "Phase margin",
  "sampling theorem": "Nyquist-Shannon sampling theorem",
  "channel capacity": "Channel capacity theorem",
  "signal to noise": "Signal-to-noise ratio",
  decibel: "Decibel",
  impedance: "Electrical impedance",
  resonance: "Resonance",
  "transfer function": "Transfer function",
  convolution: "Convolution",
  laplace: "Laplace transform",
  fourier: "Fourier series",
  "maxwell equations": "Maxwell's equations",
  emf: "Electromotive force",
  "ohm law": "Ohm's law",
  kirchhoff: "Kirchhoff's circuit laws",
  thevenin: "Thévenin's theorem",
  norton: "Norton's theorem",
  superposition: "Superposition theorem",
};

function enhanceQueryWithECE(query) {
  return query.replace(/[?!.,;:'"]+/g, "").trim();
}

const eceKeywordMap = Object.keys(eceTopicMap).sort((a, b) => b.length - a.length);

function normalizeTopic(query) {
  const lower = query.toLowerCase();
  for (const keyword of eceKeywordMap) {
    if (lower.includes(keyword)) return eceTopicMap[keyword];
  }
  let cleaned = query
    .replace(/^\s*(what|is|are|a|an|the|explain|about|define|whats|how|does|do|why|tell me about|give me|can you|please)\b/gi, "")
    .replace(/\b(please|thanks|thank you|in simple terms|in detail|briefly|clearly|easily)\b/gi, "")
    .replace(/[?!.,;:'"]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) cleaned = query.replace(/[?!.,;:'"]+/g, "").trim();
  return cleaned;
}

// ─── Quiz question generator ────────────────────────────────────────────────

function splitSentences(text) {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && s.length < 600);
}

function splitParagraphs(text) {
  return text.split(/\n{2,}/).map((p) => p.trim()).filter((p) => p.length > 50);
}

const distractorPool = [
  "Fourier transform", "Laplace transform", "Z-transform",
  "MOSFET", "BJT", "CMOS", "diode", "transistor",
  "Bode plot", "root locus", "Nyquist plot",
  "AM modulation", "FM modulation", "PCM",
  "Verilog", "VHDL", "Python", "MATLAB",
  "ADC", "DAC", "PLL",
  "FIR filter", "IIR filter", "Butterworth filter",
  "Ohm's law", "Kirchhoff's law", "Thévenin's theorem",
  "Wi-Fi", "Bluetooth", "Zigbee", "MQTT",
  "RISC-V", "ARM", "x86",
  "PID controller", "state-space model",
  "electromagnetic wave", "electrostatic field",
  "half-duplex", "full-duplex", "simplex",
  "RAM", "ROM", "flash memory",
  "noise figure", "signal-to-noise ratio", "bit error rate",
  "Gaussian filter", "matched filter", "control loop",
  "supervised learning", "unsupervised learning", "reinforcement learning",
  "neural network", "decision tree", "random forest",
  "convolution", "correlation", "spectral analysis",
  "microcontroller", "FPGA", "ASIC", "SoC",
  "bandwidth", "latency", "throughput",
  "oscillator", "mixer", "amplifier", "rectifier",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correct, count = 3) {
  const words = correct.toLowerCase();
  const pool = distractorPool.filter((d) => !words.includes(d.toLowerCase()));
  return shuffle(pool).slice(0, count);
}

function extractPhrases(text, topic) {
  const sentences = splitSentences(text);
  const phrases = [];
  const topicLower = topic.toLowerCase();

  for (const s of sentences) {
    const lower = s.toLowerCase();
    if (lower.includes(topicLower) || lower.includes("it ") || lower.includes("they ")) {
      const clean = s.replace(/\s+/g, " ").trim();
      phrases.push(clean);
    }
  }

  return phrases.length > 2 ? phrases : sentences.slice(0, 10);
}

function generateMCQs(extract, topic, count = 8) {
  const sentences = splitSentences(extract);
  const paragraphs = splitParagraphs(extract);
  const allText = paragraphs.length > 0 ? paragraphs : sentences;
  const questions = [];

  const topicName = topic.replace(/\b(what|is|are|the|a|an|explain|about|define|how|does)\b/gi, "").trim() || topic;
  const sentencesWithTopic = sentences.filter((s) => s.toLowerCase().includes(topicName.toLowerCase()));
  const sentencesWithoutTopic = sentences.filter((s) => !s.toLowerCase().includes(topicName.toLowerCase()));

  if (sentencesWithTopic.length > 0) {
    const s = sentencesWithTopic[0];
    const introMatch = s.match(new RegExp(`${topicName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+(?:is|are|was|were)\\s+(.+?)(?:\\.|,|\\s+that|\\s+which).{0,60}`, "i"));
    if (introMatch) {
      let def = introMatch[1].replace(/\.$/, "").trim();
      if (def.length > 5 && def.length < 150) {
        const wrongDefs = pickDistractors(def, 3);
        const opts = shuffle([def, ...wrongDefs]);
        questions.push({
          question: `What is ${topicName}?`,
          options: opts,
          correctIndex: opts.indexOf(def),
          explanation: s,
        });
      }
    }
  }

  const featureSentences = sentences.filter((s) => {
    const l = s.toLowerCase();
    return (l.includes("can ") || l.includes("able to") || l.includes("designed to") ||
      l.includes("used to") || l.includes("allows") || l.includes("enables") ||
      l.includes("provides") || l.includes("supports") || l.includes("offers") ||
      l.includes("includes") || l.includes("involves") || l.includes("requires"));
  });

  for (let i = 0; i < Math.min(featureSentences.length, 3) && questions.length < 4; i++) {
    const s = featureSentences[i];
    const trimmed = s.length > 120 ? s.slice(0, 117) + "..." : s;
    const isDuplicate = questions.some((q) => q.explanation === s);
    if (isDuplicate) continue;

    const wrongOptions = pickDistractors(trimmed, 3);
    const opts = shuffle([trimmed, ...wrongOptions]);
    questions.push({
      question: `Which statement correctly describes ${topicName}?`,
      options: opts,
      correctIndex: opts.indexOf(trimmed),
      explanation: s,
    });
  }

  const categorySentences = sentences.filter((s) => {
    const l = s.toLowerCase();
    return (l.includes("type of") || l.includes("form of") || l.includes("kind of") ||
      l.includes("branch of") || l.includes("field of") || l.includes("subset of") ||
      l.includes("category") || l.includes("class of"));
  });

  for (let i = 0; i < Math.min(categorySentences.length, 2) && questions.length < 6; i++) {
    const s = categorySentences[i];
    const catMatch = s.match(/(?:is a|is an|is the|as a|as an)\s+(type|form|kind|branch|field|subset|category|class)\s+of\s+(.+?)(?:\.|,|\s+that|\s+which).{0,40}$/i);
    if (catMatch) {
      const correctCat = catMatch[2].replace(/\.$/, "").trim();
      if (correctCat.length > 2 && correctCat.length < 80) {
        const wrongCats = pickDistractors(correctCat, 3);
        const opts = shuffle([correctCat, ...wrongCats]);
        questions.push({
          question: `${topicName} is a type of what?`,
          options: opts,
          correctIndex: opts.indexOf(correctCat),
          explanation: s,
        });
      }
    }
  }

  const useSentences = sentences.filter((s) => {
    const l = s.toLowerCase();
    return (l.includes("used in") || l.includes("used for") || l.includes("applied in") ||
      l.includes("applied to") || l.includes("found in") || l.includes("commonly used") ||
      l.includes("widely used") || l.includes("used by") || l.includes("employed in"));
  });

  for (let i = 0; i < Math.min(useSentences.length, 2) && questions.length < 7; i++) {
    const s = useSentences[i];
    const useMatch = s.match(/(?:used in|used for|applied in|applied to|found in|commonly used in|widely used in|employed in)\s+(.+?)(?:\.|,|\s+and|\s+or|\s+to).{0,40}$/i);
    if (useMatch) {
      const correctUse = useMatch[1].replace(/\.$/, "").trim();
      if (correctUse.length > 3 && correctUse.length < 80) {
        const wrongUses = pickDistractors(correctUse, 3);
        const opts = shuffle([correctUse, ...wrongUses]);
        questions.push({
          question: `${topicName} is commonly used in which area?`,
          options: opts,
          correctIndex: opts.indexOf(correctUse),
          explanation: s,
        });
      }
    }
  }

  if (questions.length < count && sentencesWithoutTopic.length > 0) {
    for (let i = 0; i < sentencesWithoutTopic.length && questions.length < count; i++) {
      const s = sentencesWithoutTopic[i];
      if (s.length < 30 || s.length > 200) continue;

      const keyMatch = s.match(/(?:is|are|was|were)\s+(?:a|an|the|also|known as|called|referred to as)?\s*(.+?)(?:\.|,|\s+that|\s+which).{0,30}$/i);
      if (keyMatch) {
        const keyPhrase = keyMatch[1].replace(/\.$/, "").trim();
        if (keyPhrase.length > 3 && keyPhrase.length < 80) {
          const isDuplicate = questions.some((q) => q.explanation === s);
          if (isDuplicate) continue;
          const wrongPhrases = pickDistractors(keyPhrase, 3);
          const opts = shuffle([keyPhrase, ...wrongPhrases]);
          questions.push({
            question: `Regarding ${topicName}, which of the following is correct?`,
            options: opts,
            correctIndex: opts.indexOf(keyPhrase),
            explanation: s,
          });
        }
      }
    }
  }

  if (questions.length < 3 && sentences.length > 0) {
    for (let i = 0; i < Math.min(sentences.length, count); i++) {
      const s = sentences[i];
      if (s.length < 25 || s.length > 200) continue;
      const isDuplicate = questions.some((q) => q.explanation === s);
      if (isDuplicate) continue;

      const trimmed = s.length > 120 ? s.slice(0, 117) + "..." : s;
      const wrongOpts = pickDistractors(trimmed, 3);
      const opts = shuffle([trimmed, ...wrongOpts]);
      questions.push({
        question: `Which of the following is true about ${topicName}?`,
        options: opts,
        correctIndex: opts.indexOf(trimmed),
        explanation: s,
      });

      if (questions.length >= count) break;
    }
  }

  return questions.slice(0, count);
}

// ─── Answer synthesis ───────────────────────────────────────────────────────

function buildAnswerFromResults(results, query, mode) {
  if (!results || results.length === 0) return null;

  const snippets = results
    .filter((r) => r.snippet && r.snippet.length > 20)
    .slice(0, 6);

  if (snippets.length === 0) return null;
  const sources = snippets.map((r) => ({
    title: r.title,
    snippet: r.snippet,
    url: r.url,
    displayLink: r.displayLink,
  }));

  if (mode === "concept" || mode === "summarize") {
    const intro =
      mode === "summarize"
        ? `Here's a summary of **${query}** based on the latest sources:\n\n`
        : `Here's an explanation of **${query}** based on multiple sources:\n\n`;
    const body = snippets
      .map((s, i) => `${i + 1}. **${s.title}**\n${s.snippet}`)
      .join("\n\n");
    return { answer: intro + body, sources };
  }

  if (mode === "quiz") {
      const body = snippets
        .map((s, i) => `${i + 1}. **${s.title}**\n${s.snippet}`)
        .join("\n\n");
      return {
        answer:
          `Here are key study points about **${query}** to build your quiz from:\n\n` +
          body +
          `\n\n**Quiz tips:**\n` +
          `- Try to define ${query} in your own words.\n` +
          `- Ask yourself: What are the key parameters, formulas, or components?\n` +
          `- How does it work in a real circuit or system?\n` +
          `- What are its advantages and limitations?`,
        sources,
        quizQuestions: [],
      };
    }

  if (mode === "code") {
    const body = snippets
      .map((s, i) => `${i + 1}. **${s.title}**\n${s.snippet}`)
      .join("\n\n");
    return {
      answer:
        `Here are coding resources for **${query}** in ECE:\n\n` +
        body,
      sources,
    };
  }

  const body = snippets
    .map((s, i) => `${i + 1}. **${s.title}**\n${s.snippet}`)
    .join("\n\n");
  return {
    answer: `Search results for **${query}**:\n\n` + body,
    sources,
  };
}

// ─── Main handler ───────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const body = await req.json();
    const { query = "", mode = "search" } = body;
    const cleanQuery = String(query).trim();
    if (!cleanQuery) {
      return NextResponse.json({ error: "Please provide a topic to search." }, { status: 400 });
    }

    const sources = [];
    let answer = "";
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(cleanQuery + " electronics communication engineering")}`;

    const enhancedQuery = normalizeTopic(cleanQuery);
    const hasGoogleAPI = Boolean(GOOGLE_API_KEY && GOOGLE_CX);

    let provider = "duckduckgo";

    // Try DuckDuckGo first (free, no key)
    const ddg = await duckDuckGoSearch(enhancedQuery);
    let results = ddg?.sources || null;

    // If DDG returned nothing useful and Google key exists, use Google
    if ((!results || results.length === 0) && hasGoogleAPI) {
      const gResults = await googleSearch(`${enhancedQuery} electronics communication engineering`);
      if (gResults && gResults.length > 0) {
        results = gResults;
        provider = "google";
      }
    }

    // Build answer from whichever provider returned results
    if (mode !== "quiz" && results && results.length > 0) {
      const synthesized = buildAnswerFromResults(results, cleanQuery, mode);
      if (synthesized) {
        answer = synthesized.answer;
        sources.push(...synthesized.sources);
      }
    }

    // For quiz mode, always go to Wikipedia for question generation
    if (mode === "quiz") {
      console.log(`[Quiz] Generating quiz for: "${cleanQuery}" (enhanced: "${enhancedQuery}")`);
      const fullWiki = await getWikipediaFull(enhancedQuery);
      console.log(`[Quiz] Wikipedia result: ${fullWiki ? `${fullWiki.title} (${fullWiki.extract.length} chars)` : "null"}`);
      const topic = fullWiki?.title || cleanQuery;
      let quizQuestions = [];

      if (fullWiki) sources.push({ title: `${topic} - Wikipedia`, url: fullWiki.url });

      if (fullWiki && fullWiki.extract) {
        quizQuestions = generateMCQs(fullWiki.extract, cleanQuery, 8);
        console.log(`[Quiz] Generated ${quizQuestions.length} questions`);
      }

      if (quizQuestions.length > 0) {
        answer = `Here's your quiz on **${topic}**! Answer the questions below to test your knowledge.`;
      } else {
        answer =
          `Let's build a quiz about **${topic}** in ECE.\n\n` +
          (fullWiki ? `Here's what I found: ${truncate(fullWiki.extract, 600)}\n\n` : "") +
          `**Quiz tips:**\n` +
          `- What is ${topic}? Define it in your own words.\n` +
          `- What are its key formulas, parameters, or components?\n` +
          `- How is it used in real ECE applications?\n` +
          `- What are its advantages and limitations?\n\n` +
          `Open the sources below for deeper study, or tap "Search on Google" for practice questions.`;
      }

      const seen2 = new Set();
      const uniqueSources2 = sources.filter((s) => {
        if (seen2.has(s.url)) return false;
        seen2.add(s.url);
        return true;
      });

      return NextResponse.json({
        answer,
        sources: uniqueSources2,
        quiz: quizQuestions.length > 0 ? { title: topic, questions: quizQuestions } : null,
        googleUrl,
        query: cleanQuery,
        provider,
        apiConfigured: hasGoogleAPI,
      });
    }

    // Fallback to Wikipedia if none of the providers returned usable results
    if (!answer) {
      const wiki = await getWikipediaBest(enhancedQuery);

      if (mode === "concept" || mode === "summarize") {
        if (wiki) {
          answer =
            (mode === "summarize"
              ? `Here's a concise summary of **${wiki.title}** in the context of ECE:\n\n`
              : `**${wiki.title}**\n\n`) +
            truncate(wiki.extract, 1800);
          sources.push({ title: `${wiki.title} - Wikipedia`, url: wiki.url });
        } else {
          answer = `I couldn't find a detailed article for "${cleanQuery}". Tap "Search on Google" below for the latest results.`;
        }
      }

      if (mode === "code" || mode === "search") {
        if (wiki) {
          sources.push({ title: `${wiki.title} - Wikipedia`, url: wiki.url });
          answer =
            `**${wiki.title}**\n\n` +
            truncate(wiki.extract, 1400) +
            `\n\nOpen the sources below, or tap "Search on Google" for full results on "${cleanQuery}".`;
        } else {
          answer = `I searched for "${cleanQuery}" but couldn't find strong results. Tap "Search on Google" to look it up directly.`;
        }
      }
    }

    // Deduplicate sources
    const seen = new Set();
    const uniqueSources = sources.filter((s) => {
      if (seen.has(s.url)) return false;
      seen.add(s.url);
      return true;
    });

    return NextResponse.json({
      answer,
      sources: uniqueSources,
      googleUrl,
      query: cleanQuery,
      provider,
      apiConfigured: hasGoogleAPI,
    });
  } catch (err) {
    console.error("Tutor route error:", err);
    return NextResponse.json(
      { error: `Something went wrong while searching: ${err?.message || "unknown error"}` },
      { status: 500 }
    );
  }
}
