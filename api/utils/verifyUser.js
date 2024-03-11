import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRECT, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unthozied"))
    }
    req.user = user;
    next();
  })
}