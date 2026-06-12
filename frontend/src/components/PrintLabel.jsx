
import { STORE } from "../constants/storeInfo";


function PrintLabel({ order }) {
    if (!order) return null;

 const grandTotal = order.items.reduce(
  (sum, item) => sum + item.qty * (item.price || 0),
  0
);

    return (
        <div
            style={{
                width: "80mm",
                padding: "10px",
                fontSize: "12px",
                fontFamily: "Arial"
            }}
        >
            <h3>SHIPPING LABEL</h3>

            <hr />

            <p>
                <strong>Name: </strong>
               
                {order.customerName}
            </p>

            <p>
                <strong>Phone: </strong>
               
                {order.phone}
            </p>

            <p>
                <strong>Address: </strong>
               
                {order.address},{order.city}, {order.state},{order.pincode}
            </p>

<hr />

<h4>Order Details</h4>

<p>
  <strong>Order ID:</strong> {order.orderId}
</p>

<p>
  <strong>Payment:</strong> {order.paymentType}
</p>

<p>
  <strong>Order Date:</strong>
  {new Date(order.createdAt).toLocaleDateString()}
</p>

          
 <hr />
            <div>

  <h4>Shipped By</h4>

  <p>{STORE.name}</p>

  <p>{STORE.address}</p>

  <p>{STORE.area}</p>

  <p>
    {STORE.city}, {STORE.state},{STORE.pincode}
  </p>

 

  <p>{STORE.phone}</p>

            </div>
            
            <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    fontSize: "10px",
  }}
>
  <thead>
    <tr>
                        <th style={{ border: "1px solid black" }}>Item</th>
                      
      <th style={{ border: "1px solid black" }}>Qty</th>
      <th style={{ border: "1px solid black" }}>Price</th>
      <th style={{ border: "1px solid black" }}>Total</th>
    </tr>
  </thead>

  <tbody>
    {order.items.map((item, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid black" }}>
          {item.productName}
            </td>
          

        <td style={{ border: "1px solid black" }}>
          {item.qty}
        </td>

        <td style={{ border: "1px solid black" }}>
         ₹{item.price || 0}
        </td>

        <td style={{ border: "1px solid black" }}>
          ₹{item.qty * (item.price || 0)}
        </td>
      </tr>
    ))}
                </tbody>
                <tfoot>
  <tr>
    <td
      colSpan="4"
      style={{
        border: "1px solid black",
        textAlign: "right",
        fontWeight: "bold",
      }}
    >
      Grand Total
    </td>

    <td
      style={{
        border: "1px solid black",
        fontWeight: "bold",
      }}
    >
      ₹{grandTotal}
    </td>
  </tr>
</tfoot>
            </table>
            
           




        </div>
    );
}

export default PrintLabel;