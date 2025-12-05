import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileMenu } from "./partial/ProfileMenu";
import { NotificationPanel } from "./partial/NotificationPanel";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const {user} = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);


  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-header border-header-border backdrop-blur supports-[backdrop-filter]:bg-header/95",
        className
      )}
    >
      <div className="flex h-header h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
            onMenuClick?.();
          }}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Logo/Brand - Optional */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">PK</span>
          </div>
          <span className="hidden sm:inline-block font-semibold text-foreground">
            Dashboard
          </span>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-9 bg-muted/50 border-border focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search Icon - Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <NotificationPanel
            open={notificationOpen}
            onOpenChange={setNotificationOpen}
          />

          {/* Profile Menu */}
          <ProfileMenu />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-header-border px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 bg-muted/50 border-border"
          />
        </div>
      </div>
    </header>
  );
}
