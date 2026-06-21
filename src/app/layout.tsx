import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wagesh Sharma | Creative Digital Experiences",
  description: "Portfolio of Wagesh Sharma, software engineer and creative developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <CursorProvider>
          <SmoothScroll>
            <Cursor />
            {children}
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
