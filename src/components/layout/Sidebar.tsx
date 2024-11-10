import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Trophy,
  Clock,
  GalleryThumbnails,
  Star,
  History,
  Award,
  Gamepad2,
  Dice1,
  LayoutGrid,
  MonitorPlay,
  Radio,
  PlayCircle,
  ChevronRight,
  Timer,
  Activity,
  Volleyball,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
// import {
//   basketball,
//   tennisBall,
//   soccerBall,
//   football,
//   hockey,
//   horseHead,
// } from "@lucide/lab";
// import { Icon } from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  chevron?: boolean;
  divider?: boolean;
}

const casinoMenuItems: (MenuItem | { divider: boolean; label: string })[] = [
  { icon: Star, label: "Favoritos", href: "/casino/favorites" },
  { icon: History, label: "Recentes", href: "/casino/recent" },
  { icon: Trophy, label: "Desafios", href: "/casino/challenges" },
  { icon: GalleryThumbnails, label: "Minhas Apostas", href: "/casino/my-bets" },
  { divider: true, label: "Jogos" },
  { icon: Gamepad2, label: "Stake Originals", href: "/casino/originals" },
  { icon: LayoutGrid, label: "Slots", href: "/casino/slots" },
  { icon: MonitorPlay, label: "Live Casino", href: "/casino/live" },
  { icon: Radio, label: "Game Shows", href: "/casino/game-shows" },
  {
    icon: PlayCircle,
    label: "Novos Lançamentos",
    href: "/casino/new-releases",
  },
];

const sportsMenuItems: (MenuItem | { divider: boolean; label: string })[] = [
  {
    icon: Activity,
    label: "Eventos Ativos",
    href: "/sports/active",
    badge: "138",
  },
  { icon: Clock, label: "Começando em Breve", href: "/sports/upcoming" },
  { icon: GalleryThumbnails, label: "Minhas Apostas", href: "/sports/my-bets" },
  { divider: true, label: "Top Esportes" },
  { icon: Volleyball, label: "Futebol", href: "/sports/soccer", chevron: true },
  { icon: Volleyball, label: "Tênis", href: "/sports/tennis", chevron: true },
  {
    icon: Volleyball,
    label: "Futebol Americano",
    href: "/sports/football",
    chevron: true,
  },
  {
    icon: Volleyball,
    label: "Basquete",
    href: "/sports/basketball",
    chevron: true,
  },
  {
    icon: Volleyball,
    label: "Hóquei no Gelo",
    href: "/sports/hockey",
    chevron: true,
  },
  { icon: Volleyball, label: "Corrida", href: "/sports/racing", chevron: true },
];

export function BettingSidebar() {
  //   const { state, open, setOpen } = useSidebar();

  const [activeMenu, setActiveMenu] = useState<"casino" | "sports">("sports");

  const menuItems = activeMenu === "casino" ? casinoMenuItems : sportsMenuItems;

  return (
    <>
      <Sidebar className="border-r bg-background w-64">
        <SidebarHeader className="h-[60px] px-2 flex items-center justify-between border-b">
          <div className="flex space-x-2">
            <Button
              variant={activeMenu === "casino" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveMenu("casino")}
              className="flex-1"
            >
              CASSINO
            </Button>
            <Button
              variant={activeMenu === "sports" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveMenu("sports")}
              className="flex-1"
            >
              ESPORTES
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item, index) => {
              if (item.divider) {
                return (
                  <div key={index} className="px-3 py-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </h4>
                  </div>
                );
              }

              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary",
                        "hover:bg-muted",
                        "focus:bg-muted",
                        "active:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
