import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useYupValidationResolver, validationSchema } from "./schema";
import { motion, AnimatePresence } from "framer-motion";
import { Input as HeadlessInput, Textarea } from '@headlessui/react';
import { Button } from "@components/shared";
import { FaLinkedin } from "react-icons/fa";

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
  subject: string;
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
        className={`mt-1 block w-full rounded-md border-2 ${errors?.[name] ? "border-red-500" : "border-gray-700"} shadow-sm focus:border-teal-700 focus:ring-teal-700`}
        required
      />
      {errors?.[name] && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export const ContactForm = () => {
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formHeight, setFormHeight] = useState<number | undefined>(undefined);
  const formRef = useRef<HTMLFormElement | null>(null);

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver });

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      // Uncomment and set up your fetch request
      // const response = await fetch("/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //   body: encode({ "form-name": "contact", ...formData }),
      // });
      // if (!response.ok) throw new Error("Network response was not ok");

      setIsSend(true);
    } catch (error) {
      alert("Error: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  // Measure the height of the form when it mounts or updates
  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [isSend]);

  return (
    <div className="flex flex-col items-center font-mono">
      <AnimatePresence>
        <motion.div
          className={`flex flex-col w-10/12 justify-center items-center mx-auto my-auto rounded-lg p-4 ${!isSend ? "border-transparent" : "border-2 border-gray-400"}`} // Toggle border visibility
          initial={{ opacity: 1, y: 0 }} // Initial state for wrapper
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          exit={{ opacity: 0, y: -50 }} // Slide up on exit
          transition={{ duration: 0.5 }}
          style={{ minHeight: formHeight }} // Set min height based on form height
        >
          {!isSend ? (
            <motion.form
              ref={formRef} // Attach the ref to the form
              onSubmit={handleSubmit(onSubmit)}
              data-netlify="true" // Netlify attribute
              name="contact" // Form name for Netlify
              className="flex-col w-full" // Ensure form takes full width
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
                    className={`mt-1 block w-full rounded-md border-2 ${errors?.['text'] ? "border-red-500" : "border-gray-700"} shadow-sm focus:border-teal-700 focus:ring-teal-700`}
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
                <Button
                  loading={isLoading}
                  className={`mt-1 block w-full rounded-md border-2 ${!errors ? "border-red-500" : "border-gray-700"} shadow-sm focus:border-teal-700 focus:ring-teal-700`}
                >
                  Submit
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="flex items-center justify-center font-mono text-4xl flex-col"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: formHeight }} // Match min height of the form
            >
              <p className="flex text-center flex-col gap-4">
                Thank's for reaching out to me!
                <span className="text-2xl px-12 "> {/* Add ml-2 for spacing */}
                  I will do my best to get back to you as soon as possible. If it is something which cannot wait, try to reach me at LinkedIn

                </span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
};
