import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
                <h3>Volkswagen I.D Auto</h3>
                <p>Đại lý chính hãng Volkswagen tại Hà Nội, mang đến cho bạn những trải nghiệm xe hơi cao cấp đến từ Đức.</p>
            </div>
            <div className="footer-section">
                <h3>Sản Phẩm</h3>
                <ul className="footer-links">
                    <li><Link to="/products">Tất Cả Dòng Xe</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Dịch Vụ</h3>
                <ul className="footer-links">
                    <li><Link to="/test-drive">Đăng Ký Lái Thử</Link></li>
                    <li><Link to="/contact">Báo Giá</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Liên Hệ</h3>
                <ul className="footer-links">
                    <li>📍 315 Nguyễn Khoái, Phường Hồng Hà, Hai Bà Trưng, Hà Nội</li>
                    <li>📞 Hotline: <a href="tel:0383885830">038-388-5830</a></li>
                    <li>📧 Email: khoi.huy283@gmail.com</li>
                </ul>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2024 Volkswagen I.D Auto. Tất cả quyền được bảo lưu.</p>
        </div>
        <a href="tel:0383885830" className="floating-phone-button" aria-label="Gọi điện tư vấn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
        </a>
    </footer>
);

export default Footer;