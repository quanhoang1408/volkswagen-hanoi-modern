import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarByModel, fetchCars } from '../api';
import CarCard from '../components/CarCard';

const formatPrice = (price) => {
    if (!price) return "Vui lòng liên hệ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const ProductDetail = () => {
    const { modelName } = useParams();
    const [car, setCar] = useState(null);
    const [relatedCars, setRelatedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCarData = async () => {
            setLoading(true);
            try {
                const { data: currentCar } = await fetchCarByModel(modelName);
                setCar(currentCar);
                
                const { data: allCars } = await fetchCars();
                const related = allCars.filter(c => c.category === currentCar.category && c.id !== currentCar.id).slice(0, 3);
                setRelatedCars(related);
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setLoading(false);
            }
        };
        getCarData();
    }, [modelName]);

    if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Đang tải chi tiết xe...</div>;
    if (!car) return <div style={{ padding: '5rem', textAlign: 'center' }}>Không tìm thấy thông tin xe.</div>;

    return (
        <div className="product-detail">
            <div className="product-main">
                <div className="product-gallery">
                    <img src={car.imageUrls?.[0] || ''} alt={car.model} id="main-image" className="slider-main-image" />
                </div>
                <div className="product-info">
                    <h1 className="product-name">{car.model}</h1>
                    <p className="product-tagline">{car.year} - {car.category}</p>
                    <div className="product-price">{formatPrice(car.price)}</div>
                    {/* ... Các thông tin khác và nút bấm ... */}
                </div>
            </div>
            <div className="tabs">
                {/* ... Cấu trúc Tabs ... */}
                <div id="overview" className="tab-content active">
                    <h2>Tổng Quan</h2>
                    {/* Chú ý: Sử dụng dangerouslySetInnerHTML có rủi ro bảo mật nếu nội dung không được kiểm soát. */}
                    <div dangerouslySetInnerHTML={{ __html: car.overview || car.description }} />
                </div>
            </div>
            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>Xe Liên Quan</h2>
                <div className="car-grid">
                    {relatedCars.map(relCar => <CarCard key={relCar.id} car={relCar} />)}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;