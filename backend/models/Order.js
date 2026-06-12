import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    orderId: String,

    customerName: String,

    phone: String,

    address: String,

    city: String,

    state: String,

    pincode: String,

    paymentType: String,

    items: [
        {
            productName: String,
            qty: Number,
            price: Number,
            sku: String
        }
    ]

}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);