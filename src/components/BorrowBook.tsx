"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BorrowedBook = {
  bookId: string;
  status: string;
};

type BorrowBookProps = {
  bookId: string;
  bookTitle: string;
  copiesLeft: number;
};

const BorrowBook = ({
  bookId,
  bookTitle,
  copiesLeft,
}: BorrowBookProps) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alreadyBorrowed, setAlreadyBorrowed] = useState(false);
  const [checkingBorrow, setCheckingBorrow] = useState(true);

  const user = session?.user;

  // Check whether the user already borrowed this book
  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setCheckingBorrow(false);
      return;
    }

    const checkBorrow = async () => {
      try {
        const token = await getTokenFromClient();

        const res = await fetch(
          `http://localhost:5000/my-borrow/${encodeURIComponent(user.email)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const data: BorrowedBook[] = await res.json();

        if (!res.ok) {
          throw new Error("Failed to check borrow");
        }

        const borrowed = data.some(
          (book) =>
            book.bookId === bookId && book.status === "borrowed"
        );

        setAlreadyBorrowed(borrowed);
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingBorrow(false);
      }
    };

    checkBorrow();
  }, [user?.email, bookId, isPending]);

  // Borrow book
  const handleBorrow = async () => {
    if (!user || !bookId || copiesLeft <= 0 || alreadyBorrowed) return;

    setLoading(true);

    try {
      const token = await getTokenFromClient();

      const res = await fetch("http://localhost:5000/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId,
          borrowerName: user.name,
          borrowerEmail: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to borrow book");
      }

      setOpen(false);

      toast.success(
        `"${bookTitle}" has been borrowed. Keep it for 7 days!`,
        { autoClose: 1500 }
      );

      setTimeout(() => {
        router.push("/my-borrow");
        router.refresh();
      }, 1500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending || checkingBorrow) {
    return <Button disabled>Checking...</Button>;
  }

  if (!user) {
    return <Button disabled>Please sign in to borrow</Button>;
  }

  if (alreadyBorrowed) {
    return <Button disabled>Already Borrowed</Button>;
  }

  if (copiesLeft <= 0) {
    return <Button disabled>Not Available</Button>;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="rounded-lg bg-[#7fdb9e] px-4 py-2.5 text-sm font-medium text-[#0b2416] transition hover:bg-[#a4ecbf]"
          >
            Borrow This Book
          </button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Borrow This Book</DialogTitle>
          <DialogDescription>
            Confirm your information to borrow `{bookTitle}``.
            You can keep this book for 7 days.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="borrowerName">Username</Label>
            <Input
              id="borrowerName"
              value={user.name ?? ""}
              readOnly
            />
          </Field>

          <Field>
            <Label htmlFor="borrowerEmail">Email</Label>
            <Input
              id="borrowerEmail"
              type="email"
              value={user.email ?? ""}
              readOnly
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" disabled={loading}>
                Cancel
              </Button>
            }
          />

          <Button
            type="button"
            onClick={handleBorrow}
            disabled={loading}
            className="bg-[#7fdb9e] text-[#0b2416] hover:bg-[#a4ecbf]"
          >
            {loading ? "Processing..." : "Confirm Borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </>
  );
};

export default BorrowBook;