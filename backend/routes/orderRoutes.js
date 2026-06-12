import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const count = await Order.countDocuments();

    req.body.orderId = `ORD-${count + 1}`;
    const order = new Order(req.body);

    await order.save();

    res.json(order);
});

router.get("/", async (req, res) => {

    const orders = await Order.find().sort({
        createdAt: -1,
    });

    res.json(orders);
});

export default router;