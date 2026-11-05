"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import Image from "next/image";

type BorrowedBook = {
  _id: string;
  bookId: string;
  bookTitle: string;
  image?: string | null;
  borrowerName: string;
  borrowerEmail: string;
  borrowDate: string;
  returnDate: string;
  status: string;
};

const MyBorrowBookPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchBorrowedBooks = async () => {
      try {
        setLoading(true);

        const token = await getTokenFromClient();

        const res = await fetch(
          `http://localhost:5000/my-borrow/${encodeURIComponent(
            session.user.email
          )}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load books");
        }

        setBooks(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [session, isPending]);

  // Return book
  const handleReturn = async (id: string) => {
    try {
      setProcessing(id);

      const token = await getTokenFromClient();

      const res = await fetch(`http://localhost:5000/my-borrow/return/${id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Return failed");
      }

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? { ...book, status: "returned" } : book
        )
      );

      toast.success("Book returned successfully!", { autoClose: 1500 });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setProcessing("");
    }
  };

  // Delete book
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      setProcessing(id);

      const token = await getTokenFromClient();

      const res = await fetch(`http://localhost:5000/my-borrow/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setBooks((prev) => prev.filter((book) => book._id !== id));

      toast.success("Borrow record deleted!", { autoClose: 1500 });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setProcessing("");
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] bg-[#101814] p-6 text-white">
        Loading borrowed books...
      </div>
    );
  }

  if (!session?.user) {
    return (
      redirect('/sign-in')
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#101814] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          My Borrowed Books
        </h1>

        {books.length === 0 ? (
          <p className="text-center text-gray-400">
            You haven&apos;t borrowed any books yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="overflow-hidden rounded-xl border border-gray-700 bg-[#1c2922] p-4 shadow-lg"
              >
                {book.image && (
                  <Image
                  width={40}
                  height={50}
                    src={book.image}
                    alt={book.bookTitle}
                    className="mb-4 h-52 w-full rounded-lg object-cover"
                  />
                )}

                <h2 className="mb-3 text-xl font-semibold">
                  {book.bookTitle}
                </h2>

                <div className="space-y-2 text-sm text-gray-300">
                  <p>Borrower: {book.borrowerName}</p>
                  <p>Email: {book.borrowerEmail}</p>

                  <p>
                    Borrow date:{" "}
                    {new Date(book.borrowDate).toLocaleDateString()}
                  </p>

                  <p>
                    Return date:{" "}
                    {new Date(book.returnDate).toLocaleDateString()}
                  </p>

                  <p>
                    Status:{" "}
                    <span
                      className={
                        book.status === "returned"
                          ? "font-semibold text-green-400"
                          : "font-semibold text-yellow-400"
                      }
                    >
                      {book.status}
                    </span>
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleReturn(book._id)}
                    disabled={
                      processing === book._id ||
                      book.status === "returned"
                    }
                    className="flex-1 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-black hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {processing === book._id
                      ? "Processing..."
                      : book.status === "returned"
                        ? "Returned"
                        : "Return"}
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    disabled={processing === book._id}
                    className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </main>
  );
};

export default MyBorrowBookPage;