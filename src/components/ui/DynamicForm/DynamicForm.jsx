"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import axios from "axios";
import PrintIcon from '@mui/icons-material/Print';

const DynamicForm = () => {
  const [shopData, setSetShop] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([{ description: "", quantity: 1, price: 0 }]);
  const [total, setTotal] = useState(0);
  const [latestInvoice, setLatestInvoice] = useState(null); // Store only the latest invoice

  const handleChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;

    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(updatedTotal);
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((item, idx) => idx !== index);
    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(updatedTotal);
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FormData = {
      items,
      total,
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.log("Base URL is undefined!");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post(`${baseUrl}/invoice/saveInvoice`, FormData);
      setLatestInvoice(response.data.latestInvoice); // Store only the latest invoice in the state
      setError(null); // Reset any error
    } catch (error) {
      console.log("Error:", error);
      setError(error); // Set error state if the request fails
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(()=>{
    const fetchData = async () =>{
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.log("Base URL is undefined!");
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/Stores`);
      setSetShop(response.data.res)
    } catch (error) {
      console.log("Error:", error);
    }
    }
    fetchData()
  },[])
  console.log(shopData);
  
function handlePrint() {
  const { invoiceId, date, amount, items } = latestInvoice;

  const printWindow = window.open('', '', 'width=800,height=600');

  printWindow.document.write(`
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Invoice - ${invoiceId}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
          }
          table {
            width: 100%;
            margin: 10px 0px;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background: #343a40;
            color: white;
          }
          .total {
            font-size: 20px;
            font-weight: bold;
            padding-top: 10px;
          }
          .signature {
            background-color: whitesmoke;
            text-align: center;
            padding: 10px;
            font-size: 30px;
            color: #e1e1e1;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div style="padding: 10px;">
          <table>
            <tr>
              <td style="width: 50%; font-size: 20px;">
              <strong>${shopData?.shopName}</strong><br />
                ${invoiceId}</strong>
                Created: ${new Date(date).toLocaleDateString()}<br />
                Due: ${new Date(date).toLocaleDateString()}
              </td>
              <td style="width: 50%; text-align: right;">
                <img style="max-width: 200px;" src="${shopData.shopImage}" />
              </td>
            </tr>
          </table>

          <table>
            <tr>
              <td style="width: 33%; line-height: 25px;">
                <label>From:</label><br />
                <strong>${shopData.shopName}</strong><br />
                ${shopData?.shopAddress}
              </td>
              <td style="width: 33%; line-height: 25px;">
                <label>Shop Owner</label><br />
                <strong>${shopData.shopOwnerName}</strong><br />
               ${shopData?.shopContact}
              </td>
              <td style="width: 33%; text-align: center;">
                <span style="background: #e1e1e1; font-size: 20px; font-weight: bold; padding: 5px; color: #343a40;">
                  PAID
                </span>
              </td>
            </tr>
          </table>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Hours/Unit</th>
                <th>Vat Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.price}</td>
                  <td>${item.quantity}</td>
                  <td>0.00</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total">
            Total: ${amount}
          </div>

          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="width: 50%;">
                <div>Notes:</div>
                <div>Thank you for your business!</div>
              </td>
              <td style="width: 50%;" class="signature">
                Authorized Signature
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `);

  // Automatically close the window after printing
  printWindow.onafterprint = () => {
    printWindow.close();
  };

  printWindow.print();
}

  const resetForm = () => {
    setItems([{ description: "", quantity: 1, price: 0 }]);
    setTotal(0);
    setLatestInvoice(null); // Reset the latest invoice state
  };

  return (
    <div>
      <div className="p-4">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <div
                key={index}
                className="grid items-center mb-6 grid-cols-6 gap-6 p-6 border border-gray-200 rounded-md"
              >
                {/* Description */}
                <div className="w-full col-span-3">
                  <label
                    htmlFor={`description-${index}`}
                    className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      required
                      type="text"
                      id={`description-${index}`}
                      className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                      placeholder="Add Item"
                      value={item.description}
                      onChange={(e) => handleChange(e, index, "description")}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Add Item
                    </span>
                  </label>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor={`quantity-${index}`}
                    className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      required
                      type="number"
                      id={`quantity-${index}`}
                      className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, index, "quantity")}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      QT
                    </span>
                  </label>
                </div>

                {/* Price */}
                <div>
                  <label
                    htmlFor={`price-${index}`}
                    className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      required
                      type="number"
                      id={`price-${index}`}
                      className="peer w-full px-3 py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
                      placeholder="Price"
                      value={item.price}
                      onChange={(e) => handleChange(e, index, "price")}
                    />
                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Price
                    </span>
                  </label>
                </div>

                <Button
                  type="button"
                  className="text-xs"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <div className="flex gap-4 mt-4">
                <Button
                  type="button"
                  className="text-sm"
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
                <Button
                  loading={loading ? true : false}
                  type="submit"
                  className="text-sm bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-sm"
                >
                  Save invoice
                </Button>
              </div>
              <div className="col-span-8 text-center text-xs tracking-tight text-gray-600 font-semibold mt-6">
                <p>Total: {total} BDT</p>
              </div>
            </div>
          </form>

          {latestInvoice && (
            <div className="mt-4">
              <Button
                type="button"
                className="text-sm bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  handlePrint();
                  resetForm();
                }}
              >
                Print Invoice <span><PrintIcon fontSize="small"/></span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
