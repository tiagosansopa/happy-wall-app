const Nav = ({ user }) => {
  return <nav>{user && <span>Welcome {user.name} !</span>}</nav>;
};

export default Nav;
