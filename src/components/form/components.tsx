import React, { FC } from "react";
import { appendErrors } from "react-hook-form";

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
  label,
}) => (

          <div className="w-full md:w-1/2 px-3 md:mb-4 sm:mb-0">
            <label 
             htmlFor={name}
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              
              {label}
            </label>
            <input {...register(name)} className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white uppercase" id="grid-first-name" type={type} placeholder={label} />
            { error && 
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            }
          </div>
);

export const TextArea: FC<TTextArea> = ({
  register,
  name,
  error,
  label,
}) => (
  <div className="space-y-2">
            <label 

             htmlFor={name}
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {label}
            </label>
    <textarea
      className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white uppercase min-h-full"
      placeholder={label}
      {...register(name)}
    />
            { error && 
            <p className="text-red-500 text-xs italic">{error}.</p>
            }
  </div>
);

export const Row = ({ children }) => (
  <div className="flex space-x-2 xs:flex-col sm:flex-row w-full"> {children} </div>
);
