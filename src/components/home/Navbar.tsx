"use client";

import Link from "next/link";
import Image from "next/image";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-book" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/borrows" },
];

const greenButton =
  "rounded-lg bg-[#8ee6b0] px-4 py-2.5 text-sm font-medium text-[#0b2416] hover:bg-[#a4ecbf]";

export function Navbar() {

  return (
   <header className="sticky top-0 z-50 bg-black/95 py-3 backdrop-blur">
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
      <Link href="/sign-in" className={greenButton}>
        Sign in
      </Link>

      <Link href="/sign-up" className={greenButton}>
        Sign up
      </Link>
    </div>
  </div>
</header>
  );
}
