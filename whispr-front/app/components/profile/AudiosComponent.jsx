import { useEffect, useState } from "react";
import Link from "next/link";
import AudioCard from "../../components/AudioCard";
import { apiClient, apiUrl } from "@/app/lib/api";

const AudiosComponent = ({ userData }) => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!userData?.id) return;
      setLoading(true);
      setError("");
      try {
        const { data } = await apiClient.get(
          apiUrl(`/users/audios/all/${userData.id}`)
        );
        const arr = Array.isArray(data?.data) ? data.data : [];
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAudios(arr);
      } catch (e) {
        setError("Unable to load audios");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userData?.id]);

  return (
    <div className="max-w-6xl mx-auto mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8">
      <h3 className="text-gray-600 text-2xl sm:text-3xl tracking-wider font-semibold mb-6 sm:mb-9 text-center jost">
        All Audios
      </h3>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-full m-1 animate-pulse">
              <div className="w-full min-h-40 rounded-2xl bg-gray-200 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-sm text-red-600 text-center">{error}</div>
      ) : audios.length === 0 ? (
        <div className="text-sm text-gray-600 text-center">No audios yet</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {audios.map((a) => (
            <Link key={a._id} href={`/audios/${a._id}`}>
              <AudioCard audio={a} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AudiosComponent;
