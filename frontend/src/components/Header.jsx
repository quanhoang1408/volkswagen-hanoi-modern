import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchCars } from '../api';

const Header = () => {
    const [cars, setCars] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await fetchCars();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };
        getCars();
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const formatPrice = (price) => {
        if (!price) return "Vui lòng liên hệ";
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <header className="header">
            <nav className="nav-container">
                <Link to="/" className="logo">
                    <img
                        src="/images/volkswagenlogo.jgp.png"
                        alt="Volkswagen I.D Auto"
                        className="logo-image"
                        loading="lazy"
                    />
                    <span>Volkswagen I.D Auto</span>
                </Link>

                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <li><Link to="/">Trang Chủ</Link></li>
                    <li className="dropdown">
                        <Link to="/products">Sản Phẩm</Link>
                        <div className="dropdown-content">
                            {cars.map(car => (
                                <Link key={car.id} to={`/product/${encodeURIComponent(car.model)}`} className="dropdown-item">
                                    <div 
                                        className="dropdown-item-image" 
                                        style={{
                                            backgroundImage: `url(${car.imageUrls?.[0] || ''})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    ></div>
                                    <div className="dropdown-item-info">
                                        <h4>{car.model}</h4>
                                        <p>{formatPrice(car.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </li>
                    <li><Link to="/test-drive">Lái Thử</Link></li>
                    <li><Link to="/contact">Liên Hệ</Link></li>
                </ul>

                <div 
                    className="mobile-toggle" 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
};

export default Header;