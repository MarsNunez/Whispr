"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserAudioStudioView = () => {
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
          <h1 className="text-center jost font-medium text-3xl">
            My Audios Studio
          </h1>
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
            </tr>
          </thead>
          {data.audios && (
            <tbody className="mx-10">
              {data.audios.map((audio, index) => (
                <tr
                  className={`text-center ${
                    index === data.audios.length - 1
                      ? ""
                      : "border-b border-gray-300"
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
                    {/* Max lenght for title: 90 */}
                    <div className="line-clamp-2">{audio.title}</div>
                  </td>
                  <td className="max-w-[10rem] px-5">
                    {/* Max lenght for desc: 130 */}
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
