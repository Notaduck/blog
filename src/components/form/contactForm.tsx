import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useYupValidationResolver, validationSchema } from "./schema";
import { motion } from "framer-motion";
import { Input as HeadlessInput, Textarea } from '@headlessui/react';

type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  errors?: any;
};

type FormData = {
  email: string;
  name: string;
  subject: string; // Fixed typo: changed 'subjet' to 'subject'
  text: string;
};

const Input: React.FC<InputProps> = ({ label, name, type = "text", placeholder, register, errors }) => {
  return (
    <div className="w-full px-3 mb-2">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <HeadlessInput
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border-2 ${errors?.[name] ? "border-red-500" : "border-gray-700"
          } shadow-sm focus:border-teal-700 focus:ring-teal-700`}
        required
      />
      {errors?.[name] && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

const LoadingButton = ({ isLoading, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center justify-center w-full mt-4 p-2 bg-teal-600 text-white rounded-md shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? (
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M12 2C10.34 2 8.68 2.21 7.07 2.63C6.36 1.69 5.14 1 3.84 1C2.14 1 1 2.68 1 4.08C1 6.45 2.94 7.55 4.19 7.9C4.45 7.95 4.71 8 5 8C5.69 8 6.32 7.77 6.9 7.31C7.48 7.77 8.11 8 8.8 8C9.57 8 10.34 7.85 11.07 7.59C12.06 8.12 13.22 8.34 14.4 8.34C15.66 8.34 16.93 8.05 18 7.5C18.5 8.5 19 9.56 19 11C19 12.68 18.19 14 16.89 14C16.02 14 15.23 13.61 14.73 12.94C14.41 12.57 14 12 12 12C10 12 10 14 10 16C10 17.03 11 18 12 18H16C17 18 18 19 18 20C18 21 17 22 16 22H12C10 22 8 20 8 18C8 16 9 15 10 15C10 14 12 14 12 12C12 10 12 8 12 8C12 6 10 6 10 6C10 4 12 4 12 2C14 2 15 2 16 2C18 2 20 2 20 4C20 6 18 6 16 6C14 6 12 6 10 8C8 10 8 12 8 14C8 16 10 18 12 18C14 18 16 20 16 22C18 22 20 20 20 18C20 16 18 16 18 14C18 12 16 12 16 10C16 8 14 6 12 6C10 6 8 6 6 6C4 6 2 6 2 4C2 2 4 2 6 2C8 2 10 2 12 2Z"></path>
          </svg>
        </motion.div>
      ) : (
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          Send Message
        </motion.span>
      )}
    </motion.button>
  );
};

const encode = (data: Record<string, any>) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const ContactForm = () => {
  const [isSend, setIsSend] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onSubmit = async (formData: FormData) => {
    try {
      // const response = await fetch("/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //   body: encode({ "form-name": "contact", ...formData }),
      // });
      // if (!response.ok) throw new Error("Network response was not ok");
      setIsSend(true);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-netlify="true" // Netlify attribute
      name="contact" // Form name for Netlify
      className="flex-col pt-20 w-10/12 justify-center items-center mx-auto my-auto"
    >
      <fieldset className="flex flex-wrap -mx-3 mb-4">
        <legend className="sr-only">Contact Information</legend>

        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="John Doe"
          register={register}
          errors={errors}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register}
          errors={errors}
        />

        <Input
          label="Subject"
          name="subject"
          type="text"
          placeholder="Subject of your message"
          register={register}
          errors={errors}
        />

        <div className="w-full px-3 mb-2">
          <label htmlFor="text" className="block text-sm font-medium">
            Message
          </label>
          <Textarea
            className={`mt-1 block w-full rounded-md border-2 ${errors?.['text'] ? "border-red-500" : "border-gray-700"
              } shadow-sm focus:border-teal-700 focus:ring-teal-700`}
            id="text"
            {...register("text")}
            placeholder="Write your message here..."
          />
          {errors?.['text'] && (
            <p className="text-red-500">{errors['text'].message}</p>
          )}
        </div>
      </fieldset>

      <div className="mx-auto mt-4">
        <LoadingButton isLoading={true} onClick={() => { }} /> {/* Replace with appropriate loading logic */}
      </div>
    </form>
  )
};
