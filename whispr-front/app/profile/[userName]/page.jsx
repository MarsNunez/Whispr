"use client";

import AudiosComponent from "@/app/components/profile/AudiosComponent";
import ProfileComponent from "@/app/components/profile/ProfileComponent";
import { useAuth } from "@/app/context/AuthContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient, apiUrl } from "@/app/lib/api";

const ProfileView = () => {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState({});
  const [showOption, setShowOption] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(
          apiUrl(`/users/${params.userName}`)
        );

        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [params.userName]);

  const normalizeUserName = (val) => {
    if (!val) return "";
    let s = String(val).toLowerCase();
    if (!s.startsWith("@")) s = `@${s}`;
    return s;
  };

  const canEdit =
    isAuthenticated &&
    normalizeUserName(user?.userName) ===
      normalizeUserName("@" + params.userName.slice(3));

  return (
    <section className="pb-16 sm:pb-20 mt-8 sm:mt-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 sm:mb-10 flex flex-wrap items-center justify-center gap-2">
        <button
          className="text-white bg-indigo-600 font-medium rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base cursor-pointer"
          onClick={() => setShowOption(0)}
        >
          Profile
        </button>
        <button
          className="text-white bg-indigo-600 font-medium rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base cursor-pointer"
          onClick={() => setShowOption(1)}
        >
          Audios
        </button>
      </div>
      {userData && showOption === 0 && (
        <ProfileComponent userData={userData} canEdit={canEdit} />
      )}
      {userData && showOption === 1 && <AudiosComponent userData={userData} />}
    </section>
  );
};

export default ProfileView;
