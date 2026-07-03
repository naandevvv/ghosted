import type { Metadata, Viewport } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Opération charme",
  description: "Un petit jeu rien que pour toi ✨",
};

export const viewport: Viewport = {
  themeColor: "#ff9ec4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${baloo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
