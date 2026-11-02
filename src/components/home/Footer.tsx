import { Mail, Phone, Globe } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#040504] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="BookNook Logo"
              width={26}
              height={26}
              className="rounded-lg object-contain"
            />

            <h2 className="font-serif text-2xl font-bold text-white">
              BookNook
            </h2>
          </div>

          <p className="mt-4 max-w-xs text-sm text-neutral-400">
            A small neighborhood library on the web. Share the books on your
            shelf and borrow the ones you like.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-xl font-bold text-white">Contact</h3>

          <div className="mt-4 space-y-3">
            <a
              href="mailto:hello@booknook.app"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-[#7fdb9e]"
            >
              <Mail size={16} />
              hello@booknook.app
            </a>

            <a
              href="tel:+8801700000000"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-[#7fdb9e]"
            >
              <Phone size={16} />
              +880 1700 000 000
            </a>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-serif text-xl font-bold text-white">Follow us</h3>

          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="X"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#7fdb9e]/30"
            >
              X
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#7fdb9e]/30"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#7fdb9e]/30"
            >
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
