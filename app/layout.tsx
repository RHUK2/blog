import { Footer, Header } from "@/component";
import "@/globals.css";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLOG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${(inter.variable, roboto_mono.variable)} font-mono`}>
        <Header />
        <main className="m-auto min-h-screen min-w-[320px] max-w-[1024px] pt-12 shadow-2xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
