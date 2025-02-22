import type { Metadata } from "next";
import "@/app/globals.css";
import SideBar from "./ـ/SideBar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "صفحه پروفایل",
  description: "پروفایل کاربر",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    <div className="grid grid-cols-12 h-screen overflow-y-hidden">
        <aside className="col-span-12 px-3 lg:col-span-3 xl:col-span-2 hidden lg:block">
            <SideBar />
        </aside>
        <div className="col-span-12 lg:col-span-9 xl:col-span-10 h-screen flex flex-col">
            <DashboardHeader />
            <main className="shadow-inner shadow-secondary-300 mr-1 mt-2 rounded-tr-3xl p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
                <div className="xl:max-w-screen-xl">
                    {children}
                </div>
            </main>
        </div>
    </div>
</div>
  );
}
