"use client";
import Button from "@/components/ui/button/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [invoices, setInvoices] = useState([]);
  const [shop, setShop] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/invoice/allInvoices`);
        setInvoices(response.data.invoices);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();

    const fetchDataStore = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/Stores`);
        setShop(response.data.res);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchDataStore();
  }, []);

  const handlePrint = (invoiceId) => {
    console.log("Invoice ID to print:", invoiceId);

    // Find the invoice data using the invoiceId
    const invoiceData = invoices.find((invoice) => invoice.invoiceId === invoiceId);

    if (!invoiceData) {
      console.log("Invoice data not found!");
      return;
    }

    if (typeof window !== "undefined") {
      const printWindow = window.open("", "", "width=800,height=600");

      if (printWindow) {
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
                      <strong>${shop?.shopName}</strong><br />
                      ${invoiceId}</strong>
                      Created: ${new Date(invoiceData.date).toLocaleDateString()}<br />
                      Due: ${new Date(invoiceData.date).toLocaleDateString()}
                    </td>
                    <td style="width: 50%; text-align: right;">
                      <img style="max-width: 200px;" src="${shop.shopImage}" />
                    </td>
                  </tr>
                </table>

                <table>
                  <tr>
                    <td style="width: 33%; line-height: 25px;">
                      <label>From:</label><br />
                      <strong>${shop.shopName}</strong><br />
                      ${shop?.shopAddress}
                    </td>
                    <td style="width: 33%; line-height: 25px;">
                      <label>Shop Owner</label><br />
                      <strong>${shop.shopOwnerName}</strong><br />
                     ${shop?.shopContact}
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
                    ${invoiceData.items.map(item => `
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
                  Total: ${invoiceData.amount}
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

        printWindow.print();
        // Close the window after printing or canceling the print
        printWindow.onbeforeunload = () => {
        printWindow.close();
        };
      }
    }
  };

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        All Invoices
      </h3>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <h3 className="mb-2 mx-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Invoices List
          </h3>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Invoice ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {invoices.map((value, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                            {value.invoiceId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {value.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {value.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Button
                              onClick={() => handlePrint(value.invoiceId)} // Pass as function reference
                              type="button"
                              className="bg-green-600 text-white hover:bg-green-700"
                            >
                              Print Invoice
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
