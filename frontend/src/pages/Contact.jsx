import { useState } from 'react';
import { createSubmission } from '../api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createSubmission({ ...formData, type: 'contact' });
            alert('Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.');
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="section-title">
                    <h1>Liên Hệ</h1>
                    <p className="section-subtitle">Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn</p>
                </div>

                <div className="contact-container">
                    <div className="contact-info">
                        <h2 style={{ marginBottom: '2rem' }}>Thông Tin Liên Hệ</h2>
                        <div className="info-item">
                            <div className="info-icon">📍</div>
                            <div className="info-content">
                                <h3>Địa Chỉ Showroom</h3>
                                <p><strong>Volkswagen I.D Auto</strong><br />315 Nguyễn Khoái, Phường Hồng Hà<br />Quận Hai Bà Trưng, Hà Nội</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">📞</div>
                            <div className="info-content">
                                <h3>Hotline</h3>
                                <p><strong>Tư vấn bán hàng:</strong> <a href="tel:0383885830">038-388-5830</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">📧</div>
                            <div className="info-content">
                                <h3>Email</h3>
                                <p><strong>Bán hàng:</strong> <a href="mailto:idautomotive@gmail.com">idautomotive@gmail.com</a></p>
                            </div>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">🕐</div>
                            <div className="info-content">
                                <h3>Giờ Làm Việc</h3>
                                <p><strong>Tư vấn:</strong> 24/7<br /><strong>Showroom:</strong> 8:00 - 17:00 T2-CN<br /><strong>Lễ, Tết:</strong> Liên hệ trước</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-container">
                        <h2 style={{ marginBottom: '1.5rem' }}>Gửi Tin Nhắn</h2>
                        <p style={{ marginBottom: '2rem', color: '#666' }}>Để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" id="name" name="name" required placeholder="Nhập họ tên" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại <span style={{ color: 'red' }}>*</span></label>
                                <input type="tel" id="phone" name="phone" required placeholder="0xxxxxxxxx" pattern="[0-9]{10}" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                                <input type="email" id="email" name="email" required placeholder="email@example.com" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Chủ Đề <span style={{ color: 'red' }}>*</span></label>
                                <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                                    <option value="">-- Chọn chủ đề --</option>
                                    <option value="Tư vấn mua xe">Tư vấn mua xe</option>
                                    <option value="Báo giá">Báo giá</option>
                                    <option value="Lái thử">Đăng ký lái thử</option>
                                    <option value="Bảo dưỡng">Dịch vụ bảo dưỡng</option>
                                    <option value="Phụ tùng">Phụ tùng chính hãng</option>
                                    <option value="Hỗ trợ tài chính">Hỗ trợ tài chính</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Nội Dung <span style={{ color: 'red' }}>*</span></label>
                                <textarea id="message" name="message" required placeholder="Nhập nội dung tin nhắn..." value={formData.message} onChange={handleChange} rows="6"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>{loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}</button>
                        </form>
                    </div>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Bản Đồ Showroom</h2>
                    <div className="map-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6935239743293!2d105.86751077584091!3d21.00491888859587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf004e8dfff%3A0xebc6735bd24fb225!2zVm9sa3N3YWdlbiBJLkQgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1761968303131!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0, borderRadius: '15px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <a href="https://maps.app.goo.gl/QCwq6djF2tuCPkz58" target="_blank" rel="noopener noreferrer" className="btn btn-blue">Mở Bản Đồ Trên Google Maps</a>
                    </div>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Câu Hỏi Thường Gặp</h2>
                    <div className="car-grid">
                        {[
                            { title: 'Làm sao để đặt hàng?', desc: 'Bạn có thể đến trực tiếp showroom, gọi hotline hoặc điền form đăng ký trên website. Chúng tôi sẽ tư vấn chi tiết và hỗ trợ đặt xe.' },
                            { title: 'Có hỗ trợ vay không?', desc: 'Có. Chúng tôi hỗ trợ vay đến 80% giá trị xe với lãi suất ưu đãi, thủ tục nhanh chóng, duyệt trong 24h.' },
                            { title: 'Thời gian giao xe?', desc: 'Xe có sẵn giao ngay trong 1-3 ngày. Xe đặt màu đặc biệt thời gian giao từ 4-8 tuần tùy model.' },
                            { title: 'Bảo hành như thế nào?', desc: 'Bảo hành 3 năm hoặc 100.000 km (tùy điều kiện nào đến trước). Bảo dưỡng miễn phí 2 năm tại đại lý chính hãng.' },
                            { title: 'Có thể đổi trả xe cũ?', desc: 'Có. Chúng tôi nhận đổi trả xe cũ mọi hãng, định giá minh bạch, thanh toán nhanh chóng.' },
                            { title: 'Chi phí bảo dưỡng?', desc: 'Chi phí bảo dưỡng định kỳ từ 3-8 triệu tùy model và cấp độ. Phụ tùng chính hãng, bảo hành 1 năm.' }
                        ].map((faq, idx) => (
                            <div key={idx} className="car-card">
                                <div className="car-content">
                                    <h3 className="car-title">{faq.title}</h3>
                                    <p className="car-subtitle">{faq.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;