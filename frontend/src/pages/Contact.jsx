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
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="section-title"><h1>Liên Hệ</h1></div>
                <div className="contact-container">
                    <div className="contact-info">{/* ... Thông tin liên hệ tĩnh ... */}</div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên *</label>
                                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại *</label>
                                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Chủ Đề *</label>
                                <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                                    <option value="">-- Chọn chủ đề --</option>
                                    <option value="Tư vấn mua xe">Tư vấn mua xe</option>
                                    <option value="Báo giá">Báo giá</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Nội Dung *</label>
                                <textarea id="message" name="message" required value={formData.message} onChange={handleChange} rows="6"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                                {loading ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;