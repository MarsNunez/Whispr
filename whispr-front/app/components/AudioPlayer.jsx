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
      <div className={`text-center py-12 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
          <i className="fas fa-exclamation-triangle text-2xl text-red-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-red-500">Falta el identificador del audio.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full animate-spin">
          <i className="fas fa-spinner text-2xl text-blue-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Cargando</h3>
        <p className="text-gray-500">Preparando tu audio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
          <i className="fas fa-times-circle text-2xl text-red-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-red-600 mb-2">Error</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!audio?.audioUrl) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-yellow-100 rounded-full">
          <i className="fas fa-file-audio text-2xl text-yellow-500"></i>
        </div>
        <h3 className="text-lg font-semibold text-yellow-600 mb-2">
          Audio no encontrado
        </h3>
        <p className="text-yellow-500">No se encontró la URL del audio.</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Audio Info Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
          <i className="fas fa-music text-3xl text-white"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {audio.title || "Audio Sin Título"}
        </h2>
        {audio.description ? (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {audio.description}
          </p>
        ) : (
          <p className="text-lg text-gray-500 italic">
            Sin descripción disponible
          </p>
        )}
      </div>

      {/* Audio Player Container */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-inner border border-gray-200">
        <div className="relative">
          <audio
            controls
            preload="metadata"
            src={audio.audioUrl}
            className="w-full h-16 rounded-xl shadow-lg"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
            }}
          />
        </div>

        {/* Audio Details */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          {audio.duration && (
            <div className="flex items-center gap-2">
              <i className="fas fa-clock text-blue-500"></i>
              <span className="font-medium">
                Duración: {Math.round(audio.duration)}s
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <i className="fas fa-file-audio text-purple-500"></i>
            <span className="font-medium">Formato: MP3</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-volume-up text-green-500"></i>
            <span className="font-medium">Alta Calidad</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <i className="fas fa-download"></i>
          <span>Descargar</span>
        </button>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <i className="fas fa-share"></i>
          <span>Compartir</span>
        </button>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <i className="fas fa-heart"></i>
          <span>Favorito</span>
        </button>
      </div>
    </div>
  );
}
