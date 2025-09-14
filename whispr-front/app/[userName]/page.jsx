// components/UserAudioStudioView.jsx
"use client";

import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserAudioStudioView = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState({ audios: [] });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(null);

  const [formData, setFormData] = useState({
    audio: null,
    title: "",
    description: "",
    tags: "",
    visibility: "public",
    price: 0,
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Debes iniciar sesión para acceder a esta página");
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!user?.id) {
          console.error("ID de usuario no disponible");
          toast.error("Error: ID de usuario no disponible");
          return;
        }

        const response = await axios.post(
          "http://localhost:3001/audios/audiosByUserId", // Nueva ruta POST
          { id: user.id }, // Enviar el id en el cuerpo
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setData({
          ...response.data,
          audios: response.data.audios
            ? response.data.audios.filter((audio) => audio && audio._id)
            : [],
        });
        console.log("Datos del usuario:", response.data);
        console.log("Datos del usuario:", user.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error al cargar los datos del usuario");
      }
    };

    if (isAuthenticated) {
      getData();
    }
  }, [user?.id, isAuthenticated]); // Dependencias actualizadas

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambios en los archivos (audio o thumbnail)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      if (files[0].size > 50 * 1024 * 1024) {
        toast.error("El archivo no debe exceder los 50MB");
        return;
      }
      if (name === "audio") {
        const validAudioTypes = ["audio/mpeg", "audio/wav", "audio/aac"];
        if (!validAudioTypes.includes(files[0].type)) {
          toast.error("Formato de archivo no válido. Usa MP3, WAV o AAC.");
          return;
        }
      }
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Enviar formulario para crear un nuevo audio
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!isAuthenticated || !user) {
      toast.error("Debes iniciar sesión para crear un audio");
      setIsSubmitting(false);
      router.push("/login");
      return;
    }
    if (!formData.audio) {
      toast.error("El archivo de audio es requerido");
      setIsSubmitting(false);
      return;
    }
    if (!formData.title) {
      toast.error("El título es requerido");
      setIsSubmitting(false);
      return;
    }
    if (!user.id) {
      toast.error("No se pudo obtener el ID del usuario");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("audio", formData.audio);
    formDataToSend.append("creatorId", user.id);
    formDataToSend.append("userName", user.userName);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("visibility", formData.visibility);
    formDataToSend.append("price", formData.price);

    try {
      const response = await axios.post(
        "http://localhost:3001/audios/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.audio) {
        throw new Error("El backend no devolvió un audio válido");
      }

      setData((prev) => ({
        ...prev,
        audios: [...(prev.audios || []), response.data.audio],
      }));

      setIsCreateModalOpen(false);
      setFormData({
        audio: null,
        title: "",
        description: "",
        tags: "",
        visibility: "public",
        price: 0,
      });
      toast.success("Audio creado exitosamente");
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al subir el audio");
      console.error("Error uploading audio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Abrir modal de edición con datos precargados
  const handleEditClick = (audio) => {
    if (!isAuthenticated || !user) {
      toast.error("Debes iniciar sesión para editar un audio");
      router.push("/login");
      return;
    }
    setSelectedAudio(audio);
    setFormData({
      audio: null,
      title: audio.title || "",
      description: audio.description || "",
      tags: Array.isArray(audio.tags) ? audio.tags.join(", ") : "",
      visibility: audio.visibility || "public",
      price: audio.price || 0,
    });
    setIsEditModalOpen(true);
  };

  // Enviar formulario para actualizar un audio
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!isAuthenticated || !user) {
      toast.error("Debes iniciar sesión para actualizar un audio");
      setIsSubmitting(false);
      router.push("/login");
      return;
    }
    if (!formData.title) {
      toast.error("El título es requerido");
      setIsSubmitting(false);
      return;
    }
    if (!user.id) {
      toast.error("No se pudo obtener el ID del usuario");
      setIsSubmitting(false);
      return;
    }
    if (!selectedAudio?._id) {
      toast.error("No se seleccionó un audio válido");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    if (formData.audio) {
      formDataToSend.append("audio", formData.audio);
    }
    formDataToSend.append("creatorId", user.id);
    formDataToSend.append("userName", user.userName);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("visibility", formData.visibility);
    formDataToSend.append("price", formData.price);

    try {
      const response = await axios.patch(
        `http://localhost:3001/audios/${selectedAudio._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Respuesta del backend en PATCH:", response.data);

      if (!response.data.audio) {
        throw new Error("El backend no devolvió un audio válido");
      }

      setData((prev) => ({
        ...prev,
        audios: (prev.audios || []).map((a) =>
          a._id === selectedAudio._id ? response.data.audio : a
        ),
      }));

      setIsEditModalOpen(false);
      setFormData({
        audio: null,
        title: "",
        description: "",
        tags: "",
        visibility: "public",
        price: 0,
      });
      setSelectedAudio(null);
      toast.success("Audio actualizado exitosamente");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error al actualizar el audio"
      );
      console.error("Error updating audio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar un audio
  const handleDelete = async (audioId) => {
    if (!isAuthenticated || !user) {
      toast.error("Debes iniciar sesión para eliminar un audio");
      router.push("/login");
      return;
    }

    // Confirmar eliminación (opcional, para mejor UX)
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este audio?"
    );
    if (!confirmDelete) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.delete(
        `http://localhost:3001/audios/${audioId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Error al eliminar el audio");
      }

      // Actualizar el estado para remover el audio eliminado
      setData((prev) => ({
        ...prev,
        audios: (prev.audios || []).filter((a) => a._id !== audioId),
      }));

      toast.success("Audio eliminado exitosamente");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al eliminar el audio"
      );
      console.error("Error deleting audio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Cargando usuario...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirigirá automáticamente por el useEffect
  }

  return (
    <section className="py-8 sm:py-12 lg:py-15 px-4 sm:px-6 lg:px-8">
      {data.user && (
        <div className="text-center mb-6 sm:mb-8">
          <img
            src={data.user.profilePicture}
            alt="Profile picture"
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 border-[#1d3f55] border-2 rounded-full object-cover mx-auto"
          />
          <div className="text-center my-4 text-xs sm:text-sm flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <p className="flex items-center justify-center gap-1">
              <i className="fa-solid text-xs fa-music"></i> Audios:{" "}
              {data.audios?.length ?? 0}
            </p>
            <p className="flex items-center justify-center gap-1">
              <i className="fa-solid text-xs fa-user-plus"></i> Followers: 20
            </p>
            <p className="flex items-center justify-center gap-1">
              <i className="fa-solid text-xs fa-cake-candles"></i> Joined:
              20/2/20
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-center sm:text-left jost font-medium text-2xl sm:text-3xl">
            My Audios Studio
          </h1>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:bg-indigo-400 text-sm sm:text-base hover:bg-indigo-700 transition-colors"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={!isAuthenticated || isSubmitting}
          >
            <i className="fa-solid fa-plus mr-2"></i>
            Create
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-400/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsCreateModalOpen(false)}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create New Audio
            </h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleCreateSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload-create"
                    name="thumbnail"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="thumbnail-upload-create"
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    {formData.thumbnail
                      ? formData.thumbnail.name
                      : "Click to upload or drag and drop"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, or GIF (Max. 5MB)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio File <span className="text-red-600">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload-create"
                    name="audio"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="audio-upload-create"
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    {formData.audio
                      ? formData.audio.name
                      : "Click to upload or drag and drop"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    MP3, WAV, or AAC (Max. 50MB)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title ({formData.title.length} / 90){" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter audio title"
                  maxLength={90}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description ({formData.description.length} / 130)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter audio description"
                  rows={4}
                  maxLength={130}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter tags (comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="public">Public</option>
                  <option value="premium">Premium</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter price (0 for free)"
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Audio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-400/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Audio</h2>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload-edit"
                    name="thumbnail"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="thumbnail-upload-edit"
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    {formData.thumbnail
                      ? formData.thumbnail.name
                      : "Click to upload or drag and drop"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, or GIF (Max. 5MB)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio File
                </label>
                {selectedAudio?.audioUrl && (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Current Audio
                    </label>
                    <audio
                      controls
                      src={selectedAudio.audioUrl}
                      className="w-full"
                    />
                  </div>
                )}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload-edit"
                    name="audio"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="audio-upload-edit"
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    {formData.audio
                      ? formData.audio.name
                      : "Click to upload or drag and drop"}
                  </label>
                  <p className="text-sm text-gray-500 mt-1">
                    MP3, WAV, or AAC (Max. 50MB)
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title ({formData.title.length} / 90){" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter audio title"
                  maxLength={90}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description ({formData.description.length} / 130)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter audio description"
                  rows={4}
                  maxLength={130}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter tags (comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="public">Public</option>
                  <option value="premium">Premium</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter price (0 for free)"
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Audio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="max-w-6xl mx-auto mt-8 sm:mt-12 lg:mt-16">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="pb-5">
              <tr>
                <th className="text-left">Thumbnail</th>
                <th className="text-left">Title</th>
                <th className="text-left">Description</th>
                <th className="text-center">Likes</th>
                <th className="text-left">Tags</th>
                <th className="text-center">Visibility</th>
                <th className="text-center">Price</th>
                <th className="text-center">Plays</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>

            {data.audios && (
              <tbody>
                {data.audios
                  .filter((audio) => audio && audio._id)
                  .map((audio, index) => (
                    <tr
                      className={`text-center ${
                        index ===
                        data.audios.filter((a) => a && a._id).length - 1
                          ? ""
                          : "border-b border-gray-300"
                      }`}
                      key={audio._id}
                    >
                      <td className="flex items-center justify-center">
                        <Link href={`/audios/${audio._id}`}>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/12165/12165108.png"
                            alt="audio image"
                            className="w-20 py-5"
                          />
                        </Link>
                      </td>
                      <td className="max-w-[7rem]">
                        <div className="line-clamp-2">
                          {audio.title || "Sin título"}
                        </div>
                      </td>
                      <td className="max-w-[10rem] px-5">
                        <div className="line-clamp-2">
                          {audio.description || "No description"}
                        </div>
                      </td>
                      <td>{audio.likeCount || 0}</td>
                      <td>
                        {Array.isArray(audio.tags) && audio.tags.length > 0 ? (
                          audio.tags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                          ))
                        ) : (
                          <p>No tags</p>
                        )}
                      </td>
                      <td>{audio.visibility || "public"}</td>
                      <td>{audio.price || 0}</td>
                      <td>{audio.playCount || 0}</td>
                      <td>
                        <button
                          className="bg-green-600 text-white py-1 px-2 rounded-lg disabled:bg-green-400"
                          onClick={() => handleEditClick(audio)}
                          disabled={!isAuthenticated || isSubmitting}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="bg-red-600 text-white py-1 px-2 rounded-lg disabled:bg-red-400"
                          onClick={() => handleDelete(audio._id)}
                          disabled={!isAuthenticated || isSubmitting}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {data.audios &&
            data.audios
              .filter((audio) => audio && audio._id)
              .map((audio) => (
                <div
                  key={audio._id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/audios/${audio._id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/12165/12165108.png"
                        alt="audio image"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {audio.title || "Sin título"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {audio.description || "No description"}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Array.isArray(audio.tags) && audio.tags.length > 0 ? (
                          audio.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-xs">No tags</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>
                            <i className="fa-solid fa-heart mr-1"></i>
                            {audio.likeCount || 0}
                          </span>
                          <span>
                            <i className="fa-solid fa-play mr-1"></i>
                            {audio.playCount || 0}
                          </span>
                          <span className="capitalize">
                            {audio.visibility || "public"}
                          </span>
                          <span>${audio.price || 0}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="bg-green-600 text-white py-1 px-2 rounded-lg disabled:bg-green-400 text-sm"
                            onClick={() => handleEditClick(audio)}
                            disabled={!isAuthenticated || isSubmitting}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="bg-red-600 text-white py-1 px-2 rounded-lg disabled:bg-red-400 text-sm"
                            onClick={() => handleDelete(audio._id)}
                            disabled={!isAuthenticated || isSubmitting}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </section>
  );
};

export default UserAudioStudioView;
