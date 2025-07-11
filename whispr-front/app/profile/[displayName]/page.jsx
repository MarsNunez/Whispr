"use client";

import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProfileView = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${params.displayName}`
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [params.displayName]);

  const { user } = useAuth();
  // console.log(user);

  return (
    <section className="pb-20 mt-10">
      {userData && (
        <>
          <div className="flex w-fit mx-auto gap-28">
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
                    <div
                      key={tag}
                      className="border text-lg px-4 py-1 rounded-lg"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <figure className="max-w-[27rem]">
              <img
                src={userData.profilePicture}
                alt="profile picture"
                className="w-full rounded-3xl shadowing"
              />
            </figure>
          </div>
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
        </>
      )}
    </section>
  );
};

export default ProfileView;
