import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
        <div className="prose prose-neutral max-w-none text-neutral-600 space-y-6">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <p>
            At NodeMind, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our AI agent builder platform.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">1. Information We Collect</h2>
          <p>
            <strong>Account Information:</strong> When you sign up, we collect your email address, name, and authentication details via our secure provider (Clerk).
          </p>
          <p>
            <strong>Usage Data:</strong> We collect information about how you interact with NodeMind, including the workflows you build, nodes you configure, and frequency of API requests to help us improve the platform.
          </p>
          <p>
            <strong>AI Interaction Data:</strong> The text, context, and prompts you pass into AI Agent nodes are processed by our third-party AI providers (e.g., Google Gemini) to generate responses.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide, maintain, and improve the NodeMind platform.</li>
            <li>To process and route your configured AI workflows.</li>
            <li>To enforce our terms, rate limits, and security policies (via Arcjet).</li>
            <li>To communicate with you regarding updates, support, or billing.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">3. Data Sharing and Third Parties</h2>
          <p>
            We do not sell your personal data. We share necessary data only with trusted third-party services that make NodeMind function:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>AI Providers:</strong> Prompts and context are sent to AI providers (like Google Gemini) to generate responses. Do not submit highly sensitive or restricted data unless you are permitted to do so.</li>
            <li><strong>Authentication:</strong> User identities are managed by Clerk.</li>
            <li><strong>Database:</strong> Workflow configurations are stored securely on Convex.</li>
            <li><strong>Security:</strong> Network requests are monitored by Arcjet to prevent abuse and manage rate limits.</li>
          </ul>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your account and data. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can manage your account settings directly within the platform or contact us for assistance with data deletion requests.
          </p>

          <h2 className="text-2xl font-bold text-black mt-10 mb-4">6. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page or via email.
          </p>
        </div>
      </main>
    </div>
  );
}
