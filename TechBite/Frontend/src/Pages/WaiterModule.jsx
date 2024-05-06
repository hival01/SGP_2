import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./waiter.css";

const WaiterInterface = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    fetchMenu();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3007/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleIncreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.item_name === item.item_name) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (
      !tableNumber ||
      isNaN(tableNumber) ||
      tableNumber < 1 ||
      tableNumber > 5
    ) {
      setErrorMessage("Please enter a valid table number (1 to 5).");

      return;
    }

    try {
      const orderPayload = {
        tableNumber: tableNumber,
        items: cart.map((item) => ({
          itemName: item.item_name,
          price: item.Price,
          quantity: item.quantity,
        })),
      };

      await axios.post(
        `http://localhost:3007/order/${tableNumber}`,
        orderPayload
      );
      console.log("Order placed successfully!");
      window.alert("Order placed successfully!");
      setCart([]); // Clear cart after placing order
      setTableNumber(""); // Reset table number
      setErrorMessage("");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.item_name === item.item_name
    );
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
    const updatedCart = cart
      .map((cartItem) => {
        if (cartItem.item_name === item.item_name) {
          if (cartItem.quantity === 1) {
            // If quantity is 1, remove the item completely
            return null;
          } else {
            // Decrease the quantity by 1
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
        }
        return cartItem;
      })
      .filter(Boolean); // Remove any null items
    setCart(updatedCart);
  };

  const handleTableNumberChange = (event) => {
    const inputTableNumber = event.target.value;
    if (inputTableNumber >= 1 && inputTableNumber <= 5) {
      setTableNumber(inputTableNumber);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid table number (1 to 5).");
      event.target.blur(); // Remove focus from the input field
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <div className="menu">
        <h2 className="text-center ">
          <strong>Menu</strong>
        </h2>
        <nav>
          {Object.keys(menu).map((category, index) => (
            <a
              key={index}
              href={`#${category}`}
              onClick={() => handleScrollToSection(category)}
              className="menu-link"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </a>
          ))}
        </nav>
        {!orderPlaced && (
          <>
            {Object.entries(menu).map(([tableName, items]) => (
              <div key={tableName} id={tableName}>
                <h3>
                  {tableName.charAt(0).toUpperCase() + tableName.slice(1)}
                </h3>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>
                      <div
                        className="menu-item border border-2 border-primary rounded p-1 "
                        onClick={() => handleAddToCart(item)}
                      >
                        <span>
                          {item.item_name} - Rs {item.Price}
                        </span>

                        <button
                          className="add-button"
                          style={{}}
                          onClick={() => handleAddToCart(item)}
                        >
                          Add
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {showGoToTop && (
                  <button
                    className="btn btn-success go-to-top"
                    onClick={scrollToTop}
                  >
                    Go to Top
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="cart ">
        <h3>Cart</h3>
        {/* <table>
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
                  <button
                    onClick={() => removeItemFromCart(item)}
                    style={{ background: "red", color: "white" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ textAlign: "right" }}>
                Total Amount:
              </td>
              <td colSpan="2">
                ₹
                {cart
                  .reduce(
                    (total, item) => total + item.Price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table> */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
              <th>Remove</th>
              <th>Add</th> {/* New column for increasing quantity */}
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
                  />
                </td>
                <td>₹{item.Price * item.quantity}</td>
                <td className="text-center">
                  <button
                    onClick={() => removeItemFromCart(item)}
                    style={{
                      background: "red",
                      color: "white",
                      paddingLeft: "17px",
                      paddingRight: "17px",
                    }}
                  >
                    -1
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    style={{
                      background: "green",
                      color: "white",
                      paddingLeft: "17px",
                      paddingRight: "17px",
                    }}
                  >
                    +1
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" style={{ textAlign: "right" }}>
                Total Amount:
              </td>
              <td colSpan="2">
                ₹
                {cart
                  .reduce(
                    (total, item) => total + item.Price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {!orderPlaced && (
          <>
            <div>
              <br />
              <label htmlFor="tableNumber">Enter Table Number </label>
              <input
                style={{ marginLeft: "10px" }}
                type="number"
                id="tableNumber"
                value={tableNumber}
                onChange={handleTableNumberChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePlaceOrder(e);
                  }
                }}
                min={1}
                max={5}
                required
              />
              <span style={{ color: "red" }}>{errorMessage}</span>
            </div>
            <br />
            <button
              type="button"
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              PLACE ORDER
            </button>
          </>
        )}
      </div>
      <div className="logout-btn">
          <Link to="/" className="btn btn-danger" style={{ position: 'absolute', top: '20px', right: '20px' }}>Logout</Link>
        </div>
    </div>
    
  );
};

export default WaiterInterface;
