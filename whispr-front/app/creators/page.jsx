"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import UserCard from "../components/UserCard";
import { apiUrl } from "@/app/lib/api";

const CreatorsView = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(apiUrl("/users"));
        setCreators(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Unable to load creators");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return creators;
    return creators.filter((u) => {
      const name = (u.displayName || "").toLowerCase();
      const uname = (u.userName || "").toLowerCase();
      const tags = (u.interestTags || []).join(" ").toLowerCase();
      return name.includes(q) || uname.includes(q) || tags.includes(q);
    });
  }, [query, creators]);

  return (
    <section className="pt-4 sm:pt-6 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold jost">
              Creators
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Meet the voices behind the audios
            </p>
          </div>
          <div className="border max-w-full sm:max-w-sm flex items-center gap-2 rounded-full px-3 py-2">
            <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none placeholder-gray-500 text-sm"
              placeholder="Search creators"
            />
          </div>
        </div>

        {error && <div className="mt-6 text-red-600 text-sm">{error}</div>}

        {loading ? (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-4 animate-pulse"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((u) => (
              <Link
                key={u._id || u.id || u.userName}
                href={`/profile/${u.userName}`}
                className="justify-self-center"
              >
                <UserCard user={u} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorsView;
