import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";

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
        <>
         <Header/>
          <div className="container max-w-screen-xl mx-auto z-50" suppressHydrationWarning>
               {children}
          </div>
        </>
        

  );
}
