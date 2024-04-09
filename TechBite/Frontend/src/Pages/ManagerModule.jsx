import React, { useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "./manager-module.css";
import "./print-styles.css";

function ManagerModule() {
  const [tableNumber, setTableNumber] = useState("");
  const [orders, setOrders] = useState([]);
  const [bill, setBill] = useState(null);
  const componentRef = useRef(null);


  // const handleTableSelect = async (tableNumber) => {
  //   try {
  //     setTableNumber(tableNumber); // Update the selected table number
  //     // Fetch orders and generate bill concurrently
  //     const [ordersResponse, billResponse] = await Promise.all([
  //       fetchOrders(tableNumber),
  //       generateBill(tableNumber),
  //     ]);
  //     setOrders(ordersResponse.data); // Set orders data
  //     setBill(billResponse.data); // Set bill data
  //   } catch (error) {
  //     console.error("Error selecting table:", error);
  //   }
  // };
  
  const handleTableSelect = async (tableNumber) => {
    setTableNumber(tableNumber); // Update the selected table number
    await fetchOrders(tableNumber); // Fetch orders for the selected table
     await generateBill(); // Generate the bill after fetching orders
  };
  const generateBill = async () => {
    try {
      const response = await axios.post(`http://localhost:3007/generate-bill`, {
        tableNumber,
      });
      await fetchOrders(tableNumber);
      setBill(response.data);
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };
  const fetchOrders = async (tableNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:3007/orders/${tableNumber}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // const fetchOrders = async (tableNumber) => {
  //   return axios.get(`http://localhost:3007/orders/${tableNumber}`);
  // };
  
  // const generateBill = async (tableNumber) => {
  //   return axios.post(`http://localhost:3007/generate-bill`, {
  //     tableNumber,
  //   });
  // };

  
  // const removeItem = async (tableName, itemName) => {
  //   try {
  //     await axios.post(`http://localhost:3007/remove-item`, {
  //       tableName,
  //       itemName,
  //     });
  //     // Fetch orders after the item is successfully removed
  //     const response = await fetchOrders(tableNumber);
  //     setOrders(response.data); // Update orders state with the new data
  //   } catch (error) {
  //     console.error("Error removing item:", error);
  //   }
  // };
  // const removeItem = async (tableName, itemName) => {
  //   try {
  //     await axios.post(`http://localhost:3007/remove-item`, { tableName, itemName });
  //     fetchOrders(tableNumber);
  //   } catch (error) {
  //     console.error('Error removing item:', error);
  //   }
  // };


  const getTotalAmount = () => {
    if (!bill) return 0;
    return bill.items.reduce(
      (total, item) => total + item.Price * item.Quantity,
      0
    );
  };
  const removeItem = async (tableName, itemName) => {
    try {
      await axios.post(`http://localhost:3007/remove-item`, {
        tableName,
        itemName,
      });
      fetchOrders(tableNumber);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateItemQuantity = async (tableName, itemName, newQuantity) => {
    try {
      await axios.put(`http://localhost:3007/update-item-quantity`, {
        tableName,
        itemName,
        newQuantity,
      });
      fetchOrders(tableNumber);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleQuantityChange = (event, itemName) => {
    const newQuantity = parseInt(event.target.value);
    const updatedOrders = orders.map((order) => {
      if (order.item_name === itemName) {
        return { ...order, Quantity: newQuantity };
      }
      return order;
    });
    setOrders(updatedOrders);
    updateItemQuantity(`tb_${tableNumber}`, itemName, newQuantity);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="manager-container">
      <h1 className="manager-heading">Manager Module</h1>
      <div className="table-selection">
        <button onClick={() => handleTableSelect(1)}>Table 1</button>
        <button onClick={() => handleTableSelect(2)}>Table 2</button>
        <button onClick={() => handleTableSelect(3)}>Table 3</button>
        <button onClick={() => handleTableSelect(4)}>Table 4</button>
        <button onClick={() => handleTableSelect(5)}>Table 5</button>
      </div>
      <h2 className="menu-heading">Orders for Table {tableNumber}</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const total = order.Price * order.Quantity;
            return (
              <tr key={index}>
                <td>{order.item_name}</td>
                <td>{order.Price}</td>
                <td>
                  <input
                    type="number"
                    value={order.Quantity}
                    onChange={(e) => handleQuantityChange(e, order.item_name)}
                    min={1}
                    max={20}
                  />
                </td>
                <td>{total}</td>
                <td>{order.Status}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() =>
                      removeItem(`tb_${tableNumber}`, order.item_name)
                    }
                  >
                    Remove
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders.length > 0 && (
        <button
          onClick={() => {
            handlePrint();
          }}
          className="btn btn-primary mt-3 "
        >
          Print Bill for Table {tableNumber}
        </button>
      )}

      <div ref={componentRef} className="print-content">
        <h1 className="restaurant-name">The Tea Factory</h1>
        <div className="contact-info">
          <p>Contact No: +91 8200976991</p>
          <p>Address: Ground floor, lotus complex, opp. Om hostel</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {bill &&
              bill.items.map((item, index) => {
                const total = item.Price * item.Quantity;
                return (
                  <tr key={index}>
                    <td>{item.item_name}</td>
                    <td>{item.Price}</td>
                    <td>{item.Quantity}</td>
                    <td>{total}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <p style={{ textAlign: "right" }}>Total Amount: {getTotalAmount()}</p>
        <p style={{ textAlign: "right" }}>
          GST (5%): {getTotalAmount() * 0.05}
        </p>
        <p style={{ textAlign: "right", fontWeight: "bold", color: "#dc3545" }}>
          Final Payable Amount: {getTotalAmount() * 1.05}
        </p>

        <h2>
          {" "}
          <strong>
            From our kitchen to your table, thank you for choosing ttf{" "}
          </strong>
        </h2>
      </div>
    </div>
  );
}

export default ManagerModule;
// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { useReactToPrint } from "react-to-print";
// import "./manager-module.css";
// import "./print-styles.css";

// function ManagerModule() {
//   const [tableNumber, setTableNumber] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [bill, setBill] = useState(null);
//   const componentRef = useRef(null);

//   const handleTableSelect = async (tableNumber) => {
//     try {
//       setTableNumber(tableNumber);
//       const [ordersResponse, billResponse] = await Promise.all([
//         fetchOrders(tableNumber),
//         generateBill(tableNumber),
//       ]);
//       setOrders(ordersResponse.data);
//       setBill(billResponse.data); // Update bill state with the response data
//     } catch (error) {
//       console.error("Error selecting table:", error);
//     }
//   };

//   const fetchOrders = async (tableNumber) => {
//     return axios.get(`http://localhost:3007/orders/${tableNumber}`);
//   };

//   const generateBill = async (tableNumber) => {
//     return axios.post(`http://localhost:3007/generate-bill`, {
//       tableNumber,
//     });
//   };

//   const removeItem = async (tableName, itemName) => {
//     try {
//       await axios.post(`http://localhost:3007/remove-item`, {
//         tableName,
//         itemName,
//       });
//       const response = await fetchOrders(tableNumber);
//       setOrders(response.data); // Update orders state with the new data
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   const getTotalAmount = () => {
//     if (!bill) return 0;
//     return bill.items.reduce(
//       (total, item) => total + item.Price * item.Quantity,
//       0
//     );
//   };

//   const updateItemQuantity = async (tableName, itemName, newQuantity) => {
//     try {
//       await axios.put(`http://localhost:3007/update-item-quantity`, {
//         tableName,
//         itemName,
//         newQuantity,
//       });
//       const response = await fetchOrders(tableNumber);
//       setOrders(response.data); // Update orders state with the new data
//     } catch (error) {
//       console.error("Error updating item quantity:", error);
//     }
//   };

//   const handleQuantityChange = (event, itemName) => {
//     const newQuantity = parseInt(event.target.value);
//     const updatedOrders = orders.map((order) => {
//       if (order.item_name === itemName) {
//         return { ...order, Quantity: newQuantity };
//       }
//       return order;
//     });
//     setOrders(updatedOrders);
//     updateItemQuantity(`tb_${tableNumber}`, itemName, newQuantity);
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   return (
//     <div className="manager-container">
//       <h1 className="manager-heading">Manager Module</h1>
//       <div className="table-selection">
//         {[1, 2, 3, 4, 5].map((tableNum) => (
//           <button key={tableNum} onClick={() => handleTableSelect(tableNum)}>
//             Table {tableNum}
//           </button>
//         ))}
//       </div>
//       <h2 className="menu-heading">Orders for Table {tableNumber}</h2>
//       <table className="menu-table">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => {
//             const total = order.Price * order.Quantity;
//             return (
//               <tr key={index}>
//                 <td>{order.item_name}</td>
//                 <td>{order.Price}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={order.Quantity}
//                     onChange={(e) => handleQuantityChange(e, order.item_name)}
//                     min={1}
//                     max={20}
//                   />
//                 </td>
//                 <td>{total}</td>
//                 <td>{order.Status}</td>
//                 <td>
//                   <button
//                     className="remove-button"
//                     onClick={() =>
//                       removeItem(`tb_${tableNumber}`, order.item_name)
//                     }
//                   >
//                     Remove
//                   </button>{" "}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       {orders.length > 0 && (
//         <button onClick={handlePrint} className="btn btn-primary mt-3">
//           Print Bill for Table {tableNumber}
//         </button>
//       )}

//       <div ref={componentRef} className="print-content">
//         <h1 className="restaurant-name">The Tea Factory</h1>
//         <div className="contact-info">
//           <p>Contact No: +91 8200976991</p>
//           <p>Address: Ground floor, lotus complex, opp. Om hostel</p>
//         </div>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Item Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bill &&
//               bill.items.map((item, index) => {
//                 const total = item.Price * item.Quantity;
//                 return (
//                   <tr key={index}>
//                     <td>{item.item_name}</td>
//                     <td>{item.Price}</td>
//                     <td>{item.Quantity}</td>
//                     <td>{total}</td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         <p style={{ textAlign: "right" }}>Total Amount: {getTotalAmount()}</p>
//         <p style={{ textAlign: "right" }}>GST (5%): {getTotalAmount() * 0.05}</p>
//         <p style={{ textAlign: "right", fontWeight: "bold", color: "#dc3545" }}>
//           Final Payable Amount: {getTotalAmount() * 1.05}
//         </p>
//         <h2>
//           <strong>From our kitchen to your table, thank you for choosing ttf </strong>
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default ManagerModule;
