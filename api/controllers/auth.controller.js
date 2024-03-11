import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === '' || email === "" || password === "") {
    return next(errorHandler(400, "All field are required"))
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  })

  await newUser.save();
  try {
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, "All field are required"))
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({
      id: validUser._id,
      isAdmin: validUser.isAdmin
    },
      process.env.JWT_SECRECT
    )

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest)
  } catch (error) {
    next(error);
  }
}

export const google = async (req, res, next) => {

  try {
    const { name, email, googlePhotoUrl } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, process.env.JWT_SECRECT);
      const { password: pass, ...rest } = user._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    } else {
      const genaratePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(genaratePassword, 10);

      const newUser = await User.create({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl
      })
      await newUser.save();

      const token = jwt.sign({
        id: newUser._id,
        isAdmin: newUser.isAdmin
      }, process.env.JWT_SECRECT);

      const { password: pass, ...rest } = newUser._doc;
      res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
    }
  } catch (error) {
    next(error);
  }
}