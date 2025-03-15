"use client";
import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import axios from "axios";

const DynamicForm = () => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [total, setTotal] = useState(0);

  // Handle change in the input fields
  const handleChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;

    // Recalculate the total whenever an item's value changes
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setTotal(updatedTotal);
    setItems(updatedItems);
  };

  // Handle adding a new item to the form
  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  // Handle removing an item from the form
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((item, idx) => idx !== index);
    const updatedTotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setTotal(updatedTotal);
    setItems(updatedItems);
  };

  // Handle form submission
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
      const response = await axios.post(
        `${baseUrl}/invoice/saveInvoice`,
        FormData
      );
      console.log(response);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <div
                key={index}
                className="grid items-center grid-cols-6 gap-6  p-6 border border-gray-200 rounded-md"
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
                  type="submit"
                  className="text-sm bg-blue-600 text-white font-medium rounded-sm"
                >
                  Save invoice
                </Button>
              </div>
              <div className="col-span-8 text-center text-xs tracking-tight text-gray-600 font-semibold mt-6">
                <p>Total: {total} BDT</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
