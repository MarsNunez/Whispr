"use client";

import AudioPlayer from "@/app/components/AudioPlayer";
import { useParams } from "next/navigation";

const AudioPage = () => {
  const { audioId } = useParams();

  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold mb-4">Audio Page</h1>
      <AudioPlayer audioId={audioId} />
    </section>
  );
};

export default AudioPage;
