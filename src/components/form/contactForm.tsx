import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, TextArea } from "./components";
import axios from "axios";
import { useYupValidationResolver, validationSchema } from "./schema";
import { Button } from "../shared/button";

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

  return !isSend ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col pt-20 w-10/12 justify-center items-center mx-auto my-auto">
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
      <h1 >
        {" "}
        Thank you for the message
      </h1>
      <h2 >
        {" "}
        I will respond as soon as possbiel
      </h2>
      <p > You will be redirected to the home page in 10 seconds.</p>

      </div>
    </div>
  );
};
