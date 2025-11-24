import { Link } from 'react-router-dom';

const formatPrice = (price) => {
    if (!price) return "Vui lòng liên hệ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const CarCard = ({ car }) => {
    const getSpecIcon = (type) => {
        const icons = {
            engine: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 6V4m12 2V4M6 18v2m12-2v2"/></svg>',
            transmission: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 12h8"/></svg>'
        };
        return icons[type] || '';
    };

    return (
        <div className="featured-card" onClick={() => window.location.href = `/product/${encodeURIComponent(car.model)}`}>
            <div 
                className="featured-card-image" 
                style={{
                    backgroundImage: `url(${car.imageUrls?.[0] || ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            ></div>
            
            <div className="featured-card-content">
                <h3 className="featured-card-title">{car.model}</h3>
                <p className="featured-card-subtitle">{car.year} - {car.category}</p>
                <div className="featured-card-price">{formatPrice(car.price)}</div>
                
                <div className="featured-card-specs">
                    <div className="featured-spec-item">
                        <span 
                            className="featured-spec-icon"
                            dangerouslySetInnerHTML={{ __html: getSpecIcon('engine') }}
                        />
                        <span>{car.engine}</span>
                    </div>
                    <div className="featured-spec-item">
                        <span 
                            className="featured-spec-icon"
                            dangerouslySetInnerHTML={{ __html: getSpecIcon('transmission') }}
                        />
                        <span>{car.transmission}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;