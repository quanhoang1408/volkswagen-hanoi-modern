import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../api';
import CarCard from '../components/CarCard';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await fetchCars();
                setFeaturedCars(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };
        getCars();
    }, []);

    return (
        <>
            <section className="hero-main">
                <div className="hero-overlay"></div>
                <div className="hero-main-content">
                    <h1 className="hero-main-title">VOLKSWAGEN I.D AUTO</h1>
                    <p className="hero-main-subtitle">LÁI YÊU THƯƠNG, TRAO ĐAM MÊ</p>
                    <div className="hero-buttons">
                        <Link to="/test-drive" className="btn-hero-primary">LÁI THỬ NGAY</Link>
                        <Link to="/contact" className="btn-hero-secondary">NHẬN BÁO GIÁ</Link>
                    </div>
                </div>
            </section>
            <section className="section featured-section">
                <div className="container">
                    <div className="section-title">
                        <h2>DÒNG XE NỔI BẬT</h2>
                        <p className="section-subtitle">Khám phá các mẫu xe Volkswagen được yêu thích nhất tại Việt Nam</p>
                    </div>
                    {loading ? <p>Đang tải xe...</p> : (
                        <div className="featured-grid cars-expanded">
                            {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
                        </div>
                    )}
                </div>
            </section>
            <section className="experience-banner">
                 <div className="experience-overlay"></div>
                 <div className="experience-content">
                    <h2 className="experience-title">TRẢI NGHIỆM VOLKSWAGEN</h2>
                    <p className="experience-subtitle">Hãy đến với Volkswagen I.D Auto hoặc liên hệ ngay với chúng tôi để trải nghiệm xe Volkswagen</p>
                    <div className="experience-buttons">
                        <Link to="/test-drive" className="btn-experience">ĐĂNG KÝ LÁI THỬ</Link>
                        <Link to="/contact" className="btn-experience-outline">VỊ TRÍ SHOWROOM</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;