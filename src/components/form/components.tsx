import React, { FC } from "react";

type TInput = {
  type: "text" | "email";
  register: any;
  name: string;
  error?: any;
  placeholder: string;
  label: string;
};

type TTextArea = {
  register: any;
  name: string;
  error?: any;
  placeholder: string;
  label: string;
};

export const Input: FC<TInput> = ({
  register,
  name,
  type,
  error,
  placeholder,
  label,
}) => (
  <div className="space-y-2 md:w-1/2 xs:w-full">
    <label className="xs:hidden md:visible"> {label}</label>
    <input
      className=" focus:underline block bg-gray-light  rounded w-full "
      placeholder={placeholder}
      type={type}
      {...register(name)}
    />
  </div>
);

export const TextArea: FC<TTextArea> = ({
  register,
  name,
  error,
  placeholder,
  label,
}) => (
  <div className="space-y-2">
    <label className="xs:hidden md:visible">{label}</label>
    <textarea
      className=" focus:underline block bg-gray-light  rounded w-full h-28 "
      placeholder={placeholder}
      {...register(name)}
    />
  </div>
);

export const Row = ({ children }) => (
  <div className="flex space-x-2 xs:flex-col sm:flex-row w-full"> {children} </div>
);
