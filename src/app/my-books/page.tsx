
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeleteBookButton from "@/components/DeleteBookButton";


type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image?: string;
};

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d100c] text-white">
        Please sign in to view your books.
      </div>
    );
  }

  let books: Book[] = [];

  try {
    const res = await fetch(
      `http://localhost:5000/my-books/${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();

      books = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.books)
            ? data.books
            : [];
    }
  } catch (error) {
    console.error("Failed to fetch books:", error);
  }

  
  return (
    <div className="min-h-screen bg-[#0d100c] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#17231b] px-4 py-10 text-center">
        <h1 className="font-serif text-3xl font-bold sm:text-4xl">
          My Books
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Books you added to the library.
        </p>
      </header>

      {/* Books Table */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-[#18221b] text-neutral-300">
              <tr>
                <th className="px-4 py-3 font-medium">Book</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Copies</th>
                <th className="px-4 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded bg-[#22281f]">
                        {book.image ? (
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-xs text-neutral-500">
                            N/A
                          </span>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {book.title}
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#26352b] px-2.5 py-1 text-xs text-neutral-200">
                      {book.category}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-neutral-300">
                    {book.totalCopies}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/edit-book/${book._id}`}
                        className="rounded-md bg-[#26352b] px-3 py-1.5 text-xs hover:bg-[#344638]"
                      >
                        Edit
                      </Link>

                      <DeleteBookButton bookId={book._id} />
                    </div>
                  </td>
                </tr>
              ))}

              {books.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-12 text-center text-neutral-400"
                  >
                    No books found in your library.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyBooksPage;
