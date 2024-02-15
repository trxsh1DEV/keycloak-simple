import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#" className="navbar-link">
            Home
          </a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">
            Sobre
          </a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">
            Serviços
          </a>
        </li>
        <li className="navbar-item">
          <a href="#" className="navbar-link">
            Contato
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
