"use client";

import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-book" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrow" },
];


export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 py-3 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="BookNook logo"
            width={40}
            height={25}
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
  {user ? (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 shadow-sm transition-all hover:border-green-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500/30"
          >
            <Avatar className="size-9">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user.image as string}
                alt={user.name ?? "User"}
              />
              <AvatarFallback className="bg-green-100 font-semibold text-green-700">
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <span className="max-w-28 truncate text-sm font-medium text-gray-700">
              {user.name}
            </span>

            <ChevronDown className="size-4 text-gray-500" />
          </button>
        }
      />

      <PopoverContent
        align="end"
        className="w-72 rounded-2xl border border-gray-100 bg-white p-0 shadow-xl"
      >
        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
          <Avatar className="size-12">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={user.image as string}
              alt={user.name ?? "User"}
            />
            <AvatarFallback className="bg-green-100 text-lg font-semibold text-green-700">
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-green-700">
              <span className="size-1.5 rounded-full bg-green-500" />
              Signed in
            </span>
          </div>
        </div>

        <div className="p-2">
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start gap-2 rounded-xl px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <Link
        href="/sign-in"
        className="rounded-full border border-green-600 px-5 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-50"
      >
        Sign in
      </Link>

      <Link
        href="/sign-up"
        className="rounded-full bg-green-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
      >
        Sign up
      </Link>
    </>
  )}
</div>

      </div>
    </header>
  );
}
