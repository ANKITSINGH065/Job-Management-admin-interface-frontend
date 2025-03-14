import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin" style={{ borderTopColor: "#3498db" }}></div>
    </div>
  );
};

export default Loader;