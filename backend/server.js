// backend/server.js

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- Cấu hình ---
const app = express();
const port = 5001; // Cổng cho backend

// --- Kết nối Firebase Admin ---
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const auth = admin.auth();
const carCollection = db.collection('cars');
const submissionCollection = db.collection('testdrives');

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Middleware xác thực Token cho Admin ---
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized: No token provided.');
  }
  const idToken = authHeader.split('Bearer ')[1];
  try {
    req.user = await auth.verifyIdToken(idToken);
    next();
  } catch (error) {
    res.status(403).send('Unauthorized: Invalid token.');
  }
};

// ===================================
// --- API Routes công khai (Public) ---
// ===================================

app.get('/api/cars', async (req, res) => {
  try {
    const snapshot = await carCollection.get();
    const cars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(cars);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/cars/:modelName', async (req, res) => {
    try {
        const modelName = decodeURIComponent(req.params.modelName);
        const snapshot = await carCollection.where('model', '==', modelName).limit(1).get();
        if (snapshot.empty) return res.status(404).json({ message: 'Không tìm thấy xe' });
        res.status(200).json({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/submissions', async (req, res) => {
  try {
    const data = { ...req.body, date: new Date().toISOString() };
    const docRef = await submissionCollection.add(data);
    res.status(201).json({ id: docRef.id, ...data });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// ===================================
// --- API Routes cho Admin (Protected) ---
// ===================================

app.get('/api/admin/submissions', verifyFirebaseToken, async (req, res) => {
    try {
        const snapshot = await submissionCollection.orderBy('date', 'desc').get();
        const submissions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(submissions);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/admin/submissions/:id', verifyFirebaseToken, async (req, res) => {
    try {
        await submissionCollection.doc(req.params.id).delete();
        res.status(200).json({ message: 'Submission deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.post('/api/admin/cars', verifyFirebaseToken, async (req, res) => {
    try {
        const docRef = await carCollection.add(req.body);
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/admin/cars/:id', verifyFirebaseToken, async (req, res) => {
    try {
        await carCollection.doc(req.params.id).update(req.body);
        res.status(200).json({ id: req.params.id, ...req.body });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

app.delete('/api/admin/cars/:id', verifyFirebaseToken, async (req, res) => {
    try {
        await carCollection.doc(req.params.id).delete();
        res.status(200).json({ message: 'Car deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- Khởi động Server ---
app.listen(port, () => {
  console.log(`✅ Backend server is running at http://localhost:${port}`);
});