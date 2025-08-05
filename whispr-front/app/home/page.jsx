import AudioCard from "../components/AudioCard";

const Home = () => {
  return (
    <section className="pt-5 pb-10">
      <div className="border max-w-xl flex items-center justify-center gap-3 rounded-full px-3 py-2">
        <i className="fa-solid fa-magnifying-glass text-xl"></i>
        <input
          type="text"
          className="w-full h-full outline-none placeholder-gray-500"
          placeholder="What do you want to play?"
        />
      </div>
      <div className="border mt-8">
        <div>
          <h2>What's new?</h2>
          <AudioCard />
        </div>
        <div>
          <h2>Most liked songs</h2>
          songs here
        </div>
        <div>
          <h2>Popular artists</h2>
          songs here
        </div>
      </div>
    </section>
  );
};

export default Home;
