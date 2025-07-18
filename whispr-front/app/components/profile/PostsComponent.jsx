import PostCard from "../PostCard";

const PostComponent = () => {
  return (
    <div className="max-w-6xl mx-auto mt-14">
      <h3 className="text-gray-600 text-3xl tracking-wider font-semibold mb-9 text-center jost">
        All Posts
      </h3>
      <div className="max-w-xl mx-auto">
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default PostComponent;
