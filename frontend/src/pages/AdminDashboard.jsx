import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchAdminSubmissions, deleteAdminSubmission, fetchCars, deleteAdminCar } from '../api';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [subsRes, carsRes] = await Promise.all([fetchAdminSubmissions(), fetchCars()]);
            setSubmissions(subsRes.data);
            setCars(carsRes.data);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const handleDeleteSubmission = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa đơn này?')) {
            await deleteAdminSubmission(id);
            fetchData(); // Refresh data
        }
    };

    const handleDeleteCar = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa xe này?')) {
            await deleteAdminCar(id);
            fetchData(); // Refresh data
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Đăng Xuất</button>
            </div>
            <div className="admin-container">
                <div className="admin-section">
                    <h2>Đơn Đăng Ký & Liên Hệ</h2>
                    <div className="table-container">
                        <table>
                            <thead><tr><th>Loại</th><th>Họ Tên</th><th>SĐT</th><th>Thông Tin</th><th>Ngày Gửi</th><th>Thao Tác</th></tr></thead>
                            <tbody>
                                {loading ? <tr><td colSpan="6">Đang tải...</td></tr> : submissions.map(sub => (
                                    <tr key={sub.id}>
                                        <td>{sub.type?.toUpperCase()}</td>
                                        <td>{sub.name || sub.fullname}</td>
                                        <td>{sub.phone}</td>
                                        <td>{sub.carModel || sub.subject}</td>
                                        <td>{new Date(sub.date).toLocaleString('vi-VN')}</td>
                                        <td><button className="btn btn-sm btn-secondary" onClick={() => handleDeleteSubmission(sub.id)}>Xóa</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="admin-section">
                    <h2>Quản Lý Xe</h2>
                    <div className="table-container">
                        <table>
                            <thead><tr><th>Model</th><th>Năm</th><th>Giá</th><th>Thao Tác</th></tr></thead>
                            <tbody>
                                {loading ? <tr><td colSpan="4">Đang tải...</td></tr> : cars.map(car => (
                                    <tr key={car.id}>
                                        <td>{car.model}</td>
                                        <td>{car.year}</td>
                                        <td>{car.price}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" style={{marginRight: '5px'}}>Sửa</button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleDeleteCar(car.id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;