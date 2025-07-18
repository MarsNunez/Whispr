const PostCard = () => {
  return (
    <div className="mx-auto max-w-xl bg-white border border-gray-200 rounded-xl p-4 my-4">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/48"
            alt="User avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-sm">
            <span className="font-bold text-gray-900">User Name</span>
            <span className="text-gray-500">@username</span>
            <span className="text-gray-500">· 2h</span>
            <div className="ml-auto flex items-center hover:bg-gray-100 p-1 rounded-full text-gray-500">
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <div className="mt-2">
            <h1 className="text-base font-normal text-gray-900 leading-relaxed">
              text
            </h1>
          </div>
          <div className="flex justify-between max-w-sm mt-2 text-gray-500 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500 hover:bg-gray-100 px-2 py-1 rounded">
              <i class="fa-regular fa-comment"></i> 123
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 hover:bg-gray-100 px-2 py-1 rounded">
              <i class="fa-solid fa-retweet"></i> 45
            </button>
            <button className="flex items-center gap-1 hover:text-pink-500 hover:bg-gray-100 px-2 py-1 rounded">
              <i class="fa-regular fa-heart"></i> 12
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
