const AudioCard = () => {
  return (
    <div className="border border-transparent w-fit rounded-xl hover:bg-gray-300 group duration-200 flex-shrink-0">
      <div className="w-32 sm:w-36 lg:w-40 m-2 sm:m-3">
        <div className="mb-2 sm:mb-3 relative overflow-hidden">
          <img
            src="/img/sf.jpg"
            alt="Audio card"
            className="w-full object-cover min-h-32 sm:min-h-36 lg:min-h-40 rounded-xl"
          />
          <div
            className="absolute flex text-xs gap-1 px-1 py-1 flex-wrap top-0 rounded-t-xl w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.65) 1%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            <div className="bg-[#fffc] rounded-full px-1 text-xs">ASMR</div>
            <div className="bg-[#fffc] rounded-full px-1 text-xs">Jelous</div>
            <div className="bg-[#fffc] rounded-full px-1 text-xs">
              Satisfying
            </div>
            <div className="bg-[#fffc] rounded-full px-1 text-xs">
              Girlfriend
            </div>
          </div>
        </div>
        <h5 className="text-gray-600/80 line-clamp-2 text-sm sm:text-base">
          Episode 07: Goodbye boring, hello adventure
        </h5>
      </div>
    </div>
  );
};

export default AudioCard;
