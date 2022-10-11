// import express from "express";
// import Order from "../models/Order.js";
// import {
//   verifyAdmin,
//   verifyTokenAndAuthorization,
//   verifyToken,
// } from "./verifyToken.js";
// const router = express.Router();

// //GET ORDERS

// router.get("/", verifyAdmin, async (req, res, next) => {
//   try {
//     const getOrders = await Order.find();
//     res.status(200).json(getOrders);
//   } catch (err) {
//     next(err);
//   }
// });

// //GET ORDER BY USERID

// router.get(
//   "/find/:userId",
//   verifyTokenAndAuthorization,
//   async (req, res, next) => {
//     try {
//       const userOrder = await Order.findOne({ userId: req.params.userId });
//       res.status(200).json(userOrder);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// // DELETE ORDER

// router.delete("/:id", verifyAdmin, async (req, res, next) => {
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json(deletedOrder);
//   } catch (err) {
//     next(err);
//   }
// });

// //UPDATE ORDER

// router.put("/:id", verifyAdmin, async (req, res, next) => {
//   try {
//     const updatedOrder = await Order.find(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (err) {
//     next(err);
//   }
// });

// // CREATE ORDER

// router.post("/", verifyToken, async (req, res, next) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/income", async (req, res, next) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
//   console.log(lastMonth);
//   console.log(previousMonth);
//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).json(income);
//   } catch (err) {
//     next(err);
//   }
// });
// export default router;
