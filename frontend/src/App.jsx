import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    pincode: "",
    orderId: "",
    paymentType: "",
    items: [
      {
        productName: "",
        qty: 1,
        price: 0,
      },
    ],
  });

  const [savedOrder, setSavedOrder] = useState(null);

  const labelRef = useRef();

  const addProduct = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          productName: "",
          qty: 1,
          price: 0,
        },
      ],
    });
  };

  const handleItemChange = (index, e) => {
    const updatedItems = [...formData.items];

    updatedItems[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const res = await axios.post(
      "https://printout-order-details-backend.onrender.com/api/orders",
      formData,
    );

    setSavedOrder(res.data);

    setFormData({
      customerName: "",
      phone: "",
      address: "",
      pincode: "",
      orderId: "",
      paymentType: "",
      items: [],
    });
  };

  const handlePrint = () => {
    const printContents = labelRef.current.innerHTML;

    const win = window.open("", "", "");

    win.document.write(`
    <html>
      <head>
        <title>Print Label</title>

        <style>
        @page {
  size: 100mm 150mm;
  margin: 0;
}
          body {
            width: 100mm;
    height: 150mm;
  margin: 0;
  padding: 5mm;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  font-size: 10px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 5px;
          }

          th,
          td {
            border: 1px solid black;
            padding: 2px;
            text-align: center;
          }

          td.item-col {
  width: 50%;
  font-size: 9px;
}

td.qty-col {
  width: 10%;
}

td.price-col {
  width: 20%;
}

td.total-col {
  width: 20%;
}
          tbody td,th {
  font-size: 9px;
  
}

        </style>
      </head>

      <body>
        ${printContents}
      </body>
    </html>
  `);

    win.document.close();
    win.print();
    win.close();
  };

  const STORE_INFO = {
    name: "ARM Pearl Beauty",
    address:
      "Malik Chambers, 404 & 405, Old MLA Quarters Road,Hyderguda Opp. Swathi Restaurant",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500029",
    phone: "9848210555",
  };

  const grandTotal =
    savedOrder?.items?.reduce((sum, item) => sum + item.qty * item.price, 0) ||
    0;

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "20px",
      }}
    >
      <div>
        <h2>Order Form</h2>

        <input
          name="customerName"
          placeholder="customerName"
          value={formData.customerName}
          onChange={handleChange}
        />

        <br />

        <h3>Products</h3>

        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="productName"
                    value={item.productName}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name="qty"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addProduct}>
          + Add Product
        </button>

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />

        <br />

        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <br />
        <input
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
        />

        <br />
        <select
          name="paymentType"
          value={formData.paymentType}
          onChange={handleChange}
        >
          <option value="">Select Payment Type</option>
          <option value="COD">COD</option>
          <option value="Prepaid">Prepaid</option>
        </select>

        <br />

        <button onClick={handleSave}>Save Order</button>
      </div>

      <div className="lable-preview">
        <h2>Label Preview</h2>

        {savedOrder && (
          <div ref={labelRef} id="label">
            <p>
              <strong>Ship to:</strong>
            </p>

            <p>
              <strong>Name: </strong>
              {savedOrder.customerName}
            </p>
            <p>
              <strong>Address: </strong>
              {savedOrder.address}, {savedOrder.pincode}
            </p>

            <p>
              <strong>Phone: </strong> {savedOrder.phone}
            </p>

            <p>
              <strong>Order Id: </strong>
              {savedOrder.orderId}
            </p>

            <p>
              <strong>Payment: </strong>
              {savedOrder.paymentType}
            </p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {savedOrder.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="item-col">{item.productName}</td>
                    <td className="qty-col">{item.qty}</td>
                    <td className="price-col">{item.price}</td>
                    <td className="total-col">{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Grand Total:</strong> ₹{grandTotal}
            </p>

            <p>
              <strong>Shipped by</strong>(if undelivered, return to)
            </p>
            <p>{STORE_INFO.name}</p>

            <p>{STORE_INFO.address}</p>
            <p>
              {STORE_INFO.city}, {STORE_INFO.state}, {STORE_INFO.pincode}
            </p>

            <p>{STORE_INFO.phone}</p>
          </div>
        )}
        {savedOrder && <button onClick={handlePrint}>Print Label</button>}
      </div>
    </div>
  );
}

export default App;
