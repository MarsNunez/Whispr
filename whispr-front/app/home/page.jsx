import AudioCard from "../components/AudioCard";
import UserCard from "../components/UserCard";

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
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="jost text-2xl font-medium ml-3 mb-2">What's new?</h2>
          <div className="flex gap-x-2 overflow-scroll">
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="jost text-2xl font-medium ml-3 mb-2">
            Most liked songs
          </h2>
          <div className="flex gap-x-2 overflow-scroll">
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="jost text-2xl font-medium ml-3 mb-2">
            Popular artistss
          </h2>
          <div className="flex gap-x-2 overflow-scroll">
            <UserCard />
            <UserCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
