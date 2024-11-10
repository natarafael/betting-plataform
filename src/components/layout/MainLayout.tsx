import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
// import { BettingSidebar } from "@/components/layout/Sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";

export const MainLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  console.log("MainLayout Auth State:", { isAuthenticated, hasToken: !!token });

  // return (
  //   <SidebarProvider defaultOpen>
  //     <div className="flex min-h-screen bg-background">
  //       <BettingSidebar />
  //       <div className="flex flex-col flex-1  min-h-screen">
  //         <Header />
  //         <main className="flex-1 w-full">
  //           <div className="container max-w-[1400px] mx-auto px-4 py-6">
  //             <Outlet />
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   </SidebarProvider>
  // );

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <nav className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Menu</h2>
            </div>
            {/* Menu Items */}
            <div className="flex-1 p-4">{/* Add your menu items here */}</div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Layout */}
      <div className="flex ">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r min-h-screen flex-col">
          <div className="p-4">
            <h2 className="font-semibold">Menu</h2>
          </div>
          <nav className="flex-1 p-4">{/* Add your menu items here */}</nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 left-4 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
};
