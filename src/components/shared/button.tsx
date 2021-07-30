import React, { FC } from "react";

type TButton = {
  fun?: void;
  title: string;
  type?: string;
};
export const Button: FC<TButton> = ({ fun, title, type }) => (
  <button
    type={type}
    className="p-3  
    uppercase
    cursor-pointer 
    border-gray-600
     border-2 rounded 
     hover:bg-gray-800 
     hover:border-gray-800
    hover:text-gray-300
    dark:text-white"
    onClick={() => fun}
  >
    {title}
  </button>
);
