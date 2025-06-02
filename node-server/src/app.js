import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import authRoutes from './routes/auth-routes';

import errorHandler from "./middlewares/error-handler";


const app = express();
const port = process.env.PORT || 1234;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});