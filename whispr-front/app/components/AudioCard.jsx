const AudioCard = () => {
  return (
    <div className="border border-transparent w-fit rounded-xl hover:bg-gray-300 group duration-200">
      <div className="w-40 m-3">
        <div className="mb-3 relative overflow-hidden">
          <img
            src="/img/sf.jpg"
            alt="Audio card"
            className="w-full object-cover min-h-40 rounded-xl"
          />
          <div
            className="absolute flex text-xs gap-1 px-1 py-1 flex-wrap top-0 rounded-t-xl w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.65) 1%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            <div className="bg-[#fffc] rounded-full px-1">ASMR</div>
            <div className="bg-[#fffc] rounded-full px-1">Jelous</div>
            <div className="bg-[#fffc] rounded-full px-1">Satisfying</div>
            <div className="bg-[#fffc] rounded-full px-1">Girlfriend</div>
          </div>
        </div>
        <h5 className="text-gray-600/80 line-clamp-2">
          Episode 07: Goodbye boring, hello adventure
        </h5>
      </div>
    </div>
  );
};

export default AudioCard;
