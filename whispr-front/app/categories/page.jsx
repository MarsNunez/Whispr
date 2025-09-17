"use client";

import { useMemo, useState } from "react";

const categories = [
  { name: "ASMR", image: "/img/01.jpeg", tags: ["tingles", "relax"] },
  { name: "Lo-Fi", image: "/img/02.avif", tags: ["study", "chill"] },
  { name: "Meditation", image: "/img/03.jpg", tags: ["mindful", "breathe"] },
  {
    name: "Storytelling",
    image: "/img/04.jpg",
    tags: ["narrative", "fiction"],
  },
  { name: "Podcasts", image: "/img/05.jpg", tags: ["talk", "news"] },
  { name: "Soundscapes", image: "/img/06.jpg", tags: ["nature", "ambient"] },
  { name: "Sleep", image: "/img/07.jpg", tags: ["calm", "night"] },
  { name: "Ambient", image: "/img/08.jpg", tags: ["focus", "soft"] },
  {
    name: "White Noise",
    image: "/img/calltoactionimg.webp",
    tags: ["focus", "sleep"],
  },
];

const CategoryCard = ({ name, image, tags }) => (
  <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200">
    <div className="relative aspect-square overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
        {tags.map((t) => (
          <span
            key={t}
            className="bg-white/85 text-gray-800 text-[10px] sm:text-xs rounded-full px-1.5 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
    <div className="p-3">
      <h3 className="jost text-sm sm:text-base font-medium text-gray-800">
        {name}
      </h3>
      <p className="text-xs text-gray-500 mt-1">Live and recorded audios</p>
    </div>
  </div>
);

const AudiosCategoriesPage = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q))
    );
  }, [query]);

  return (
    <section className="pt-4 sm:pt-6 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold jost">
              Explore Audios
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Discover categories like ASMR, Lo‑Fi, and more
            </p>
          </div>
          <div className="border max-w-full sm:max-w-sm flex items-center gap-2 rounded-full px-3 py-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-sm"
              placeholder="Search categories"
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filtered.map((c) => (
            <CategoryCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudiosCategoriesPage;
