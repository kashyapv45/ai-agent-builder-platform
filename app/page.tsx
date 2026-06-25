import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Bot,
  Globe,
  Layers,
  Play,
  Square,
  GitBranch,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";

// ── Feature card data (Strictly 6 nodes) ─────────────────────
const features = [
  {
    icon: Play,
    color: "#10B981", // Emerald
    bg: "#D1FAE5",
    title: "Start Node",
    desc: "The entry point of your workflow. Trigger your AI pipelines and initialize variables.",
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    icon: Bot,
    color: "#6366F1", // Indigo
    bg: "#EEF2FF",
    title: "Agent Node (Gemini)",
    desc: "Drop in a powerful AI agent. Give it instructions, and it thinks, reasons, and acts autonomously.",
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    icon: GitBranch,
    color: "#F59E0B", // Amber
    bg: "#FEF3C7",
    title: "If/Else Node",
    desc: "Build smart logic that branches dynamically based on conditions.",
    span: "col-span-1",
  },
  {
    icon: Globe,
    color: "#0EA5E9", // Sky
    bg: "#E0F2FE",
    title: "API Node",
    desc: "Connect to external tools seamlessly via REST.",
    span: "col-span-1",
  },
  {
    icon: RefreshCw,
    color: "#8B5CF6", // Violet
    bg: "#EDE9FE",
    title: "While Node",
    desc: "Execute repetitive tasks efficiently with loop-driven actions.",
    span: "col-span-1",
  },
  {
    icon: Square,
    color: "#EF4444", // Red
    bg: "#FEE2E2",
    title: "End Node",
    desc: "Halt execution safely and return the final output.",
    span: "col-span-1 md:col-span-3 lg:col-span-3", // Full width across bottom
  },
];

// ── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-neutral-200/50 transition-all">
      <div className="flex gap-2.5 items-center">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="drop-shadow-sm" />
        <span className="font-bold text-neutral-900 text-xl tracking-tight">NodeMind</span>
      </div>
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <Link href="/Dashboard">
          <Button size="sm" className="gap-2 shadow-sm rounded-full px-5 hover:scale-105 transition-transform bg-neutral-900 text-white hover:bg-neutral-800">
            Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#FAFAFA]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[100px]" />
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-emerald-50/40 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      {/* Badge */}
      <div className="relative z-10 mb-8 mt-24 inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-sm text-neutral-800 font-medium shadow-sm ring-1 ring-black/5">
        <Image src="/gemini.svg" alt="Gemini Icon" width={16} height={16} />
        Powered by <span className="font-bold">Gemini AI</span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 max-w-5xl text-5xl sm:text-7xl font-black text-neutral-900 leading-[1.1] tracking-tighter">
        Build intelligent agents <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400">
          visually, in seconds.
        </span>
      </h1>

      <p className="relative z-10 mt-6 max-w-2xl text-lg sm:text-xl text-neutral-600 leading-relaxed font-medium">
        NodeMind is a production-grade visual builder. Connect logic, external APIs, and powerful Gemini AI agents to deploy intelligent workflows instantly.
      </p>

      {/* CTA buttons */}
      <div className="relative z-10 mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/Dashboard">
          <Button size="lg" className="h-12 px-8 gap-2 rounded-full shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 bg-neutral-900 text-white hover:bg-neutral-800 text-base font-semibold">
            <Zap className="w-4 h-4 fill-current" /> Start Building
          </Button>
        </Link>
        <Link href="#features">
          <Button variant="outline" size="lg" className="h-12 px-8 gap-2 rounded-full shadow-sm transition-all hover:-translate-y-0.5 bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200/80 text-base font-semibold">
            <Layers className="w-4 h-4" /> Explore Nodes
          </Button>
        </Link>
      </div>

      {/* Hero Visual Mockup */}
      <div className="relative z-10 mt-20 w-full max-w-5xl">
        <div className="relative rounded-2xl border border-neutral-200/60 bg-white/40 backdrop-blur-xl p-2 shadow-2xl shadow-neutral-900/5 ring-1 ring-black/5 overflow-hidden">
          {/* Mock Mac Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/60 border-b border-neutral-100">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/90" />
              <div className="w-3 h-3 rounded-full bg-amber-400/90" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/90" />
            </div>
            <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100/80 text-xs font-medium text-neutral-500">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              NodeMind Canvas
            </div>
          </div>
          
          {/* Mock Canvas */}
          <div className="relative bg-[#F8F9FA] rounded-b-xl border-t border-white/50 p-10 min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            <div className="relative flex flex-wrap justify-center items-center gap-6 z-10">
              {[
                { label: "Trigger", icon: Play, color: "#10B981", bg: "#D1FAE5" },
                { label: "Fetch Data", icon: Globe, color: "#0EA5E9", bg: "#E0F2FE" },
                { label: "Gemini Agent", icon: Bot, color: "#6366F1", bg: "#EEF2FF", glow: true },
                { label: "Complete", icon: Square, color: "#EF4444", bg: "#FEE2E2" },
              ].map((node, i, arr) => (
                <div key={i} className="flex items-center gap-6">
                  <div className={`relative group flex items-center gap-3 rounded-xl border bg-white px-5 py-3.5 shadow-sm transition-all hover:shadow-md ${node.glow ? 'ring-2 ring-indigo-500/20 border-indigo-200' : 'border-neutral-200/80'}`}>
                    {node.glow && (
                      <div className="absolute -inset-1 bg-indigo-500/10 rounded-2xl blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ backgroundColor: node.bg }}>
                      <node.icon className="w-4 h-4" style={{ color: node.color }} />
                    </div>
                    <span className="font-semibold text-sm text-neutral-700">{node.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden sm:flex items-center gap-1 text-neutral-300">
                      <div className="w-8 h-[2px] bg-neutral-200 rounded-full" />
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features (Bento Box Layout) ──────────────────────────────────────────────
function Features() {
  return (
    <section id="features" className="bg-[#FAFAFA] px-6 py-32 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest">
            Core Primitives
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">
            Everything you need. <br className="hidden sm:block" />
            <span className="text-neutral-400">Nothing you don't.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 transition-all hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1 ${f.span}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm border transition-transform group-hover:scale-110"
                  style={{ backgroundColor: f.bg, borderColor: `${f.color}30` }}
                >
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-neutral-900 font-bold text-xl mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-neutral-500 text-base leading-relaxed font-medium">{f.desc}</p>
                </div>
              </div>
              {/* Subtle background gradient on hover */}
              <div 
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: f.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="bg-white px-6 py-32 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto relative rounded-[2.5rem] overflow-hidden bg-neutral-900 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative px-8 py-24 sm:py-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2 text-sm font-semibold text-white mb-8">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Production Ready
          </div>
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-tight">
            Deploy your first AI agent <br className="hidden sm:block" /> in under 60 seconds.
          </h2>
          <p className="text-neutral-400 mb-10 max-w-xl mx-auto text-lg sm:text-xl font-medium">
            Stop wrestling with complex frameworks. Build, test, and ship your AI workflows with NodeMind's visual engine.
          </p>
          <Link href="/Dashboard">
            <Button size="lg" className="h-14 px-10 text-lg font-bold gap-3 rounded-full transition-all bg-white text-neutral-900 hover:bg-neutral-100 hover:scale-105 shadow-xl shadow-white/10">
              Open Canvas <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-neutral-200/80 px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex gap-2.5 items-center text-neutral-900 text-lg font-bold tracking-tight">
        <Image src="/logo.svg" alt="Logo" width={24} height={24} />
        NodeMind
      </div>
      
      <div className="flex gap-2 items-center bg-white px-4 py-2 rounded-full border border-neutral-200/80 shadow-sm">
        <p className="text-neutral-500 text-sm font-medium">Powered by</p>
        <Image src="/gemini.svg" alt="Gemini" width={16} height={16} />
        <span className="font-bold text-neutral-900 text-sm">Gemini AI</span>
      </div>

      <div className="flex items-center gap-6">
        <Link href="/terms-of-service" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Terms</Link>
        <Link href="/privacy-policy" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Privacy</Link>
        <p className="text-neutral-400 text-sm font-medium">© {new Date().getFullYear()} NodeMind.</p>
      </div>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen font-sans antialiased text-neutral-900 selection:bg-indigo-100 selection:text-indigo-900 bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}