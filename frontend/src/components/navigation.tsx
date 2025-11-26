'use client';

import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';

export function Navigation() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span className="text-xl font-bold">E</span>
          </div>
          <span className="text-2xl font-bold text-foreground">Elevare</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <ThemeSwitcher />
          <Link
            href="/login"
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
