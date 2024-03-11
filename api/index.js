import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../api/routes/user.route.js';
import authRoutes from '../api/routes/auth.route.js';
import postRoutes from '../api/routes/post.route.js';
import commentRoutes from '../api/routes/comment.route.js';
import path from 'path';

import cookieParser from 'cookie-parser';
dotenv.config();


const __dirname = path.resolve();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to mongoDB")
}).catch((err) => {
  console.log(err)
})
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));


app.use("*", (req, res) => res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')))
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Some Errors";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})