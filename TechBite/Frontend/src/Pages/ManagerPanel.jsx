import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './manager-panel.css';

function ManagerPanel() {
  const [menu, setMenu] = useState([]);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editableItem, setEditableItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:3007/menu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const addItem = async () => {
    try {
      let tableExists = false;
      for (const table in menu) {
        if (table === category) {
          tableExists = true;
          break;
        }
      }
      if (!tableExists) {
        await axios.post('http://localhost:3007/create-table', { tableName: category });
      }
      await axios.post('http://localhost:3007/add-item', { tableName: category, itemName, price });
      fetchMenu();
      setItemName('');
      setPrice('');
      setCategory('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (tableName, itemName) => {
    try {
      await axios.post('http://localhost:3007/remove-item', { tableName, itemName });
      fetchMenu();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateItemPrice = async (tableName, itemName, newPrice) => {
    try {
      await axios.post('http://localhost:3007/update-item', { tableName, itemName, newPrice });
      fetchMenu();
    } catch (error) {
      console.error('Error updating item price:', error);
    }
  };

  return (
    <div className="manager-container">
      <h1 className="manager-heading">Manager Module</h1>
      <div className="input-container card-container">
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <label>Item Name:</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="add-button" onClick={addItem}>Add Item</button>
      </div>
      <h2 className="menu-heading">Menu</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(menu).map(([tableName, items]) => (
            items.map((item, index) => (
              <tr key={index}>
                <td>{tableName}</td>
                <td>{item.item_name}</td>
                <td
                  className={editableItem === `${tableName}_${item.item_name}` ? 'editable' : ''}
                  contentEditable={editableItem === `${tableName}_${item.item_name}`}
                  onDoubleClick={() => setEditableItem(`${tableName}_${item.item_name}`)}
                  onBlur={(e) => {
                    if (editableItem === `${tableName}_${item.item_name}`) {
                      const newPrice = parseFloat(e.target.innerText);
                      updateItemPrice(tableName, item.item_name, newPrice);
                      setEditableItem(null);
                    }
                  }}
                >
                  {item.Price}
                </td>
                <td>
                  <button className="remove-button" onClick={() => removeItem(tableName, item.item_name)}>Remove</button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerPanel;
