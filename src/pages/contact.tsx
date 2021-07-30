import React from "react";
import { navigate } from "gatsby";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { useForm } from "react-hook-form";
import { Input, Row, TextArea } from "../components/form";
import { ContactForm } from "../components/form/contactForm";

const Contact = ({ location }) => {
  const { register } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(location.pathname, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: register.data,
    })
      .then(() => navigate("/thank-you/"))
      .catch((error) => alert(error));
  };

  return (
    <Layout>
      <SEO title="Contact" />

      <div className="xs:mt-2 md:mt-8 min-h-content">

<ContactForm/>
      {/* <form
        className="xs:px-10 xl:px-44 xl:py-24 mx-auto w-full h-full "
      >

      <h1 className='text-4xl mb-10'> Contact </h1>
        <Row>
          <Input
            type="text"
            label="Your Name"
            register={register}
            placeholder="Name"
            name="name"
          />
          <Input
            type="email"
            label="Your Email"
            register={register}
            placeholder="Email"
            name="email"
          />
        </Row>

        <TextArea
          label="Message"
          name="message"
          placeholder="Enter message"
          register={register}
        />

        <button
          className="p-3 mt-2 w-full cursor-pointer rounded bg-gray-light  border border-1 border-gray-500 hover:bg-white"
          type="submit"
        >
          Send
        </button>
      </form> */}

      </div> 
    </Layout>
  );
};

export default Contact;
