"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  "/images/banner-1.png",
  "/images/banner-2.png",
  "/images/banner-3.png",
];

export function Banner() {
  const [active, setActive] = useState(0);

  // Auto-advance every 5 seconds.
  useEffect(() => {
    const timer = setInterval(
      () => setActive((n) => (n + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={i === active ? "object-cover" : "opacity-0"}
          style={{ transition: "opacity 0.7s" }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/25" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6">
        <p className="text-xs font-semibold tracking-[0.35em] text-[#6fde9b]">
          BOOKNOOK
        </p>
        <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-white sm:max-w-md sm:text-6xl">
          Share the books on your shelf
        </h1>
        <p className="mt-5 max-w-md text-neutral-200">
          Add the books you have finished. Let other readers enjoy them too.
        </p>
        <Link
          href="/books"
          className="mt-6 w-fit rounded-lg bg-[#8ee6b0] px-4 py-2.5 text-sm font-medium text-[#0b2416] hover:bg-[#a4ecbf]"
        >
          Browse Books
        </Link>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {slides.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={i === active ? "size-2 rounded-full bg-[#f59e0b]" : "size-2 rounded-full bg-white/60"}
          />
        ))}
      </div>
    </section>
  );
}
