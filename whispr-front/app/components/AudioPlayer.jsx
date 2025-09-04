"use client";

import { useEffect, useMemo, useState } from "react";

export default function AudioPlayer({ audioId, className = "" }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);

  const endpoint = useMemo(() => {
    if (!audioId) return null;
    return `http://localhost:3001/audios/${audioId}`;
  }, [audioId]);

  useEffect(() => {
    if (!endpoint) return;
    const controller = new AbortController();

    async function fetchAudio() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Error ${res.status}: No se pudo cargar el audio`);
        }
        const data = await res.json();
        setAudio(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error al cargar el audio");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAudio();
    return () => controller.abort();
  }, [endpoint]);

  if (!audioId) {
    return (
      <div className={`text-red-600 ${className}`}>
        Falta el identificador del audio.
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        Cargando audio…
      </div>
    );
  }

  if (error) {
    return <div className={`text-red-600 ${className}`}>{error}</div>;
  }

  if (!audio?.audioUrl) {
    return (
      <div className={`text-red-600 ${className}`}>
        No se encontró la URL del audio.
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">
          {audio.title || "Reproductor"}
        </h2>
        {audio.description ? (
          <p className="text-sm text-gray-600">{audio.description}</p>
        ) : null}
      </div>
      <audio
        controls
        preload="metadata"
        src={audio.audioUrl}
        className="w-full"
      />
      {audio.duration ? (
        <p className="mt-2 text-xs text-gray-500">
          Duración: {Math.round(audio.duration)}s
        </p>
      ) : null}
    </div>
  );
}
