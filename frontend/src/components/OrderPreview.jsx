import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintLabel from "./PrintLabel";

function OrderPreview({ order }) {

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  if (!order) {
    return (
      <div>
        <h2>No Order Saved Yet</h2>
      </div>
    );
  }

  return (
    <>
      <div>

        <h2>Current Order</h2>

        <p><strong>Name:</strong> {order.customerName}</p>

        <p><strong>Phone:</strong> {order.phone}</p>

        <p><strong>Address:</strong> {order.address}</p>

        <p>
          {order.city}, {order.state}
        </p>

        <p>{order.pincode}</p>

        <button
          onClick={handlePrint}
        >
          Print Label
        </button>

      </div>

      <div
        style={{
          position: "absolute",
          left: "-9999px"
        }}
      >
        <div ref={printRef}>
          <PrintLabel order={order} />
        </div>
      </div>
    </>
  );
}

export default OrderPreview;