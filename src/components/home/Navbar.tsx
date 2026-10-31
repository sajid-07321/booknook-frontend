"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/books/new" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/borrows" },
];

const greenButton =
  "rounded-lg bg-[#8ee6b0] px-4 py-2.5 text-sm font-medium text-[#0b2416] hover:bg-[#a4ecbf]";

export function Navbar() {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0d1211]/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="BookNook logo"
            width={40}
            height={28}
            className="size-auto rounded-2xl"
            priority
          />
          <span className="font-serif text-lg font-bold tracking-wide text-[#8ee6b0]">
            BookNook
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.label === "Home"
                  ? "rounded-md px-2.5 py-1.5 text-sm font-medium text-white"
                  : "rounded-md px-2.5 py-1.5 text-sm text-neutral-300 hover:text-white"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex size-8 items-center justify-center rounded-full text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            <Sun className="size-4.5" />
          </button>
          <button type="button" className={greenButton}>
            Sign in
          </button>
          <button type="button" className={greenButton}>
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
