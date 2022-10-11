import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE Task

router.post("/", async (req, res, next) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    next(err);
  }
});

// GET Tasks

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
});

// GET Task

router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

// Delete Task

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTask);
  } catch (err) {
    next(err);
  }
});

// update Task

router.put("/:id", async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
});

export default router;
