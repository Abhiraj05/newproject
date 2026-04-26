// Card.jsx

import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-white/10 overflow-hidden shadow-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;