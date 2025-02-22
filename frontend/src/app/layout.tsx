import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";
import vazirFont from "@/constants/localFont";
import { ThemeProvider } from "@/components/ThemeProvider";



export const metadata: Metadata = {
  title: "نیماکالا",
  description: "محصولات خود را با نیماکالا بفروشید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="fa" dir="rtl" suppressHydrationWarning suppressContentEditableWarning>
          <body className={`${vazirFont.variable} font-sans`} suppressHydrationWarning>
          <QueryClientProvider>
        <Toaster />
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem>
        <div>
          {children}
          </div>
        </ThemeProvider>
        </QueryClientProvider>
          </body>
        </html>
  );
}
