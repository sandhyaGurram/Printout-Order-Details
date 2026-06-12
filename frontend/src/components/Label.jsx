function Label({ order }) {
  return (
    <div className="label">

      <h2>Shipping Label</h2>

      <hr />

      <p><strong>Name:</strong> {order.customerName}</p>

      <p><strong>Phone:</strong> {order.phone}</p>

      <p><strong>Address:</strong> {order.address},{order.city}, {order.state}</p>

   

      <p><strong>Pincode:</strong> {order.pincode}</p>

      <p>
        <strong>Payment:</strong> {order.paymentType}
      </p>

      <hr />

      <h4>Items</h4>

      {order.items.map((item, index) => (
        <div key={index}>
          {item.productName} × {item.qty}
        </div>
      ))}

    </div>
  );
}

export default Label;