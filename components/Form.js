import React, { useState } from "react";

const Form = ({ updateUser, setLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreateUser, setIsCreateUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    // Additional validation for creating a user
    if (isCreateUser && !name) {
      setErrorMessage("Name is required for user creation.");
      return;
    }

    // Clear previous error messages
    setErrorMessage("");

    try {
      // Use the appropriate API endpoint based on the mode (create user or log in)
      const endpoint = isCreateUser ? "users/register" : "users/login";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_NAME}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            name: isCreateUser ? name : undefined,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        updateUser(data.user);
        setPassword("");
        setEmail("");
        setName("");
        setLoginVisible(false);
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 border rounded max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4">
          {isCreateUser ? "Create User" : "Log In"}
        </h3>
        {isCreateUser && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-6 py-2 ml-4 rounded-lg"
          type="submit"
        >
          {isCreateUser ? "Create User" : "Log in"}
        </button>
      </form>
      <p className="text-red-500 mb-4">{errorMessage}</p>
      <button
        className="text-blue-500"
        type="button"
        onClick={() => setIsCreateUser(!isCreateUser)}
      >
        {isCreateUser
          ? "Already registered? Sign in!"
          : "New? Create user now!"}
      </button>
    </div>
  );
};

export default Form;
