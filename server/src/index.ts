import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import orderRoutes from "./routes/orderRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());
app.use('/api', orderRoutes);
app.use('/api', shopRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));