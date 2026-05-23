import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ala Eh Eatery | Filipino Restaurant in Halifax",
  description: "Authentic Filipino cuisine in Halifax, NS. Enjoy takeout, dine-in, or in-store pickup at Ala Eh Eatery.",
  keywords: ["Filipino food", "Halifax restaurant", "Filipino cuisine", "takeout", "dine-in"],
  openGraph: {
    title: "Ala Eh Eatery | Filipino Restaurant",
    description: "Authentic Filipino cuisine in Halifax, NS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#FDF6E3] text-[#2a1810]">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
