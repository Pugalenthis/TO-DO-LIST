import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("user has been created");
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "user not found"));

    console.log(req.body.password, user.password);

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const token = Jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      {
        expiresIn: "1d",
      }
    );

    if (!isPasswordCorrect)
      return next(createError(400, "wrong username or password"));

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json("login successfully");
  } catch (err) {
    next(err);
  }
});

export default router;
