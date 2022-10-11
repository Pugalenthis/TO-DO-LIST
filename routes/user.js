import express from "express";
import User from "../models/User.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import {
  verifyTokenAndAuthorization,
  verifyAdmin,
  verifyToken,
} from "./verifyToken.js";

//UPDATE USER

router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

//GET USERS

router.get("/", verifyAdmin, async (req, res, next) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (err) {
    next(err);
  }
});

//DELETE USER

router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    next(err);
  }
});

export default router;
