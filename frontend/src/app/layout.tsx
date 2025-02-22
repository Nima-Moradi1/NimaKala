import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryClientProvider from "@/providers/QueryClientProvider";
import vazirFont from "@/constants/localFont";



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
        <html lang="fa" dir="rtl">
          <body className={`${vazirFont.variable} font-sans`} suppressHydrationWarning>
          <QueryClientProvider>
        <Toaster />
          <div>
          {children}
          </div>
        </QueryClientProvider>
          </body>
        </html>
  );
}
