import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Clock,
  GalleryThumbnails,
  Star,
  History,
  Gamepad2,
  LayoutGrid,
  MonitorPlay,
  Radio,
  PlayCircle,
  Activity,
  Volleyball,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
  chevron?: boolean;
}

type MenuSection = {
  items: (MenuItem | { divider: boolean; label: string })[];
  type: "casino" | "sports";
};

const menuSections: Record<string, MenuSection> = {
  casino: {
    type: "casino",
    items: [
      { icon: Star, label: "Favoritos", href: "/" },
      { icon: History, label: "Recentes", href: "/" },
      { icon: Trophy, label: "Desafios", href: "/" },
      { icon: GalleryThumbnails, label: "Minhas Apostas", href: "/my-bets" },
      { divider: true, label: "Jogos" },
      { icon: Gamepad2, label: "Nossos Jogos Originais", href: "/" },
      { icon: LayoutGrid, label: "Slots", href: "/" },
      { icon: MonitorPlay, label: "Live Casino", href: "/" },
      { icon: Radio, label: "Game Shows", href: "/" },
      { icon: PlayCircle, label: "Novos Lançamentos", href: "/" },
    ],
  },
  sports: {
    type: "sports",
    items: [
      { icon: Activity, label: "Eventos Ativos", href: "/", badge: "138" },
      { icon: Clock, label: "Começando em Breve", href: "/" },
      { icon: GalleryThumbnails, label: "Minhas Apostas", href: "/my-bets" },
      { divider: true, label: "Top Esportes" },
      { icon: Volleyball, label: "Futebol", href: "/", chevron: true },
      { icon: Volleyball, label: "Tênis", href: "/", chevron: true },
      {
        icon: Volleyball,
        label: "Futebol Americano",
        href: "/",
        chevron: true,
      },
      { icon: Volleyball, label: "Basquete", href: "/", chevron: true },
      { icon: Volleyball, label: "Hóquei no Gelo", href: "/", chevron: true },
      { icon: Volleyball, label: "Corrida", href: "/", chevron: true },
    ],
  },
};

interface MenuContentProps {
  type: "casino" | "sports";
  closeMenu?: () => void;
}

const MenuContent = ({ type, closeMenu }: MenuContentProps) => {
  const items = menuSections[type].items;

  return (
    <nav className="flex-1 p-4">
      <div className="space-y-4">
        {items.map((item, index) => {
          if ("divider" in item) {
            return (
              <div key={index} className="px-3 py-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </h4>
              </div>
            );
          }

          return (
            <Link
              key={index}
              to={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              onClick={closeMenu}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

interface MenuSwitcherProps {
  activeMenu: "casino" | "sports";
  setActiveMenu: (type: "casino" | "sports") => void;
}

const MenuSwitcher = ({ activeMenu, setActiveMenu }: MenuSwitcherProps) => (
  <div className="flex space-x-2 p-4 border-b">
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
);

interface BettingSidebarProps {
  open?: boolean;
  mobile?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const BettingSidebar = ({
  mobile,
  onOpenChange,
}: BettingSidebarProps) => {
  const [activeMenu, setActiveMenu] = useState<"casino" | "sports">("sports");

  return (
    <div className="flex flex-col h-full">
      <MenuSwitcher activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <MenuContent
        type={activeMenu}
        closeMenu={mobile ? () => onOpenChange?.(false) : undefined}
      />
    </div>
  );
};
