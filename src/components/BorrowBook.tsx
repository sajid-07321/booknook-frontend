"use client";

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

type BorrowBookProps = {
  userName?: string;
  userEmail?: string;
};

const BorrowBook = ({ userName, userEmail }: BorrowBookProps) => {
  return (
    <Dialog>
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
            Check the borrower information below.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={userName ?? ""}
              readOnly
            />
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userEmail ?? ""}
              readOnly
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="button">Confirm Borrow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBook;