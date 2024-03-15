import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const Order = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [billData, setBillData] = useState(null);
  const componentRef = useRef();

  // Fetch table data from the server on component mount
  useEffect(() => {
    fetchTablesData();
  }, []);

  const fetchTablesData = () => {
    // Fetch tables data from the server (replace this with your actual API call)
    const mockTablesData = [
      { id: 1, number: 1 },
      { id: 2, number: 2 },
      { id: 3, number: 3 },
      // Add more tables as needed
    ];
    setTables(mockTablesData);
  };

  const handleTableClick = (table) => {
    // Fetch bill data for the selected table from the server (replace this with your actual API call)
    const mockBillData = {
      tableNumber: table.number,
      items: [
        { id: 1, name: "Pizza", price: 150, quantity: 1, totalAmount: 150 },
        {
          id: 2,
          name: "Cold drink",
          price: 100,
          quantity: 1,
          totalAmount: 100,
        },
        { id: 3, name: "chapati", price: 100, quantity: 1, totalAmount: 100 },
        { id: 4, name: "parotha", price: 100, quantity: 1, totalAmount: 100 },
        // Add more bill items as needed
      ],
      totalAmount: 450, // Calculate total amount based on items
    };
    setSelectedTable(table);
    setBillData(mockBillData);
  };

  const handleGenerateBill = () => {
    // Logic to generate bill (e.g., print or save as PDF)
    console.log("Generating bill for table:", selectedTable.number);
    handlePrint();
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container mt-4">
      <h2>Tables</h2>
      <div className="row">
        {tables.map((table) => (
          <div key={table.id} className="col-lg-2 mb-4">
            <Button
              onClick={() => handleTableClick(table)}
              variant={selectedTable === table ? "success" : "primary"}
            >
              Table {table.number}
            </Button>
          </div>
        ))}
      </div>
      {selectedTable && (
        <div className="mt-4">
          <h2>Bill for Table {selectedTable.number}</h2>
          {/* this will be print in bill */}
          <div ref={componentRef} >
            {billData && (
              <div className=" m-5 ">
                <h4>Items</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <h4>Total Amount: ₹{billData.totalAmount}</h4>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <Button onClick={handleGenerateBill} disabled={!selectedTable}>
          Generate Bill
        </Button>
        <Link to="/manager" className="btn btn-secondary">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Order;
