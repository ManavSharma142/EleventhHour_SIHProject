import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-md bg-white/10 backdrop-blur-md border border-white/20 p-4 ${className}`}
    >
      {children}
    </div>
  );
}
