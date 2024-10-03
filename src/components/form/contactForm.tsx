import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useYupValidationResolver, validationSchema } from "./schema";
import { Button } from "../shared/button";
import { Transition } from "@headlessui/react";
import { Input as HeadlessInput, Textarea } from '@headlessui/react';

type InputProps = {
  label: string;
  name: string;
  type?: string; // Optional prop for input type
  placeholder?: string; // Optional prop for placeholder
  register: any; // Type for react-hook-form register function
  errors?: any; // Type for errors
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
        {...register(name)} // Register the input field with react-hook-form
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border-2 ${errors?.[name] ? "border-red-500" : "border-gray-700"
          } shadow-sm focus:border-teal-700 focus:ring-teal-700`}
        required // Marking the field as required for Netlify
      />
      {errors?.[name] && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export const ContactForm = () => {
  const [isSend, setIsSend] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (formData) => {
    event.preventDefault();

    const myForm = event.target;

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setIsSend(true))
      .catch((error) => alert(error));
  };

  return !isSend ? (
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


        <div className="w-full px-3 bo  mb-2">
          <label htmlFor={'text'} className="block text-sm font-medium">
            Body
          </label>
          <Textarea
            className={`mt-1 block w-full rounded-md border-2 ${errors?.['text'] ? "border-red-500" : "border-gray-700"
              } shadow-sm focus:border-teal-700 focus:ring-teal-700`}
            id="text"
            {...register("text")}
            label="Message"
            placeholder="Write your message here..."
            errors={errors} // Assuming you have an errors prop in TextArea
          />
          {errors?.['text'] && (
            <p className="text-red-500">{errors['text'].message}</p>
          )}
        </div>
      </fieldset>


      <div className="mx-auto mt-4">
        <Button type="submit" title="Send Message" />
      </div>
    </form>
  ) : (
    <Transition
      show={isSend}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="min-h-content pt-12"
    >
      <div>
        <h1>Thank you for the message</h1>
        <h2>I will respond as soon as possible</h2>
        <p>You will be redirected to the home page in 10 seconds.</p>
      </div>
    </Transition>
  );
};
