import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Manager</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Task</Link>
      

        
      </div>
    </nav>
  );
};

export default Navbar;