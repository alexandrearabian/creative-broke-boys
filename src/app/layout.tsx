import "@/styles/globals.css";

import { type Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { MotionConfig } from "motion/react";

import { TRPCReactProvider } from "@/trpc/react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";

const grotesk = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "Creative Broke Boys · Creative duo",
    template: "%s · Creative Broke Boys",
  },
  description:
    "A copy and art creative duo making campaigns, brand identities and digital work.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Creative Broke Boys",
    description: "Two creatives. Big ideas, small budgets.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={grotesk.variable}>
        <a
          href="#main"
          className="bg-primary text-primary-foreground sr-only z-[60] rounded-full px-4 py-2 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <LanguageProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <TRPCReactProvider>
                <Navbar />
                <main id="main">{children}</main>
                <Footer />
              </TRPCReactProvider>
            </ThemeProvider>
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
