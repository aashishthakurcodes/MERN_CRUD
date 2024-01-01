import express from "express";
import dotenv from "dotenv";
import authRoutes from './Routes/authRoutes.js'
import dbConnect from "./config/dbConnection.js";
import cors from 'cors';

const app = express();

app.use(cors());
//env
dotenv.config();
//Database Call
dbConnect();

app.use(express.json());

const PORT = process.env.PORT;



//Routes
app.use('/crud/v1/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on the port = ${PORT}`);
});
