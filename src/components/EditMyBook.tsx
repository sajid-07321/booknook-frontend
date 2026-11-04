
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image?: string;
  description?: string;
  userName?: string;
  userEmail?: string;
};

type EditMyBookProps = {
  book: Book;
};

const EditMyBook = ({ book }: EditMyBookProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const updatedBook = {
      title: String(formData.get("title") ?? "").trim(),
      author: String(formData.get("author") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      totalCopies: Number(formData.get("totalCopies")),
      image: String(formData.get("image") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
    };

    try {
      const token = await getTokenFromClient()
      const res = await fetch(
        `http://localhost:5000/my-books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedBook),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.message ?? "Failed to update book"
        );
      }

      toast.success("Book updated successfully!");

      // Close dialog after successful update
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant="outline"
          className="rounded-md bg-[#26352b] px-4 py-1 text-xs text-white hover:bg-[#344638]"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#141a13] text-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Edit Book Info
          </DialogTitle>

          <DialogDescription className="text-neutral-400">
            Update the information of your book.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Information */}
          <section>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h2 className="text-lg font-semibold text-emerald-300">
                Book Information
              </h2>

              <p className="mt-1 text-sm text-neutral-400">
                Update your book details below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`title-${book._id}`}>
                  Book Title
                </Label>

                <Input
                  id={`title-${book._id}`}
                  name="title"
                  defaultValue={book.title}
                  required
                  className="border-white/10 bg-[#0b100e]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`author-${book._id}`}>
                  Author Name
                </Label>

                <Input
                  id={`author-${book._id}`}
                  name="author"
                  defaultValue={book.author}
                  required
                  className="border-white/10 bg-[#0b100e]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`category-${book._id}`}>
                  Category
                </Label>

                <NativeSelect
                  id={`category-${book._id}`}
                  name="category"
                  defaultValue={book.category}
                  required
                  className="border-white/10 bg-[#0b100e]"
                >
                  {categories.map((category) => (
                    <NativeSelectOption
                      key={category}
                      value={category}
                    >
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`copies-${book._id}`}>
                  Total Copies
                </Label>

                <Input
                  id={`copies-${book._id}`}
                  name="totalCopies"
                  type="number"
                  min={1}
                  defaultValue={book.totalCopies}
                  required
                  className="border-white/10 bg-[#0b100e]"
                />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor={`image-${book._id}`}>
                  Book Image URL
                </Label>

                <Input
                  id={`image-${book._id}`}
                  name="image"
                  type="url"
                  defaultValue={book.image ?? ""}
                  placeholder="https://example.com/book.jpg"
                  className="border-white/10 bg-[#0b100e]"
                />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor={`description-${book._id}`}>
                  Description
                </Label>

                <Textarea
                  id={`description-${book._id}`}
                  name="description"
                  defaultValue={book.description ?? ""}
                  rows={4}
                  className="resize-none border-white/10 bg-[#0b100e]"
                />
              </div>
            </div>
          </section>

          {/* User Information */}
          <section>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h2 className="text-lg font-semibold text-emerald-300">
                Added By
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor={`userName-${book._id}`}>
                  User Name
                </Label>

                <Input
                  id={`userName-${book._id}`}
                  value={book.userName ?? ""}
                  readOnly
                  className="border-white/10 bg-[#0b100e] text-neutral-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`userEmail-${book._id}`}>
                  User Email
                </Label>

                <Input
                  id={`userEmail-${book._id}`}
                  value={book.userEmail ?? ""}
                  readOnly
                  className="border-white/10 bg-[#0b100e] text-neutral-400"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="space-y-3 border-t border-white/10 pt-5">
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full bg-[#8ee6b0] font-semibold text-[#0b2416] hover:bg-[#a4ecbf]"
            >
              {loading ? "Updating..." : "Update Book"}
            </Button>

            <p className="text-center text-xs text-neutral-500">
              Update the fields and click Update Book.
            </p>
          </div>
        </form>
      </DialogContent>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </Dialog>
  );
};

export default EditMyBook;
