import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import orderRoutes from "./routes/orderRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import {encodeId} from "./utils/hashid.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.join(__dirname, '../../client/dist');

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors({
    origin: [
        'https://food-delivery-qcwz.onrender.com',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api', orderRoutes);
app.use('/api', shopRoutes);
app.use('/api', productRoutes);
app.use('/api', couponRoutes);

app.get('/api/utils/encode/:id', (req, res) => {
    const { id } = req.params;
    const hash = encodeId(id);
    res.json({ hash });
});

app.use(express.static(clientPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));