import React, { useState } from 'react';
import axios from 'axios';

function Manager() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    axios.post('/api/fooditems', { name, price })
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert('Error adding food item');
      });
  };

  const handleRemoveItem = id => {
    axios.delete(`/api/fooditems/${id}`)
      .then(response => {
        alert(response.data);
      })
      .catch(error => {
        alert('Error removing food item');
      });
  };

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <div>
        <input type="text" placeholder="Name" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div>
       
        <button onClick={() => handleRemoveItem(id)}>Remove Item</button>
      </div>
    </div>
  );
}

export default Manager;


