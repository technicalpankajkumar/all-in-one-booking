
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  CalendarClock,
  FileText,
  Bell,
  MessageCircle,
  Settings,
  Menu,
  User,
  LogOut,
  HotelIcon,
  CarIcon,
  Torus,
  CableCar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const mainLinks: SidebarLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Drivers", href: "/dashboard/drivers", icon: CableCar },
  { name: "Cabs", href: "/dashboard/cabs", icon: CarIcon },
  { name: "Hotels", href: "/dashboard/hotels", icon: HotelIcon },
  { name: "Tour Package", href: "/dashboard/tour-package", icon: Torus },
  { name: "Lab Tests", href: "/dashboard/lab-tests", icon: Bell },
  { name: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void } = {}) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside
      className={cn(
        "bg-gradient-to-r from-slate-950 to-slate-800 hover:opacity-90 border-r border-gray-200 h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-[80px]" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <span className="text-lg font-semibold text-white">AllInOne</span>
          )}
          {collapsed && (
            <span className="text-lg font-semibold text-white">AIO</span>
          )}
        </div>
        <Button 
          variant="default" 
          size="icon" 
          className={cn("", collapsed && "hidden")} 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {mainLinks.map((link) => {
            const isActive = location.pathname === link.href ||
              (link.href !== "/" && location.pathname.endsWith(link.href));
            
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors hover:bg-medical-blue/10 hover:text-medical-blue",
                  isActive ? "bg-primary/80 text-white shadow-sm" : "text-gray-200",
                  collapsed && "justify-center"
                )}
              >
                <link.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "flex-col"
        )}>
          <div className="w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Pankaj</p>
              <p className="text-xs text-gray-200 truncate">Administrator</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="text-gray-200">
              <LogOut className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
      
      {collapsed && (
        <div className="p-4 flex justify-center">
          <Button 
            variant="default" 
            size="icon" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}
    </aside>
  );
}
