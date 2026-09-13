import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "ebnyly - ابنيلي | منشئ المواقع بالذكاء الاصطناعي",
  description: "ابنيلي: ابنِ موقعك بالعربي في ثوانٍ بالذكاء الاصطناعي.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  );
}
