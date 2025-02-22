import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";
import vazirFont from "@/constants/localFont";
import ThemeProviderWrapper from "@/components/ui/ThemeProviderWrapper";



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
        <html lang="fa" dir="rtl" suppressHydrationWarning >
          <body className={`${vazirFont.variable} font-sans`}>
          <QueryClientProvider>
        <Toaster />
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        </QueryClientProvider>
          </body>
        </html>
  );
}
