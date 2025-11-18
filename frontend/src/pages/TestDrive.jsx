import { useState, useEffect } from 'react';
import { createSubmission, fetchCars } from '../api';

const TestDrive = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({ fullname: '', phone: '', email: '', carModel: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCars = async () => {
            const { data } = await fetchCars();
            setCars(data);
        };
        getCars();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createSubmission({ ...formData, type: 'testdrive' });
            alert('Đăng ký lái thử thành công! Chúng tôi sẽ liên hệ sớm.');
            setFormData({ fullname: '', phone: '', email: '', carModel: '' });
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="section-title"><h1>Đăng Ký Lái Thử</h1></div>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullname">Họ và Tên *</label>
                            <input type="text" id="fullname" name="fullname" required value={formData.fullname} onChange={handleChange} />
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
                            <label htmlFor="carModel">Dòng Xe Quan Tâm *</label>
                            <select id="carModel" name="carModel" required value={formData.carModel} onChange={handleChange}>
                                <option value="">-- Chọn dòng xe --</option>
                                {cars.map(car => <option key={car.id} value={car.model}>{car.model}</option>)}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
                            {loading ? 'Đang gửi...' : 'Gửi Đăng Ký'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TestDrive;