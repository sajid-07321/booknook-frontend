import { Atom, Landmark, Smile, Sparkles } from "lucide-react";

const categories = [
  {
    icon: <Sparkles className="size-6 text-[#7fdb9e]" />,
    title: "Fiction",
    description: "Novels and short stories",
  },
  {
    icon: <Atom className="size-6 text-[#7fdb9e]" />,
    title: "Science",
    description: "How the world works",
  },
  {
    icon: <Landmark className="size-6 text-[#7fdb9e]" />,
    title: "History",
    description: "Stories from the past",
  },
  {
    icon: <Smile className="size-6 text-[#7fdb9e]" />,
    title: "Kids",
    description: "Picture books and more",
  },
];

export function TopCategories() {
  return (
    <section className="bg-[#0d100c] px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
      {/* Heading */}
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-white">
          Top Categories
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          Pick a shelf and start reading.
        </p>
      </div>

      {/* Category Cards */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex h-full flex-col items-center rounded-xl border border-white/5 bg-[#141913] p-8 text-center transition duration-300 hover:-translate-y-1 hover:border-[#7fdb9e]/30"
          >
            {/* Icon */}
            {category.icon}

            <h3 className="mt-4 text-lg font-bold text-white">
              {category.title}
            </h3>

            <p className="mt-1 text-sm text-neutral-400">
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
