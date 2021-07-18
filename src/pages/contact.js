import React from "react";
import { navigate } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useForm } from "react-hook-form";

const Contact = ({ location }) => {
  const { register } = useForm();

  const handleSubmit = event => {
    event.preventDefault();
    fetch(location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: register.data,
    })
      .then(() => navigate("/thank-you/"))
      .catch(error => alert(error));
  };

  return (
    <Layout>
      <SEO title="Contact" />
      <form
        className="xs:px-10 xl:px-44 xl:py-24 mx-auto w-full h-full "
        name="Contact Form"
        method="POST"
        data-netlify="true"
        action="/thank-you"
      >
        <input
          type="hidden"
          name="form-name"
          value="Contact Form"
          ref={register}
        />

        <div className="flex xs:flex-col sm:flex-row w-full">
          <div className="space-y-2 md:w-1/2 xs:w-full sm:mr-2">
            <label className="xs:hidden md:visible">First name</label>
            <input
              className="focus:underline block bg-gray-light  rounded w-full border-gray-600 border-2"
              placeholder="First name"
              type="text"
              name="first_name"
              ref={register}
            />
          </div>

          <div className="space-y-2 md:w-1/2 xs:w-full">
            <label className="xs:hidden md:visible">Last name</label>
            <input
              className=" focus:underline block bg-gray-light rounded w-full border-gray-600 border-2"
              placeholder="Last name"
              type="text"
              name="last_name"
              ref={register}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="xs:hidden md:visible">Your Email</label>
          <input
            className=" focus:underline block bg-gray-light  rounded w-full border-gray-600 border-2"
            placeholder="Email"
            type="email"
            name="email"
            ref={register}
          />
        </div>
        <div className="space-y-2">
          <label className="xs:hidden md:visible">Message</label>
          <textarea
            className=" focus:underline block bg-gray-light  rounded w-full h-28 border-gray-600 border-2"
            name="message"
            placeholder="Enter message"
            ref={register}
          />
        </div>
        <button
          className="p-3 mt-2  cursor-pointer border-gray-600 border-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </Layout>
  );
};

export default Contact;
