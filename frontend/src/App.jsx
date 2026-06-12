import AddOrder from "./pages/AddOrder";
import Orders from "./pages/Orders";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">
        Thermal Print App
      </h1>

      <div className="layout">
        <div className="form-section">
          <AddOrder />
        </div>

        <div className="orders-section">
          <Orders />
        </div>
      </div>
    </div>
  );
}

export default App;