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

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static('uploads', {
    setHeaders: (res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.set('Access-Control-Allow-Credentials', 'true');
    }
}));
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});