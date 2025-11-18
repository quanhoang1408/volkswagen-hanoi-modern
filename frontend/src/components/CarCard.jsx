import { Link } from 'react-router-dom';

const formatPrice = (price) => {
    if (!price) return "Liên hệ";
    return "CHỈ TỪ " + new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CarCard = ({ car }) => (
    <div className="car-card">
        <div className="car-image" style={{ backgroundImage: `url(${car.imageUrls?.[0] || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {!car.imageUrls?.[0] && car.image}
        </div>
        <div className="car-content">
            <h3 className="car-title">{car.model}</h3>
            <p className="car-subtitle">{car.year} - {car.category}</p>
            <div className="car-price">{formatPrice(car.price)}</div>
            <Link to={`/product/${encodeURIComponent(car.model)}`} className="btn btn-blue" style={{ width: '100%', marginTop: '1rem' }}>
                Xem Chi Tiết
            </Link>
        </div>
    </div>
);

export default CarCard;