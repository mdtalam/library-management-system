import React from "react";

const HexagonalSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-20 h-20 relative">
        <div className="absolute top-0 left-0 w-12 h-12 rotate-45 bg-purple-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rotate-135 bg-green-500 animate-spin animation-delay-500ms"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rotate-225 bg-blue-500 animate-spin animation-delay-1000ms"></div>
      </div>
    </div>
  );
};

export default HexagonalSpinner;
