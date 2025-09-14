import AudioCard from "../components/AudioCard";
import UserCard from "../components/UserCard";

const Home = () => {
  return (
    <section className="pt-4 sm:pt-5 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="border max-w-sm sm:max-w-md lg:max-w-xl mx-auto flex items-center justify-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-3">
        <i className="fa-solid fa-magnifying-glass text-lg sm:text-xl text-gray-500"></i>
        <input
          type="text"
          className="w-full h-full outline-none placeholder-gray-500 text-sm sm:text-base"
          placeholder="What do you want to play?"
        />
      </div>

      <div className="mt-6 sm:mt-8">
        {/* What's New Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            What's new?
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
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

        {/* Most Liked Songs Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            Most liked songs
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
            <AudioCard />
            <AudioCard />
            <AudioCard />
            <AudioCard />
          </div>
        </div>

        {/* Popular Artists Section */}
        <div className="mb-4 sm:mb-6">
          <h2 className="jost text-xl sm:text-2xl font-medium ml-2 sm:ml-3 mb-3 sm:mb-4">
            Popular artists
          </h2>
          <div className="flex gap-x-2 sm:gap-x-3 overflow-x-auto pb-2 scrollbar-hide">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
