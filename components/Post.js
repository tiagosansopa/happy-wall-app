const Post = ({ message, user, date }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-lg">{user}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div>
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Post;
