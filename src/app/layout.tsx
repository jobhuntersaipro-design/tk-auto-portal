import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoTrack | Car Dealership Management",
  description: "High-fidelity car dealership management dashboard with import/customs logistics tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-white transition-colors duration-200`}>
        <ThemeProvider>
          <Navigation />
          <main className="ml-64 min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
