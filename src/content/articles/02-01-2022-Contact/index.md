---
slug: "/send-emails-with-gatsby-and-sendgrid"
title: "How to send email with Gatsby functions and Sendgrid"
date: "2022-01-02"
tags: ["gatsby", "sendgrid"]
published: true
meta:
  description: "Learn how to create a contact form in Gatsby and send emails using SendGrid functions. A step-by-step guide for freelancers and bloggers."
  keywords: "Gatsby, SendGrid, serverless functions, email, contact form"
  author: "Daniel Guldberg Aaes"
  image: "/og/send-emails-with-gatsby-and-sendgrid.png"
  excerpt: "In this article, I will show you how to create a contact form using Gatsby and SendGrid to easily send emails."
---

I believe that every personal blog and portfolo website should have a way to reach out to the owner of the website. It is utterly important to have a contact form if you are a freelancer and want to reach out to new clients or a comment section if you are writing a blog where you would like to get feedback or start a discussion between you and the reader.

In this article will I go through how you can create a contact form with Gatsby and how to actually send an email via Gatsby funtions with a sendgrid implementation.

## Prerqusitories 

It is required to have a basic understanding of ReactJS and GatsbyJs alongside a little knowlegde about NodeJS works.  
Furthere more should you have created an Sendgrid account and verified you email as a single sender.  



## Contact form

For the sake of the simplicity do I use `react-hook-form` instead of managing the form statte myself. In the ideal world would you want to use `yup` as a `resolver` to validate the input but I am not going through this in this article.

```jsx
import React from "react";
import { useForm } from "react-hook-form";

export const ContactForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    throw new Error("Method not implemented.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="name">Name</label>
      <input type="text" {...register("name")} />

      <label for="email">Email</label>
      <input type="email" {...register("email")} />
      <label for="subject">Subject</label>
      <input type="text" {...register("subject")} />
      <label for="message">Message</label>
      <textarea {...register("message")} />
      <input type="submit" value="Send email" />
    </form>
  );
};
```

This is a minimal snippet of how the form could look like, we have a basic form, managed by `react-hook-form` which contains 4 fields and a submit button which calls `onSubmit()` which is going to be defined in a brief moment.

## Gatsby function (API)

I don't know if you have noticed that in some point of Gatsby v3 a new entry in the 404 page appered, namely the `Functions` entry. This is baically a way to combine an API with gatsby, hence the name [serverless functions](https://www.gatsbyjs.com/docs/reference/functions/). The syntax for a Gatsby `function` is bassicaly standard express.

All we need to do is create an `api` folder under `src/`, create a file `sendMail.js`

````js
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const handler = (req, res) => {
  const { method, body } = req;

  let message;

  try {
    // check if the request contains a body
    if (body) {
      message.to = process.env.SENDGRID_AUTHORIZED_EMAIL;
      message.from = body.email
      message.subject = body.subject;
      message.text = body.text;
      message.html = body.text;
    }

    return sendgrid.send(message).then(
      () => {
        res.status(200).json({
          message: "Email sent",
        });
      },
      (error) => {
        if (error.response) {
          return res.status(500).json({
            error: error.response,
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "There was an error", error: err });
  }
};

module.exports = handler;
````

