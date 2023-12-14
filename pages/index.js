import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Form from "../components/Form";
import Post from "../components/Post";

const Layout = ({ children }) => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [feed, setFeed] = useState([]);
  const [postText, setPostText] = useState("");

  const [looggedUser, setLoggedUser] = useState(null);

  const toggleSide = () => {
    setLoginVisible(!isLoginVisible);
  };

  const postOnWall = async () => {
    console.log(postText);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NAME}/wallposts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: postText,
            userId: looggedUser.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPostText("");
        getWallPosts();
      } else {
        console.error(error);
        //setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      //setErrorMessage("An error occurred. Please try again.");
    }
  };

  const updateUser = (storedUser) => {
    setLoggedUser(storedUser);
  };

  const getWallPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NAME}/wallposts`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setFeed(data.wallposts);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWallPosts();

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setLoggedUser(parsedUser);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col flex-grow">
      <Nav user={looggedUser} />
      {!looggedUser && (
        <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
          <button
            className="bg-blue-500 text-white px-4 py-2 mb-4"
            onClick={toggleSide}
          >
            Login
          </button>

          {isLoginVisible && <Form updateUser={updateUser} />}
        </div>
      )}
      <div className="w-3/4 p-4">
        <div className="mb-4">
          {feed.map((post) => (
            <Post
              user={post.creator.name}
              message={post.message}
              date={post.createdAt}
            />
          ))}
        </div>

        <div className="flex">
          {looggedUser ? (
            <>
              <textarea
                className="w-3/4 p-2 mr-2 border"
                placeholder="Write your thoughts..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => postOnWall()}
              >
                Publish
              </button>
            </>
          ) : (
            <div>
              <p>Register to post on the happy wall!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
