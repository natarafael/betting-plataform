import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Activity, Clock, ListChecks } from "lucide-react";

export const BettingSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2">
          <span className="text-xl font-bold">Menu</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/eventos" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Eventos Ativos</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/em-breve" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Começando em Breve</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/minhas-apostas" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                <span>Minhas Apostas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Sports Section */}
        <div className="px-2 pt-4">
          <h2 className="text-xs font-semibold text-muted-foreground">
            Top Esportes
          </h2>
        </div>

        <SidebarMenu>
          {[
            "Futebol",
            "Tênis",
            "Futebol Americano",
            "Basquete",
            "Hóquei no Gelo",
            "Corrida",
          ].map((sport) => (
            <SidebarMenuItem key={sport}>
              <SidebarMenuButton asChild>
                <Link to={`/esportes/${sport.toLowerCase()}`}>
                  <span>{sport}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <div className="text-xs text-muted-foreground">
          © 2024 Betting Platform
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
