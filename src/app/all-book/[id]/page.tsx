import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BorrowBook from "@/components/BorrowBook";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

type ApiBook = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  genre?: string;
  category?: string;
  description?: string;
  totalCopies?: number;
  userName?: string;
  userEmail?: string;
  coverImage?: string;
  cover?: string;
  image?: string;
};

const BookDetailsPage = async (props: PageProps<"/all-book/[id]">) => {
  const { id } = await props.params;

  const token = await getTokenFromServer();

  const res = await fetch(`http://localhost:5000/all-book/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const data: ApiBook | ApiBook[] = await res.json();
  const book = Array.isArray(data) ? data[0] : data;

  if (!book?.title) {
    notFound();
  }

  const genre = book.genre ?? book.category;
  const cover = book.coverImage ?? book.cover ?? book.image;

  return (
    <section className="min-h-[calc(100vh-56px)] bg-[#141a13] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl bg-[#22281f]">
          {cover ? (
            <Image
              src={cover}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 90vw, 450px"
              className="object-cover"
            />
          ) : (
            <p className="flex h-full items-center justify-center text-sm text-neutral-400">
              No cover available
            </p>
          )}
        </div>

        {/* Book Details */}
        <div>
          {genre && (
            <span className="rounded-md bg-white/10 px-2 py-1 text-xs text-neutral-300">
              {genre}
            </span>
          )}

          <h1 className="mt-3 font-serif text-4xl font-bold text-white sm:text-5xl">
            {book.title}
          </h1>

          <p className="mt-2 text-neutral-400">by {book.author}</p>

          {book.description && (
            <p className="mt-4 max-w-xl text-sm text-neutral-300">
              {book.description}
            </p>
          )}

          {/* Info Card */}
          <div className="mt-6 grid max-w-xl grid-cols-2 gap-6 rounded-xl border border-white/5 bg-[#1c231a] p-5">
            <div>
              <p className="text-xs text-neutral-400">Added by</p>

              <p className="mt-1 text-sm font-semibold text-white">
                {book.userName ?? "Unknown"}
              </p>

              {book.userEmail && (
                <p className="text-xs text-neutral-400">{book.userEmail}</p>
              )}
            </div>

            <div>
              <p className="text-xs text-neutral-400">Copies left</p>

              <p className="mt-1 text-sm font-semibold text-white">
                {book.totalCopies ?? 0}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-4">
            <BorrowBook
              bookId={book._id ?? book.id ?? ""}
              bookTitle={book.title}
              copiesLeft={book.totalCopies ?? 0}
            />

            <Link
              href="/all-book"
              className="text-sm text-neutral-300 transition hover:text-[#7fdb9e]"
            >
              Back to all books
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailsPage;
