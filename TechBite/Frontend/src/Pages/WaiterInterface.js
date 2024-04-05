import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KitchenModule = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders every second
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000);

    // Fetch orders immediately when component mounts
    fetchOrders();

    // Clear interval when component unmounts to prevent memory leaks
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
      // Send a request to update the status of the food item
      await axios.post('http://localhost:3007/kitchen/updateStatus', {
        tableNumber,
        item_name
      });

      // Update UI to remove the checked item from display
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
    <div>
      <h2>Kitchen Module</h2>
      {orders.map(order => (
        <div key={order.tableNumber}>
          <h3>Table {order.tableNumber}</h3>
          <ul>
            {order.items.map(item => (
              <li key={item.item_name}>
                <label>
                  <input type="checkbox" onChange={() => handleCheckboxChange(order.tableNumber, item.item_name)} />
                </label>
                {item.item_name} - Rs {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default KitchenModule;
