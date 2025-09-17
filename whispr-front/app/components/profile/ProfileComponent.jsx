"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import AudioCard from "../../components/AudioCard";
import { apiUrl } from "@/app/lib/api";

const ProfileComponent = ({ userData, canEdit = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [interestTags, setInterestTags] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // Usa el contexto de autenticación
  const [latestAudios, setLatestAudios] = useState([]);
  const [latestLoading, setLatestLoading] = useState(false);
  const [latestError, setLatestError] = useState("");

  // Efecto para inicializar los estados con userData al montar el componente
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || "");
      setBio(userData.bio || "");
      setInterestTags(
        userData.interestTags ? userData.interestTags.join(", ") : ""
      );
      setUserName(userData.userName || "");
    }
  }, [userData]);

  // Load latest audios for this user (max 6)
  useEffect(() => {
    const loadLatest = async () => {
      if (!userData?.id) return;
      setLatestLoading(true);
      setLatestError("");
      try {
        const { data } = await axios.get(
          apiUrl(`/users/audios/all/${userData.id}`)
        );
        const arr = Array.isArray(data?.data) ? data.data : [];
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestAudios(arr.slice(0, 6));
      } catch (e) {
        setLatestError("Unable to load latest audios");
      } finally {
        setLatestLoading(false);
      }
    };
    loadLatest();
  }, [userData?.id]);

  const handleImageClick = () => {
    if (!canEdit) return; // Solo el dueño puede editar
    if (userData) {
      setIsModalOpen(true);
      setError("");
      setDisplayName(userData.displayName || "");
      setBio(userData.bio || "");
      setInterestTags(
        userData.interestTags ? userData.interestTags.join(", ") : ""
      );
      setUserName(userData.userName || "");
      console.log("Abriendo modal con userData:", userData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    setNewProfilePicture(null);
    if (userData) {
      setDisplayName(userData.displayName || "");
      setBio(userData.bio || "");
      setInterestTags(
        userData.interestTags ? userData.interestTags.join(", ") : ""
      );
      setUserName(userData.userName || "");
    }
  };

  const handleSaveChanges = async () => {
    if (!canEdit) return; // Guard adicional
    if (!userData || !userData.id) {
      console.error("userData o userData.id no está definido:", userData);
      setError("Error: Datos de usuario no disponibles.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userData.id);
    if (newProfilePicture) {
      formData.append("profilePicture", newProfilePicture);
    }
    formData.append("displayName", displayName);
    formData.append("bio", bio);
    formData.append(
      "interestTags",
      interestTags.split(",").map((tag) => tag.trim())
    );
    formData.append("userName", userName);

    console.log("Enviando datos:", { userId: userData.id, formData });

    try {
      const response = await axios.put(
        apiUrl(`/users/update-profile-picture/${userData.id}`),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        id: userData.id,
        userName: response.data.userName,
        displayName: response.data.displayName,
        email: userData.email,
        profilePicture: response.data.profilePicture,
      };

      const token = localStorage.getItem("token");
      login(updatedUser, token);

      setIsModalOpen(false);
      window.location.href = `/profile/${userName}`;
    } catch (error) {
      console.error(
        "Error al actualizar el perfil:",
        error.response ? error.response.data : error.message
      );
      if (
        error.response &&
        error.response.data.error === "El userName ya está en uso"
      ) {
        setError("El userName ya está en uso. Por favor, elige otro.");
      } else {
        setError("Error al actualizar el perfil. Intenta de nuevo.");
      }
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <p className="text-gray-700/85 text-sm sm:text-base">{userData.userName}</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6">
            {userData.displayName}
          </h2>
          <p className="jost text-base sm:text-lg w-full">
            {!userData.bio
              ? "It's a show about the life of the digital nomads all over the world and what they struggle with or what happens to them when they travel."
              : userData.bio}
          </p>
          <p className="text-base sm:text-lg uppercase font-medium jost tracking-widest text-gray-800/45 mt-4 sm:mt-6">
            Interest Tags:
          </p>
          {userData.interestTags && (
            <div className="flex jost flex-wrap mt-2 gap-2 sm:gap-3">
              {userData.interestTags.map((tag, i) => (
                <div key={`${tag}-${i}`} className="border text-sm sm:text-base px-3 sm:px-4 py-1 rounded-lg">
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[27rem] aspect-square md:ml-auto mx-auto mt-6 md:mt-0">
          <img
            onClick={handleImageClick}
            src={userData.profilePicture}
            alt="profile picture"
            className={`w-full h-full rounded-3xl shadowing object-cover justify-self-end ${
              canEdit ? "cursor-pointer" : "cursor-not-allowed opacity-95"
            }`}
            title={canEdit ? "Edit profile" : "Only the owner can edit"}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 bg-slate-400/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewProfilePicture(e.target.files[0])}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
                {userData.profilePicture && (
                  <img
                    src={userData.profilePicture}
                    alt="Current profile"
                    className="mt-2 w-32 h-32 object-cover rounded-2xl mx-auto border-2 border-[#1d3f55]"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">User Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="e.g., @username"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Interest Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={interestTags}
                  onChange={(e) => setInterestTags(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded"
                  placeholder="e.g., travel, music, tech"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LATEST AUDIOS */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-14 px-4 sm:px-6 lg:px-8">
        <h3 className="text-gray-600/80 text-xl sm:text-2xl tracking-wider font-semibold mb-5 sm:mb-7">
          Latest Audios
        </h3>
        {latestLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full m-1 animate-pulse">
                <div className="w-full min-h-40 rounded-2xl bg-gray-200 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : latestError ? (
          <div className="text-sm text-red-600">{latestError}</div>
        ) : latestAudios.length === 0 ? (
          <div className="text-sm text-gray-600">No audios yet</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {latestAudios.map((a) => (
              <Link key={a._id} href={`/audios/${a._id}`}>
                <AudioCard audio={a} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileComponent;
