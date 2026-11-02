import Image from "next/image";
import { fetchAllBooks, getBookCover, getBookKey } from "@/lib/books";
import Link from "next/link";

export async function NewArrivals() {
  const books = await fetchAllBooks();

  return (
    <section className="bg-[#0d100c] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          New Arrivals
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          The latest books added by our readers.
        </p>
      </div>

      {/* Book Cards */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.slice(0, 10).map((book) => (
          <div
            key={getBookKey(book)}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#141913] transition duration-300 hover:-translate-y-1 hover:border-[#7fdb9e]/30"
          >
            {/* Book Image */}
            <div className="relative aspect-[3/4] bg-[#22281f]">
              {getBookCover(book) ? (
                <Image
                  src={getBookCover(book)!}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1280px) 30vw, 220px"
                  className="object-cover"
                />
              ) : (
                <p className="flex h-full items-center justify-center text-sm text-neutral-400">
                  No cover available
                </p>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-1 flex-col gap-2 p-4">
              {book.genre && (
                <p className="text-xs text-neutral-400">
                  {book.genre}
                </p>
              )}

              <h3 className="line-clamp-2 text-lg font-bold text-white">
                {book.title}
              </h3>

              <p className="text-sm text-neutral-400">
                By {book.author}
              </p>

              {/* Button */}
              <Link
                href={`/all-book/${getBookKey(book)}`}
                className="mt-auto pt-3"
              >
                <span className="block rounded-lg bg-[#7fdb9e] px-3 py-2 text-center text-sm font-medium text-[#0b2416] transition hover:bg-[#a4ecbf]">
                  View Details
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}