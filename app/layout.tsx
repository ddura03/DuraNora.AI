import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./responsive.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DuraNoia.AI",
  description: "Hands-on lessons for the AI models shaping how we work.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "32x32" },
      { url: "/icon.png?v=2", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png?v=2",
    shortcut: "/favicon.ico?v=2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`site-body ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
