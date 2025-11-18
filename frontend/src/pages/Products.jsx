import { useState, useEffect, useMemo } from 'react';
import { fetchCars } from '../api';
import CarCard from '../components/CarCard';

const Products = () => {
    const [allCars, setAllCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', price: '', sort: 'default' });

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await fetchCars();
                setAllCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false);
            }
        };
        getCars();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.id]: e.target.value });
    };

    const filteredAndSortedCars = useMemo(() => {
        let result = [...allCars];
        if (filters.category) {
            result = result.filter(car => car.category === filters.category);
        }
        if (filters.price) {
            const [min, max] = filters.price.split('-').map(Number);
            result = result.filter(car => car.price >= min && car.price <= max);
        }
        if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (filters.sort === 'name-asc') result.sort((a, b) => a.model.localeCompare(b.model));
        return result;
    }, [allCars, filters]);

    return (
        <section className="section">
            <div className="container">
                <div className="section-title"><h1>Danh Sách Sản Phẩm</h1></div>
                <div className="filters">
                    <div className="filter-group">
                        <div className="filter-item">
                            <label htmlFor="category">Loại Xe</label>
                            <select id="category" value={filters.category} onChange={handleFilterChange}>
                                <option value="">Tất Cả</option><option value="SUV">SUV</option><option value="Sedan">Sedan</option>
                                <option value="Hatchback">Hatchback</option><option value="MPV">MPV</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="price">Khoảng Giá</label>
                            <select id="price" value={filters.price} onChange={handleFilterChange}>
                                <option value="">Tất Cả</option><option value="0-1000000000">Dưới 1 tỷ</option>
                                <option value="1000000000-1500000000">1 - 1.5 tỷ</option><option value="1500000000-2000000000">1.5 - 2 tỷ</option>
                                <option value="2000000000-999999999999">Trên 2 tỷ</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label htmlFor="sort">Sắp Xếp</label>
                            <select id="sort" value={filters.sort} onChange={handleFilterChange}>
                                <option value="default">Mặc Định</option><option value="price-asc">Giá Thấp - Cao</option>
                                <option value="price-desc">Giá Cao - Thấp</option><option value="name-asc">Tên A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
                <h3>Tìm thấy {filteredAndSortedCars.length} sản phẩm</h3>
                {loading ? <p>Đang tải...</p> : (
                    <div className="car-grid" style={{ marginTop: '2rem' }}>
                        {filteredAndSortedCars.length > 0 ? (
                            filteredAndSortedCars.map(car => <CarCard key={car.id} car={car} />)
                        ) : <p>Không tìm thấy sản phẩm phù hợp.</p>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;