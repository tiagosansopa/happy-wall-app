const Post = ({ message, user, date }) => {
  return (
    <div>
      <div>
        <span>{user}</span> <span>{date}</span>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Post;
