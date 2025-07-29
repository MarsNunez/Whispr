"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const ProfileComponent = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [interestTags, setInterestTags] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // Usa el contexto de autenticación

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

  const handleImageClick = () => {
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
        `http://localhost:3001/users/update-profile-picture/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Perfil actualizado:", response.data);

      // Extraer los datos actualizados del usuario desde la respuesta
      const updatedUser = {
        id: userData.id,
        userName: response.data.userName,
        displayName: response.data.displayName,
        email: userData.email, // El email no se actualiza, lo mantenemos del userData original
        profilePicture: response.data.profilePicture,
      };

      // Actualizar AuthContext y localStorage con los nuevos datos
      const token = localStorage.getItem("token"); // Reutiliza el token existente
      login(updatedUser, token);

      // Forzar la redirección para refrescar la página
      setIsModalOpen(false);
      // router.push(`/profile/${userName}`);
      // Opcional: Forzar recarga completa si es necesario
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
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto ">
        <div className="max-w-xl w-full">
          <p className="text-gray-700/85">{userData.userName}</p>
          <h2 className="text-5xl font-semibold mb-6">
            {userData.displayName}
          </h2>
          <p className="jost text-lg w-full">
            {!userData.bio
              ? "It's a show about the life of the digital nomads all over the world and what they struggle with or what happens to them when they travel."
              : userData.bio}
          </p>
          <p className="text-lg uppercase font-medium jost tracking-widest text-gray-800/45 mt-6">
            Interest Tags:
          </p>
          {userData.interestTags && (
            <div className="flex jost flex-wrap mt-2 gap-4">
              {userData.interestTags.map((tag) => (
                <div key={tag} className="border text-lg px-4 py-1 rounded-lg">
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <figure
          className="justify-self-end cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={userData.profilePicture}
            alt="profile picture"
            className="w-full max-w-[27rem] rounded-3xl shadowing"
          />
        </figure>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                    className="mt-2 w-32 h-32 object-cover rounded-full"
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
      <div className="max-w-6xl mx-auto mt-14">
        <h3 className="text-gray-600/80 text-2xl tracking-wider font-semibold mb-7">
          Latest Audios
        </h3>
        <div className="grid grid-cols-6">
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
          <div className="max-w-40">
            <img
              src={userData.profilePicture}
              alt="latestAuth"
              className="w-full object-cover min-h-40 rounded-2xl shadowing mb-3"
            />
            <h5 className="text-gray-600/80 font-medium">
              {"Episode 07: Goodbye boring, hello adventure "}
            </h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileComponent;
