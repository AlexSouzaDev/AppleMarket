import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import Provider from "../server/Provider";

// Keep DM Serif Text available as a CSS variable; use system sans as the base body font


// Removed Alumni_Sans_SC globally so it only appears where explicitly imported (hero heading on home page)

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
  weight: "400",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Apple Vault",
  description: "Vault your iOS devices, understand value, resell at a fair price.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    // Avoid build-time failures on static generation when key is missing in CI
    // Clerk will still require keys at runtime where needed
    >
      <html lang="en">
        <body
          className={`${dmSerifText.variable} antialiased bg-black text-white font-sans`}
        >
          <Provider>{children}</Provider>

        </body>
      </html>
    </ClerkProvider>
  );
}
