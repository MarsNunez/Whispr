const PostCard = () => {
  return (
    <div className="mx-auto max-w-xl bg-white border border-gray-200 rounded-xl p-3 sm:p-4 my-3 sm:my-4">
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/48"
            alt="User avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <span className="font-bold text-gray-900 truncate">User Name</span>
            <span className="text-gray-500 hidden sm:inline">@username</span>
            <span className="text-gray-500">· 2h</span>
            <div className="ml-auto flex items-center hover:bg-gray-100 p-1 rounded-full text-gray-500">
              <i className="fa-solid fa-ellipsis text-xs sm:text-sm"></i>
            </div>
          </div>
          <div className="mt-1 sm:mt-2">
            <h1 className="text-sm sm:text-base font-normal text-gray-900 leading-relaxed">
              text
            </h1>
          </div>
          <div className="flex justify-between max-w-sm mt-2 text-gray-500 text-xs sm:text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded">
              <i className="fa-regular fa-comment"></i>{" "}
              <span className="hidden sm:inline">123</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded">
              <i className="fa-solid fa-retweet"></i>{" "}
              <span className="hidden sm:inline">45</span>
            </button>
            <button className="flex items-center gap-1 hover:text-pink-500 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded">
              <i className="fa-regular fa-heart"></i>{" "}
              <span className="hidden sm:inline">12</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
