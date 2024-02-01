import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Mono } from "next/font/google";
import "./(non-page)/globals.css";
import { Footer, Header } from "./(non-page)/component";

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
  title: "RHUK2",
  description: "RHUK2 Blog",
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
        <main className="pt-12 m-auto min-h-screen min-w-[320px] max-w-[1024px] border-x">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
