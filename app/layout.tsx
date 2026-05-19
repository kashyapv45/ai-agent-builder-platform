import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "NodeMind ",
  description: "a No-Code SaaS Platform for AI Agents",
};

const ibmplexsans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibmplexsans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={ibmplexsans.className}   >
          <ConvexClientProvider>
            <Provider>
              {children}
              <Toaster richColors position="bottom-right"/>
            </Provider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
