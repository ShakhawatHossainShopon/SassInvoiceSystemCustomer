import DynamicForm from "@/components/ui/DynamicForm/DynamicForm";
import React from "react";

const page = () => {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Add Users
      </h3>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="p-6">
          <h3 className="mb-2 mx-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            Print Invoice
          </h3>
          <DynamicForm />
        </div>
      </div>
    </div>
  );
};

export default page;
