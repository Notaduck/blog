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
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
