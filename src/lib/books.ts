export type Book = {
  _id?: string;
  id?: string;
  title: string;
  author: string;
  genre?: string;
  coverImage?: string;
  cover?: string;
  image?: string;
};

export const ALL_BOOKS_URL = "http://localhost:5000/all-book";

export const getBookKey = (book: Book) => book._id ?? book.id ?? book.title;

export const getBookCover = (book: Book) =>
  book.coverImage ?? book.cover ?? book.image;

export async function fetchAllBooks(): Promise<Book[]> {
  try {
    const res = await fetch(ALL_BOOKS_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
