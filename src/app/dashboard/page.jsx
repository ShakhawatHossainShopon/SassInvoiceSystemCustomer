import React from "react";

const page = () => {
  return <div>    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {/* Metric Item Start */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
          {/* Static Icon/Placeholder */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
            {/* Replace this with any static image or icon */}
            <span className="text-gray-800 text-3xl">👥</span>
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Customers</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                3,782
              </h4>
            </div>
            {/* Badge */}
            <div className="flex items-center text-green-600">
              <span>↑</span> 11.01%
            </div>
          </div>
        </div>
        {/* Metric Item End */}

        {/* Metric Item Start */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
          {/* Static Icon/Placeholder */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
            {/* Replace this with any static image or icon */}
            <span className="text-gray-800 text-3xl">📦</span>
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Orders</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                5,359
              </h4>
            </div>
            {/* Badge */}
            <div className="flex items-center text-red-600">
              <span>↓</span> 9.05%
            </div>
          </div>
        </div>
        {/* Metric Item End */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
          {/* Static Icon/Placeholder */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
            {/* Replace this with any static image or icon */}
            <span className="text-gray-800 text-3xl">💼</span>
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500">Orders</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                5,359
              </h4>
            </div>
            {/* Badge */}
            <div className="flex items-center text-red-600">
              <span>↓</span> 9.05%
            </div>
          </div>
        </div>
      </div>
    </div></div>;
};

export default page;
