"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Slug/detail pages (e.g. /startups/foo) shouldn't have a sticky nav.
  const isSlugPage = /^\/(startups|projects|blog)\/[^/]+$/.test(pathname);

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Startups", path: "/startups" },
    { name: "Blog", path: "/blog" },
    { name: "Photography", path: "/photography" },
  ];

  // Close sidebar on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Do not leave an invisible modal locking the page after a desktop resize.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const desktopActiveClassName = "text-nav-active";
  const mobileActiveClassName = "bg-nav-active/10 text-nav-active";

  return (
    <header className="w-full flex justify-between items-center px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-2 relative">
      <div className="flex items-center space-x-2">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div>
            <span className="font-serif tracking-tight text-xl md:text-2xl text-foreground leading-none block">
              William Armstrong
            </span>
            <p className="text-muted-foreground text-xs md:text-sm mt-0.5">
              Engineer & Entrepreneur
            </p>
          </div>
        </Link>
      </div>

      {/* Desktop navigation only appears when all three header regions fit. */}
      <nav aria-label="Main navigation" className={`hidden lg:flex items-center bg-nav/80 backdrop-blur-md px-2 py-2 left-1/2 -translate-x-1/2 top-6 z-50 ${isSlugPage ? "absolute" : "fixed"}`}>
        {navItems.map((item) => (
          <Button key={item.path} asChild variant="nav" size="sm" className={`mx-1 ${isActive(item.path) ? desktopActiveClassName : ""}`}>
            <Link href={item.path} aria-current={isActive(item.path) ? (pathname === item.path ? "page" : "location") : undefined}>
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="hidden lg:flex items-center">
        <Button asChild variant="connect">
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Connect</Link>
        </Button>
      </div>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="inline-flex lg:hidden min-h-11 min-w-11 items-center justify-center p-2 touch-manipulation"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          className="left-auto right-0 top-0 h-dvh w-[78vw] max-w-[320px] translate-x-0 translate-y-0 bg-background border-l border-border flex flex-col data-[state=open]:animate-none data-[state=closed]:animate-none"
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
            <DialogTitle className="text-xs text-muted-foreground uppercase tracking-widest">Menu</DialogTitle>
            <DialogClose asChild>
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:bg-muted transition-colors touch-manipulation" aria-label="Close menu">
                <X size={20} />
              </button>
            </DialogClose>
          </div>
          <nav aria-label="Main navigation" className="flex flex-col px-3 py-5 gap-0.5 flex-1 min-h-0 overflow-y-auto">
            {navItems.map((item) => (
              <DialogClose key={item.path} asChild>
                <Link
                  href={item.path}
                  aria-current={isActive(item.path) ? (pathname === item.path ? "page" : "location") : undefined}
                  className={`flex items-center px-4 py-3.5 text-base font-medium transition-colors ${isActive(item.path) ? mobileActiveClassName : "text-foreground hover:bg-muted"}`}
                >
                  {item.name}
                </Link>
              </DialogClose>
            ))}
          </nav>
          <div className="px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-4 border-t border-border">
            <DialogClose asChild>
              <Button asChild variant="connect" className="w-full">
                <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Connect</Link>
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navigation;
