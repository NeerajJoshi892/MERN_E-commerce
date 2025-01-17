import express from 'express';
import colors from "colors";
import dotenv, { config } from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from'./routes/authRoute.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors';
import path from 'path';
// configure env
dotenv.config();

// databasse config
connectDB();

// rest Object
const app = express()


// middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))



// routes
app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)

// rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})


// port
const PORT = 8080;

// const PORT =process.env.PORT ;

// run listen
app.listen(PORT, ()=>{
    console.log(`server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})