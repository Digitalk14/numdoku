import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Social } from "./components/social";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>NumDoku</title>
        <meta name="description" content="Guess the 4-digit secret number" />
        <meta name="google-site-verification" content="yc2jvx7_lKDdV68tD1UROQwwFiYH_-htTe269bkB3AM" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Social />
        <Analytics />
        <Script
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-name="BMC-Widget"
          data-cfasync="false"
          data-id="dmitrii_vasilev"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#5F7FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        />
      </body>
    </html>
  );
}
