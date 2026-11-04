"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Biography",
  "History",
  "Romance",
  "Poetry",
  "Children",
];

export default function AddBookPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    

    const form = event.currentTarget;
    const formData = new FormData(form);

    const book = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: formData.get("category"),
      totalCopies: parseInt(formData.get("totalCopies") as string),
      description: formData.get("description"),
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      image: formData.get("image") || null,
    };

    try {
      const token = await getTokenFromClient()
      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const result = await res.json();
      console.log(result);

      setSuccessMessage(`"${book.title}" has been added to the library.`);

      
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to add book.");
    }
  };

  return (
    <main className="dark min-h-[calc(100vh-3.5rem)] bg-[#0b100e] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-2xl">
            📚
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Add a Book
          </h1>

          <p className="mt-3 text-sm text-neutral-400">
            Add a new book to your library collection.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/10 bg-[#141b18] p-5 shadow-2xl shadow-black/20 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Book Information */}
            <section>
              <div className="mb-5 border-b border-white/10 pb-3">
                <h2 className="text-lg font-semibold text-emerald-300">
                  Book Information
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Enter the details of the book.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-neutral-200">
                    Book Title <span className="text-emerald-400">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    required
                    className="h-11 border-white/10 bg-[#0b100e] text-white placeholder:text-neutral-600 focus-visible:ring-emerald-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="author" className="text-neutral-200">
                    Author Name <span className="text-emerald-400">*</span>
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    required
                    className="h-11 border-white/10 bg-[#0b100e] text-white placeholder:text-neutral-600 focus-visible:ring-emerald-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="text-neutral-200">
                    Category <span className="text-emerald-400">*</span>
                  </Label>
                  <NativeSelect
                    id="category"
                    name="category"
                    defaultValue=""
                    required
                    className="h-11 border-white/10 text-white focus-visible:ring-emerald-400"
                  >
                    <NativeSelectOption value="" disabled>
                      Select a category
                    </NativeSelectOption>

                    {categories.map((category) => (
                      <NativeSelectOption key={category} value={category}>
                        {category}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="totalCopies" className="text-neutral-200">
                    Total Copies <span className="text-emerald-400">*</span>
                  </Label>
                  <Input
                    id="totalCopies"
                    name="totalCopies"
                    type="number"
                    min={1}
                    defaultValue={1}
                    required
                    className="h-11 border-white/10 bg-[#0b100e] text-white focus-visible:ring-emerald-400"
                  />
                </div>

                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="image" className="text-neutral-200">
                    Book Image URL
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/book-cover.jpg"
                    className="h-11 border-white/10 bg-[#0b100e] text-white placeholder:text-neutral-600 focus-visible:ring-emerald-400"
                  />
                  <p className="text-xs text-neutral-500">
                    Add a URL for the book cover image.
                  </p>
                </div>

                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="description" className="text-neutral-200">
                    Short Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Write a short description about this book..."
                    className="resize-none border-white/10 bg-[#0b100e] text-white placeholder:text-neutral-600 focus-visible:ring-emerald-400"
                  />
                </div>
              </div>
            </section>

            {/* Borrower Information */}
            <section>
              <div className="mb-5 border-b border-white/10 pb-3">
                <h2 className="text-lg font-semibold text-emerald-300">
                  Borrower Information
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Enter the user&apos;s contact details.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="userName" className="text-neutral-200">
                    User Name <span className="text-emerald-400">*</span>
                  </Label>

                  <Input
                    id="userName"
                    name="userName"
                    value={user?.name ?? ""}
                    readOnly
                    required
                    placeholder="Loading user name..."
                    className="h-11 cursor-not-allowed border-white/10 bg-[#0b100e] text-neutral-300 focus-visible:ring-emerald-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="userEmail" className="text-neutral-200">
                    User Email <span className="text-emerald-400">*</span>
                  </Label>

                  <Input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    value={user?.email ?? ""}
                    readOnly
                    required
                    placeholder="Loading user email..."
                    className="h-11 cursor-not-allowed border-white/10 bg-[#0b100e] text-neutral-300 focus-visible:ring-emerald-400"
                  />
                </div>
              </div>
            </section>

            {/* Submit */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <Button
                type="submit"
                className="h-12 w-full bg-[#8ee6b0] font-semibold text-[#0b2416] transition-colors hover:bg-[#a4ecbf]"
              >
                + Add Book to Library
              </Button>

              {successMessage && (
                <p
                  role="status"
                  className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-center text-sm text-emerald-300"
                >
                  ✓ {successMessage}
                </p>
              )}

              <p className="text-center text-xs text-neutral-500">
                Fields marked with * are required.
              </p>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-600">
          Manage your collection, one book at a time.
        </p>
      </div>
    </main>
  );
}
