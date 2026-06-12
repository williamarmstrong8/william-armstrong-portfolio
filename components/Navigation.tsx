"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Lock body scroll while sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

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
      <nav className="hidden md:flex items-center bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full px-2 py-2 fixed left-1/2 transform -translate-x-1/2 top-6 z-50 transition-all duration-300 hover:bg-white/20 hover:border-white/30">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <Button
              variant="nav"
              size="sm"
              className={`mx-1 ${pathname === item.path ? "text-nav-active" : ""}`}
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

      {/* Mobile hamburger button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 touch-manipulation"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile sidebar + backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[78vw] max-w-[320px] bg-background border-l border-border z-50 flex flex-col md:hidden shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Sidebar header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 hover:bg-muted rounded-full transition-colors touch-manipulation"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-3 py-5 gap-0.5 flex-1 overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                        pathname === item.path
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Connect button pinned to bottom */}
              <div className="px-5 pb-10 pt-4 border-t border-border">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="connect" className="w-full">
                    Connect
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
