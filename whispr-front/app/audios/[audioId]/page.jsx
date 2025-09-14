"use client";

import AudioPlayer from "@/app/components/AudioPlayer";
import { useParams } from "next/navigation";

const AudioPage = () => {
  const { audioId } = useParams();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl mt-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
        <div className="relative z-10 px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
              <i className="fas fa-music text-2xl text-white"></i>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 jost">
              Whispr .
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Disfruta de una experiencia de audio inmersiva y unica
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -right-8 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-8 z-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
            <AudioPlayer audioId={audioId} />
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-headphones text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Alta Calidad
              </h3>
              <p className="text-gray-600">
                Reproducción de audio en la más alta calidad disponible
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-play-circle text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Fácil Uso
              </h3>
              <p className="text-gray-600">
                Interfaz intuitiva y controles fáciles de usar
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-mobile-alt text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Responsive
              </h3>
              <p className="text-gray-600">
                Optimizado para todos los dispositivos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPage;
