import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/", async (req, res) => {

    const orders = await Order.find().sort({
        createdAt: -1,
    });

    res.json(orders);
});

export default router;