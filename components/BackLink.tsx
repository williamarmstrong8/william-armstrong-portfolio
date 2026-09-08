import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  label: string;
  /** `pill` floats over content (sticky top bar); `plain` sits in a rail. */
  variant?: "pill" | "plain";
}

/**
 * The one "back to index" link for every detail page (blog posts, project and
 * startup case studies). Previously each route styled its own.
 */
export default function BackLink({ href, label, variant = "pill" }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors",
        variant === "pill"
          ? "rounded-full bg-nav/80 backdrop-blur-md border border-nav-border px-4 py-2 text-nav-foreground hover:text-muted-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
