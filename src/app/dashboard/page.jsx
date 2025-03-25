"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const page = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!baseUrl) {
        console.log("Base URL is undefined!");
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/DashbaordApi`);
        setData(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <div>
      {" "}
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            {/* Static Icon/Placeholder */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              {/* Replace this with any static image or icon */}
              <span className="text-gray-800 text-3xl">
                <LocalPrintshopIcon />
              </span>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500">Invoice Count</span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                  {data?.totalInvoiceCount}
                </h4>
              </div>
              {/* Badge */}
              <div className="flex items-center text-green-600">
                <span>↑</span> {data?.totalInvoiceCount}
              </div>
            </div>
          </div>
          {/* Metric Item End */}

          {/* Metric Item Start */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            {/* Static Icon/Placeholder */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              {/* Replace this with any static image or icon */}
              <span className="text-gray-800 text-3xl">
                <AttachMoneyIcon />
              </span>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500">Total Sell</span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                  {data?.totalAmount}
                </h4>
              </div>
              {/* Badge */}
              <div className="flex items-center text-green-600">
                <span>↑</span>
                BDT
              </div>
            </div>
          </div>
          {/* Metric Item End */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
            {/* Static Icon/Placeholder */}
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
              {/* Replace this with any static image or icon */}
              <span className="text-gray-800 text-3xl">
                <CategoryIcon />
              </span>
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500">Orders</span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                  {data?.totalItems}
                </h4>
              </div>
              {/* Badge */}
              <div className="flex items-center text-green-600">
                <span>↑</span> {data?.totalItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
