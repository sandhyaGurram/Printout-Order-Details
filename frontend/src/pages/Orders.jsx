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
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    axios
      .get("https://printout-order-details-backend.onrender.com/api/orders")
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  const printLabel = (order) => {
    console.log("Single Print", order);
  };

  const printSelectedLabels = () => {
    const selectedOrders = Object.keys(rowSelection).map(
      (index) => orders[index],
    );

    console.log("Selected Orders", selectedOrders);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
        size: 50,
      },
      {
        accessorKey: "customerName",
        header: "Customer",
        size: 50,
      },
      {
        header: "Products",
        accessorFn: (row) =>
          row.items?.map((item) => item.productName).join(", "),
        size: 80,
      },
      {
        header: "Total Qty",
        accessorFn: (row) =>
          row.items?.reduce((sum, item) => sum + item.qty, 0),
        size: 50,
      },
      {
        header: "Amount",
        accessorFn: (row) =>
          row.items?.reduce((sum, item) => sum + item.qty * item.price, 0),
        size: 50,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 120,
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
      {
        header: "Actions",
        Cell: ({ row }) => (
          <button onClick={() => printLabel(row.original)}>Print Label</button>
        ),
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
        <button onClick={printSelectedLabels}>Print Selected Labels</button>
        <MaterialReactTable
          columns={columns}
          data={orders}
          enableRowSelection
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          enableColumnResizing
          layoutMode="grid"
        />
      </div>
    </>
  );
}

export default Orders;
