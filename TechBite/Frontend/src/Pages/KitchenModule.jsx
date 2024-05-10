import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './kitchen-module.css';

const KitchenModule = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);

    fetchOrders();

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3007/kitchen/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCheckboxChange = async (tableNumber, item_name) => {
    try {
      await axios.post('http://localhost:3007/kitchen/updateStatus', {
        tableNumber,
        item_name
      });

      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.tableNumber === tableNumber) {
            order.items = order.items.filter(item => item.item_name !== item_name);
          }
          return order;
        });
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="kitchen-module-container">
      <h2 className="kitchen-module-heading">Kitchen Module</h2>
      {orders.map(order => (
        <div key={order.tableNumber} className="table-container">
          <h3 className="table-heading">Table {order.tableNumber}</h3>
          <ul className="item-list">
            {order.items.map(item => (
              <li key={item.item_name} className="item">
                <label>
                  <input
                    type="checkbox"
                    className="item-checkbox"
                    onChange={() => handleCheckboxChange(order.tableNumber, item.item_name)}
                  />
                </label>
                <span className={item.status === 'Completed' ? 'completed-item' : ''}>
                   {item.Quantity} × {item.item_name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="logout-btn" style={{ position: "absolute", top: "20px", right: "20px"  }}>
        <Link
          to="/"
          className="btn btn-danger"
          style={{ padding: "10px 20px", fontSize: "1.1rem" }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default KitchenModule;
