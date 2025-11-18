import axios from 'axios';
import { auth } from '../firebase';

const API = axios.create({ baseURL: 'http://localhost:5001/api' });

API.interceptors.request.use(async (req) => {
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Public APIs
export const fetchCars = () => API.get('/cars');
export const fetchCarByModel = (modelName) => API.get(`/cars/${encodeURIComponent(modelName)}`);
export const createSubmission = (data) => API.post('/submissions', data);

// Admin APIs
export const fetchAdminSubmissions = () => API.get('/admin/submissions');
export const deleteAdminSubmission = (id) => API.delete(`/admin/submissions/${id}`);
export const createAdminCar = (carData) => API.post('/admin/cars', carData);
export const updateAdminCar = (id, carData) => API.put(`/admin/cars/${id}`, carData);
export const deleteAdminCar = (id) => API.delete(`/admin/cars/${id}`);