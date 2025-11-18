import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/admin');
        } catch {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
        }
        setLoading(false);
    };

    return (
        <div className="admin-login">
            <div className="login-box">
                <h2>Volkswagen I.D Auto - Admin</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label>Email</label><input type="email" required onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className="form-group"><label>Mật Khẩu</label><input type="password" required onChange={(e) => setPassword(e.target.value)} /></div>
                    <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%' }}>Đăng Nhập</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;