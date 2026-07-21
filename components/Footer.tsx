import Link from "next/link";
import { Mail, Linkedin, Github } from "lucide-react";

const navItems = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Startups", path: "/startups" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const contactLinks = [
  { label: "Email", href: "mailto:williamarmstrong8@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/william-armstrong8/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/williamarmstrong8", icon: Github },
  { label: "X", href: "https://x.com/armstrongwill8", icon: null },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="px-4 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block">
              <span className="font-serif tracking-tight text-2xl md:text-3xl text-foreground leading-none">
                Armstrong
              </span>
            </Link>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50"
                  aria-label={item.label}
                >
                  {item.icon ? (
                    <item.icon className="w-5 h-5" strokeWidth={1.25} />
                  ) : (
                    <span className="text-sm font-semibold w-5 h-5 flex items-center justify-center">𝕏</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Pages
            </h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              About
            </h3>
            <Link href="/" className="hover:opacity-80 transition-opacity block">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Solutions Engineer and founder. I build technical solutions: integrations, automation, and systems that bridge product, engineering, and business. Human-centered, systems-first.
              </p>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © {year} William Armstrong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
