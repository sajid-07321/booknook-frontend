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
      const res = await fetch("http://localhost:5000/add-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        throw new Error("Failed to add book");
      }

      const data = await res.json();
      console.log(data);

      setSuccessMessage(`"${book.title}" has been added to the library.`);

      form.reset();
    } catch (error) {
      console.error(error);
      setSuccessMessage("Failed to add book.");
    }
  };

  return (
    <main className="dark min-h-[calc(100vh-3.5rem)] bg-[#0d1211]">
      <section className="border-b border-white/5 bg-[#121a16]">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
            Add a Book
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Put a book from your shelf into the library.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-x-6 gap-y-5 text-white sm:grid-cols-2"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="title" className="text-white">
              Book Title
            </Label>
            <Input id="title" name="title" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="author" className="text-white">
              Author Name
            </Label>
            <Input id="author" name="author" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <NativeSelect
              id="category"
              name="category"
              defaultValue=""
              required
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

          <div className="grid gap-1.5">
            <Label htmlFor="totalCopies" className="text-white">
              Total Copies
            </Label>
            <Input
              id="totalCopies"
              name="totalCopies"
              type="number"
              min={1}
              defaultValue={1}
              required
            />
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="image" className="text-white">
              Book Image URL
            </Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://image.url"
            />
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="description" className="text-white">
              Short Description
            </Label>
            <Textarea id="description" name="description" rows={3} />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="userName" className="text-white">
              User Name
            </Label>
            <Input id="userName" name="userName" required />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="userEmail" className="text-white">
              User Email
            </Label>
            <Input id="userEmail" name="userEmail" type="email" required />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Button
              type="submit"
              className="h-10 bg-[#8ee6b0] text-[#0b2416] hover:bg-[#a4ecbf]"
            >
              Add Book
            </Button>

            {successMessage && (
              <p role="status" className="text-sm text-[#8ee6b0]">
                ✓ {successMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
