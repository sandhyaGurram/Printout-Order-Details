// // import { useEffect, useState, useRef } from "react";
// // import axios from "axios";
// // import { useReactToPrint } from "react-to-print";
// // import PrintLabel from "../components/PrintLabel";

// // function Orders() {

// //     const [orders, setOrders] = useState([]);
// //     const printRef = useRef();

// // const [selectedOrder, setSelectedOrder] = useState(null);

// // const handlePrint = useReactToPrint({
// //     contentRef: printRef,
// // });

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const fetchOrders = async () => {
// //     const response = await axios.get(
// //       "http://localhost:5000/api/orders"
// //     );

// //     setOrders(response.data);
// //   };

// //     <div
// //     style={{
// //         position: "absolute",
// //         left: "-9999px",
// //     }}
// // >
// //     <div ref={printRef}>
// //         <PrintLabel order={selectedOrder} />
// //     </div>
// //     </div>

// //   return (
// //   <div>

// //     <h2>Orders List</h2>

// //     {orders.map((order) => (
// //       <div
// //         key={order._id}
// //         style={{
// //           border: "1px solid #ccc",
// //           marginBottom: "10px",
// //           padding: "10px"
// //         }}
// //       >
// //         <h3>Name: {order.customerName}</h3>

// //         <p>Phone: {order.phone}</p>

// //         {order.items.map((item, index) => (
// //           <div key={index}>
// //             Product: {item.productName} × {item.qty}
// //           </div>
// //         ))}

// //         <p>Address: {order.address}</p>
// //         <p>City: {order.city}</p>
// //         <p>State: {order.state}</p>
// //         <p>Pincode: {order.pincode}</p>
// //         <p>Payment: {order.paymentType}</p>

// //         <button
// //           className="btn"
// //           onClick={() => {
// //             setSelectedOrder(order);

// //             setTimeout(() => {
// //               handlePrint();
// //             }, 100);
// //           }}
// //         >
// //           Print Label
// //         </button>
// //       </div>
// //     ))}

// //     {/* Hidden Print Area */}
// //     <div
// //       style={{
// //         position: "absolute",
// //         left: "-9999px",
// //       }}
// //     >
// //       <div ref={printRef}>
// //         <PrintLabel order={selectedOrder} />
// //       </div>
// //     </div>

// //   </div>
// // );
// // }

// // export default Orders;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://printout-order-details-backend.onrender.com/api/orders")
//       .then((res) => {
//         setOrders(res.data);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Saved Orders</h2>

//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Phone</th>
//             <th>Payment</th>
//             <th>Pincode</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((order) => (
//             <tr key={order._id}>
//               <td>{order.orderId}</td>
//               <td>{order.customerName}</td>
//               <td>{order.phone}</td>
//               <td>{order.paymentType}</td>
//               <td>{order.pincode}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Orders;

// ================================================================================================
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://printout-order-details-backend.onrender.com/api/orders")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
      },
      {
        accessorKey: "customerName",
        header: "Customer",
        size: 80,
      },
      {
        accessorKey: "productName",
        header: "product Name",
        size: 80,
      },
      {
        accessorKey: "qty",
        header: "Quantity",
        size: 50,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 50,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 100,
      },
      {
        accessorKey: "pincode",
        header: "Pincode",
        size: 50,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 50,
      },
      {
        accessorKey: "paymentType",
        header: "Payment",
        size: 50,
      },

      {
        accessorKey: "createdAt",
        header: "Created On",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString("en-IN"),
      },
    ],
    [],
  );

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "10px auto",
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={orders}
          enableColumnResizing
          layoutMode="grid"
        />
      </div>
    </>
  );
}

export default Orders;
