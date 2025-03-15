import React from "react";
import { twMerge } from "tw-merge";
import clsx from "clsx";

const Button = ({
  children,
  loading,
  onClick,
  className = "", // default to an empty string
  disabled = false,
  type = "button",
}) => {
  return (
    <div>
      {loading ? (
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-gray-800 hover:bg-gray-200 cursor-pointer focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none"
        >
          <span
            className="animate-spin inline-block size-4 border-3 border-current border-t-transparent text-gray-800 rounded-full"
            role="status"
            aria-label="loading"
          />
          Loading
        </button>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={twMerge(
            clsx(
              // Default button styles
              "py-2  px-4 cursor-pointer inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none",
              // Dynamically merged custom classes from the parent
              className // Merge the passed className dynamically
            )
          )}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
