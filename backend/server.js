import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'; 
import messageRoutes from './routes/message.routes.js';
import { v2 as cloudinary } from 'cloudinary';
import usersRoutes from './routes/users.routes.js';
import connectToMongoDb from './db/connectToMongoDb.js';
import { app, server } from './socket/socket.js';


dotenv.config();
const port = process.env.PORT || 5000; 

const __dirname = path.resolve();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY

})
app.use(express.json({ limit: '10mb' })); // Increase the limit to 10mb or as per your requirement
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // If you also use URL encoded bodies
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => { 
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});



server.listen(port, () => {
    connectToMongoDb();
    console.log('server is kiling it' + ' ' + 'on' + ' ' + port)
});