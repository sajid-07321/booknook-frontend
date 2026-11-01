
import Image from "next/image";
import {
  fetchAllBooks,
  getBookCover,
  getBookKey,
  ALL_BOOKS_URL,
} from "@/lib/books";

export default async function AllBookPage() {
  const books = await fetchAllBooks();

  return (
    <>
      {/* Page Heading */}
      <section className="bg-[#1e2b21] px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          All Books
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Every book on the BookNook shelf.
        </p>
      </section>

      {/* All Books */}
      <section className="bg-[#0d100c] px-4 py-10">
        <div className="mx-auto max-w-7xl">
          {books.length === 0 ? (
            <p className="py-16 text-center text-neutral-400">
              No books found. Check API: {ALL_BOOKS_URL}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {books.map((book) => (
                <div
                  key={getBookKey(book)}
                  className="flex h-full flex-col overflow-hidden rounded-lg bg-[#161b16]"
                >
                  {/* Book Image */}
                  <div className="relative aspect-[3/4] bg-[#22281f]">
                    {getBookCover(book) ? (
                      <Image
                        src={getBookCover(book)!}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 20vw"
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

                    <h2 className="text-base font-semibold text-white">
                      {book.title}
                    </h2>

                    <p className="text-xs text-neutral-400">
                      By {book.author}
                    </p>

                    {/* Details Button */}
                    <a
                      href={`/all-book/${getBookKey(book)}`}
                      className="mt-auto rounded-md bg-[#7fdb9e] px-4 py-2.5 text-center text-sm font-medium text-[#0b2416] hover:bg-[#a4ecbf]"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
