const Nav = ({ user, updateUser }) => {
  return (
    <nav className="bg-black p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/wall_1.png" alt="Logo" className="h-8 w-8 mr-2" />
      </div>

      {user && <span className="text-white">Welcome {user.name}!</span>}
      {user && (
        <button
          className="bg-red-500 text-white px-4 py-2 mb-4"
          onClick={() => {
            localStorage.removeItem("user");
            updateUser(null);
          }}
        >
          Log out
        </button>
      )}
    </nav>
  );
};

export default Nav;
