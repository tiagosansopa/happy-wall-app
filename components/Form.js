import React, { useState } from "react";

const Form = ({ updateUser }) => {
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
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 border rounded">
      <form onSubmit={handleSubmit}>
        {isCreateUser && (
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500">{errorMessage}</p>

        <button className="bg-blue-500 text-white px-4 py-2 mt-2" type="submit">
          {isCreateUser ? "Create User" : "Log in"}
        </button>

        <button
          className="text-blue-500 mt-2 ml-2"
          type="button"
          onClick={() => setIsCreateUser(!isCreateUser)}
        >
          {isCreateUser ? "Switch to Log in" : "Switch to Create User"}
        </button>
      </form>
    </div>
  );
};

export default Form;
