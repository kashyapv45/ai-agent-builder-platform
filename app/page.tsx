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
} from "lucide-react";

// ── Feature card data (Strictly your 6 nodes with color) ─────────────────────
const features = [
  {
    icon: Play,
    color: "#10B981", // Emerald
    bg: "#D1FAE5",
    title: "Start Node",
    desc: "The entry point of your workflow. Trigger your AI pipelines and initialize variables for the run.",
  },
  {
    icon: Square,
    color: "#EF4444", // Red
    bg: "#FEE2E2",
    title: "End Node",
    desc: "Halt execution safely and return the final processed output back to your application or user.",
  },
  {
    icon: Globe,
    color: "#0EA5E9", // Sky
    bg: "#E0F2FE",
    title: "API Node",
    desc: "Connect to external tools seamlessly. Fetch data or send payloads to any REST endpoint mid-workflow.",
  },
  {
    icon: GitBranch,
    color: "#F59E0B", // Amber
    bg: "#FEF3C7",
    title: "If/Else Node",
    desc: "Build smart logic that branches dynamically based on conditions and previous node outputs.",
  },
  {
    icon: RefreshCw,
    color: "#8B5CF6", // Violet
    bg: "#EDE9FE",
    title: "While Node",
    desc: "Execute repetitive tasks efficiently. Loop through actions until a specific condition is fulfilled.",
  },
  {
    icon: Bot,
    color: "#6366F1", // Indigo
    bg: "#EEF2FF",
    title: "Agent Node",
    desc: "Drop in a Gemini-powered agent. Give it instructions, and it thinks, reasons, and acts on your data.",
  },
];

// ── Nav ──────────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-white/80 border-b border-neutral-200">
      <div className="flex gap-2 items-center">
        <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        <span className="font-bold text-black text-lg tracking-tight">NodeMind</span>
      </div>
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
        <Link href="/Dashboard">
          <Button size="sm" className="gap-1.5 shadow-sm">
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
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Badge */}
      <div className="relative mb-6 mt-20 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-black font-medium">
        <Image src="/logo.svg" alt="Icon" width={14} height={14} />
        Powered by Gemini AI
      </div>

      {/* Heading */}
      <h1 className="relative max-w-4xl text-5xl sm:text-7xl font-extrabold text-black leading-[1.08] tracking-tight">
        Build AI Workflows <span className="underline decoration-neutral-200 underline-offset-8">Visually</span>
      </h1>

      <p className="relative mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed">
        NodeMind is a robust visual platform. Connect logic, APIs, and AI Agents to run powerful workflows instantly.
      </p>

      {/* CTA buttons */}
      <div className="relative mt-10 flex flex-wrap gap-4 justify-center">
        <Link href="/Dashboard">
          <Button size="lg" className="h-12 px-8 gap-2 shadow-sm transition-all hover:-translate-y-0.5">
            <Play className="w-4 h-4" fill="currentColor" /> Start Building — It's Free
          </Button>
        </Link>
        <Link href="#features">
          <Button variant="outline" size="lg" className="h-12 px-8 gap-2 shadow-sm transition-all hover:-translate-y-0.5 bg-white text-black hover:bg-neutral-50 border-neutral-200">
            <Layers className="w-4 h-4 text-neutral-500" /> See Node Types
          </Button>
        </Link>
      </div>

      {/* Floating node preview */}
      <div className="relative mt-20 w-full max-w-4xl z-10">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/5">
          {/* Mock toolbar */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-neutral-200" />
            <div className="w-3 h-3 rounded-full bg-neutral-300" />
            <div className="w-3 h-3 rounded-full bg-neutral-400" />
            <span className="ml-3 text-xs font-medium text-neutral-400">Workflow Canvas — Data Analysis Agent</span>
          </div>
          {/* Mock nodes */}
          <div className="bg-neutral-50 rounded-lg border border-neutral-100 p-8 min-h-55 flex items-center justify-center gap-4 flex-wrap">
            {[
              { label: "Start", icon: Play, color: "#10B981", bg: "#D1FAE5" },
              { label: "Fetch API", icon: Globe, color: "#0EA5E9", bg: "#E0F2FE" },
              { label: "If Valid", icon: GitBranch, color: "#F59E0B", bg: "#FEF3C7" },
              { label: "Process Agent", icon: Bot, color: "#6366F1", bg: "#EEF2FF" },
              { label: "End", icon: Square, color: "#EF4444", bg: "#FEE2E2" },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 border rounded-md px-4 py-2.5 bg-white text-sm font-medium shadow-sm cursor-default"
                  style={{ borderColor: `${node.color}40`, color: node.color }}
                >
                  <node.icon
                    className="w-5 h-5 rounded p-0.5"
                    style={{ color: node.color, backgroundColor: node.bg }}
                  />
                  {node.label}
                </div>
                {i < 4 && (
                  <div className="flex items-center gap-0.5 text-neutral-300">
                    <div className="w-4 sm:w-8 h-px bg-neutral-300" />
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <div className="w-4 sm:w-8 h-px bg-neutral-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}

// ── Features ─────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="features" className="bg-white px-6 pb-28 pt-20 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-black text-sm font-semibold uppercase tracking-widest mb-3">6 Core Nodes</p>
          <h2 className="text-4xl font-extrabold text-black">
            Turing-complete workflows
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-lg">
            Master these six powerful building blocks to create anything from simple data routers to complex, loop-driven AI agents.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-neutral-200 bg-white p-8 hover:border-black transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border"
                style={{ backgroundColor: f.bg, borderColor: `${f.color}40` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="text-black font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{f.desc}</p>
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
    <section className="bg-white px-6 pb-24 pt-12">
      <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
        
        {/* Subtle grid on gray */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative px-10 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-200 px-4 py-1.5 text-sm font-medium text-black mb-6 shadow-sm">
            <Image src="/logo.svg" alt="Icon" width={14} height={14} className="border-transparent bg-transparent" />
            Start building for free
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-6 tracking-tight">
            Ready to deploy your first agent?
          </h2>
          <p className="text-neutral-600 mb-10 max-w-lg mx-auto text-lg">
            Connect your Start node, add an Agent, and hit End. Build your pipeline in under 60 seconds.
          </p>
          <Link href="/Dashboard">
            <Button size="lg" className="h-14 px-10 font-bold gap-2 transition-all text-white bg-black hover:bg-neutral-800 shadow-md">
              <Play className="w-5 h-5" fill="currentColor" /> Open Canvas
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
    <footer className="bg-white border-t border-neutral-200 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex gap-2 items-center text-black text-sm font-bold">
        <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        NodeMind AI
      </div>
      <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} NodeMind. All rights reserved.</p>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen font-sans antialiased text-black selection:bg-neutral-200 selection:text-black">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}