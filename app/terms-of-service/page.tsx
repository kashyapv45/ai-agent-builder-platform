import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen font-sans antialiased bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-4 backdrop-blur-md bg-white/80 border-b border-neutral-200">
        <Link href="/" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex gap-2 items-center">
            <Image src="/gemini.svg" alt="Logo" width={24} height={24} />
            <span className="font-bold text-black tracking-tight">NodeMind</span>
          </div>
        </div>
        <div className="flex-1" />
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-black mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using NodeMind ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">2. Description of Service</h2>
          <p>
            NodeMind is an AI agent builder platform that allows users to create, deploy, and manage AI-powered workflows. The platform utilizes third-party AI models (including Google Gemini) to process user inputs and execute tasks.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">3. User Responsibilities</h2>
          <p>
            When using NodeMind, you agree that you will not:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the platform for any illegal or unauthorized purpose.</li>
            <li>Attempt to bypass or exploit any security or rate-limiting mechanisms.</li>
            <li>Submit sensitive personal information, protected health information, or highly confidential data to the AI agents unless explicitly supported and secured by your specific implementation.</li>
            <li>Build agents that promote violence, hate speech, or malicious activities.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">4. Intellectual Property</h2>
          <p>
            The workflows, logic, and configurations you create on NodeMind remain your property. However, the NodeMind platform, its design, code, and underlying infrastructure remain the exclusive property of NodeMind.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">5. API Usage and Limits</h2>
          <p>
            Use of NodeMind is subject to fair usage policies. Pro plan subscriptions define specific limits on agent creation and API requests. Exceeding these limits may result in temporary suspension or require an upgrade.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">6. Disclaimer of Warranties</h2>
          <p>
            NodeMind is provided "as is" and "as available". We do not warrant that the service will be uninterrupted, error-free, or completely secure. AI-generated responses are provided for informational purposes and should be verified independently.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall NodeMind be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the platform.
          </p>
        </div>
      </main>
    </div>
  );
}
