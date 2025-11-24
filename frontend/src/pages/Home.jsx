import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCars, createSubmission } from '../api';
import CarCard from '../components/CarCard';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [allCars, setAllCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', phone: '', carModel: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await fetchCars();
                setAllCars(data);
                setFeaturedCars(data.slice(0, 8));
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        getCars();

        const timer = setTimeout(() => {
            if (!sessionStorage.getItem('leadPopupShown')) {
                setShowPopup(true);
                sessionStorage.setItem('leadPopupShown', 'true');
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createSubmission({ ...leadForm, type: 'lead' });
            alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.');
            setShowPopup(false);
            setLeadForm({ name: '', phone: '', carModel: '' });
        } catch (error) {
            alert('Có lỗi xảy ra.');
        } finally {
            setSubmitting(false);
        }
    };

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
                    {loading ? <p>Đang tải...</p> : (
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

            <section className="section" style={{ background: 'var(--vw-gray)' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Tại Sao Chọn Volkswagen?</h2>
                        <p className="section-subtitle">Volkswagen - Biểu tượng của chất lượng Đức và đẳng cấp toàn cầu</p>
                    </div>
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Chất Lượng Đức</h4>
                                <p>Được sản xuất theo tiêu chuẩn cao nhất của ngành công nghiệp ô tô Đức, đảm bảo độ bền vượt trội.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Công Nghệ Tiên Tiến</h4>
                                <p>Trang bị công nghệ động cơ TSI, hộp số DSG và hệ thống an toàn IQ.Drive thông minh.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>An Toàn Tuyệt Đối</h4>
                                <p>Đạt 5 sao Euro NCAP với các tính năng an toàn chủ động và bị động hàng đầu.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div className="feature-text">
                                <h4>Bảo Hành Toàn Diện</h4>
                                <p>Chương trình bảo hành chính hãng và dịch vụ hậu mãi chuyên nghiệp tại Việt Nam.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {showPopup && (
                <div className="lead-popup active">
                    <div className="lead-popup-content">
                        <button className="lead-popup-close" onClick={() => setShowPopup(false)}>×</button>
                        <h3>Nhận Tư Vấn Miễn Phí</h3>
                        <p>Để lại thông tin, chúng tôi sẽ liên hệ ngay!</p>
                        <form onSubmit={handleLeadSubmit}>
                            <div className="form-group">
                                <input type="text" required placeholder="Nhập họ và tên" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input type="tel" required placeholder="Nhập SĐT" pattern="[0-9]{10}" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <select required value={leadForm.carModel} onChange={(e) => setLeadForm({ ...leadForm, carModel: e.target.value })}>
                                    <option value="">-- Chọn dòng xe --</option>
                                    {allCars.map(car => <option key={car.id} value={car.model}>{car.model} - {car.year}</option>)}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                                {submitting ? 'Đang gửi...' : 'Gửi'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;