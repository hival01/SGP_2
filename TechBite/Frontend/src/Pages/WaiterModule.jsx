// /*import pizza from "../asset/pizza.jpeg";
// import Chole from "../asset/Chole.jpeg";
// import Garlic_Naan from "../asset/garlic_naan.jpeg";
// import Kadai_Paneer from "../asset/Kadai_paneer.jpeg";
// import Paratha from "../asset/paratha.jpeg";
// import Plane_Chapati from "../asset/plane_Chapati.jpeg";
// import pepsi from "../asset/Pepsi.jpeg";
// import burger from "../asset/burger.jpg";
// import White_Sauce_Pasta from "../asset/White_Sauce_Pasta .jpeg";
// import React, { useState } from "react";
// import { Card, Button, Table, Navbar, Nav } from "react-bootstrap";

// const POS = () => {
//   const [cart, setCart] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const addProductToCart = (product) => {
//     const existingProductIndex = cart.findIndex(
//       (item) => item.id === product.id
//     );
//     if (existingProductIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += 1;
//       updatedCart[existingProductIndex].totalAmount += product.price;
//       setCart(updatedCart);
//     } else {
//       const updatedCart = [
//         ...cart,
//         {
//           ...product,
//           quantity: 1,
//           totalAmount: product.price,
//         },
//       ];
//       setCart(updatedCart);
//     }
//     setTotalAmount(totalAmount + product.price);
//   };

//   const removeProductFromCart = (product) => {
//     const updatedCart = cart
//       .map((item) => {
//         if (item.id === product.id && item.quantity >= 1) {
//           item.quantity -= 1;
//           item.totalAmount -= product.price;
//         }
//         return item;
//       })
//       .filter((item) => item.quantity > 0); // Remove item from cart if quantity is 0

//     setCart(updatedCart);
//     setTotalAmount(
//       totalAmount - product.price >= 0 ? totalAmount - product.price : 0
//     );
//   };

//   const handlePrint = () => {
//     // Logic for printing the receipt
//     console.log("Printing receipt");
//   };

//   // Mock products data
//   const products = [
//     { id: 1, name: "Pizza", price: 150, image: pizza, category: "Fast Food" },
//     { id: 2, name: "Chole", price: 120, image: Chole, category: "Sabji" },
//     {
//       id: 3,
//       name: "Garlic Naan",
//       price: 50,
//       image: Garlic_Naan,
//       category: "Chapati",
//     },
//     {
//       id: 4,
//       name: "Kadai Paneer",
//       price: 180,
//       image: Kadai_Paneer,
//       category: "Sabji",
//     },
//     { id: 5, name: "Paratha", price: 80, image: Paratha, category: "Chapati" },
//     {
//       id: 6,
//       name: "Plain Chapati",
//       price: 20,
//       image: Plane_Chapati,
//       category: "Chapati",
//     },
//     { id: 7, name: "Pepsi", price: 40, image: pepsi, category: "Cold Drink" },
//     { id: 8, name: "Burger", price: 100, image: burger, category: "Fast Food" },
//     {
//       id: 9,
//       name: "White Sauce Pasta",
//       price: 120,
//       image: White_Sauce_Pasta,
//       category: "Fast Food",
//     },
//     // Add more products as needed
//   ];

//   const filteredProducts = selectedCategory
//     ? products.filter((product) => product.category === selectedCategory)
//     : products;
//   return (
//     <>
//       <Navbar bg="light" expand="lg">
//         <Navbar.Brand ><strong>TechBite</strong></Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link
//               onClick={() => setSelectedCategory(null)}
//               className={`nav-link ${
//                 selectedCategory === null ? "active" : ""
//               }`}
//               style={{
//                 backgroundColor: selectedCategory === null ? "#007bff" : "",
//               }}
//             >
//               All Items
//             </Nav.Link>
//             <Nav.Link
//               onClick={() => setSelectedCategory("Cold Drink")}
//               className={`nav-link ${
//                 selectedCategory === "Cold Drink" ? "active" : ""
//               }`}
//               style={{
//                 backgroundColor:
//                   selectedCategory === "Cold Drink" ? "#007bff" : "",
//               }}
//             >
//               Cold Drink
//             </Nav.Link>
//             <Nav.Link
//               onClick={() => setSelectedCategory("Chapati")}
//               className={`nav-link ${
//                 selectedCategory === "Chapati" ? "active" : ""
//               }`}
//               style={{
//                 backgroundColor:
//                   selectedCategory === "Chapati" ? "#007bff" : "",
//               }}
//             >
//               Chapati
//             </Nav.Link>
//             <Nav.Link
//               onClick={() => setSelectedCategory("Sabji")}
//               className={`nav-link ${
//                 selectedCategory === "Sabji" ? "active" : ""
//               }`}
//               style={{
//                 backgroundColor: selectedCategory === "Sabji" ? "#007bff" : "",
//               }}
//             >
//               Sabji
//             </Nav.Link>
//             <Nav.Link
//               onClick={() => setSelectedCategory("Fast Food")}
//               className={`nav-link ${
//                 selectedCategory === "Fast Food" ? "active" : ""
//               }`}
//               style={{
//                 backgroundColor:
//                   selectedCategory === "Fast Food" ? "#007bff" : "",
//               }}
//             >
//               Fast Food
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <div className="container mt-4">
//         <div className="row">
//           <div className="col-lg-8">
//             <h2>Food Items</h2>
//             <div className="row ">
//               {isLoading ? (
//                 <div>Loading...</div>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <div key={product.id} className="col-lg-4 mb-4">
//                     <Card>
//                       <Card.Img variant="top" src={product.image} />
//                       <Card.Body>
//                         <Card.Title>{product.name}</Card.Title>
//                         <Card.Text>₹{product.price}</Card.Text>
//                         <Button onClick={() => addProductToCart(product)}>
//                           Add
//                         </Button>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//           <div className="col-lg-4">
//             <h2>Cart</h2>
//             <div className="table-responsive bg-dark">
//               <Table className="table table-responsive table-dark table-hover">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Name</th>
//                     <th>Price</th>
//                     <th>Qty</th>
//                     <th>Total</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {cart.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.id}</td>
//                       <td>{item.name}</td>
//                       <td>₹{item.price}</td>
//                       <td>{item.quantity}</td>
//                       <td>₹{item.totalAmount}</td>
//                       <td>
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           onClick={() => removeProductFromCart(item)}
//                         >
//                           Remove
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//               <h2 className="px-2 text-white">Total Amount: ₹{totalAmount}</h2>
//               <div className="m-3 d-flex justify-content-center">
//                 {totalAmount !== 0 ? (
//                   <Button className="btn btn-primary " onClick={handlePrint}>
//                     Place Order
//                   </Button>
//                 ) : (
//                   "Please add a product to the cart"
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default POS;*/


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const WaiterInterface = () => {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [tableNumber, setTableNumber] = useState('');
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/menu');
//       setMenu(response.data);
//     } catch (error) {
//       console.error('Error fetching menu:', error);
//     }
//   };

//   const handlePlaceOrder = async (event) => {
//     event.preventDefault();
//     if (!tableNumber || isNaN(tableNumber) || tableNumber < 1 || tableNumber > 5) {
//       setErrorMessage('Please enter a valid table number (1 to 5).');
//       return;
//     }

//     try {
//       const orderPayload = {
//         tableNumber: tableNumber,
//         items: cart.map(item => ({
//           itemName: item.item_name,
//           price: item.Price,
//           quantity: item.quantity
//         }))
//       };

//       await axios.post(`http://localhost:8080/order/${tableNumber}`, orderPayload);
//       console.log('Order placed successfully!');
//       window.alert('Order placed successfully!');
//       setCart([]); // Clear cart after placing order
//       setTableNumber(''); // Reset table number
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   const handleAddToCart = (item) => {
//     const existingItemIndex = cart.findIndex((cartItem) => cartItem.item_name === item.item_name);
//     if (existingItemIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingItemIndex].quantity += 1;
//       setCart(updatedCart);
//     } else {
//       setCart([...cart, { ...item, quantity: 1 }]);
//     }
//   };

//   const handleQuantityChange = (event, item) => {
//     const updatedCart = cart.map((cartItem) => {
//       if (cartItem.item_name === item.item_name) {
//         return { ...cartItem, quantity: parseInt(event.target.value) };
//       }
//       return cartItem;
//     });
//     setCart(updatedCart);
//   };

//   const removeItemFromCart = (item) => {
//     const updatedCart = cart.filter((cartItem) => cartItem.item_name !== item.item_name);
//     setCart(updatedCart);
//   };

//   const handleTableNumberChange = (event) => {
//     const inputTableNumber = event.target.value;
//     if (inputTableNumber >= 1 && inputTableNumber <= 5) {
//       setTableNumber(inputTableNumber);
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Please enter a valid table number (1 to 5).');
//     }
//   };

//   const handleScrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
  
//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div>
//         <h2>Waiter Interface</h2>
//         <nav style={{ display: 'flex', justifyContent: 'center' }}>
//         <a href="#salads" onClick={() => handleScrollToSection('salads')}>Salads</a>
//         <a href="#soup" onClick={() => handleScrollToSection('soup')}>Soup</a>
//         <a href="#chapati" onClick={() => handleScrollToSection('chapati')}>Chapati</a>
//         <a href="#rice" onClick={() => handleScrollToSection('rice')}>Rice</a>
//         <a href="#paneer" onClick={() => handleScrollToSection('paneer')}>Paneer</a>
//         <a href="#dal" onClick={() => handleScrollToSection('dal')}>Dal</a>
//         <a href="#biryani" onClick={() => handleScrollToSection('biryani')}>Biryani</a>
//       </nav>
//         {!orderPlaced && (
//           <>
//             {Object.entries(menu).map(([tableName, items]) => (
//             <div key={tableName} id={tableName}>
//               <h3>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</h3>
//               <ul>
//                 {items.map((item, index) => (
//                   <li key={index}>
//                     {item.item_name} - Rs {item.Price}
//                     <button onClick={() => handleAddToCart(item)} style={{ marginLeft: '1rem' }}>
//                       Add
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </>
//       )}
//         {orderPlaced && (
//           <div>
//             <p>Order placed successfully for table number {tableNumber}!</p>
//           </div>
//         )}
//       </div>
//       <div>
//         <h3>Cart</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.item_name}</td>
//                 <td>{item.Price}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(e, item)}
//                     min={1}
//                     max={10}
//                   />
//                 </td>
//                 <td>
//                   <button onClick={() => removeItemFromCart(item)}>Remove</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {!orderPlaced && (
//           <>
//             <div>
//               <label htmlFor="tableNumber">Enter Table Number: </label>
//               <input
//                 type="number"
//                 id="tableNumber"
//                 value={tableNumber}
//                 onChange={handleTableNumberChange}
//                 min={1}
//                 max={5}
//                 required
//               />
//               <span style={{ color: 'red' }}>{errorMessage}</span>
//             </div>
//             <button type="button" onClick={handlePlaceOrder}>Place Order</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WaiterInterface;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './waiter.css';

const WaiterInterface = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    fetchMenu();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:8080/menu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!tableNumber || isNaN(tableNumber) || tableNumber < 1 || tableNumber > 5) {
      setErrorMessage('Please enter a valid table number (1 to 5).');
      return;
    }

    try {
      const orderPayload = {
        tableNumber: tableNumber,
        items: cart.map(item => ({
          itemName: item.item_name,
          price: item.Price,
          quantity: item.quantity
        }))
      };

      await axios.post(`http://localhost:8080/order/${tableNumber}`, orderPayload);
      console.log('Order placed successfully!');
      window.alert('Order placed successfully!');
      setCart([]); // Clear cart after placing order
      setTableNumber(''); // Reset table number
      setErrorMessage('');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item_name === item.item_name);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (event, item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.item_name === item.item_name) {
        return { ...cartItem, quantity: parseInt(event.target.value) };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.item_name !== item.item_name);
    setCart(updatedCart);
  };

  const handleTableNumberChange = (event) => {
    const inputTableNumber = event.target.value;
    if (inputTableNumber >= 1 && inputTableNumber <= 5) {
      setTableNumber(inputTableNumber);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid table number (1 to 5).');
    }
  };

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowGoToTop(true);
    } else {
      setShowGoToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      <div className="menu">
        <h2>Menu</h2>
        <nav>
        <a href="#salads" onClick={() => handleScrollToSection('salads')}>Salads</a>
        <a href="#soup" onClick={() => handleScrollToSection('soup')}>Soup</a>
        <a href="#chapati" onClick={() => handleScrollToSection('chapati')}>Chapati</a>
        <a href="#rice" onClick={() => handleScrollToSection('rice')}>Rice</a>
        <a href="#paneer" onClick={() => handleScrollToSection('paneer')}>Paneer</a>
        <a href="#dal" onClick={() => handleScrollToSection('dal')}>Dal</a>
        <a href="#biryani" onClick={() => handleScrollToSection('biryani')}>Biryani</a>
        </nav>
        {!orderPlaced && (
          <>
            {Object.entries(menu).map(([tableName, items]) => (
              <div key={tableName} id={tableName}>
                <h3>{tableName.charAt(0).toUpperCase() + tableName.slice(1)}</h3>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>
                      <div className="menu-item">
                        <span>{item.item_name} - Rs {item.Price}</span>
                        
                        <button className="add-button" style={{ marginLeft: '10px', padding: '8px 20px', fontSize: '16px' }} onClick={() => handleAddToCart(item)}>Add</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {showGoToTop && (
          <button className="go-to-top" onClick={scrollToTop}>Go to Top</button>
        )}
      </div>
      <div className="cart">
      <h3>Cart</h3>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.item_name}</td>
                <td>{item.Price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                    min={1}
                    max={10}
                  />
                </td>
                <td>₹{item.Price * item.quantity}</td>
                <td>
                  <button onClick={() => removeItemFromCart(item) } style={{ background: 'red', color:'white' }} >Remove</button>
                </td>
              </tr>
            ))}
            <tr>
      <td colSpan="3" style={{ textAlign: 'right' }}>Total Amount:</td>
      <td colSpan="2">
        ₹{cart.reduce((total, item) => total + (item.Price * item.quantity), 0).toFixed(2)}
      </td>
    </tr>
          </tbody>
        </table>
        {!orderPlaced && (
          <>
            <div>
            <br/>
              <label htmlFor="tableNumber">Enter Table Number: </label>
              <input
                type="number"
                id="tableNumber"
                value={tableNumber}
                onChange={handleTableNumberChange}
                min={1}
                max={5}
                required
              />
              <span style={{ color: 'red' }}>{errorMessage}</span>
            </div>
            <br/>
             <button type="button" onClick={handlePlaceOrder}>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
};

export default WaiterInterface;