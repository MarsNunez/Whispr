const UserCard = () => {
  return (
    <div className="border border-transparent w-fit rounded-xl hover:bg-gray-300 group duration-200">
      <div className="w-40 m-3">
        <div className="mb-3 relative overflow-hidden">
          <img
            src="/img/blame.webp"
            alt="Audio card"
            className="w-full object-cover min-h-40 rounded-full"
          />
          <div className="absolute bg-indigo-600 text-white text- top-2/3 left-3/4 rounded-full px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
        <h5 className="text-gray-600/80 line-clamp-2">Stick Figure</h5>
      </div>
    </div>
  );
};

export default UserCard;
