
import Image from "next/image";
import { fetchAllBooks, getBookCover, getBookKey } from "@/lib/books";
import Link from "next/link";

export async function NewArrivals() {
  const books = await fetchAllBooks();

  return (
    <section className="bg-[#0d100c] px-8 py-12">
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
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.slice(0, 10).map((book) => (
          <div
            key={getBookKey(book)}
            className="flex h-full flex-col overflow-hidden bg-[#141913]"
          >
            {/* Book Image */}
            <div className="relative aspect-[2/3] bg-[#22281f]">
              {getBookCover(book) ? (
                <Image
                  src={getBookCover(book)!}
                  alt={book.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 20vw"
                  className="object-cover"
                />
              ) : (
                <p className="flex h-full items-center justify-center text-neutral-400">
                  No cover available
                </p>
              )}
            </div>

            {/* Book Information */}
            <div className="flex flex-1 flex-col gap-2 p-5">
              {book.genre && (
                <p className="text-xs text-neutral-400">
                  {book.genre}
                </p>
              )}

              <h3 className="text-xl font-bold text-white">
                {book.title}
              </h3>

              <p className="text-sm text-neutral-400">
                By {book.author}
              </p>

              {/* Button */}
             <Link href={`/all-book/${getBookKey(book)}`}>
              <button className="mt-auto rounded-md bg-[#7fdb9e] px-4 py-2.5 text-sm font-medium text-[#0b2416] hover:bg-[#a4ecbf]">
                View Details
              </button>
             </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
