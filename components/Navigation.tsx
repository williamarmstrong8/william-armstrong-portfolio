"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Startups", path: "/startups" },
    { name: "Blog", path: "/blog" },
    { name: "Photography", path: "/photography" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full flex justify-between items-center px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-2 relative">
      <div className="flex items-center space-x-2">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-foreground">William Armstrong</h1>
            <p className="text-muted-foreground text-xs md:text-base">Engineer & Entrepreneur</p>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center bg-nav/80 backdrop-blur-md border border-nav-border rounded-full px-2 py-2 fixed left-1/2 transform -translate-x-1/2 top-6 z-50">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <Button
              variant="nav"
              size="sm"
              className={`mx-1 ${pathname === item.path ? 'text-nav-active' : ''}`}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center space-x-2">
        <Link href="/contact">
          <Button variant="connect" size="default">
            Connect
          </Button>
        </Link>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="md:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="p-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          {isMenuOpen && (
            <div className="absolute top-full right-2 left-0 bg-background/95 border-b border-border shadow-lg z-50 rounded-b-lg">
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${pathname === item.path ? 'text-nav-active bg-nav' : ''}`}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
                <div className="pt-2 border-t border-border">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="connect" className="w-full">
                      Connect
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navigation;