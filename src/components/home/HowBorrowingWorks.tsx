import { BookUp, RotateCcw, Search } from "lucide-react";

const steps = [
  {
    icon: <Search className="size-5 text-[#0b2416]" />,
    step: "Step 1",
    title: "Find a book",
    description: "Browse the shelf and open any book you like.",
  },
  {
    icon: <BookUp className="size-5 text-[#0b2416]" />,
    step: "Step 2",
    title: "Borrow it",
    description: "Confirm the borrow. The book is yours for 7 days.",
  },
  {
    icon: <RotateCcw className="size-5 text-[#0b2416]" />,
    step: "Step 3",
    title: "Return it",
    description: "Done reading? Return it from My Borrows in one click.",
  },
];

export function HowBorrowingWorks() {
  return (
    <section className="bg-[#141a13] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-white">
          How Borrowing Works
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          Three steps. No library card needed.
        </p>
      </div>

      {/* Step Cards */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((item) => (
          <div
            key={item.step}
            className="flex h-full flex-col items-center rounded-xl border border-white/5 bg-[#0f130e] p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#7fdb9e]/30"
          >
            {/* Icon */}
            <div className="flex size-11 items-center justify-center rounded-full bg-[#7fdb9e]">
              {item.icon}
            </div>

            <p className="mt-4 text-xs font-semibold text-[#f59e0b]">
              {item.step}
            </p>

            <h3 className="mt-2 text-lg font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-neutral-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
