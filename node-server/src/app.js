import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRoutes from './routes/auth-routes.js';
import qrRoutes from './routes/qr-routes.js';

import errorHandler from "./middlewares/error-handler.js";


const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});