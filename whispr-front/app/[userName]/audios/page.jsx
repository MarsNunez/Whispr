"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserAudiosView = () => {
  const params = useParams();
  const [data, setData] = useState({});

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
  return (
    <section className="border py-15">
      {data && (
        <>
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
          <h1 className="text-center jost font-medium text-3xl">
            My Audios Studio
          </h1>
        </>
      )}
    </section>
  );
};

export default UserAudiosView;
