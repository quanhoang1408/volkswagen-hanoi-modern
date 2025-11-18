import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/volkswagenlogo.jgp.png';

const Header = () => (
  <header className="header">
    <nav className="nav-container">
      <Link to="/" className="logo">
        <img src={logo} alt="Volkswagen I.D Auto" className="logo-image" />
        <span>Volkswagen I.D Auto</span>
      </Link>
      <ul className="nav-menu">
        <li><NavLink to="/">Trang Chủ</NavLink></li>
        <li><NavLink to="/products">Sản Phẩm</NavLink></li>
        <li><NavLink to="/test-drive">Lái Thử</NavLink></li>
        <li><NavLink to="/contact">Liên Hệ</NavLink></li>
      </ul>
      <div className="mobile-toggle"><span></span><span></span><span></span></div>
    </nav>
  </header>
);

export default Header;