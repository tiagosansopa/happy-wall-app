import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isLoginVisible, setLoginVisible] = useState(false);

  const toggleLogin = () => {
    setLoginVisible(!isLoginVisible);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <button
          className="bg-blue-500 text-white px-4 py-2 mb-4"
          onClick={toggleLogin}
        >
          Login
        </button>

        {isLoginVisible && (
          <div className="bg-white p-4 border rounded">
            <form>
              <label>email</label>
              <input type="email"></input>
              <label>password</label>
              <input type="password"></input>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                type="submit"
              >
                Log in
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="w-3/4 p-4">
        <div className="mb-4">
          <div>
            <h2>post sample</h2>
          </div>
        </div>

        <div className="flex">
          <textarea
            className="w-3/4 p-2 mr-2 border"
            placeholder="Write your thoughts..."
          />
          <button className="bg-blue-500 text-white px-4 py-2">Publish</button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
