import "@/styles/globals.css";

import { type Metadata } from "next";
import { Epilogue, Playfair_Display, Fraunces } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const epilogue = Epilogue({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Creative Broke Boys",
  description:
    "A creative agency showcasing innovative design and compelling storytelling",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${epilogue.variable} ${playfairDisplay.variable} ${fraunces.variable}`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <Navbar />
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </LanguageProvider>
        <div className="bg-[linear-gradient(to_right,theme(colors.primary/10%)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary/10%)_1px,transparent_1px)] pointer-events-none fixed inset-0 -z-50 bg-[size:24px_24px]"></div>
        <div className="from-background via-background/20 to-background pointer-events-none fixed inset-0 -z-50 bg-gradient-to-b"></div>
      </body>
    </html>
  );
}
