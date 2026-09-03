import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Grain & Grove — Grocery Market",
  description: "Browse groceries, build a basket, and unlock discounts as you shop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
