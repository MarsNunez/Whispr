const UserCard = ({ user, className = "" }) => {
  const img = user?.profilePicture || "/img/blame.webp";
  const title = user?.displayName || "Stick Figure";
  return (
    <div className={`border border-transparent w-fit rounded-xl hover:bg-gray-300 group duration-200 flex-shrink-0 ${className}`}>
      <div className="w-32 sm:w-36 lg:w-40 m-2 sm:m-3">
        <div className="mb-2 sm:mb-3 relative overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full object-cover min-h-32 sm:min-h-36 lg:min-h-40 rounded-full"
          />
          <div className="absolute bg-indigo-600 text-white top-2/3 left-3/4 rounded-full px-2 sm:px-3 py-1 sm:py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <i className="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
          </div>
        </div>
        <h5 className="text-gray-600/80 line-clamp-2 text-sm sm:text-base">
          {title}
        </h5>
      </div>
    </div>
  );
};

export default UserCard;
