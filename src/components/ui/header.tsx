import Link from "next/link";

import { Satellite, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-14 max-w-screen-2xl">
        <div className="hidden mr-4 md:flex">
          <Link href="/" className="flex items-center mr-6 space-x-2">
            <Satellite className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">Ykhtdt</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/docs" className="transition-colors hover:text-foreground text-foreground/60">
              Docs
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-between flex-1 space-x-2 md:justify-end">
          <nav>
            <Link
              href="https://github.com/ykhtdt/nextjs-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-2 py-2 text-sm font-medium transition-colors rounded-md focus-visible:outline-none hover:bg-accent"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">Github</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
