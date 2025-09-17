"use client";
import AudioCard from "../components/AudioCard";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Home = () => {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [creators, setCreators] = useState([]);
  const [loadingCreators, setLoadingCreators] = useState(true);
  const [creatorsError, setCreatorsError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return latest;
    return latest.filter((a) => {
      const title = (a.title || "").toLowerCase();
      const tags = (a.tags || []).join(" ").toLowerCase();
      const desc = (a.description || "").toLowerCase();
      return title.includes(q) || tags.includes(q) || desc.includes(q);
    });
  }, [query, latest]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/audios/latest?limit=8"
        );
        setLatest(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        setError("Unable to load audios");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const loadCreators = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/users");
        const arr = Array.isArray(data) ? data : [];
        const sorted = arr
          .filter((u) => u && u.userName)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setCreators(sorted);
      } catch (e) {
        setCreatorsError("Unable to load creators");
      } finally {
        setLoadingCreators(false);
      }
    };
    loadCreators();
  }, []);

  return (
    <section className="pt-4 sm:pt-5 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="border max-w-sm sm:max-w-md lg:max-w-xl mx-auto flex items-center justify-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-3">
        <i className="fa-solid fa-magnifying-glass text-lg sm:text-xl text-gray-500"></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full outline-none placeholder-gray-500 text-sm sm:text-base"
          placeholder="Search audios by title or tags"
        />
      </div>

      <div className="mt-6 sm:mt-8">
        {/* What's New Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            What's new?
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-32 sm:w-36 lg:w-40 m-2 sm:m-3 animate-pulse"
                >
                  <div className="min-h-32 sm:min-h-36 lg:min-h-40 rounded-xl bg-gray-200" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mt-2" />
                </div>
              ))
            ) : error ? (
              <div className="text-sm text-red-600 ml-2">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="text-sm text-gray-600 ml-2">No results found</div>
            ) : (
              filtered.map((a) => (
                <Link key={a._id} href={`/audios/${a._id}`}>
                  <AudioCard audio={a} />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Most Liked Audios Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            Most liked audios
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {(loading && !error
              ? Array.from({ length: 4 })
              : filtered.slice(0, 4)
            ).map((item, i) =>
              loading ? (
                <div
                  key={i}
                  className="w-32 sm:w-36 lg:w-40 m-2 sm:m-3 animate-pulse"
                >
                  <div className="min-h-32 sm:min-h-36 lg:min-h-40 rounded-xl bg-gray-200" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mt-2" />
                </div>
              ) : (
                <Link key={item._id} href={`/audios/${item._id}`}>
                  <AudioCard audio={item} />
                </Link>
              )
            )}
          </div>
        </div>

        {/* Popular Artists Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            Popular artists
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {loadingCreators ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border w-fit rounded-xl m-2 sm:m-3 p-3 animate-pulse">
                  <div className="w-32 sm:w-36 lg:w-40">
                    <div className="min-h-32 sm:min-h-36 lg:min-h-40 rounded-full bg-gray-200 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))
            ) : creatorsError ? (
              <div className="text-sm text-red-600 ml-2">{creatorsError}</div>
            ) : creators.length === 0 ? (
              <div className="text-sm text-gray-600 ml-2">No creators found</div>
            ) : (
              creators.map((u) => (
                <Link key={u._id || u.userName} href={`/profile/${u.userName}`}>
                  <UserCard user={u} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
