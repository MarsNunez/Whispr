"use client";

import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserAudioStudioView = () => {
  const { user } = useAuth();

  const params = useParams();
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/audios/audiosByUserName/${params.userName}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [params.userName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Validación básica
    if (!formData.audio) {
      setError("Audio file is required");
      setIsSubmitting(false);
      return;
    }
    if (!formData.title) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    // Crear FormData para enviar al backend
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
          },
        }
      );

      // Actualizar la lista de audios
      setData((prev) => ({
        ...prev,
        audios: [...prev.audios, response.data.audio],
      }));

      // Cerrar el modal y reiniciar el formulario
      setIsModalOpen(false);
      setFormData({
        audio: null,
        title: "",
        description: "",
        tags: "",
        visibility: "public",
        price: 0,
      });
    } catch (error) {
      setError(error.response?.data?.error || "Error uploading audio");
      console.error("Error uploading audio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-15">
      {data.user && (
        <div className="">
          <img
            src={data.user.profilePicture}
            alt="Profile picture"
            className="w-44 rounded-full object-cover mx-auto"
          />
          <div className="text-center my-4 text-sm flex flex-col gap-1">
            <p>
              <i className="fa-solid text-xs fa-music"></i> Audios:{" "}
              {data.audios.length}
            </p>
            <p>
              <i className="fa-solid text-xs fa-user-plus"></i> Followers: 20
            </p>
            <p>
              <i className="fa-solid text-xs fa-cake-candles"></i> Joined:
              20/2/20
            </p>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto grid grid-cols-3">
        <h1 className="text-center jost font-medium text-3xl col-start-2">
          My Audios Studio
        </h1>
        <button
          className="col-start-3 justify-self-end bg-indigo-600 text-white px-4 py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Create
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-400/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            {/* Modal header */}
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create New Audio
            </h2>

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                    name="thumbnail"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="thumbnail-upload"
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

              {/* Audio File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio File <span className="text-red-600">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload"
                    name="audio"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="audio-upload"
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

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-600">*</span>
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

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
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

              {/* Tags */}
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

              {/* Visibility */}
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

              {/* Price */}
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
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
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

      <section className="max-w-6xl mx-auto mt-16">
        <table className="w-full">
          <thead className="pb-5">
            <tr className="">
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Description</th>
              <th>Likes</th>
              <th>Tags</th>
              <th>Visibility</th>
              <th>Price</th>
              <th>Plays</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {data.audios && (
            <tbody className="mx-10">
              {data.audios.map((audio, index) => (
                <tr
                  className={`text-center ${
                    index === data.audios.length - 1
                      ? ""
                      : "border-bottom border-gray-300"
                  }`}
                  key={audio._id}
                >
                  <td className="flex items-center justify-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/12165/12165108.png"
                      alt="audio image"
                      className="w-20 py-5"
                    />
                  </td>
                  <td className="max-w-[7rem]">
                    <div className="line-clamp-2">{audio.title}</div>
                  </td>
                  <td className="max-w-[10rem] px-5">
                    <div className="line-clamp-2">
                      {audio.description ? audio.description : "No description"}
                    </div>
                  </td>
                  <td>{audio.likeCount}</td>
                  <td>
                    {audio.tags.map((tag, index) => (
                      <p key={index}>{tag}</p>
                    ))}
                  </td>
                  <td>{audio.visibility}</td>
                  <td>{audio.price}</td>
                  <td>{audio.playCount}</td>
                  <td>
                    <button className="bg-green-600 text-white py-1 px-2 rounded-lg">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button className="bg-red-600 text-white py-1 px-2 rounded-lg">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </section>
    </section>
  );
};

export default UserAudioStudioView;
