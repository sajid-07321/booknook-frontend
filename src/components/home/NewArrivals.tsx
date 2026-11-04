import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type Book = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  genre?: string;
  coverImage?: string;
  cover?: string;
  image?: string;
};

const ALL_BOOKS_URL = "http://localhost:5000/all-book";

export async function NewArrivals() {
  let books: Book[] = [];

  try {
    const res = await fetch(ALL_BOOKS_URL, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      books = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  return (
    <section className="bg-[#0d100c] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">New Arrivals</h2>

        <p className="mt-2 text-sm text-neutral-400">
          The latest books added by our readers.
        </p>
      </div>

      {/* Book Cards */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.length === 0 ? (
          <p className="col-span-full py-10 text-center text-neutral-400">
            No books found.
          </p>
        ) : (
          books.slice(0, 10).map((book) => {
            const bookKey = book._id ?? book.id ?? book.title;
            const bookCover =
              book.coverImage ?? book.cover ?? book.image;

            return (
              <div
                key={bookKey}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#141913] transition duration-300 hover:-translate-y-1 hover:border-[#7fdb9e]/30"
              >
                {/* Book Image */}
                <div className="relative aspect-[3/4] bg-[#22281f]">
                  {bookCover ? (
                    <Image
                      src={bookCover}
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

                  {/* Details Button */}
                  <Link
                    href={`/all-book/${bookKey}`}
                    className="mt-auto pt-3"
                  >
                    <span className="block rounded-lg bg-[#7fdb9e] px-3 py-2 text-center text-sm font-medium text-[#0b2416] transition hover:bg-[#a4ecbf]">
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All Books */}
      <div className="mt-10 flex items-center justify-center">
        <Button>
          <Link href="/all-book">View All Books</Link>
        </Button>
      </div>
    </section>
  );
}