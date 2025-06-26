import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { dbconnection } from './database/dbconnection.js';
import { errorMiddleware } from "./database/error/error.js";
import reservationRouter from "./routes/reservationRoute.js"

const app = express();

dotenv.config({ path: path.resolve('./config/config.env') });


app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST"],
    credentials:true,
})
);

app.use(express.json());//converts json string into json object
app.use(express.urlencoded({extended:true}));//to decide data of which type
app.use('/api/v1/reservation',reservationRouter)

dbconnection();

app.use(errorMiddleware);
export default app;