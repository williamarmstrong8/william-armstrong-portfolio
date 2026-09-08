import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-svh bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-primary mb-8">404</div>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}