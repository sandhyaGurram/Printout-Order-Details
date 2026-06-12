import { useState } from "react";
import axios from "axios";

function AddOrder() {

  const [formData, setFormData] = useState({
  orderId: "",
  customerName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  paymentType: "",
  items: [
    {
      productName: "",
          qty: 1,
      price: 0,
    },
  ],
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      items: [
        {
          ...formData.items[0],
          [name]:
  name === "qty" || name === "price"
    ? Number(value)
    : value,
        },
      ],
    });
  };

  const submitOrder = async () => {
    console.log(formData);

    const response = await axios.post(
    "http://localhost:5000/api/orders",
    formData
  );


      alert("Order Saved");
      
        setFormData({
  orderId: "",
  customerName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  paymentType: "",
  items: [
    {
      productName: "",
      qty: 1,
      price: 0,
    },
  ],
});
  };

  return (
    <>
          <input
              className="input"
        name="customerName"
        placeholder="Customer Name"
        onChange={handleChange}
      />

      <br /><br />

          <input
              className="input"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <br /><br />

          <input
              className="input"
        type="text"
        name="productName"
        placeholder="Product Name"
        onChange={handleProductChange}
      />

      <br /><br />

          <input
              className="input"
        type="number"
        name="qty"
        placeholder="Quantity"
        onChange={handleProductChange}
      />

          <br /><br />

          <input
  className="input"
  type="number"
  name="price"
  placeholder="Price"
  onChange={handleProductChange}
/>
        <br /><br />  
          <input
              className="input"
  name="address"
  placeholder="Address"
  onChange={handleChange}
/>

<br /><br />

          <input
              className="input"
  name="city"
  placeholder="City"
  onChange={handleChange}
/>

<br /><br />

          <input
              className="input"
  name="state"
  placeholder="State"
  onChange={handleChange}
/>

<br /><br />

          <input
              className="input"
  name="pincode"
  placeholder="Pincode"
  onChange={handleChange}
/>

<br /><br />

          <input
              className="input"
  name="paymentType"
  placeholder="Payment Type (COD/Prepaid)"
  onChange={handleChange}
/>

<br /><br />

      <button onClick={submitOrder}>
        Save Order
      </button>
    </>
  );
}

export default AddOrder;