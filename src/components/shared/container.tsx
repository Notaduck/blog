import React from "react";

export const Container = ({ children }) => (
  <div
    className="
    sm:pl-20 sm:pr-20
    lg:pl-30 lg:pr-30
    xl:pl-60 xl:pr-60"
  >
    {children}
  </div>
);
