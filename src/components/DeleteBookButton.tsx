
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteBookButtonProps = {
  bookId: string;
};

export default function DeleteBookButton({
  bookId,
}: DeleteBookButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const token = await getTokenFromClient()
      const res = await fetch(
        `http://localhost:5000/my-books/${bookId}`,
        { method: "DELETE" ,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Could not delete the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-500/15 text-xs text-red-400 hover:bg-red-500/25"
    >
      {loading ? "Deleting..." : "Delete"}
    </Button>
  );
}
