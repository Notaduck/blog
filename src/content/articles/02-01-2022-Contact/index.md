---
slug: '/send-emails-with-gatsby-and-sendgrid'
title: 'How to send email with Gatsby functions and SendGrid'
date: '2022-01-02'
tags: ['gatsby', 'sendgrid' ]
published: true 
---

I believe that every personal blog and portfolo website should have a way to reach out to the owner of the website. It is utterly important to have a contact form if you are a freelancer and want to reach out to new clients or a comment section if you are writing a blog where you would like to get feedback or start a discussion between you and the reader.  

In this article will I go through how you can create a contact form with Gatsby and how to actually send an email via Gatsby funtions with a sendgrid implementation.


## Contact form
For the sake of the simplicity do I use `react-hook-form` instead of managing the form statte myself. In the ideal world would you want to use `yup` as a `resolver` to validate the input but I am not going through this in this article.


```jsx
import React from 'react'
import { useForm } from "react-hook-form";

export const ContactForm = () => {

  const {
    register,
    handleSubmit
  } = useForm();

  return (
      <form onSubmit=(handleSubmit(onSubmit)) >

      </form>
  )

}
```




## Gatsby function (API)


