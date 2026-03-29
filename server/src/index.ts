import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import orderRoutes from "./routes/orderRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import {encodeId} from "./utils/hashid.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use('/api', orderRoutes);
app.use('/api', shopRoutes);
app.use('/api', productRoutes);

app.get('/api/utils/encode/:id', (req, res) => {
    const { id } = req.params;
    const hash = encodeId(id);
    res.json({ hash });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));