import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Field & Pantry",
  description: "Fresh groceries delivered to your doorstep",
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
