import Image from "next/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  coverImage?: string;
  category?: string;
  image?: string;
};

export default async function AllBookPage() {
  const res = await fetch("http://localhost:5000/all-book", {
    cache: "no-store",
  });

  const books: Book[] = res.ok ? await res.json() : [];

  return (
    <div className="min-h-screen bg-[#0d100c]">
      <header className="bg-[#1e2b21] px-4 py-8 text-center">
        <h1 className="font-serif text-3xl font-bold text-white">All Books</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Every book on the BookNook shelf.
        </p>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.length === 0 ? (
          <p className="text-neutral-400">No books found.</p>
        ) : (
          books.map((book) => (
            <article
              key={book._id}
              className="flex h-full flex-col overflow-hidden rounded-lg bg-[#161b16]"
            >
              <div className="relative aspect-3/4 w-full shrink-0 bg-[#22281f]">
                {book.image ? (
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <p className="p-4 text-center text-neutral-400">
                    No cover available
                  </p>
                )}
              </div>

              <div className="flex flex-1 flex-col p-3">
                {book.category && (
                  <p className="mb-2 text-xs text-neutral-400">
                    {book.category}
                  </p>
                )}

                <h2 className="line-clamp-2 min-h-12 font-semibold text-white">
                  {book.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
                  by {book.author}
                </p>

                <div className="mt-auto pt-4">
                  <button className="w-full rounded-md bg-[#7fdb9e] px-4 py-2.5 text-[#0b2416] transition-colors hover:bg-[#a4ecbf]">
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
