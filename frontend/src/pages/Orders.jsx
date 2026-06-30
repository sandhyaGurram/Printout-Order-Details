// ================================================================================================
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

  const exportToExcel = () => {
    const excelData = orders.map((order) => ({
      "Order ID": order.orderId,
      Customer: order.customerName,
      Phone: order.phone,
      Address: order.address,
      Pincode: order.pincode,
      Payment: order.paymentType,

      Products: order.items?.map((item) => item.productName).join(", ") || "",

      "Total Qty": order.items?.reduce((sum, item) => sum + item.qty, 0) || 0,

      Amount:
        order.items?.reduce((sum, item) => sum + item.qty * item.price, 0) || 0,

      "Created On": new Date(order.createdAt).toLocaleString("en-IN"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(data, "Orders.xlsx");
  };

  // const printSelectedLabels = () => {
  //   const selectedOrders = Object.keys(rowSelection).map(
  //     (index) => orders[index],
  //   );

  //   const labelsHtml = selectedOrders
  //     .map(
  //       (order) => `
  //       <div style="
  //         page-break-after: always;
  //         padding: 20px;
  //         border: 1px solid #000;
  //       ">
  //         <h2>Shipping Label</h2>

  //         <p><b>Name:</b> ${order.customerName}</p>
  //         <p><b>Phone:</b> ${order.phone}</p>
  //         <p><b>Address:</b> ${order.address}</p>
  //         <p><b>Pincode:</b> ${order.pincode}</p>

  //         <p><b>Payment:</b> ${order.paymentType}</p>

  //         <hr/>

  //         <h4>Shipped By</h4>

  //         <p>${STORE_INFO.name}</p>
  //         <p>${STORE_INFO.address}</p>
  //         <p>${STORE_INFO.city}</p>
  //         <p>${STORE_INFO.phone}</p>
  //       </div>
  //     `,
  //     )
  //     .join("");

  //   const win = window.open("", "_blank");

  //   win.document.write(`
  //   <html>
  //     <head>
  //       <title>Print Labels</title>
  //     </head>

  //     <body>
  //       ${labelsHtml}
  //     </body>
  //   </html>
  // `);

  //   win.document.close();

  //   setTimeout(() => {
  //     win.print();
  //   }, 500);
  // };

  const STORE_INFO = {
    name: "ARM Pearl Beauty",
    address: "Malik Chambers, 404 & 405, Old MLA Quarters Road, Hyderguda",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500029",
    phone: "9848210555",
  };

  const handlePrint = (order) => {
    const grandTotal =
      order.items?.reduce((sum, item) => sum + item.qty * item.price, 0) || 0;

    const products = order.items
      ?.map(
        (item) => `
        <tr>
          <td>${item.productName}</td>
          <td>${item.qty}</td>
          <td>${item.price}</td>
          <td>${item.qty * item.price}</td>
        </tr>
      `,
      )
      .join("");

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
            padding: 5mm;
            font-family: Arial;
            font-size: 12px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid #000;
            padding: 4px;
            font-size:11px
          }
        </style>
      </head>

      <body>

         <p style="text-align:center">
    SHIPPING LABEL
  </p>

        <p><b>Name:</b> ${order.customerName}</p>
        <p><b>Phone:</b> ${order.phone}</p>
        <p><b>Address:</b> ${order.address},${order.pincode}</p>
        <p><b>Payment:</b> ${order.paymentType}</p>
        <p><b>Order Id:</b> ${order.orderId}</p>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            ${products}
          </tbody>
        </table>

        <p>
  <strong>Grand Total:</strong> ₹${grandTotal}
</p>

     

<h3>Shipped By</h3>

<p><b>${STORE_INFO.name}</b></p>

<p>
  ${STORE_INFO.address}
</p>

<p>
  ${STORE_INFO.city},
  ${STORE_INFO.state} -
  ${STORE_INFO.pincode}
</p>

<p>
  Phone:
  ${STORE_INFO.phone}
</p>

      </body>
    </html>
  `);

    win.document.close();
    win.onload = () => {
      win.print();
    };
  };

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
          <button onClick={() => handlePrint(row.original)}>Print Label</button>
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
        <button onClick={exportToExcel}>Download Excel</button>
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
