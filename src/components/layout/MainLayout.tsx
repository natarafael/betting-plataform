import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { BettingSidebar } from "./BettingSidebar";

export const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  console.log("MainLayout Auth State:", { isAuthenticated, hasToken: !!token });

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <nav className="flex flex-col h-full">
            <BettingSidebar mobile open={open} onOpenChange={setOpen} />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 border-r min-h-screen flex-col">
          <BettingSidebar />
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
