import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, TextArea } from "./components";
import axios from "axios";
import * as yup from "yup";
import { useYupValidationResolver, validationSchema } from "./schema";
import { Button } from "../shared/button";
import { navigate } from "gatsby";

export const ContactForm = () => {
  const [isSend, setIsSend] = useState(false);

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (data) => {
    axios
      .post("/api/sendgrid", data)
      .then((e) => setIsSend(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 10000);
  });

  return !isSend ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 sm:mb-2 md:mb-0">
        <Input
          type="text"
          id="name"
          register={register}
          name="name"
          label="name"
          error={errors?.name}
        />
        <Input
          type="email"
          id="email"
          register={register}
          name="email"
          label="email"
          error={errors?.email}
        />
      </div>

      <div className="flex flex-wrap -mx-3 sm:mb-2 md:mb-0">
        <Input
          type="text"
          id="subject"
          register={register}
          name="subject"
          label="subject"
          error={errors?.subject}
        />
      </div>
      <TextArea
        name="text"
        id="text"
        label="message"
        register={register}
        error={errors?.text?.message}
      />

      <div className="mx-auto mt-4">
        <Button type="submit" title="Send Message" />
      </div>
    </form>
  ) : (
      <div className='min-h-content pt-12 '>
      <div >
      <h1 className=" text-6xl font-inconsolata mb-2">
        {" "}
        Thank you for the message
      </h1>
      <h2 className="text-4xl font-montserrat mb-4">
        {" "}
        I will respond as soon as possbiel
      </h2>
      <p className='font-montserrat'> You will be redirected to the home page in 10 seconds.</p>

      </div>
    </div>
  );
};
